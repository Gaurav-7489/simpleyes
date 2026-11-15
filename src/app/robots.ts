import type { MetadataRoute } from "next";
import { isProductionBuild } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Production allows crawling; any non-production build (previews, staging) disallows everything. */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionBuild) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    // Everyone may crawl. AI answer-engine crawlers are listed explicitly so their access is unambiguous (GEO).
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended", "Bingbot"],
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
