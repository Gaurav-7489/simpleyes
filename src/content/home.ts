/**
 * Copy for the homepage (§07), How It Works (§09) and About (§10).
 * Benefits only — no "guaranteed approval", "fastest", statistics or testimonials.
 */

export type IconKey =
  | "personal"
  | "guidance"
  | "communication"
  | "organised"
  | "human"
  | "transparent"
  | "family"
  | "professionals"
  | "students"
  | "residents"
  | "corporate";

/** Why Simplyes: the four reasons on the homepage sheet. */
export const whyItems: { title: string; body: string }[] = [
  { title: "Complete applications", body: "Fewer rejections for photos, signatures and missing papers." },
  { title: "Appointment and emergency help", body: "Support when time matters most." },
  { title: "Transparent scope", body: "Clear about what we do, what we don't, and what stays with the authorities." },
  { title: "For individuals and families", body: "One person or the whole household, coordinated together." },
];

/** Included with every service (homepage services card and service pages). */
export const includedWithEveryService: { title: string; body: string; urgent?: boolean }[] = [
  { title: "Document checking", body: "Every page checked before you submit." },
  { title: "Form filling", body: "Accurate, complete application forms." },
  { title: "Appointment booking", body: "Help booking at the Embassy and Consulates." },
  { title: "Photo help", body: "We check your photo against the size and background rules." },
  { title: "Emergency help", body: "Lost passport or urgent travel? Message URGENT.", urgent: true },
];

/** Indian missions in Germany we help with applications at. */
export const missions = ["Embassy of India, Berlin", "Consulate Frankfurt", "Consulate Munich", "Consulate Hamburg"];

/** §07 section 5 — four-step summary. */
export const homeSteps: { title: string; body: string }[] = [
  { title: "Tell us what you need", body: "Send a short enquiry describing your situation." },
  { title: "Understand your requirements", body: "We explain which process and requirements appear to apply." },
  { title: "Prepare with our assistance", body: "Get your documents ready with guidance and, where agreed, review." },
  { title: "Receive guidance on next steps", body: "Know exactly what to do next. Official decisions stay with the authorities." },
];

/** §09 — the five-step journey with who acts at each step. */
export const journeySteps: { title: string; body: string; who: string }[] = [
  { title: "Message us", body: "On WhatsApp, with your service and city.", who: "You" },
  { title: "We find your route", body: "The right service, mission and checklist.", who: "Simplyes" },
  { title: "We check and prepare", body: "Documents, forms and your photo.", who: "Simplyes + you" },
  { title: "We book your appointment", body: "With a checklist for the day.", who: "Simplyes" },
  { title: "You submit", body: "A complete application. Decisions stay with the authorities.", who: "You" },
];

/** §09 — what Simplyes does / does not do. */
export const doesDoesNot = {
  does: [
    "Explains processes in plain language.",
    "Identifies the relevant service and next steps.",
    "Checks your documents and fills in your forms.",
    "Helps you book your appointment, with a checklist for the day.",
    "Makes your phone photo upload-ready.",
    "Communicates clearly throughout.",
  ],
  doesNot: [
    "Process applications or make official decisions.",
    "Guarantee approvals, outcomes or timelines.",
    "Represent customers before authorities.",
    "Provide legal or immigration-law advice.",
    "Act on behalf of any embassy or consulate.",
  ],
};

/** §07 section 6 — Who we help. Each tile routes to the relevant service page(s) or enquiry. */
export const audiences: { icon: IconKey; title: string; body: string; links: string[] }[] = [
  {
    icon: "professionals",
    title: "Working professionals",
    body: "Renewals or corrections arriving alongside a full-time job, with little time for research.",
    links: ["passport-services", "oci-services"],
  },
  {
    icon: "students",
    title: "Students",
    body: "Organising certificates, degree documents and attestations — often for the first time.",
    links: ["attestation-affidavits", "new-in-germany"],
  },
  {
    icon: "family",
    title: "Families",
    body: "Several related requirements for different family members at once.",
    links: ["family-documentation"],
  },
  {
    icon: "residents",
    title: "Long-term residents",
    body: "Renewals, name discrepancies, declarations and attestations years after arrival.",
    links: ["attestation-affidavits", "passport-services"],
  },
  {
    icon: "corporate",
    title: "Businesses",
    body: "Commercial documents attested for use in India, and business visas for travelling staff.",
    links: ["attestation-affidavits", "visa-documentation-support"],
  },
];

