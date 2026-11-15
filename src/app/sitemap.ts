import type { MetadataRoute } from "next";
import { pageUpdated } from "@/content/page-dates";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const legalModified = new Date(site.legal.lastUpdated);
  const pages: { path: string; priority: number; legal?: boolean }[] = [
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
      { path: "/privacy/", priority: 0.2, legal: true },
      { path: "/terms/", priority: 0.2, legal: true },
      { path: "/disclaimer/", priority: 0.2, legal: true },
      { path: "/impressum/", priority: 0.2, legal: true },
    );
  }

  return pages.map(({ path, priority, legal }) => ({
    url: absoluteUrl(path),
    lastModified: legal ? legalModified : new Date(pageUpdated[path] ?? site.contentUpdated),
    changeFrequency: "monthly",
    priority,
  }));
}
