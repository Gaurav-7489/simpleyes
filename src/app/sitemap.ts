import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.legal.lastUpdated);
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services/", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}/`, priority: 0.8 })),
    { path: "/how-it-works/", priority: 0.7 },
    { path: "/about/", priority: 0.6 },
    { path: "/faqs/", priority: 0.7 },
    { path: "/pricing/", priority: 0.6 },
    { path: "/contact/", priority: 0.7 },
  ];

  // Legal pages are only listed once reviewed and indexable. /thank-you/ is never listed (noindex).
  if (site.legal.reviewed) {
    pages.push(
      { path: "/privacy/", priority: 0.2 },
      { path: "/terms/", priority: 0.2 },
      { path: "/disclaimer/", priority: 0.2 },
      { path: "/impressum/", priority: 0.2 },
    );
  }

  return pages.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
