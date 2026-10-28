export const processSteps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    body: "Share your query and the process you need assistance with.",
  },
  {
    number: "02",
    title: "Understand the Requirements",
    body: "We help explain the relevant steps and documentation requirements.",
  },
  {
    number: "03",
    title: "Prepare Your Documents",
    body: "Receive assistance preparing and checking the necessary information.",
  },
  {
    number: "04",
    title: "Proceed With Clarity",
    body: "Use the guidance to continue through the appropriate official channels.",
  },
] as const;

export type BenefitArt = "clarity" | "documents" | "personal" | "germany" | "chat" | "independent";

export const benefits: { title: string; body: string; art: BenefitArt; wide: boolean }[] = [
  {
    title: "Clear explanations",
    body: "Requirements explained in plain language, without jargon.",
    art: "clarity",
    wide: false,
  },
  {
    title: "Document preparation guidance",
    body: "Help checking what's needed and whether your documents appear complete before you take the next step.",
    art: "documents",
    wide: true,
  },
  {
    title: "Personal assistance",
    body: "A real person guiding you through your specific situation — not a generic checklist.",
    art: "personal",
    wide: true,
  },
  {
    title: "Across Germany",
    body: "We assist customers across Germany, wherever you live.",
    art: "germany",
    wide: false,
  },
  {
    title: "Simple communication",
    body: "Start on WhatsApp and ask your questions in one familiar place.",
    art: "chat",
    wide: false,
  },
  {
    title: "Transparent independence",
    body: "We're upfront that we're a private service, independent of all government authorities.",
    art: "independent",
    wide: true,
  },
];

export const boundaries = {
  simplyes: [
    "Explain requirements and procedures in plain language",
    "Help check whether your documents appear complete",
    "Support preparing and reviewing forms",
    "Format photos and signatures to stated requirements",
    "Help you prepare for appointments and next steps",
  ],
  authorities: [
    "Set the official requirements and fees",
    "Accept and process applications",
    "Issue passports, visas and official documents",
    "Manage appointments and processing times",
    "Make all approvals and decisions",
  ],
} as const;

export const marqueeItems = [
  "Document guidance",
  "Form assistance",
  "Photo & signature formatting",
  "Appointment preparation",
  "Process clarification",
  "Personal assistance",
] as const;
