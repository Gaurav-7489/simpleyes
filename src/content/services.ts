import type { Faq } from "@/content/faqs";

export type IllustrationKind = "documents" | "form" | "photo" | "appointment" | "process" | "personal";

/** An official page a service relies on. `verifiedOn` is the date it was last checked (YYYY-MM-DD). */
export type OfficialSource = { label: string; href: string; verifiedOn: string };

/** Only set once the business owner has verified the figures. */
export type ServicePricing = { note: string; verifiedOn: string };

export type Service = {
  slug: string;
  title: string;
  /** Card/nav fallback if the full title wraps badly. */
  shortTitle?: string;
  /** Card copy (one or two sentences). */
  summary: string;
  /** Hero lead and Service JSON-LD description. */
  intro: string;
  metaDescription: string;
  /** Who it's for. */
  audience: string[];
  /** How SimplYes helps. */
  helpsWith: string[];
  /** What to prepare before contacting us — general, non-sensitive items only. */
  prepare: string[];
  /** Questions we often help clarify. */
  issues: string[];
  /** How it works for this service (3–4 steps). */
  process: { title: string; body: string }[];
  /** Where our role ends. */
  boundaries: string[];
  faqs: Faq[];
  sources: OfficialSource[];
  pricing?: ServicePricing;
  /** "Documents usually involved" — only with an official source and a verified date. Never a universal list. */
  documents?: { items: string[]; source: OfficialSource };
  /** SimplYes's own turnaround only, never official processing times. */
  timeline?: { note: string; verifiedOn: string };
  /** Overrides the default prefilled WhatsApp text (still non-sensitive). */
  whatsappMessage?: string;
  illustration: IllustrationKind;
  /** false = kept out of the build until the owner confirms the scope (B6). */
  published: boolean;
};

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

/**
 * The eight launch categories. Copy avoids guarantees, official-sounding claims
 * and fixed document lists: requirements depend on the case and the consular
 * jurisdiction, so pages point to the official sources instead.
 */