/** §07 section 7 — Our approach. "Where agreed" must remain. */
export const approach: string[] = [
  "Understand your situation",
  "Explain the process",
  "Help organise your documentation",
  "Review preparation where agreed",
  "Provide clear next steps",
];

/** §20 — draft independence statement (subject to owner/legal review). */
export const independenceStatement =
  "Simplyes is an independent documentation assistance service. We are not affiliated with any government authority, embassy or consulate. Official applications and decisions remain subject to the relevant authorities.";

/** §10 — About page. */
export const about = {
  intro:
    "Simplyes is an independent documentation assistance service for Indian nationals living in Germany. We help individuals, families, students and employers understand, prepare and organise documentation for administrative processes.",
  story:
    "Documentation processes can be confusing and time-consuming. Requirements vary by document type and authority, information is scattered, and people often do not know where to start. Simplyes exists to make them easier to understand and manage.",
  mission: "Make complex documentation processes simpler, clearer and more accessible.",
  vision: "Build a trusted documentation assistance ecosystem that combines personal service, structured processes and technology.",
  values: [
    { title: "Clarity", body: "We explain requirements in plain language and say what applies to you." },
    { title: "Trust", body: "We are honest about who we are and never imply official status." },
    { title: "Responsibility", body: "We handle your information carefully and only ask for what is needed." },
    { title: "Convenience", body: "You can reach us in the way that suits you, and we keep the process simple." },
    { title: "Transparency", body: "Clear scope, honest limits and fees explained before assistance begins." },
    { title: "Customer-first service", body: "We start from your situation, not from a generic checklist." },
    { title: "Continuous improvement", body: "We refine how we work based on the questions our customers bring." },
  ],
  customerFirst:
    "We balance personalised human assistance with structured workflows and a responsible approach to technology in how we organise our work. Every enquiry is handled by a person.",
  clarity:
    "We are clear about our scope and honest about our limits. Official fees are separate from our service fees, and we never promise approvals, outcomes or timelines.",
};

/**
 * §11 fee table entry. `from` = fixed starting price in EUR (Simplyes service
 * fee only, never official or third-party costs); `quote` = priced per quotation.
 */
export type ServiceFee = {
  /** One of the six service slugs in services.ts. */
  slug: string;
  fee: { kind: "from"; amountEur: number; note?: string } | { kind: "quote"; note?: string };
};

/** §11 — Pricing page. No amounts until owners approve (quotation model). */
export const pricing = {
  /**
   * Per-service fee table on /pricing/. EMPTY until the owners approve prices:
   * an empty list renders nothing, so no placeholder or estimated prices can
   * ever appear (§11). Add one entry per service once approved, e.g.
   *   { slug: "passport-services", fee: { kind: "from", amountEur: <approved amount> } }
   */
  serviceFees: [] as ServiceFee[],
  feeTypes: [
    {
      title: "Simplyes service fees",
      body: "What Simplyes charges for its assistance. Fees depend on the service and your situation and are explained before any paid assistance begins.",
    },
    {
      title: "Government or consular fees",
      body: "Set and collected by the relevant authority. Separate from Simplyes fees where applicable. We never quote amounts we have not verified.",
    },
    {
      title: "Third-party charges",
      body: "Professional or other external services you may need are charged by those providers.",
    },
    {
      title: "Translation, notarisation & courier",
      body: "Practical expenses that may arise depending on the service and the documents involved.",
    },
  ],
  factors: [
    "Service category",
    "Number of people (individual or family)",
    "Number and type of documents",
    "Extent of review agreed",
    "Translation, notarisation or courier needs",
  ],
};
