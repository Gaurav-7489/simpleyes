import type { Faq } from "@/content/faqs";

/** An official page a service relies on. `verifiedOn` is the date it was last checked (YYYY-MM-DD). */
export type OfficialSource = { label: string; href: string; verifiedOn: string };

/** One "We help with" card. `id` is stable: it is used in /contact/?service=&issue= and in enquiry emails. */
export type ServiceIssue = {
  id: string;
  label: string;
  /** One line under the card title. */
  body?: string;
  /** Urgent situations (lost passport, Emergency Certificate, urgent visa) get the emergency colour. */
  urgent?: boolean;
  /** Small label above the title (Attestation, Affidavits, …). */
  kicker?: string;
};

/** A card in the service page's sidebar, in the order shown. */
export type AsideCard =
  | { kind: "appointment"; title?: string; body: string }
  | { kind: "emergency" }
  | { kind: "ask"; title: string; body: string }
  | { kind: "dark"; title: string; body: string; link: { label: string; href: string } }
  | { kind: "included"; items: string[]; note: string };

/** "New in Germany": groups of topics with a short list each. */
export type HelpGroup = { title: string; icon: "insurance" | "apartment" | "arrival"; items: string[] };

export type Service = {
  slug: string;
  title: string;
  /** "New" badge in lists. */
  isNew?: boolean;
  /** One-line summary (homepage list, services page, llms.txt). */
  summary: string;
  /** "Mainly for …" line. */
  mainlyFor: string;
  /** Search-result title (≤ 60 characters with " | Simplyes"). */
  seoTitle: string;
  metaDescription: string;
  /** Service-page H1 and lead. `heroAccent` is the part of the H1 set in green. */
  heroTitle: string;
  heroAccent?: string;
  heroLead: string;
  /** Overrides the urgent strip's question on this page. */
  urgentQuestion?: string;
  /** Overrides the prefilled WhatsApp text (still non-sensitive). */
  whatsappMessage?: string;
  /** The "We help with" cards. Three columns when the cards carry kickers. */
  issues: ServiceIssue[];
  aside: AsideCard[];
  video?: { id: string; heading: string; caption?: string };
  documents?: { title: string; items: string[]; note: string };
  /** Related video guides (IDs from src/content/videos.ts). */
  guides: string[];
  /** New in Germany only: topic groups, included / not included, and questions. */
  helpGroups?: HelpGroup[];
  scope?: { included: string[]; notIncluded: string[] };
  faqs: Faq[];
  /** Closing band. */
  cta?: { title: string; lead: string };
  sources: OfficialSource[];
};

export { OTHER_ISSUE } from "@/lib/enquiry-keys";

const CHECKED = "2026-10-30";

const sources = {
  outsourcing: {
    label: "Embassy of India, Berlin — applications through the outsourced service provider",
    href: "https://indianembassyberlin.gov.in/extra?id=MTY1",
    verifiedOn: CHECKED,
  },
  attestationFaq: {
    label: "Embassy of India, Berlin — attestation FAQ",
    href: "https://indianembassyberlin.gov.in/extra?id=MTYz",
    verifiedOn: CHECKED,
  },
  meaApostille: {
    label: "Ministry of External Affairs — apostille",
    href: "https://www.mea.gov.in/apostille.htm",
    verifiedOn: CHECKED,
  },
  ociPortal: {
    label: "OCI Services portal (incl. OCI Miscellaneous Services)",
    href: "https://ociservices.gov.in/",
    verifiedOn: CHECKED,
  },
  embassyOci: {
    label: "Embassy of India, Berlin — OCI information",
    href: "https://indianembassyberlin.gov.in/extra?id=MTU1",
    verifiedOn: CHECKED,
  },
} satisfies Record<string, OfficialSource>;

const missionNote = "Requirements differ between missions and can change. We check the current list for your mission before you submit.";
const missionFees = "Official fees are paid to the mission. Our service fee is agreed before we start.";

