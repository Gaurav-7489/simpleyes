import type { Metadata } from "next";
import { services } from "@/content/services";
import { isProductionBuild, site } from "@/content/site";
import { missions, missionPath, type Mission } from "@/content/missions";
import { youtubeThumbnail, youtubeWatchUrl, type Video } from "@/content/videos";

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
  /** Extra <meta name> tags, e.g. geo.region / geo.placename on mission pages. */
  other?: Record<string, string>;
};

/** "<title> | Simplyes" when that stays within 60 characters, otherwise the title alone. */
export function withBrand(title: string): string {
  const branded = `${title} | ${site.name}`;
  return branded.length <= 60 ? branded : title;
}

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, absoluteTitle, noindex, other }: PageMetaInput): Metadata {
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
    ...(other ? { other } : {}),
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
    areaServed: [
      { "@type": "Country", name: "Germany" },
      ...["Berlin", "Frankfurt am Main", "Munich", "Hamburg"].map((name) => ({ "@type": "City", name })),
    ],
    knowsAbout: [
      ...services.map((service) => service.title),
      "Indian passport renewal in Germany",
      "e-OCI card",
      "Indian e-Visa",
      ...missions.map((mission) => mission.name),
    ],
    sameAs: [site.youtube.url],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${site.whatsapp.number}`,
        url: `https://wa.me/${site.whatsapp.number}`,
        areaServed: "DE",
        availableLanguage: ["English"],
      },
      ...(site.contact.email
        ? [{ "@type": "ContactPoint", contactType: "customer support", email: site.contact.email, url: absoluteUrl("/contact/"), areaServed: "DE", availableLanguage: ["English"] }]
        : []),
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

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  slug?: string;
  issues?: { id: string; label: string }[];
}) {
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
    // How to request it: the contact form (prefilled per problem), WhatsApp/phone and email.
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(input.slug ? `/contact/?service=${input.slug}` : "/contact/"),
      servicePhone: { "@type": "ContactPoint", telephone: `+${site.whatsapp.number}`, contactType: "customer support" },
      availableLanguage: "English",
    },
    // The problems this service helps with (no prices: quotation-based).
    ...(input.issues?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${input.name} — what we help with`,
            itemListElement: input.issues.map((issue) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: issue.label },
              url: absoluteUrl(`/contact/?service=${input.slug}&issue=${issue.id}`),
            })),
          },
        }
      : {}),
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

/** VideoObject for each video that has a YouTube id (videos without one publish nothing). */
export function videoJsonLd(list: Video[]) {
  return list
    .filter((video) => video.youtubeId)
    .map((video) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.title,
      description: video.description,
      thumbnailUrl: [youtubeThumbnail(video)],
      uploadDate: video.uploadDate,
      duration: video.duration,
      contentUrl: youtubeWatchUrl(video),
      embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
      publisher: { "@id": orgId },
    }));
}

/**
 * A mission page: a WebPage about the mission (an Embassy / GovernmentOffice that Simplyes is NOT part of),
 * with Simplyes's service offered to the people that mission serves.
 */
export function missionJsonLd(mission: Mission) {
  const url = absoluteUrl(missionPath(mission));
  const office = {
    "@type": mission.kind === "Embassy" ? "Embassy" : "GovernmentOffice",
    name: mission.name,
    alternateName: mission.alsoKnownAs,
    url: mission.website,
    address: { "@type": "PostalAddress", addressLocality: mission.city, addressCountry: "DE" },
    geo: { "@type": "GeoCoordinates", latitude: mission.geo.lat, longitude: mission.geo.lng },
    areaServed: mission.states.map((name) => ({ "@type": "State", name })),
  };
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: mission.h1,
      description: mission.metaDescription,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      about: office,
      publisher: { "@id": orgId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Passport, e-OCI and visa application help for the ${mission.name}`,
      serviceType: "Indian consular documentation assistance",
      url,
      provider: { "@id": orgId },
      areaServed: mission.states.map((name) => ({ "@type": "State", name })),
      audience: { "@type": "Audience", audienceType: `Indians and people of Indian origin applying to the ${mission.name}` },
    },
  ];
}

/** A step-by-step guide as HowTo (with its video when published). */
export function guideJsonLd(guide: { title: string; summary: string; path: string; steps: { title: string; body: string }[]; updated: string }, video?: Video) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.summary,
    url: absoluteUrl(guide.path),
    dateModified: guide.updated,
    inLanguage: "en",
    publisher: { "@id": orgId },
    step: guide.steps.map((step, i) => ({ "@type": "HowToStep", position: i + 1, name: step.title, text: step.body })),
    ...(video?.youtubeId ? { video: videoJsonLd([video])[0] } : {}),
  };
}