export const allServices: Service[] = [
  {
    slug: "passport-services",
    title: "Passport Services",
    summary:
      "Preparation help for new passports, renewals and re-issues, and lost or damaged passports — from understanding the steps to checking your documents and photos.",
    intro:
      "SimplYes helps Indian citizens in Germany prepare passport applications: we explain which application type applies, what the official instructions ask for, and help you organise and check your documents and photographs before you submit through the official channel.",
    metaDescription:
      "Preparation help for Indian passport renewals, re-issues and lost or damaged passports in Germany. Independent private service — not the Embassy.",
    audience: [
      "Indian citizens living in Germany who need a new passport, a renewal or a re-issue",
      "Anyone replacing a lost or damaged Indian passport",
    ],
    helpsWith: [
      "Explaining the application type and the steps involved",
      "A checklist for your case based on the current official instructions",
      "Checking that supporting documents appear complete and consistent",
      "Photo and signature checks against the stated specifications",
      "Preparing for your appointment at the application centre",
      "For a lost or damaged passport, explaining the additional documentation usually involved",
    ],
    prepare: [
      "Your current or last passport — just know its details; please don't send copies yet",
      "Your German residence status and city of residence (this decides the responsible mission)",
      "Any instructions or emails you have already received",
      "For loss or damage: what happened and when",
    ],
    issues: [
      "Which application type is mine?",
      "Is my photo acceptable?",
      "What if my name or address differs between documents?",
      "Which mission and application centre handle my city?",
      "What happens after submission?",
    ],
    process: [
      { title: "Describe your situation", body: "A short WhatsApp message is enough — no documents needed yet." },
      { title: "Application type and fee", body: "We confirm which application applies and agree our service fee with you." },
      { title: "Checklist and checks", body: "You receive a case checklist; we check your documents and photo against it." },
      { title: "You submit officially", body: "You submit at the official application centre, well prepared." },
    ],
    boundaries: [
      "Passports are issued only by the Government of India through its missions.",
      "We cannot speed up processing, book or guarantee appointments, or influence decisions.",
    ],
    faqs: [
      {
        question: "Can you apply on my behalf?",
        answer: "No, you submit through the official application centre. We help you prepare.",
      },
      {
        question: "How long does a passport take?",
        answer: "Processing times are set by the authorities. We'll point you to the current official information.",
      },
      {
        question: "My passport was stolen — where do I start?",
        answer:
          "Message us; we'll explain the steps usually involved, including any police report German authorities require for your case.",
      },
    ],
    sources: [sources.outsourcing],
    illustration: "documents",
    published: true,
  },
  {
    slug: "oci-services",
    title: "OCI Services",
    summary:
      "Help preparing new OCI applications and OCI Miscellaneous Services requests — updates, re-issues and corrections — with document and photo checks.",
    intro:
      "SimplYes helps people of Indian origin in Germany and their eligible family members prepare OCI applications. We help you work out whether you need a new registration, an online update or a re-issue under OCI Miscellaneous Services, and prepare the supporting documents and photos the official instructions ask for.",
    metaDescription:
      "Help preparing new OCI registrations, OCI updates and re-issues (OCI Miscellaneous Services) for people of Indian origin in Germany. Independent service.",
    audience: [
      "Former Indian citizens who have taken German or another citizenship",
      "Existing OCI holders with a new passport, changed details or a lost or damaged card",
      "Family members of OCI holders or Indian citizens, where the published criteria apply",
    ],
    helpsWith: [
      "Identifying the right OCI service: new registration, online update or re-issue",
      "A case-specific checklist",
      "Preparing supporting paperwork for personal-detail corrections",
      "Photo and signature checks against the portal specifications",
      "Explaining the online-form-then-submission sequence and what happens next",
    ],
    prepare: [
      "Your current and previous passports' details (no copies yet)",
      "Your existing OCI details, if any",
      "The reason for the request: new passport, name change, address change or loss",
      "Your city of residence",
    ],
    issues: [
      "I have a new passport — do I need a new OCI card?",
      "My name changed after marriage — what do I submit?",
      "Which documents prove Indian origin?",
      "Why was my photo upload rejected?",
    ],
    process: [
      { title: "Describe your case", body: "Tell us briefly what changed or what you need." },
      { title: "OCI service and fee", body: "We identify the OCI service that applies and agree our service fee with you." },
      { title: "Prepare", body: "A checklist, plus support preparing the form, photo and documents." },
      { title: "You submit", body: "You submit online and through the official centre." },
    ],
    boundaries: [
      "OCI registration is granted by the Government of India.",
      "Eligibility is decided by the authorities, not by SimplYes.",
    ],
    faqs: [
      {
        question: "Do I need a new OCI card when I renew my passport?",
        answer:
          "Not always — in many cases an online update is enough; some situations require a re-issue. We'll check against the current official rules for your case.",
      },
      {
        question: "Can you tell me if I'm eligible?",
        answer: "We can explain the published criteria; the decision rests with the authorities.",
      },
    ],
    sources: [sources.ociPortal, sources.embassyOci, sources.outsourcing],
    illustration: "form",
    published: true,
  },
  {
    slug: "attestation-legalisation",
    title: "Attestation & Legalisation",
    summary:
      "Understand which attestation or apostille steps your documents need, in which order, and prepare them properly before each authority.",
    intro:
      "Using Indian documents in Germany, or German documents for Indian purposes, can involve several authentication steps by different authorities. SimplYes explains the sequence that applies to your documents and helps you prepare them for each step. The official authentication itself is always carried out by the authorised authority.",
    metaDescription:
      "Understand apostille and attestation steps for Indian and German documents and prepare them for each authority. SimplYes does not attest documents.",
    audience: [
      "Anyone needing educational, personal or civil documents authenticated",
      "For example degree certificates, birth or marriage certificates, or a power of attorney",
    ],
    helpsWith: [
      "Identifying the authentication route — for example MEA apostille or attestation before any Embassy attestation",
      "Explaining the sequence of authorities and submission steps",
      "Preparing copies and supporting documents",
      "Checking documents for apparent issues before submission",
    ],
    prepare: [
      "The type of document and the country that issued it",
      "Where, and for what purpose, it will be used",
      "Any instructions from the receiving organisation",
    ],
    issues: [
      "Apostille or attestation?",
      "What has to happen in India first?",
      "Can a German document be attested for use in India?",
      "What does the receiving office actually require?",
    ],
    process: [
      { title: "Tell us the document", body: "Which document it is and what it will be used for." },
      { title: "Route and fee", body: "We map the authentication route and agree our service fee with you." },
      { title: "Preparation checklist", body: "You prepare each document and copy for each step." },
      { title: "Official submission", body: "You, or an authorised channel, submit to each authority." },
    ],
    boundaries: [
      "SimplYes does not attest, apostille, legalise or certify documents.",
      "SimplYes is not an authorised attestation agent.",
    ],
    faqs: [
      {
        question: "Can you attest my degree?",
        answer: "No. Authentication is done by the authorised authority. We help you understand and prepare for each step.",
      },
      { question: "How long does it take?", answer: "Each authority sets its own timelines." },
    ],
    sources: [sources.attestationFaq, sources.meaApostille, sources.outsourcing],
    illustration: "process",
    published: true,
  },
  {
    slug: "affidavits-declarations",
    title: "Affidavits & Declarations",
    summary:
      "Help gathering the right information for affidavits and declarations — name differences, personal details and application-related statements — and understanding the signing steps.",
    intro:
      "Many Indian applications ask for a supporting affidavit or declaration. SimplYes helps you understand which declaration your process requests, gather the information it needs and understand how it must be signed, witnessed or notarised. We provide administrative preparation, not legal drafting or legal advice.",
    metaDescription:
      "Administrative help preparing information for affidavits, declarations and annexures in Indian applications from Germany. No legal advice or notarisation.",
    audience: [
      "Applicants asked for a declaration or affidavit — for example for name discrepancies or personal-detail differences",
      "Applicants preparing annexures to passport or OCI applications",
      "People preparing supporting paperwork for a power of attorney",
    ],
    helpsWith: [
      "Identifying the declaration or annexure the official instructions ask for",
      "Organising the facts and supporting evidence it should reflect",
      "Explaining signing, notarisation and attestation steps, and who performs them",
      "Preparing power-of-attorney supporting paperwork",
    ],
    prepare: [
      "The instruction that asks for the declaration",
      "The details that differ between your documents",
      "The purpose of any power of attorney",
    ],
    issues: [
      "Which declaration or annexure does my application ask for?",
      "How do I explain a name difference between documents?",
      "Does this need to be notarised, and by whom?",
      "What is the order of signing and attestation?",
    ],
    process: [
      { title: "Share the instruction", body: "Tell us which application asks for a declaration and why." },
      { title: "Scope and fee", body: "We confirm what we can help with and agree our service fee with you." },
      { title: "Gather the information", body: "We help you organise the facts and evidence the template asks for." },
      { title: "Sign through the right channel", body: "You sign before the notary or authority named in the official instructions." },
    ],
    boundaries: [
      "SimplYes does not give legal advice, draft legal instruments as a lawyer, or notarise or certify signatures.",
      "Where your matter needs legal advice or a notary, we will tell you, and you should consult a qualified professional (in Germany, a Notar or Rechtsanwalt).",
    ],
    faqs: [
      {
        question: "Can you write my affidavit?",
        answer:
          "We help you prepare the information an official template asks for. Anything requiring legal drafting or advice is referred to a qualified professional.",
      },
      { question: "Who notarises it?", answer: "A notary or the authority named in the official instructions." },
    ],
    sources: [sources.outsourcing],
    illustration: "form",
    published: true,
  },
  {
    slug: "visa-documentation-support",
    title: "Visa & Documentation Support",
    shortTitle: "Visa Support",
    summary:
      "Make sense of published visa requirements, prepare a checklist for your case and check your application for completeness before you submit.",
    intro:
      "SimplYes helps applicants in Germany prepare Indian visa applications. We explain the published requirements, organise your supporting documents and review your application for completeness before you submit it yourself.",
    metaDescription:
      "Help understanding published Indian visa requirements, preparing a checklist and reviewing your application for completeness. Independent service.",
    audience: ["German and other non-Indian nationals living in Germany — for example spouses, partners or colleagues — travelling to India"],
    helpsWith: [
      "Understanding the published requirements for your visa type",
      "A case-specific preparation checklist",
      "A completeness review of your form and documents",
      "Photo checks",
      "Appointment preparation",
      "Organising supporting documents",
    ],
    prepare: ["Your nationality", "The purpose and dates of your travel", "Any invitation or employer letters"],
    issues: [
      "Which visa type matches my purpose of travel?",
      "What do the published criteria mean for me?",
      "Is my application complete?",
      "What should I bring to the appointment?",
    ],
    process: [
      { title: "Tell us about your trip", body: "Nationality, purpose and dates — nothing sensitive yet." },
      { title: "Scope and fee", body: "We explain what applies and agree our service fee with you." },
      { title: "Checklist and review", body: "You prepare; we review your form and documents for completeness." },
      { title: "You submit", body: "You submit through the official channel." },
    ],
    boundaries: [
      "Visas are granted only by the issuing authority.",
      "We explain published criteria; we do not give definitive eligibility verdicts or guarantee outcomes.",
    ],
    faqs: [
      { question: "Will my visa be approved?", answer: "Decisions rest with the issuing authority." },
      {
        question: "Can you tell me whether I'm eligible?",
        answer: "We can explain the published criteria; the decision rests with the issuing authority.",
      },
    ],
    sources: [sources.outsourcing],
    illustration: "appointment",
    // Owner must confirm visa types and destinations (B6) before publishing.
    published: false,
  },
  {
    slug: "family-documentation",
    title: "Family Documentation",
    summary: "Coordinated help with birth, marriage, spouse and child paperwork, with separate checklists for each family member.",
    intro:
      "When several family members need documents at once — a newborn's first passport, a spouse's OCI, an updated marriage record — the requirements overlap and multiply. SimplYes helps you see which documents are shared and which are individual, and prepares a clear checklist for each person.",
    metaDescription:
      "Coordinated help with Indian birth, marriage, spouse and child paperwork for families in Germany — one clear checklist per family member.",
    audience: ["Families in Germany with Indian documentation needs across more than one member"],
    helpsWith: [
      "Birth and marriage documentation preparation",
      "Spouse-related paperwork",
      "Child and dependent documentation",
      "Coordinating related applications",
      "Identifying shared and individual documents",
      "A separate checklist for each person",
    ],
    prepare: [
      "Who needs what",
      "Each person's nationality",
      "Any recent life events — a birth, marriage or name change",
    ],
    issues: [
      "Which documents can be shared between applications?",
      "In which order should our applications go?",
      "What does our child's first application involve?",
      "How do we reflect a marriage or name change?",
    ],
    process: [
      { title: "Tell us who needs what", body: "A short overview of each family member's need." },
      { title: "Scope and fee", body: "We confirm what we can help with and agree our service fee with you." },
      { title: "One checklist per person", body: "Shared and individual documents, clearly separated." },
      { title: "Separate submissions", body: "Each application is submitted through the official channel." },
    ],
    boundaries: [
      "Each application is decided separately by the authorities.",
      "There is no online family account; coordination happens in conversation with our team.",
    ],
    faqs: [
      {
        question: "Can you handle my whole family's paperwork together?",
        answer:
          "We help you prepare it together, with one checklist per person; each application is still submitted and decided separately.",
      },
    ],
    sources: [sources.outsourcing, sources.ociPortal],
    illustration: "personal",
    published: true,
  },
  {
    slug: "student-services",
    title: "Student Services",
    summary:
      "Help Indian students in Germany organise degree and certificate paperwork, prepare for document verification and plan around deadlines.",
    intro:
      "Studying in Germany often means Indian certificates need checking, translating or authenticating for universities, the Ausländerbehörde or later employers — usually against a deadline. SimplYes helps you understand what is needed and prepare it in time.",
    metaDescription:
      "Help for Indian students in Germany organising degree and certificate paperwork, preparing for verification and planning around deadlines.",
    audience: ["Indian students and graduates living in Germany"],
    helpsWith: [
      "University-related paperwork",
      "Educational certificate and degree documentation",
      "Preparing for verification processes",
      "Attestation and apostille guidance for your certificates",
      "Organising paperwork around deadlines",
    ],
    prepare: ["Which institution asks for what, and by when", "Which certificates you hold"],
    issues: [
      "Does my degree need an apostille first?",
      "What exactly is the university asking for?",
      "Which steps can run in parallel before my deadline?",
      "Where do translations fit in?",
    ],
    process: [
      { title: "Share the request", body: "Which institution asks for what, and the deadline." },
      { title: "Scope and fee", body: "We explain the steps and agree our service fee with you." },
      { title: "Plan and prepare", body: "A checklist in the right order, with your deadline in mind." },
      { title: "You submit", body: "You submit to each authority or institution." },
    ],
    boundaries: [
      "We do not verify, evaluate or recognise qualifications; universities and authorities decide.",
      "We do not provide admission consulting.",
    ],
    faqs: [
      {
        question: "Can you verify or recognise my degree?",
        answer: "No. Universities and the relevant authorities decide. We help you understand and prepare the paperwork they ask for.",
      },
    ],
    sources: [sources.attestationFaq, sources.meaApostille],
    illustration: "documents",
    published: true,
  },
  {
    slug: "corporate-services",
    title: "Corporate Services",
    summary:
      "Documentation support for employers and HR teams with Indian employees in Germany — onboarding, relocation and recurring paperwork.",
    intro:
      "Employers relocating or employing Indian staff in Germany regularly meet Indian documentation needs: passport renewals, OCI updates, certificate authentication. SimplYes can support your employees with preparation and guidance, so HR teams don't have to become consular experts.",
    metaDescription:
      "Documentation preparation support for employers and HR teams with Indian employees in Germany. Let's talk about what your team needs.",
    audience: ["HR, relocation and people teams with Indian employees in Germany"],
    helpsWith: [
      "Employee documentation preparation",
      "Relocation and onboarding paperwork guidance",
      "Supporting-document coordination",
      "Educational and personal document preparation",
      "Recurring documentation needs",
    ],
    prepare: ["What kind of documentation needs your team typically has", "How you would like employees to reach us"],
    issues: [
      "Which Indian documents do new employees typically need to sort out?",
      "How can employees get help without HR handling their documents?",
      "What does a passport renewal or OCI update involve for staff in Germany?",
    ],
    process: [
      { title: "Let's talk", body: "Tell us about your team and what it needs." },
      { title: "Scope", body: "We explain what we can help with and how." },
      { title: "Employee support", body: "Employees prepare with guidance from our team." },
    ],
    boundaries: [
      "Applications are still submitted by each employee through the official channel.",
      "Decisions and processing times rest with the authorities.",
    ],
    faqs: [
      {
        question: "How do we start?",
        answer: "Message us on WhatsApp with a short description of your team's needs, and we'll explain the next steps.",
      },
    ],
    sources: [sources.outsourcing],
    whatsappMessage: "Hello SimplYes, I would like to discuss Corporate Services for our team. Could you explain the next steps?",
    illustration: "process",
    // Owner and legal input needed (B6, B11: data-processing agreement) before advertising this as live.
    published: false,
  },
];

/** Services shown on the site. Unpublished entries are excluded from every route, link and sitemap. */
export const services: Service[] = allServices.filter((service) => service.published);

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