/**
 * The six services, named the way the consulates name them. Wording follows the owners' "Simplyes Website Redesign"
 * (Nov 2026) word for word.
 */
export const services: Service[] = [
  {
    slug: "passport-services",
    title: "Passport Services",
    summary: "Renewal, lost or damaged passports, name and detail changes, PCC, Emergency Certificate and surrender certificate.",
    mainlyFor: "Professionals, families and long-term residents",
    seoTitle: "Indian Passport Renewal & Services in Germany",
    metaDescription:
      "Indian passport renewal, lost or damaged passports, name changes, PCC, Emergency Certificate and surrender certificate in Germany. We check, prepare and help book.",
    heroTitle: "Indian passport renewal and passport services in Germany",
    heroLead:
      "Renewal, lost or damaged passports, name and detail changes, PCC and emergency travel documents. We check, prepare and help you book your appointment.",
    issues: [
      { id: "renewal", label: "Passport renewal", body: "Re-issue on expiry or when the pages are full." },
      { id: "lost-damaged", label: "Lost, stolen or damaged passport", body: "Police report, Annexure F and L affidavits, new passport.", urgent: true },
      { id: "correction", label: "Name and detail changes", body: "Spouse's name, name change after marriage, name split, address." },
      { id: "signature", label: "Change of signature", body: "Affidavit and supporting documents." },
      { id: "pcc", label: "Police Clearance Certificate (PCC)", body: "For jobs, immigration and residence permits." },
      { id: "emergency-certificate", label: "Emergency Certificate", body: "One-way travel document for urgent travel to India.", urgent: true },
      { id: "surrender", label: "Surrender certificate", body: "After taking German or another citizenship." },
      { id: "children", label: "Passports for children", body: "Minors and newborns, with parental consent forms." },
    ],
    aside: [
      { kind: "appointment", body: "We help you book your appointment at the Embassy, Consulate or application centre, with a checklist for the day." },
      { kind: "emergency" },
      { kind: "included", items: ["Document checking", "Form filling", "Photo and signature check"], note: missionFees },
    ],
    video: { id: "U5oRO--jVbQ", heading: "Watch: renew your passport in 6 steps", caption: "How to renew your Indian passport in Germany" },
    documents: {
      title: "Documents usually needed for renewal",
      items: [
        "Current passport (original) and copies of the first and last pages",
        "Printed online application form, signed on the last page",
        "Photo, 35 × 45 mm, white background, same as uploaded",
        "Residence permit and Meldebescheinigung",
        "Fee payment proof and a tracked return envelope",
      ],
      note: missionNote,
    },
    guides: ["K_c2qhg5PSo", "doHN3e53b0k"],
    faqs: [],
    sources: [sources.outsourcing],
  },
  {
    slug: "oci-services",
    title: "e-OCI Services",
    summary: "Fresh e-OCI, renewal after a new passport and updates of your details, for adults, children and foreign spouses.",
    mainlyFor: "Families, German citizens of Indian origin and spouses",
    seoTitle: "e-OCI Card Application Help in Germany",
    metaDescription:
      "Fresh e-OCI, e-OCI for children and foreign spouses, and updates after a new passport, from Germany. We check your eligibility, photo and documents before you submit.",
    heroTitle: "e-OCI card applications from Germany, prepared right",
    heroLead:
      "Fresh e-OCI, children, foreign spouses and updates after a new passport. We check your eligibility, photo and documents before you submit.",
    issues: [
      { id: "new-oci", label: "Fresh e-OCI", body: "For former Indian citizens and people of Indian origin." },
      { id: "oci-children", label: "e-OCI for children", body: "Minors born in Germany, with parents' documents and consent." },
      { id: "foreign-spouse", label: "Foreign spouses", body: "Spouse of an Indian citizen or OCI cardholder." },
      { id: "reissue", label: "Update after a new passport", body: "Upload or re-issue, depending on your age." },
      { id: "update-correction", label: "Change of details", body: "Name, nationality, address or occupation." },
      { id: "lost-oci", label: "Lost or damaged OCI card", body: "Police report and re-issue application.", urgent: true },
    ],
    aside: [
      { kind: "appointment", body: "We help you book your submission appointment, with a checklist for the day." },
      {
        kind: "dark",
        title: "German citizen now?",
        body: "You usually need a surrender certificate before your e-OCI. We handle both together.",
        link: { label: "Surrender certificate →", href: "/contact/?service=passport-services&issue=surrender#enquiry" },
      },
      { kind: "included", items: ["Eligibility check", "Form filling", "Photo and signature check"], note: missionFees },
    ],
    documents: {
      title: "Documents usually needed",
      items: [
        "Current foreign passport",
        "Proof of Indian origin: old Indian passport or parents' documents",
        "Surrender certificate, if you held an Indian passport",
        "Square photo and signature in the required format",
        "Meldebescheinigung, and marriage certificate for spouses",
      ],
      note: missionNote,
    },
    guides: [],
    faqs: [],
    sources: [sources.ociPortal, sources.embassyOci, sources.outsourcing],
  },
  {
    slug: "attestation-affidavits",
    title: "Attestation, Affidavits & Declarations",
    summary:
      "Attestation of personal, educational and commercial documents. Name change, name split and other affidavits, Power of Attorney, NRI and other certificates.",
    mainlyFor: "Residents, students and businesses",
    seoTitle: "Attestation & Affidavits for India from Germany",
    metaDescription:
      "Attestation of personal, educational and commercial documents, name affidavits, Power of Attorney and consular certificates for India, from Germany.",
    heroTitle: "Attestation, affidavits and certificates for India, from Germany",
    heroLead:
      "Personal, educational and commercial documents, affidavits, Power of Attorney and consular certificates. We find the right route and prepare every page.",
    issues: [
      { id: "personal-certificates", kicker: "Attestation", label: "Personal documents", body: "Birth, marriage and other civil certificates." },
      { id: "educational", kicker: "Attestation", label: "Educational documents", body: "Degrees, transcripts and school certificates." },
      {
        id: "commercial",
        kicker: "Attestation",
        label: "Commercial documents",
        body: "Certificates of origin, invoices, company extracts and board resolutions.",
      },
      { id: "name-affidavit", kicker: "Affidavits", label: "Name affidavits", body: "Name change, name split, one and the same person." },
      { id: "power-of-attorney", kicker: "Declarations", label: "Power of Attorney", body: "For property, bank or legal matters in India." },
      { id: "consular-certificates", kicker: "Certificates", label: "Consular certificates", body: "NRI, non-nationality, name-change and life certificates." },
    ],
    aside: [
      { kind: "ask", title: "Not sure which route?", body: "Send us a photo of the document and tell us where it will be used." },
      {
        kind: "dark",
        title: "For businesses",
        body: "Several commercial documents at once? We prepare them as one batch.",
        link: { label: "Start a business enquiry →", href: "/contact/?context=corporate#enquiry" },
      },
    ],
    documents: {
      title: "Documents usually needed",
      items: [
        "The original document and copies",
        "Passport and residence permit copies",
        "Apostille or prior legalisation, depending on the document",
        "For companies: authorisation letter and company registration extract",
      ],
      note: "The route depends on who issued the document and where it will be used. We check it before anything is signed or sent.",
    },
    guides: [],
    faqs: [],
    sources: [sources.attestationFaq, sources.meaApostille, sources.outsourcing],
  },
  {
    slug: "visa-documentation-support",
    title: "Indian Visa Documentation",
    summary: "Indian e-Visa and regular visa: e-Tourist, e-Business, e-Medical and more, for spouses, family, friends and business travellers.",
    mainlyFor: "German citizens and business professionals",
    seoTitle: "Indian Visa & e-Visa Documents in Germany",
    metaDescription:
      "Indian e-Visa and regular visa documents for German and other nationals: e-Tourist, e-Business, e-Medical, e-Conference and urgent family visas.",
    heroTitle: "Indian visa and e-Visa documents for German and other nationals",
    heroLead:
      "The right visa type, a correct form and a complete document set, whether you travel for tourism, business, medical treatment or family.",
    urgentQuestion: "Family emergency in India and need a visa fast?",
    issues: [
      { id: "e-tourist", label: "e-Tourist visa", body: "Holidays, visiting friends and family." },
      { id: "e-business", label: "e-Business visa", body: "Meetings, trade fairs and business trips." },
      { id: "e-medical", label: "e-Medical visa", body: "Treatment in India, plus attendant visas." },
      { id: "e-conference", label: "e-Conference visa", body: "Events and conferences in India." },
      { id: "regular-visa", label: "Regular (paper) visa", body: "Employment, student, long stays, or when e-Visa doesn't apply." },
      { id: "urgent-visa", label: "Urgent family visa", body: "When a family emergency means you must travel soon.", urgent: true },
    ],
    aside: [
      { kind: "ask", title: "Which visa do I need?", body: "Tell us your nationality and why you travel. We tell you the right visa and what to prepare." },
      {
        kind: "included",
        items: ["Visa type check", "Form filling", "Photo and scan check"],
        note: "Visa fees are paid to the Government of India. Our service fee is agreed before we start.",
      },
    ],
    video: { id: "ITCVJ14WiQk", heading: "Watch: the Indian e-Visa in 6 steps" },
    documents: {
      title: "Documents usually needed",
      items: [
        "Passport valid for at least 6 months, with blank pages",
        "Photo and passport scan in the required format",
        "Residence permit, if you are not a German citizen",
        "Visa-type papers: invitation, business letter or hospital letter",
      ],
      note: "Apply only on the official Government of India portal. Visa decisions are made only by the Government of India.",
    },
    guides: [],
    faqs: [],
    sources: [sources.outsourcing],
  },
  {
    slug: "family-documentation",
    title: "Family Documentation",
    summary:
      "Passport, e-OCI and visa for the whole family as one case: minor passports, newborn birth registration, NOC for naming a child and parental consent forms.",
    mainlyFor: "Families, spouses and children",
    seoTitle: "Family Passports, e-OCI & Visas in Germany",
    metaDescription:
      "Children's passports, newborn birth registration, NOC for a child's name, spouse documents and e-OCI for family members: one contact, one checklist.",
    heroTitle: "The whole family's documents, handled as one case",
    heroLead:
      "Children's passports, newborns, spouses and e-OCI for family members. One contact, one checklist, everyone's papers in order.",
    issues: [
      { id: "child-passport", label: "Child's passport", body: "Minor passport renewal with Annexure D, signed by both parents." },
      { id: "newborns", label: "Newborns", body: "Birth registration, birth certificate and first passport." },
      { id: "naming", label: "Naming a newborn", body: "No Objection Certificate for the child's name." },
      { id: "oci-children", label: "e-OCI for children", body: "Children with German or other foreign passports." },
      { id: "spouse", label: "Spouses", body: "Name change after marriage, spouse e-OCI or visa." },
      { id: "household", label: "Whole family together", body: "Several applications prepared and booked as one." },
    ],
    aside: [
      {
        kind: "appointment",
        title: "One appointment for the family",
        body: "We help you book together where the mission allows it, with one checklist for everyone.",
      },
      {
        kind: "included",
        items: ["One contact for the whole family", "Form filling for every member", "Photo and signature check"],
        note: missionFees,
      },
    ],
    documents: {
      title: "Documents usually needed for a child's passport",
      items: [
        "Child's current passport and birth certificate",
        "Both parents' passports and residence permits",
        "Annexure D, parental consent signed by both parents",
        "Child's photo in the required format",
      ],
      note: missionNote,
    },
    guides: [],
    faqs: [],
    sources: [sources.outsourcing, sources.ociPortal],
  },
  {
    slug: "new-in-germany",
    title: "New in Germany",
    isNew: true,
    summary: "German insurance guidance, apartment search help and first steps for new arrivals, from Anmeldung to bank account.",
    mainlyFor: "Students, professionals and families who just arrived",
    seoTitle: "New in Germany: Insurance, Apartment, First Steps",
    metaDescription:
      "New in Germany? German insurance guidance, apartment search help and first steps for new arrivals, from Anmeldung to bank account, in plain language.",
    heroTitle: "New in Germany? Your first months,",
    heroAccent: "made simpler.",
    heroLead:
      "German insurance, your apartment search and the first offices you need to visit. We explain what you need and help you prepare the papers.",
    issues: [
      { id: "german-insurance", label: "German insurance" },
      { id: "apartment-help", label: "Apartment help" },
      { id: "first-steps", label: "First steps after arrival" },
    ],
    aside: [],
    helpGroups: [
      {
        title: "German insurance guidance",
        icon: "insurance",
        items: [
          "Public vs private health insurance, and what your visa or university asks for",
          "Travel or incoming insurance for visa applications",
          "Liability (Haftpflicht) and household insurance explained",
          "Referral to licensed advisers",
        ],
      },
      {
        title: "Apartment help",
        icon: "apartment",
        items: [
          "What landlords ask for: SCHUFA, salary slips, rent-free certificate",
          "A clear application folder (Bewerbungsmappe)",
          "Reading your contract: Kaution, notice period, Warm- vs Kaltmiete",
          "Wohnungsgeberbestätigung for your Anmeldung",
        ],
      },
      {
        title: "First steps for new arrivals",
        icon: "arrival",
        items: [
          "Anmeldung and your Bürgeramt appointment",
          "Tax ID, bank account, phone and Rundfunkbeitrag",
          "Residence permit paperwork checklist",
          "Registering with your Indian mission, MADAD, OCI for children born here",
        ],
      },
    ],
    scope: {
      included: [
        "Plain-language guidance in English, Deutsch, Malayalam, Hindi or Tamil",
        "Checklists and help preparing your papers",
        "Referral to licensed advisers when you need one",
      ],
      notIncluded: ["Selling or arranging insurance contracts", "Renting out or brokering apartments", "Legal, tax or immigration advice"],
    },
    faqs: [
      {
        question: "Can you find me an apartment?",
        answer: "We help you prepare a strong application and understand listings and contracts. We don't rent out or broker apartments.",
      },
      {
        question: "Which health insurance should I choose?",
        answer: "We explain the options and what your visa or employer needs. For a personal recommendation we refer you to a licensed adviser.",
      },
      {
        question: "I'm a student. Can you still help with my degree documents?",
        answer: "Yes. Academic certificates and attestation are under Attestation, Affidavits & Declarations.",
      },
    ],
    cta: { title: "Just arrived? Ask us anything.", lead: "A real person replies and explains the next step." },
    guides: [],
    sources: [],
  },
];

/** "Mainly for …" phrased mid-sentence, keeping proper nouns ("Indian", "German") as written. */
export function mainlyForPhrase(service: Pick<Service, "mainlyFor">): string {
  const text = service.mainlyFor;
  return /^(Indian|German)\b/.test(text) ? text : text.charAt(0).toLowerCase() + text.slice(1);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Contact link with the service pre-selected in the enquiry form. */
export function enquiryHref(service?: Pick<Service, "slug">, context?: "pricing" | "corporate", issueId?: string): string {
  const params = new URLSearchParams();
  if (service) params.set("service", service.slug);
  if (service && issueId) params.set("issue", issueId);
  if (context) params.set("context", context);
  const query = params.toString();
  return `/contact/${query ? `?${query}` : ""}#enquiry`;
}

/** Validated lookup: returns the issue only if it belongs to the service (never trust URL values). */
export function getIssue(service: Pick<Service, "issues"> | undefined, issueId: string | null | undefined): ServiceIssue | undefined {
  if (!service || !issueId) return undefined;
  if (issueId === "other") return { id: "other", label: "Something else" };
  return service.issues.find((issue) => issue.id === issueId);
}
