"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface LinkedInData {
  name?: string;
  headline?: string;
  profileImage?: string;
  url?: string;
  fetchedAt?: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.5 2.121m-1.5-2.121c.063.027.127.053.19.08m-.19-.08A2.25 2.25 0 0114.25 8.25m0-5.146a24.301 24.301 0 014.5 0M4.5 8.25a2.25 2.25 0 00-2.25 2.25v1.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-1.5A2.25 2.25 0 0019.5 8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5a1.5 1.5 0 113 0m3 0a1.5 1.5 0 11-3 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MicIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`w-4 h-4 ${active ? "text-red-400" : ""}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);

// ─── Suggested questions ──────────────────────────────────────────────────────

const SUGGESTIONS = [
  "What are Sampoorn's skills?",
  "Tell me about his projects",
  "Is he available for internships?",
  "क्या Sampoorn freelance करते हैं?",
  "What tech stack does he use?",
];

// ─── Loading dots ─────────────────────────────────────────────────────────────

const TypingIndicator = () => (
  <div className="flex gap-1 items-center px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full bg-[#e5262c]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
      />
    ))}
  </div>
);

// ─── Message bubble ───────────────────────────────────────────────────────────

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e5262c] to-[#ff6b6b] flex items-center justify-center mr-2 flex-shrink-0 mt-1 shadow-lg shadow-red-900/30">
          <span className="text-white text-xs font-bold">S</span>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-[#e5262c] to-[#c41e24] text-white rounded-br-sm shadow-lg shadow-red-900/20"
            : "bg-white/5 border border-white/10 text-white/90 rounded-bl-sm backdrop-blur-sm"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [linkedinData, setLinkedinData] = useState<LinkedInData | null>(null);
  const [linkedinFetched, setLinkedinFetched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Fetch LinkedIn data once
  useEffect(() => {
    if (!linkedinFetched) {
      setLinkedinFetched(true);
      fetch("/api/linkedin")
        .then((r) => r.json())
        .then(({ data }) => {
          if (data) setLinkedinData(data);
        })
        .catch(() => {}); // silent fail
    }
  }, [linkedinFetched]);

  // Greeting message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetings = [
        "Hi! 👋 I'm Sampoorn's AI assistant. Ask me anything about him — his skills, projects, experience, or availability!",
        "\nमैं हिंदी में भी बात कर सकता हूँ। बस पूछिए! 🚀",
      ];
      const greeting: Message = {
        id: "greeting",
        role: "assistant",
        content: greetings.join(""),
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  // Pulse animation counter
  useEffect(() => {
    if (!isOpen) {
      const timer = setInterval(() => setPulseCount((c) => c + 1), 5000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const userText = text.trim();
      if (!userText || isLoading) return;

      setShowSuggestions(false);
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: userText,
        timestamp: new Date(),
      };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);
      setHasError(false);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userText,
            history: messages.slice(-10).map((m) => ({
              role: m.role,
              content: m.content,
            })),
            linkedinData: linkedinData
              ? `Name: ${linkedinData.name}\nHeadline: ${linkedinData.headline}\nProfile: ${linkedinData.url}`
              : undefined,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          throw new Error(data.error || "Failed to get response");
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setHasError(true);
        const errDetail = err instanceof Error ? err.message : String(err);
        const errMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Error: ${errDetail}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errMsg]);
        console.error("[AI Assistant Error]", err);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, linkedinData]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Floating Bubble ─────────────────────────────────────────────────── */}
      <motion.button
        id="ai-assistant-toggle"
        aria-label="Open AI Assistant"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-br from-[#e5262c] to-[#c41e24] shadow-2xl shadow-red-900/50 flex items-center justify-center cursor-pointer border border-white/20 overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? {} : { boxShadow: ["0 0 0 0 rgba(229,38,44,0.4)", "0 0 0 18px rgba(229,38,44,0)", "0 0 0 0 rgba(229,38,44,0)"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="text-white"
            >
              <CloseIcon />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="text-white w-7 h-7"
            >
              <BotIcon />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Red dot notification */}
        {!isOpen && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full border-2 border-[#e5262c]" />
        )}
      </motion.button>

      {/* ── Chat Panel ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-panel"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-[9998] w-[360px] max-w-[calc(100vw-1.5rem)] h-[520px] max-h-[calc(100vh-7rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{
              background: "rgba(10, 10, 10, 0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-[#e5262c]/10 to-transparent flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e5262c] to-[#ff6b6b] flex items-center justify-center shadow-lg shadow-red-900/40 flex-shrink-0">
                <span className="text-white text-sm font-black">S</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Sampoorn&apos;s AI</p>
                <p className="text-white/50 text-xs">Multilingual • RAG-powered</p>
              </div>
              {linkedinData && (
                <a
                  href={linkedinData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077b5] hover:text-[#0077b5]/80 transition-colors flex-shrink-0"
                  title="View LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon />
                </a>
              )}
              <div className="flex gap-1 flex-shrink-0">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#e5262c]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e5262c] to-[#ff6b6b] flex items-center justify-center mr-0 flex-shrink-0">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm backdrop-blur-sm">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              {showSuggestions && messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 space-y-2"
                >
                  <p className="text-white/30 text-xs px-1 font-mono uppercase tracking-wider">
                    Try asking:
                  </p>
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      onClick={() => sendMessage(s)}
                      className="w-full text-left text-xs text-white/70 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#e5262c]/40 rounded-xl px-3 py-2 transition-all duration-200 cursor-pointer"
                    >
                      {s}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* LinkedIn context indicator */}
            {linkedinData && (
              <div className="px-4 py-1.5 border-t border-white/5 flex items-center gap-1.5 bg-white/2 flex-shrink-0">
                <LinkedInIcon />
                <span className="text-white/30 text-[10px] font-mono">
                  LinkedIn synced · {new Date(linkedinData.fetchedAt ?? "").toLocaleTimeString()}
                </span>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex-shrink-0">
              {hasError && (
                <p className="text-red-400/70 text-xs mb-2 px-1 font-mono">
                  ⚠ Add GEMINI_API_KEY to .env.local to enable the AI
                </p>
              )}
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  id="ai-assistant-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything… / कुछ भी पूछें…"
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 focus:border-[#e5262c]/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 disabled:opacity-50"
                />
                <motion.button
                  id="ai-assistant-send"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5262c] to-[#c41e24] flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 cursor-pointer shadow-lg shadow-red-900/30"
                  aria-label="Send message"
                >
                  <SendIcon />
                </motion.button>
              </div>
              <p className="text-white/15 text-[10px] text-center mt-2 font-mono">
                Powered by Gemini 3.8 Flash · RAG · Multilingual
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
