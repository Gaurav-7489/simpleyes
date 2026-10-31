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

/** §07 section 4 — Why SimplYes? */
export const whyItems: { icon: IconKey; title: string; body: string }[] = [
  { icon: "personal", title: "Personalised assistance", body: "Guidance shaped around your situation, not a generic checklist." },
  { icon: "guidance", title: "Clear guidance", body: "Requirements explained in plain language, without jargon." },
  { icon: "communication", title: "Convenient communication", body: "Start through the form, WhatsApp or email — whatever suits you." },
  { icon: "organised", title: "Organised preparation", body: "A structured way to gather and check what your process needs." },
  { icon: "human", title: "Human support", body: "A real person helps you, from first question to next steps." },
  { icon: "transparent", title: "Transparent scope", body: "Clear about what we do, what we don't, and what stays with the authorities." },
  { icon: "family", title: "For individuals and families", body: "Support for one person or a whole household, coordinated together." },
];

/** §07 section 5 — four-step summary. */
export const homeSteps: { title: string; body: string }[] = [
  { title: "Tell us what you need", body: "Send a short enquiry describing your situation." },
  { title: "Understand your requirements", body: "We explain which process and requirements appear to apply." },
  { title: "Prepare with our assistance", body: "Get your documents ready with guidance and, where agreed, review." },
  { title: "Receive guidance on next steps", body: "Know exactly what to do next. Official decisions stay with the authorities." },
];

/** §09 — the five-step journey with who acts at each step. */
export const journeySteps: { title: string; body: string; who: string }[] = [
  {
    title: "Tell us what you need",
    body: "You describe your requirement through the enquiry form, WhatsApp or email.",
    who: "Customer",
  },
  {
    title: "Understand the requirements",
    body: "SimplYes understands your situation and identifies the relevant service and next steps.",
    who: "SimplYes",
  },
  {
    title: "Prepare the documents",
    body: "You receive guidance on document preparation and the information required.",
    who: "Customer + SimplYes",
  },
  {
    title: "Assistance & review",
    body: "Where agreed, SimplYes helps review and organise your documentation.",
    who: "SimplYes",
  },
  {
    title: "Understand the next steps",
    body: "You receive guidance on agreed next steps and relevant submission preparation.",
    who: "Customer",
  },
];

/** §09 — what SimplYes does / does not do. */
export const doesDoesNot = {
  does: [
    "Explains processes in plain language.",
    "Identifies the relevant service and next steps.",
    "Guides document preparation.",
    "Reviews and organises documentation where agreed.",
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
    links: ["student-services", "attestation-legalisation"],
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
    links: ["affidavits-declarations", "passport-services"],
  },
  {
    icon: "corporate",
    title: "Corporate customers",
    body: "Coordinating documentation for several Indian employees and their families.",
    links: ["corporate-services"],
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
  "SimplYes is an independent documentation assistance service. We are not affiliated with any government authority, embassy or consulate. Official applications and decisions remain subject to the relevant authorities.";

/** §10 — About page. */
export const about = {
  intro:
    "SimplYes is an independent documentation assistance service for Indian nationals living in Germany. We help individuals, families, students and employers understand, prepare and organise documentation for administrative processes.",
  story:
    "Documentation processes can be confusing and time-consuming. Requirements vary by document type and authority, information is scattered, and people often do not know where to start. SimplYes exists to make them easier to understand and manage.",
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

/** §11 — Pricing page. No amounts until owners approve (quotation model). */
export const pricing = {
  feeTypes: [
    {
      title: "SimplYes service fees",
      body: "What SimplYes charges for its assistance. Fees depend on the service and your situation and are explained before any paid assistance begins.",
    },
    {
      title: "Government or consular fees",
      body: "Set and collected by the relevant authority. Separate from SimplYes fees where applicable. We never quote amounts we have not verified.",
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
    "Corporate group size",
  ],
};
