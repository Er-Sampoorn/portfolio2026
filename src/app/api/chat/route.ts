import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";
import { join } from "path";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: Message[];
  linkedinData?: string;
}

// ─── RAG Utilities ───────────────────────────────────────────────────────────

/** Split markdown into paragraphs / sections for chunking */
function chunkMarkdown(text: string): string[] {
  const chunks: string[] = [];
  // Split on double newlines and headers
  const sections = text.split(/\n{2,}|\n(?=#{1,3} )/);
  for (const section of sections) {
    const trimmed = section.trim();
    if (trimmed.length > 30) {
      // Further split long chunks by sentence (~500 chars each)
      if (trimmed.length > 600) {
        const sentences = trimmed.split(/(?<=[.!?])\s+/);
        let current = "";
        for (const sentence of sentences) {
          if ((current + sentence).length > 500) {
            if (current) chunks.push(current.trim());
            current = sentence;
          } else {
            current += " " + sentence;
          }
        }
        if (current.trim()) chunks.push(current.trim());
      } else {
        chunks.push(trimmed);
      }
    }
  }
  return chunks;
}

/** Simple TF-IDF-like cosine similarity using term overlap (no vector DB needed) */
function tokenize(text: string): Map<string, number> {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097f\s]/g, " ") // keep Hindi unicode range too
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const freq = new Map<string, number>();
  for (const token of tokens) {
    freq.set(token, (freq.get(token) ?? 0) + 1);
  }
  return freq;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (const [term, countA] of a) {
    dot += countA * (b.get(term) ?? 0);
    magA += countA ** 2;
  }
  for (const countB of b.values()) magB += countB ** 2;
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/** Retrieve top-k most relevant chunks for a query */
function retrieveChunks(query: string, chunks: string[], topK = 4): string[] {
  const queryTokens = tokenize(query);
  const scored = chunks.map((chunk) => ({
    chunk,
    score: cosineSimilarity(queryTokens, tokenize(chunk)),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((s) => s.chunk);
}

// ─── Load Knowledge Base (cached at module level) ─────────────────────────────

let knowledgeChunks: string[] | null = null;

function getKnowledgeChunks(): string[] {
  if (knowledgeChunks) return knowledgeChunks;
  try {
    const filePath = join(process.cwd(), "src", "data", "knowledge.md");
    const content = readFileSync(filePath, "utf-8");
    knowledgeChunks = chunkMarkdown(content);
    return knowledgeChunks;
  } catch (e) {
    console.error("Failed to load knowledge base:", e);
    return [];
  }
}

// ─── System Prompt Builder ────────────────────────────────────────────────────

function buildSystemPrompt(
  relevantChunks: string[],
  linkedinContext: string,
  userMessage: string
): string {
  const ragContext = relevantChunks.join("\n\n---\n\n");

  return `You are Sampoorn's personal AI assistant embedded in his portfolio website. 
You speak warmly, professionally, and concisely. You answer questions about Sampoorn Tripathi 
— his skills, projects, experience, education, and background.

IMPORTANT RULES:
1. ONLY answer questions about Sampoorn. If asked about unrelated topics, politely redirect.
2. DETECT the language the user is writing in and RESPOND IN THE SAME LANGUAGE.
   - If the user writes in Hindi (हिंदी), respond in Hindi.
   - If the user writes in English, respond in English.
   - If they mix, match their style.
3. Be friendly, concise, and helpful. Use "Sampoorn" in third person when describing him.
4. If you don't know something, say so honestly — don't make things up.
5. For contact, always mention: Email, LinkedIn, GitHub.
6. Keep responses under 150 words unless a detailed answer is genuinely needed.

═══ KNOWLEDGE BASE (RAG Context) ═══
${ragContext || "No specific context retrieved for this query."}

${linkedinContext ? `═══ LIVE LINKEDIN DATA ═══\n${linkedinContext}` : ""}

Answer the following user message based on the above context. Be helpful and accurate.`;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key not configured. Add GEMINI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const body: ChatRequest = await request.json();
    const { message, history = [], linkedinData } = body;

    if (!message?.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // ── RAG: Retrieve relevant chunks ───────────────────────────────────────
    const chunks = getKnowledgeChunks();
    const relevantChunks = retrieveChunks(message, chunks, 5);

    // ── Build prompts ────────────────────────────────────────────────────────
    const systemPrompt = buildSystemPrompt(relevantChunks, linkedinData ?? "", message);

    // ── Call Gemini (with model fallback chain) ───────────────────────────────
    const genAI = new GoogleGenerativeAI(apiKey);
    const MODELS = ["gemini-3.8-flash", "gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash"];
    let responseText = "";
    let lastError: Error | null = null;

    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemPrompt,
        });

        // Build chat history — Gemini requires:
        //   1. History must start with role 'user'
        //   2. History must alternate user → model → user → model...
        //   3. History must NOT include the current message (sent separately)
        const rawHistory = history.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        }));

        // Find first 'user' message index, drop everything before it
        const firstUserIdx = rawHistory.findIndex((m) => m.role === "user");
        const trimmed = firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : [];

        // Build strictly alternating pairs (user, model, user, model, ...)
        const safeHistory: { role: string; parts: { text: string }[] }[] = [];
        let expectRole = "user";
        for (const msg of trimmed) {
          if (msg.role === expectRole) {
            safeHistory.push(msg);
            expectRole = expectRole === "user" ? "model" : "user";
          }
          // skip messages that break the alternating pattern
        }
        // History must end with 'model' (the last exchange before current message)
        if (safeHistory.length > 0 && safeHistory[safeHistory.length - 1].role === "user") {
          safeHistory.pop(); // remove trailing user msg — it'll be sent fresh
        }

        const chat = model.startChat({ history: safeHistory });

        const result = await chat.sendMessage(message);
        responseText = result.response.text();
        break; // success — exit loop
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        const is503 =
          lastError.message.includes("503") ||
          lastError.message.includes("high demand") ||
          lastError.message.includes("overloaded");
        if (!is503) throw lastError; // non-503 errors bubble up immediately
        // 503 → try next model
      }
    }

    if (!responseText) {
      throw lastError ?? new Error("All Gemini models are currently unavailable. Please try again in a moment.");
    }

    return Response.json({
      reply: responseText,
      chunksUsed: relevantChunks.length,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return Response.json({ error: message }, { status: 500 });
  }
}
