/**
 * Central business configuration.
 *
 * Everything here is either verified (from the existing simplyes.de site or the
 * approved project brief) or explicitly `null` where the business owner still
 * has to supply the information. Do NOT fill `null` values with guesses —
 * especially legal/Impressum details.
 */

import { ownerSettings } from "./owner";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplyes.de";

/** Digits only, international format. Verified: published on simplyes.de (wa.me link). */
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "4915216627596").replace(/\D/g, "");

export const site = {
  name: "SimplYes",
  /** Lower-case wordmark with period, as written in the brand brief. */
  wordmark: "simplyes",
  tagline: "Redefining Consular Services.",
  url: rawSiteUrl.replace(/\/+$/, ""),
  locale: "en",
  language: "en-DE",
  areaServed: "Germany",
  /** Approved geographic statement. */
  coverageStatement: "We assist customers across Germany.",
  shortDescription:
    "Independent documentation assistance for Indians in Germany with Indian consular and administrative paperwork.",
  description:
    "SimplYes is an independent private documentation-assistance service helping Indians living in Germany understand requirements, prepare paperwork, organise supporting documents and receive human guidance for Indian consular and administrative processes.",
  /** Short approved disclosure (footer, service pages, contact). Pending legal review (B3). */
  shortDisclosure:
    "SimplYes is an independent private documentation-assistance service. It is not affiliated with the Embassy of India, Indian Consulates or outsourced application centres. Application decisions and official processing remain with the relevant authorities.",
  /** Full approved disclosure (About, FAQs, Impressum). Pending legal review (B3). */
  disclosure:
    "SimplYes is an independent private documentation-assistance service. It is not affiliated with the Embassy of India, Indian Consulates or outsourced application centres. Application decisions and official processing remain with the relevant authorities. SimplYes does not issue passports, approve visas or grant OCI status, does not guarantee outcomes or processing times, and does not itself perform official attestation, notarisation or certification. Where your matter requires legal advice, notarisation or another regulated service, we will tell you so and you should consult an appropriately qualified professional.",
  /** One-line hero note. */
  heroNote: "Independent private service — not a government authority or application centre.",
  whatsapp: {
    number: whatsappNumber,
    /** Human-readable form of the verified number. */
    display: "+49 1521 6627596",
  },
  /**
   * Public contact details beyond WhatsApp. Rendered only when non-null —
   * the owner must supply and verify them (B5, B9).
   */
  contact: {
    /** Public contact + enquiry inbox (B5). Set NEXT_PUBLIC_CONTACT_EMAIL once the owners confirm it. */
    email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Info@simplyes.de") as string | null,
    phone: "+49 1521 6627596" as string | null,
    hours: null as string | null,
    responseTime: null as string | null,
  },
  /**
   * Legal / Impressum details. All MUST be supplied and verified by the
   * business owner before launch. Rendered as "to be provided" until then.
   */
  legal: ownerSettings.legal,
  privacy: ownerSettings.privacy,
  terms: ownerSettings.terms,
  policies: ownerSettings.policies,
  /**
   * Enquiry form endpoint (§13): an approved form service or secure endpoint that
   * accepts a JSON POST and returns 2xx only when the enquiry is accepted
   * (recommended: Formdall, see docs/ENQUIRY-SETUP.md). Unset → the form explains that it is not yet
   * connected and offers WhatsApp/email instead; it never fakes success.
   */
  enquiryEndpoint: (process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || null) as string | null,
  /**
   * Name of the form service's hidden anti-spam (honeypot) field. Formdall does not publish it: copy it from
   * the hidden input in the form's "Embed" snippet in the Formdall dashboard. A JSON submission without this
   * field is rejected, so it must match the configured service.
   */
  enquiryHoneypotField: (process.env.NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD || "_gotcha") as string,
  /** GA4 measurement ID (§18). Unset → no analytics code and no consent banner. */
  gaMeasurementId: (process.env.NEXT_PUBLIC_GA_ID || null) as string | null,
  official: {
    embassy: {
      label: "Embassy of India, Berlin",
      href: "https://indianembassyberlin.gov.in/",
    },
  },
} as const;

/**
 * Form services the Privacy Policy can describe automatically, keyed by the endpoint's host. Facts are
 * taken from each provider's own Impressum / privacy policy (checked 6 Nov 2026). An endpoint on any other
 * host leaves the Privacy Policy's "form service" entry marked as outstanding.
 */
export const knownFormServices: Record<string, { name: string; provider: string; location: string; url: string }> = {
  "api.formdall.de": {
    name: "Formdall",
    provider: "Daniel Proschko, Bahnhofstr. 8, 82216 Maisach, Germany",
    location: "servers in Germany",
    url: "https://formdall.de/datenschutz",
  },
};

/** The configured enquiry form service, if it is one the Privacy Policy can name. */
export const enquiryService = (() => {
  if (!site.enquiryEndpoint) return null;
  try {
    return knownFormServices[new URL(site.enquiryEndpoint).hostname] ?? null;
  } catch {
    return null;
  }
})();

export type NavItem = { label: string; href: string };

/**
 * Primary navigation (V2, Concept 2): Home · Services ▾ · How It Works · About · FAQs, with the
 * Get Assistance button (→ /contact/) on the right. The mobile menu appends `contactNav`.
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "How It Works", href: "/how-it-works/" },
  { label: "About", href: "/about/" },
  { label: "FAQs", href: "/faqs/" },
];

/** Contact entry shown in the mobile menu (on desktop the Get Assistance button covers it). */
export const contactNav: NavItem = { label: "Contact", href: "/contact/" };

/** Primary CTA in the header and across the site. */
export const getAssistance: NavItem = { label: "Get Assistance", href: "/contact/" };

/** Footer "Company" column. */
export const companyNav: NavItem[] = [
  { label: "About SimplYes", href: "/about/" },
  { label: "How It Works", href: "/how-it-works/" },
  { label: "Contact", href: "/contact/" },
];

/** Footer "Information" column. */
export const informationNav: NavItem[] = [
  { label: "FAQs", href: "/faqs/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Privacy Policy", href: "/privacy/" },
  { label: "Terms & Conditions", href: "/terms/" },
  { label: "Disclaimer", href: "/disclaimer/" },
  { label: "Impressum", href: "/impressum/" },
];

/** Whether this build is the live production build (controls indexing). */
export const isProductionBuild = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_ENV;
  if (explicit) return explicit === "production";
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv) return vercelEnv === "production";
  return process.env.NODE_ENV === "production";
})();
