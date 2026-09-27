// LinkedIn public profile scraper
// NOTE: LinkedIn severely restricts scraping. This route fetches
// the public profile page and extracts open-graph meta tags.
// For production, use LinkedIn's official Partner API with OAuth.

export async function GET() {
  const linkedinUrl =
    "https://www.linkedin.com/in/sampoorn-tripathi-38121b354";

  // LinkedIn blocks server-to-server fetches and may return non-standard
  // status codes that cause a RangeError — guard with nested try/catch
  let html = "";
  try {
    const response = await fetch(linkedinUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
    });
    if (response.ok) {
      html = await response.text();
    }
  } catch {
    // LinkedIn blocked the request — return graceful fallback
  }

  // Extract Open Graph meta tags
  const ogTitle =
    html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || "";
  const ogDescription =
    html.match(/<meta property="og:description" content="([^"]+)"/)?.[1] || "";
  const ogImage =
    html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] || "";
  const titleTag = html.match(/<title>([^<]+)<\/title>/)?.[1] || "";

  const profileData = {
    url: linkedinUrl,
    name: ogTitle || titleTag || "Sampoorn Tripathi",
    headline: ogDescription || "Fullstack Developer & CSE Undergrad",
    profileImage: ogImage,
    fetchedAt: new Date().toISOString(),
  };

  return Response.json({ data: profileData, error: null });
}
