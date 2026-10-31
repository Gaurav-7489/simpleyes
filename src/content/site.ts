/**
 * Central business configuration.
 *
 * Everything here is either verified (from the existing simplyes.de site or the
 * approved project brief) or explicitly `null` where the business owner still
 * has to supply the information. Do NOT fill `null` values with guesses —
 * especially legal/Impressum details.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://simplyes.de";

/** Digits only, international format. Verified: published on simplyes.de (wa.me link). */
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "4917662510556").replace(/\D/g, "");

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
    display: "+49 176 62510556",
  },
  /**
   * Public contact details beyond WhatsApp. Rendered only when non-null —
   * the owner must supply and verify them (B5, B9).
   */
  contact: {
    /** Public contact + enquiry inbox (B5). Set NEXT_PUBLIC_CONTACT_EMAIL once the owners confirm it. */
    email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || null) as string | null,
    phone: null as string | null,
    hours: null as string | null,
    responseTime: null as string | null,
  },
  /**
   * Legal / Impressum details. All MUST be supplied and verified by the
   * business owner before launch. Rendered as "to be provided" until then.
   */
  legal: {
    legalName: null as string | null,
    representative: null as string | null,
    street: null as string | null,
    postalCodeCity: null as string | null,
    country: "Germany",
    email: null as string | null,
    phone: null as string | null,
    vatId: null as string | null,
    register: null as string | null,
    /** Set to true once a lawyer/the owner has reviewed Impressum + privacy text. */
    reviewed: false,
    lastUpdated: "2026-10-28",
  },
  /**
   * Enquiry form endpoint (§13): an approved form service or secure endpoint that
   * accepts a JSON POST and returns 2xx only when the enquiry is accepted
   * (e.g. a Formspree form URL). Unset → the form explains that it is not yet
   * connected and offers WhatsApp/email instead; it never fakes success.
   */
  enquiryEndpoint: (process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || null) as string | null,
  /** GA4 measurement ID (§18). Unset → no analytics code and no consent banner. */
  gaMeasurementId: (process.env.NEXT_PUBLIC_GA_ID || null) as string | null,
  official: {
    embassy: {
      label: "Embassy of India, Berlin",
      href: "https://indianembassyberlin.gov.in/",
    },
  },
} as const;

export type NavItem = { label: string; href: string };

/** §06 desktop navigation: Home · Services ▾ · How It Works · About Us · FAQs · Contact Us · [Get Assistance]. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "How It Works", href: "/how-it-works/" },
  { label: "About Us", href: "/about/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Contact Us", href: "/contact/" },
];

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
