import type { MetadataRoute } from "next";
import { isProductionBuild } from "@/content/site";
import { ALLOW_MODEL_TRAINING, MODEL_TRAINING_AGENTS, SEARCH_AND_RETRIEVAL_AGENTS } from "@/lib/crawlers";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Production allows crawling; any non-production build (previews, staging) disallows everything. */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionBuild) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  // Noindex pages (thank-you, unreviewed legal pages) are NOT disallowed: crawlers must fetch them to see noindex.
  const training = ALLOW_MODEL_TRAINING ? { allow: "/" } : { disallow: "/" };
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: SEARCH_AND_RETRIEVAL_AGENTS, allow: "/" },
      { userAgent: MODEL_TRAINING_AGENTS, ...training },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
