/**
 * The Indian missions in Germany where Simplyes customers submit their applications. Each one has a public
 * page (/missions/<slug>/) that explains, in plain language, which states it serves and how Simplyes helps
 * people prepare for it.
 *
 * Simplyes is not part of any mission. These pages say so prominently and link to the mission's own website.
 * Street addresses, phone numbers and opening hours are deliberately not repeated here: they change, and the
 * official website is the only reliable source. Jurisdiction is as published by the Embassy of India, Berlin
 * and the Consulates General (checked 16 Nov 2026).
 */

export type Mission = {
  slug: string;
  /** Official name, used in headings and structured data. */
  name: string;
  /** Short name for chips ("Consulate Frankfurt"). */
  chip: string;
  city: string;
  kind: "Embassy" | "Consulate General";
  /** German federal states served, in their English names. */
  states: string[];
  website: string;
  /** ISO 3166-2 region of the mission's city (geo.region meta tag). */
  region: string;
  /** Approximate city-centre coordinates (geo.position meta tag; not the building). */
  geo: { lat: number; lng: number };
  seoTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  /** Other names people search for this mission. */
  alsoKnownAs: string[];
};

export const missions: Mission[] = [
  {
    slug: "embassy-of-india-berlin",
    name: "Embassy of India, Berlin",
    chip: "Embassy of India, Berlin",
    city: "Berlin",
    kind: "Embassy",
    states: ["Berlin", "Brandenburg", "Mecklenburg-Western Pomerania", "Saxony", "Saxony-Anhalt", "Thuringia"],
    website: "https://indianembassyberlin.gov.in/",
    region: "DE-BE",
    geo: { lat: 52.5096, lng: 13.3601 },
    seoTitle: "Embassy of India Berlin: Passport, e-OCI & Visa Help",
    metaDescription:
      "Applying at the Embassy of India in Berlin? Simplyes checks your documents, fills in your passport, e-OCI or visa forms and helps you book your appointment.",
    h1: "Embassy of India, Berlin: passport, e-OCI and visa help",
    lead:
      "Applying to the Embassy of India in Berlin for a passport, e-OCI, visa or attestation? We check your documents, fill in your forms and help you book your appointment, so your application is right the first time.",
    alsoKnownAs: ["Indian Embassy Berlin", "Embassy of India in Germany", "Indische Botschaft Berlin"],
  },
  {
    slug: "consulate-general-of-india-frankfurt",
    name: "Consulate General of India, Frankfurt",
    chip: "Consulate Frankfurt",
    city: "Frankfurt am Main",
    kind: "Consulate General",
    states: ["Hesse", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland"],
    website: "https://cgifrankfurt.gov.in/",
    region: "DE-HE",
    geo: { lat: 50.1109, lng: 8.6821 },
    seoTitle: "Consulate General of India Frankfurt: Passport & OCI Help",
    metaDescription:
      "Applying at the Consulate General of India in Frankfurt? Simplyes checks your documents, fills in your passport, e-OCI or visa forms and helps you book your appointment.",
    h1: "Consulate General of India, Frankfurt: passport, e-OCI and visa help",
    lead:
      "Applying to the Consulate General of India in Frankfurt for a passport, e-OCI, visa or attestation? We check your documents, fill in your forms and help you book your appointment, so your application is right the first time.",
    alsoKnownAs: ["Indian Consulate Frankfurt", "CGI Frankfurt", "Indisches Generalkonsulat Frankfurt"],
  },
  {
    slug: "consulate-general-of-india-munich",
    name: "Consulate General of India, Munich",
    chip: "Consulate Munich",
    city: "Munich",
    kind: "Consulate General",
    states: ["Bavaria", "Baden-Württemberg"],
    website: "https://cgimunich.gov.in/",
    region: "DE-BY",
    geo: { lat: 48.1351, lng: 11.582 },
    seoTitle: "Consulate General of India Munich: Passport & OCI Help",
    metaDescription:
      "Applying at the Consulate General of India in Munich? Simplyes checks your documents, fills in your passport, e-OCI or visa forms and helps you book your appointment.",
    h1: "Consulate General of India, Munich: passport, e-OCI and visa help",
    lead:
      "Applying to the Consulate General of India in Munich for a passport, e-OCI, visa or attestation? We check your documents, fill in your forms and help you book your appointment, so your application is right the first time.",
    alsoKnownAs: ["Indian Consulate Munich", "CGI Munich", "Indisches Generalkonsulat München"],
  },
  {
    slug: "consulate-general-of-india-hamburg",
    name: "Consulate General of India, Hamburg",
    chip: "Consulate Hamburg",
    city: "Hamburg",
    kind: "Consulate General",
    states: ["Hamburg", "Bremen", "Lower Saxony", "Schleswig-Holstein"],
    website: "https://cgihamburg.gov.in/",
    region: "DE-HH",
    geo: { lat: 53.5511, lng: 9.9937 },
    seoTitle: "Consulate General of India Hamburg: Passport & OCI Help",
    metaDescription:
      "Applying at the Consulate General of India in Hamburg? Simplyes checks your documents, fills in your passport, e-OCI or visa forms and helps you book your appointment.",
    h1: "Consulate General of India, Hamburg: passport, e-OCI and visa help",
    lead:
      "Applying to the Consulate General of India in Hamburg for a passport, e-OCI, visa or attestation? We check your documents, fill in your forms and help you book your appointment, so your application is right the first time.",
    alsoKnownAs: ["Indian Consulate Hamburg", "CGI Hamburg", "Indisches Generalkonsulat Hamburg"],
  },
];

export function getMission(slug: string): Mission | undefined {
  return missions.find((mission) => mission.slug === slug);
}

export const missionPath = (mission: Pick<Mission, "slug">) => `/missions/${mission.slug}/`;
