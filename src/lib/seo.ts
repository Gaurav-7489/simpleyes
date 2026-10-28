import type { Metadata } from "next";
import { isProductionBuild, site } from "@/content/site";

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of applying the "| Simplyes" template. */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, absoluteTitle, noindex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const index = isProductionBuild && !noindex;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      locale: "en_DE",
      images: [{ url: absoluteUrl("/og-image.png"), width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [absoluteUrl("/og-image.png")],
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/* ---------- JSON-LD builders (only verified facts) ---------------------- */

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: `${site.url}/`,
    logo: absoluteUrl("/icon-512.png"),
    slogan: site.tagline,
    description: site.description,
    areaServed: { "@type": "Country", name: "Germany" },
    knowsAbout: [
      "Indian consular procedures",
      "Document requirements for Indian consular applications",
      "Application form preparation",
      "Photo and signature formatting for applications",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${site.whatsapp.number}`,
        url: `https://wa.me/${site.whatsapp.number}`,
        areaServed: "DE",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: `${site.url}/`,
    inLanguage: "en",
    publisher: { "@id": orgId },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "Germany" },
    audience: { "@type": "Audience", audienceType: "Indian citizens and people of Indian origin living in Germany" },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: absoluteUrl("/contact/"),
    about: { "@id": orgId },
  };
}
