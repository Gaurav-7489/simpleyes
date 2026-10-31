import type { Faq } from "@/content/faqs";

export type IllustrationKind = "documents" | "form" | "photo" | "appointment" | "process" | "personal";

/** Service-specific outline icon (§16: one icon family, never repeated across services). */
export type ServiceIcon = "passport" | "oci" | "attestation" | "affidavit" | "visa" | "family" | "student" | "corporate";

/** An official page a service relies on. `verifiedOn` is the date it was last checked (YYYY-MM-DD). */
export type OfficialSource = { label: string; href: string; verifiedOn: string };

/** A real situation in the customer's words, linked to how SimplYes may help. */
export type Situation = { situation: string; howWeHelp: string };

export type Service = {
  slug: string;
  /** Catalogue number from §05 ("01"–"08"). */
  number: string;
  title: string;
  /** Short label for chips and tight layouts. */
  shortTitle?: string;
  icon: ServiceIcon;
  /** One-sentence plain-language card summary (unique per service). */
  summary: string;
  /** Hero one-line outcome. */
  outcome: string;
  /** "Mainly for" line from §05. */
  mainlyFor: string;
  /** Service introduction — what the service is, in plain language. */
  intro: string[];
  /** Optional explainer shown near the top (OCI "What is OCI?", visa distinction…). */
  explainer?: { title: string; body: string[] };
  metaDescription: string;
  /** Who this service is for. */
  audience: string[];
  /** Common customer situations, in the customer's words. */
  situations: Situation[];
  /** What SimplYes can help with — the approved scope (§05). */
  helpsWith: string[];
  /** Possible document categories — categories only, subject to verification. */
  documentCategories: string[];
  /** The five-step journey phrased for this service. */
  process: { title: string; body: string }[];
  /** General preparation guidance — information to have ready, never a document list. */
  prepare: string[];
  /** What is included — the assistance SimplYes provides for this service. */
  included: string[];
  /** Explicit boundaries. */
  outsideScope: string[];
  faqs: Faq[];
  /** Related services (§05 link map), by slug. */
  related: string[];
  sources: OfficialSource[];
  /** Overrides the default prefilled WhatsApp text (still non-sensitive). */
  whatsappMessage?: string;
  illustration: IllustrationKind;
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

/** Shared final step: official processing always stays with the authority. */
const nextSteps = {
  title: "Understand the next steps",
  body: "You receive guidance on the agreed next steps and on preparing your submission. Official processing, appointments and decisions remain with the relevant authority.",
};

/**
 * The eight approved service categories (§05 — scope lock: no other category may
 * appear anywhere). Copy uses "may", "where applicable" and "depending on your
 * situation" honestly; document lists are categories only and labelled as
 * subject to verification until the owners approve specifics.
 */
export const services: Service[] = [
  {
    slug: "passport-services",
    number: "01",
    title: "Passport Services",
    icon: "passport",
    summary: "Guidance for new, renewed, reissued, lost or damaged Indian passports and personal-detail corrections.",
    outcome: "Understand which passport situation applies to you and prepare your application with confidence.",
    mainlyFor: "Professionals, families, long-term residents",
    intro: [
      "Indian passport processes differ depending on your situation — a first adult passport, a renewal, a reissue, a lost or damaged passport, or a correction to your personal details. Each route can involve different steps and supporting documents.",
      "SimplYes helps Indian nationals living in Germany work out which situation applies, organise the supporting documents and prepare the application before it is submitted through the official channel.",
    ],
    metaDescription:
      "Help with Indian passport renewal, reissue, lost or damaged passports and detail corrections for Indians in Germany. Independent documentation assistance.",
    audience: [
      "Indian nationals in Germany whose passport is nearing expiry",
      "Anyone whose passport has been lost, stolen or damaged",
      "People whose name, address or other personal details need correcting",
      "Families preparing passports for several members at once",
    ],
    situations: [
      {
        situation: "“My passport is expiring soon.”",
        howWeHelp: "We explain the renewal route, help you prepare a checklist and check your application before you submit.",
      },
      {
        situation: "“I lost my passport” or “my passport is damaged.”",
        howWeHelp: "We explain the steps usually involved for a lost or damaged passport and help you organise the supporting documentation.",
      },
      {
        situation: "“My details need correcting.”",
        howWeHelp: "We help you understand what a personal-information correction may involve and which supporting documents could be relevant.",
      },
      {
        situation: "“I need my first adult passport” or “I have an appointment coming up.”",
        howWeHelp: "We help you prepare the application and get ready for your appointment at the official application centre.",
      },
    ],
    helpsWith: [
      "New passport application assistance",
      "Renewal and reissue guidance",
      "Lost or damaged passport documentation guidance",
      "Personal-information correction guidance",
      "Supporting-document preparation and checklist assistance",
      "Application preparation support and appointment preparation",
    ],
    documentCategories: [
      "Proof of identity and your current or previous passport",
      "Proof of residence in Germany",
      "Photographs and signature in the stated format",
      "Supporting documents for a change or correction of details",
      "For loss or damage: documents relating to the loss or damage",
    ],
    process: [
      { title: "Tell us what you need", body: "Describe your passport situation through the enquiry form, WhatsApp or email." },
      { title: "Understand the requirements", body: "We identify which passport route applies — renewal, reissue, loss, damage or correction." },
      { title: "Prepare the documents", body: "You receive guidance on the documents and information your route usually requires." },
      { title: "Assistance & review", body: "Where agreed, we help review and organise your application and supporting documents." },
      nextSteps,
    ],
    prepare: [
      "Your current or last passport details — please don't send copies at enquiry stage",
      "Your city of residence in Germany",
      "Which situation applies: renewal, reissue, loss, damage or a correction",
      "Any instructions or emails you have already received",
    ],
    included: [
      "Identifying the passport situation that applies to you",
      "A checklist for your case based on current official instructions",
      "Help organising and checking supporting documents",
      "Photo and signature format checks against the stated specifications",
      "Preparation for your appointment at the application centre",
    ],
    outsideScope: [
      "Issuing passports — only the Government of India, through its missions, does this",
      "Booking, guaranteeing or speeding up appointments or processing",
      "Making or influencing any official decision",
      "Legal advice or representation before authorities",
    ],
    faqs: [
      {
        question: "Can I get help with passport renewal?",
        answer:
          "Yes. We explain the renewal route, help you prepare the application and supporting documents, and check them before you submit through the official channel.",
      },
      {
        question: "What if my passport is lost or damaged?",
        answer:
          "We explain the steps usually involved for a lost or damaged passport and help you organise the documentation. Requirements depend on your situation and the responsible mission.",
      },
      {
        question: "Do you book or attend appointments for me?",
        answer:
          "No. Appointments are booked and attended by you through the official application centre. We help you prepare so you arrive ready.",
      },
      {
        question: "How long does a passport take?",
        answer: "Processing times are set by the authorities. We do not promise or influence timelines.",
      },
    ],
    related: ["family-documentation", "oci-services", "affidavits-declarations"],
    sources: [sources.outsourcing],
    illustration: "documents",
  },
  {
    slug: "oci-services",
    number: "02",
    title: "OCI Services",
    icon: "oci",
    summary: "Help with new OCI applications, reissues where applicable, updates, corrections and family OCI coordination.",
    outcome: "Understand OCI in plain language and prepare a complete, ready-to-submit application.",
    mainlyFor: "Families, professionals, new arrivals",
    intro: [
      "OCI processes can feel unfamiliar, especially if you are applying for the first time or for several family members. Whether you need a new registration, a reissue where applicable, or an update or correction, the steps and supporting documents differ.",
      "SimplYes explains OCI in plain language, checks your preparation and helps coordinate related applications for your family.",
    ],
    explainer: {
      title: "What is OCI?",
      body: [
        "Overseas Citizenship of India (OCI) is a registration granted by the Government of India to eligible people of Indian origin and certain family members who hold another citizenship. It is not dual citizenship.",
        "Eligibility, the documents required and the decision rest entirely with the Government of India. We help you understand the published criteria and prepare.",
      ],
    },
    metaDescription:
      "Help preparing new OCI applications, OCI updates, corrections and family OCI applications for people living in Germany. Independent documentation assistance.",
    audience: [
      "People of Indian origin in Germany applying for OCI for the first time",
      "Existing OCI holders whose details or passport have changed",
      "Families with several members applying together",
      "New arrivals unfamiliar with OCI procedures",
    ],
    situations: [
      {
        situation: "“I'm applying for OCI for the first time.”",
        howWeHelp: "We explain what OCI is, the published criteria and the steps, then help you prepare the application.",
      },
      {
        situation: "“My details have changed” or “I have a new passport.”",
        howWeHelp: "We help you understand whether an update, correction or reissue may apply and what to prepare.",
      },
      {
        situation: "“Several family members need to apply.”",
        howWeHelp: "We coordinate related applications so the family's documents and details stay consistent.",
      },
      {
        situation: "“My photo or document upload keeps being rejected.”",
        howWeHelp: "We check your photograph and documents against the stated specifications.",
      },
    ],
    helpsWith: [
      "New OCI application assistance",
      "Reissue guidance where applicable",
      "Information update guidance and correction assistance",
      "Supporting-document preparation",
      "Photograph and document preparation checks",
      "Application readiness assistance",
      "Family OCI documentation coordination",
    ],
    documentCategories: [
      "Proof of current citizenship and passport",
      "Proof of Indian origin or of the family relationship relied on",
      "Proof of residence",
      "Photograph and signature in the portal format",
      "Supporting documents for an update or correction",
    ],
    process: [
      { title: "Tell us what you need", body: "Tell us whether this is a new OCI, a change of details or a family application." },
      { title: "Understand the requirements", body: "We explain which OCI service appears to apply under the published rules." },
      { title: "Prepare the documents", body: "You receive guidance on the information and document categories involved." },
      { title: "Assistance & review", body: "Where agreed, we check your form, photograph and documents for completeness." },
      nextSteps,
    ],
    prepare: [
      "Your current citizenship and passport details",
      "Your existing OCI details, if you have them",
      "What has changed, or who in the family is applying",
      "Your city of residence in Germany",
    ],
    included: [
      "A plain-language explanation of the OCI route that appears to apply",
      "A case-specific checklist",
      "Photograph and document preparation checks",
      "Application readiness review before you submit",
      "Coordination of related family applications",
    ],
    outsideScope: [
      "Granting OCI or deciding eligibility — this rests with the Government of India",
      "Guaranteeing a grant, outcome or timeline",
      "Submitting applications on your behalf to authorities",
      "Legal or immigration-law advice",
    ],
    faqs: [
      {
        question: "Do you assist with OCI documentation?",
        answer:
          "Yes. We help with new OCI applications, reissues where applicable, updates and corrections — explaining the steps and checking your preparation.",
      },
      {
        question: "Can you help my whole family apply?",
        answer: "Yes. We coordinate related family applications so details and supporting documents stay consistent.",
      },
      {
        question: "When might an OCI need updating?",
        answer:
          "Common triggers include a new passport or a change of personal details. Whether an update, correction or reissue applies depends on the current official rules for your case.",
      },
      {
        question: "Can you tell me if I'm eligible?",
        answer: "We can explain the published criteria; the decision rests with the authorities.",
      },
    ],
    related: ["passport-services", "family-documentation"],
    sources: [sources.ociPortal, sources.embassyOci, sources.outsourcing],
    illustration: "form",
  },
  {
    slug: "attestation-legalisation",
    number: "03",
    title: "Attestation & Legalisation",
    icon: "attestation",
    summary: "Apostille guidance and preparation of educational, personal and certificate documents for use abroad.",
    outcome: "Understand which recognition route your document needs and prepare it step by step.",
    mainlyFor: "Students, professionals, residents",
    intro: [
      "When a document issued in one country must be recognised by an authority in another, it may need an apostille, attestation or legalisation — sometimes after translation or notarisation.",
      "SimplYes guides you through the preparation route and coordinates the steps so you know what happens in which order.",
    ],
    explainer: {
      title: "Apostille, attestation and legalisation — in plain language",
      body: [
        "An apostille is a certificate that confirms a public document for use in countries that are part of the Hague Apostille Convention. Attestation and legalisation are confirmation steps used where an apostille is not the applicable route.",
        "Requirements depend on the document type, the issuing authority and the destination authority. We help you work out the route that appears to apply — official confirmation is always performed by the competent authority.",
      ],
    },
    metaDescription:
      "Apostille, attestation and legalisation guidance for educational, personal and certificate documents — for Indians in Germany. Independent documentation assistance.",
    audience: [
      "Students and graduates whose certificates must be recognised abroad",
      "Professionals preparing documents for employers or authorities",
      "Residents whose personal certificates need recognition in another country",
    ],
    situations: [
      {
        situation: "“An authority asked for an apostille on my certificate.”",
        howWeHelp: "We help you understand the apostille route and prepare the document correctly.",
      },
      {
        situation: "“My document needs translating or notarising first.”",
        howWeHelp: "We explain the usual order of steps and coordinate translation and notarisation guidance.",
      },
      {
        situation: "“I don't know which route applies to my document.”",
        howWeHelp: "We look at the document type, issuing authority and destination to identify the route that appears to apply.",
      },
    ],
    helpsWith: [
      "Apostille guidance",
      "Educational document preparation",
      "Personal document preparation",
      "Certificate-related documentation",
      "Translation coordination guidance",
      "Notarisation-related administrative guidance",
      "Cross-border document preparation",
    ],
    documentCategories: [
      "Educational documents (certificates, degrees, transcripts)",
      "Personal documents (civil-status and similar certificates)",
      "Certified translations, where required",
      "Notarised copies or declarations, where required",
    ],
    process: [
      { title: "Tell us what you need", body: "Tell us which document needs recognition and for which country or authority." },
      { title: "Understand the requirements", body: "We identify the route that appears to apply for your document and destination." },
      { title: "Prepare the documents", body: "You receive guidance on preparation, translation and notarisation steps." },
      { title: "Assistance & review", body: "Where agreed, we check the document set and coordinate the order of steps." },
      nextSteps,
    ],
    prepare: [
      "Which document needs recognition and who issued it",
      "The country and authority where it will be used",
      "Any instructions you received from that authority",
      "Whether a translation already exists",
    ],
    included: [
      "Identifying the recognition route that appears to apply",
      "A step-by-step preparation plan in the right order",
      "Translation and notarisation coordination guidance",
      "Completeness checks before submission",
    ],
    outsideScope: [
      "Performing official attestation, apostille, legalisation or notarisation",
      "Guaranteeing that an authority will accept a document",
      "Translating documents ourselves or acting as a sworn translator",
      "Legal advice",
    ],
    faqs: [
      {
        question: "Do you help with document attestation?",
        answer:
          "Yes. We guide you through the attestation, apostille or legalisation route that appears to apply and help you prepare. Requirements vary by document and authority.",
      },
      {
        question: "Do my documents need translating first?",
        answer:
          "Sometimes. It depends on the document, the language and the destination authority. We explain the usual order of steps for your case.",
      },
      {
        question: "How do I know which route applies?",
        answer:
          "The route depends on the document type, the issuing authority and the destination authority. We help you work it out from the current official guidance.",
      },
    ],
    related: ["student-services", "affidavits-declarations"],
    sources: [sources.attestationFaq, sources.meaApostille, sources.outsourcing],
    illustration: "process",
  },
  {
    slug: "affidavits-declarations",
    number: "04",
    title: "Affidavits & Declarations",
    icon: "affidavit",
    summary: "Support with name-discrepancy documentation, personal declarations, affidavits and Power of Attorney guidance.",
    outcome: "Understand what a declaration is for and prepare the supporting paperwork properly.",
    mainlyFor: "Long-term residents, families",
    intro: [
      "Declarations and affidavits are often requested when details differ across documents, when a personal statement is required, or when someone needs to act on your behalf.",
      "SimplYes explains the purpose of common declarations and supports the administrative preparation — with a clear boundary: we do not provide legal representation or legal drafting.",
    ],
    explainer: {
      title: "What these documents are for",
      body: [
        "A name-discrepancy declaration explains why a name is spelt differently across documents. A personal declaration or affidavit is a formal written statement. A Power of Attorney authorises another person to act for you in a defined matter.",
        "Where your matter requires legal advice, notarisation or another regulated service, we will tell you so and you should consult an appropriately qualified professional.",
      ],
    },
    metaDescription:
      "Help understanding and preparing name-discrepancy declarations, personal declarations, affidavits and Power of Attorney paperwork — for Indians in Germany.",
    audience: [
      "Long-term residents whose names or details differ across documents",
      "Families asked for personal declarations as part of an application",
      "Anyone who needs someone to act on their behalf in an administrative matter",
    ],
    situations: [
      {
        situation: "“My name is spelt differently across my documents.”",
        howWeHelp: "We explain what a name-discrepancy declaration is used for and help organise the supporting documents.",
      },
      {
        situation: "“An application asks for a declaration.”",
        howWeHelp: "We explain the purpose of the requested declaration and support the administrative preparation.",
      },
      {
        situation: "“Someone needs to act on my behalf.”",
        howWeHelp: "We explain what a Power of Attorney is used for and the preparation and notarisation steps usually involved.",
      },
    ],
    helpsWith: [
      "Name-discrepancy documentation",
      "Personal declarations",
      "Affidavit preparation support",
      "Power of Attorney documentation guidance",
      "Notarisation guidance",
      "Supporting-document coordination",
    ],
    documentCategories: [
      "Identity documents showing the details concerned",
      "Supporting records that explain a discrepancy",
      "The declaration or authorisation text required by the receiving authority",
    ],
    process: [
      { title: "Tell us what you need", body: "Tell us which declaration was requested, and by whom." },
      { title: "Understand the requirements", body: "We explain the purpose of the document and what the receiving authority usually expects." },
      { title: "Prepare the documents", body: "You receive guidance on supporting documents and notarisation steps." },
      { title: "Assistance & review", body: "Where agreed, we help organise and check the supporting paperwork." },
      nextSteps,
    ],
    prepare: [
      "Which declaration or authorisation was requested, and by which authority",
      "The details that differ, or the matter someone should act on",
      "Any template or instructions you have received",
    ],
    included: [
      "A plain-language explanation of the document's purpose",
      "Administrative preparation support",
      "Notarisation guidance and supporting-document coordination",
    ],
    outsideScope: [
      "Legal representation or legal advice",
      "Unauthorised legal drafting",
      "Notarising documents — only a notary or competent authority can do this",
      "Guaranteeing acceptance by any authority",
    ],
    faqs: [
      {
        question: "What is a name-discrepancy declaration used for?",
        answer:
          "It explains why your name appears differently across documents, so an authority can match them. Whether one is needed depends on the receiving authority.",
      },
      {
        question: "Does SimplYes provide legal advice?",
        answer:
          "No. We provide documentation assistance only. Where a matter needs legal advice or legal drafting, we will tell you to consult a qualified professional.",
      },
      {
        question: "What is a Power of Attorney used for?",
        answer:
          "It authorises another person to act on your behalf in a defined matter. We explain the preparation and notarisation steps usually involved.",
      },
    ],
    related: ["passport-services", "attestation-legalisation"],
    sources: [sources.attestationFaq, sources.outsourcing],
    illustration: "form",
  },
  {
    slug: "visa-documentation-support",
    number: "05",
    title: "Visa & Documentation Support",
    shortTitle: "Visa & Documentation",
    icon: "visa",
    summary: "Requirements guidance, application preparation, checklists and completeness checks for your documentation.",
    outcome: "Organise your documentation and check it is complete before you submit.",
    mainlyFor: "Professionals, spouses, new arrivals",
    intro: [
      "Preparing documents for an application can be stressful when you are unsure what is needed or whether your file is complete.",
      "SimplYes helps you understand the published documentation requirements, organise supporting documents, prepare a checklist and check completeness before you submit.",
    ],
    explainer: {
      title: "Documentation assistance — not immigration-law advice",
      body: [
        "This service is documentation assistance. We do not give immigration-law advice and we do not decide or influence visa outcomes. Visa decisions are made solely by the issuing authority.",
        "If your situation needs legal advice, we will tell you so and you should consult a qualified immigration lawyer.",
      ],
    },
    metaDescription:
      "Documentation assistance for visa applications: requirements guidance, checklists and completeness checks. Not immigration-law advice. For Indians in Germany.",
    audience: [
      "Professionals preparing an application file",
      "Spouses and dependants preparing supporting documentation",
      "New arrivals unsure what a documentation checklist should contain",
    ],
    situations: [
      {
        situation: "“I'm preparing documents for an application.”",
        howWeHelp: "We help you understand the published requirements and build a checklist for your case.",
      },
      {
        situation: "“I'm not sure whether my file is complete.”",
        howWeHelp: "We check your documentation for completeness against the published requirements.",
      },
      {
        situation: "“I have an appointment coming up.”",
        howWeHelp: "We help you organise your documents and prepare for the appointment.",
      },
    ],
    helpsWith: [
      "Documentation requirements guidance",
      "Application preparation assistance",
      "Supporting-document organisation",
      "Checklist preparation",
      "Appointment preparation",
      "Document completeness checks",
      "Administrative guidance",
    ],
    documentCategories: [
      "Passport and identity documents",
      "Supporting documents for the purpose of travel or stay",
      "Proof of residence or address",
      "Photographs in the stated format",
    ],
    process: [
      { title: "Tell us what you need", body: "Tell us what you are applying for and where you are in the process." },
      { title: "Understand the requirements", body: "We explain the published documentation requirements for your application type." },
      { title: "Prepare the documents", body: "You receive a checklist and guidance on organising your supporting documents." },
      { title: "Assistance & review", body: "Where agreed, we check your file for completeness before you submit." },
      nextSteps,
    ],
    prepare: [
      "What you are applying for and the issuing authority",
      "Any checklist or instructions you have already received",
      "Your appointment date, if you have one",
    ],
    included: [
      "Plain-language explanation of published documentation requirements",
      "A checklist for your application",
      "Organisation of supporting documents",
      "Completeness check before submission",
      "Appointment preparation",
    ],
    outsideScope: [
      "Immigration-law advice",
      "Deciding or influencing visa outcomes",
      "Eligibility verdicts or guarantees of approval",
      "Representing you before authorities",
    ],
    faqs: [
      {
        question: "Do you decide or influence visa outcomes?",
        answer: "No. Visa decisions are made solely by the issuing authority. We help you prepare complete documentation.",
      },
      {
        question: "Can you check whether my file is complete?",
        answer: "Yes. Where agreed, we check your documentation for completeness against the published requirements before you submit.",
      },
      {
        question: "Do you give immigration-law advice?",
        answer: "No. This is documentation assistance only. For legal advice, please consult a qualified immigration lawyer.",
      },
    ],
    related: ["attestation-legalisation", "family-documentation"],
    sources: [sources.outsourcing],
    illustration: "appointment",
  },
  {
    slug: "family-documentation",
    number: "06",
    title: "Family Documentation",
    icon: "family",
    summary: "Spouse, children, birth-, marriage-related and dependant documentation, coordinated per household.",
    outcome: "One point of contact for your household's documentation, with related requirements aligned.",
    mainlyFor: "Families, spouses and dependants",
    intro: [
      "When several family members need documentation at the same time — a new baby, a spouse joining, or renewals for the whole household — handling each application separately can lead to inconsistencies and repeated work.",
      "SimplYes treats family documentation as a coordinated household solution: one point of contact, with related requirements aligned across applications.",
    ],
    metaDescription:
      "Coordinated family documentation for Indians in Germany: spouse, children, birth- and marriage-related and dependant paperwork, handled per household.",
    audience: [
      "Families with several members needing documentation at once",
      "Parents preparing documentation for a newborn or children",
      "Spouses and dependants joining family in Germany",
    ],
    situations: [
      {
        situation: "“We have a new baby.”",
        howWeHelp: "We help you understand the birth-related documentation usually involved and prepare it in the right order.",
      },
      {
        situation: "“My spouse is joining me.”",
        howWeHelp: "We help organise spouse and marriage-related documentation alongside your own records.",
      },
      {
        situation: "“Several of us need renewals at once.”",
        howWeHelp: "We coordinate the household's applications so details and supporting documents stay consistent.",
      },
    ],
    helpsWith: [
      "Spouse documentation",
      "Children's documentation",
      "Birth-related documentation",
      "Marriage-related documentation",
      "Dependant documentation",
      "Family profile coordination",
      "Management of multiple related applications",
    ],
    documentCategories: [
      "Identity documents for each family member",
      "Birth- and marriage-related certificates",
      "Proof of relationship and of residence",
      "Photographs and signatures (or thumb impressions for young children, where required)",
    ],
    process: [
      { title: "Tell us what you need", body: "Tell us who in the household needs documentation and why." },
      { title: "Understand the requirements", body: "We map the related requirements across family members." },
      { title: "Prepare the documents", body: "You receive one coordinated plan for the household's documents." },
      { title: "Assistance & review", body: "Where agreed, we check that details are consistent across all applications." },
      nextSteps,
    ],
    prepare: [
      "Who in the family needs documentation, and for which process",
      "Each person's current document details (no copies at enquiry stage)",
      "Any deadlines or appointments",
    ],
    included: [
      "One point of contact for the household",
      "A coordinated plan across related applications",
      "Consistency checks of details across family documents",
    ],
    outsideScope: [
      "Issuing or approving any document — this rests with the authorities",
      "Guaranteeing outcomes or timelines",
      "Legal advice on family or immigration law",
    ],
    faqs: [
      {
        question: "Can you help with family documentation?",
        answer: "Yes. We coordinate documentation for spouses, children and dependants as one household rather than separate cases.",
      },
      {
        question: "Can several family members be handled together?",
        answer: "Yes. Coordinating related applications together is the core of this service.",
      },
      {
        question: "What about documentation for a newborn?",
        answer:
          "We explain the birth-related documentation usually involved and help you prepare it in the right order. Requirements depend on your situation.",
      },
    ],
    related: ["passport-services", "oci-services", "corporate-services"],
    sources: [sources.outsourcing, sources.ociPortal],
    illustration: "personal",
  },
  {
    slug: "student-services",
    number: "07",
    title: "Student Services",
    icon: "student",
    summary: "Help organising educational certificates, degree documents and academic paperwork, including attestation guidance.",
    outcome: "Get your academic documents organised and ready, without the jargon.",
    mainlyFor: "Indian students in Germany",
    intro: [
      "Studying in Germany often means organising transcripts, degree certificates and other academic paperwork — sometimes with attestation — alongside your studies.",
      "SimplYes helps Indian students organise and prepare their academic documentation in plain language, with an approachable process that respects a student budget.",
    ],
    metaDescription:
      "Help for Indian students in Germany organising educational certificates, degree documents and academic paperwork, with attestation guidance.",
    audience: [
      "Indian students studying in Germany",
      "Graduates preparing degree documents for employers or authorities",
      "Students who need certificates attested or apostilled",
    ],
    situations: [
      {
        situation: "“I need to organise my transcripts and degree.”",
        howWeHelp: "We help you work out which academic documents are relevant and organise them.",
      },
      {
        situation: "“My certificates need attestation.”",
        howWeHelp: "We explain the route that appears to apply and link you to our Attestation & Legalisation guidance.",
      },
      {
        situation: "“I'm handling paperwork alongside my studies.”",
        howWeHelp: "We keep it simple and explain each step clearly, so it fits around your studies.",
      },
    ],
    helpsWith: [
      "Educational certificate preparation",
      "Degree document guidance",
      "Academic document organisation",
      "Supporting certificates",
      "Student-related paperwork",
      "Document attestation guidance",
    ],
    documentCategories: [
      "Degree certificates and transcripts",
      "School-leaving and other educational certificates",
      "Supporting certificates requested by the receiving institution",
    ],
    process: [
      { title: "Tell us what you need", body: "Tell us which academic documents you need and what they are for." },
      { title: "Understand the requirements", body: "We explain what the receiving institution or authority usually expects." },
      { title: "Prepare the documents", body: "You receive guidance on organising and, where needed, attesting your documents." },
      { title: "Assistance & review", body: "Where agreed, we check your academic document set for completeness." },
      nextSteps,
    ],
    prepare: [
      "Which documents you need and who asked for them",
      "Your institution and the purpose (study, work, recognition)",
      "Any deadlines",
    ],
    included: [
      "Plain-language guidance on academic documentation",
      "Help organising certificates and transcripts",
      "Attestation route guidance, where relevant",
    ],
    outsideScope: [
      "Issuing, attesting or recognising academic documents",
      "Guaranteeing recognition by any institution or authority",
      "Admission or immigration advice",
    ],
    faqs: [
      {
        question: "Do you support students?",
        answer: "Yes. We help Indian students in Germany organise and prepare academic documentation, including attestation guidance.",
      },
      {
        question: "Which academic documents might need attestation?",
        answer:
          "It depends on the receiving institution or authority and the country. We help you work out which documents are affected.",
      },
      {
        question: "Can I get help remotely while studying?",
        answer:
          "You can start your enquiry online through the form, WhatsApp or email. How the rest of the assistance is delivered is agreed with you after your enquiry.",
      },
    ],
    related: ["attestation-legalisation", "passport-services"],
    sources: [sources.attestationFaq, sources.meaApostille],
    illustration: "documents",
  },
  {
    slug: "corporate-services",
    number: "08",
    title: "Corporate Services",
    icon: "corporate",
    summary: "Employee, relocation and onboarding documentation coordination for employers, with group case handling.",
    outcome: "Reduce the administrative burden on HR while employees get organised documentation support.",
    mainlyFor: "Employers, HR and relocation teams",
    intro: [
      "Employers relocating or onboarding Indian staff often face documentation questions that take HR time away from other work — for employees and, frequently, their families.",
      "SimplYes coordinates employee documentation support so your team has one partner for documentation questions. Group arrangements and terms are agreed directly with each employer.",
    ],
    metaDescription:
      "Documentation coordination for employers relocating or onboarding Indian employees in Germany: employee, relocation, onboarding and family documentation.",
    audience: [
      "Employers relocating Indian staff to Germany",
      "HR teams onboarding several Indian employees",
      "Relocation teams supporting employees' families",
    ],
    situations: [
      {
        situation: "“We are relocating Indian staff.”",
        howWeHelp: "We coordinate relocation-related documentation support for each employee.",
      },
      {
        situation: "“HR is onboarding several employees at once.”",
        howWeHelp: "We handle group cases in an organised way, so HR is not managing each employee's paperwork.",
      },
      {
        situation: "“Employees' families need support too.”",
        howWeHelp: "We coordinate family documentation alongside the employee's own.",
      },
    ],
    helpsWith: [
      "Employee documentation assistance",
      "Relocation-related documentation coordination",
      "New employee onboarding documentation support",
      "Family documentation coordination",
      "Group case handling",
      "Ongoing administrative assistance",
    ],
    documentCategories: [
      "Employee identity and travel documents",
      "Relocation-related supporting documents",
      "Family documentation for accompanying members",
    ],
    process: [
      { title: "Tell us what you need", body: "Use the corporate enquiry option to tell us about your team and timeline." },
      { title: "Understand the requirements", body: "We discuss the documentation needs across your employees." },
      { title: "Prepare the documents", body: "Employees receive guidance on what to prepare, coordinated by us." },
      { title: "Assistance & review", body: "Where agreed, we review and organise employees' documentation." },
      nextSteps,
    ],
    prepare: [
      "Your company name and approximate number of employees",
      "The kind of documentation support your employees need",
      "Your timeline and preferred point of contact",
    ],
    included: [
      "Employer-focused coordination with one point of contact",
      "Group case handling",
      "Employee and family documentation guidance",
    ],
    outsideScope: [
      "Immigration-law or employment-law advice",
      "Submitting applications on behalf of employees to authorities",
      "Guaranteeing outcomes or timelines",
    ],
    faqs: [
      {
        question: "Do you provide corporate documentation assistance?",
        answer: "Yes. We coordinate documentation support for employers relocating or onboarding Indian employees in Germany.",
      },
      {
        question: "Can you support several employees at once?",
        answer: "Yes. Group case handling is part of this service. Arrangements and terms are agreed with each employer.",
      },
      {
        question: "How do corporate engagements start?",
        answer:
          "Send a corporate enquiry through our contact page with your company name and approximate team size, and we will get back to you to discuss your needs.",
      },
    ],
    related: ["family-documentation", "visa-documentation-support"],
    sources: [sources.outsourcing],
    whatsappMessage: "Hello SimplYes, I would like to discuss Corporate Services for our team. Could you explain the next steps?",
    illustration: "process",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function relatedServices(service: Service): Service[] {
  return service.related.map(getService).filter((s): s is Service => s !== undefined);
}

/** Contact link with the service pre-selected in the enquiry form (§08 conversion rule). */
export function enquiryHref(service?: Pick<Service, "slug">, context?: "pricing" | "corporate"): string {
  const params = new URLSearchParams();
  if (service) params.set("service", service.slug);
  if (context) params.set("context", context);
  const query = params.toString();
  return `/contact/${query ? `?${query}` : ""}#enquiry`;
}
