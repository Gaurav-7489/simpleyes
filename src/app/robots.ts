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
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
