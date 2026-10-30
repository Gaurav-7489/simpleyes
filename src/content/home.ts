import { services } from "@/content/services";

/** Home "Process": the four-step summary. */
export const processSteps = [
  {
    number: "01",
    title: "Choose your service",
    body: "Pick the area your request belongs to, or ask us if you're unsure.",
  },
  {
    number: "02",
    title: "Tell us what you need",
    body: "Send a short WhatsApp message describing your situation. No documents needed yet.",
  },
  {
    number: "03",
    title: "Receive guidance on preparation",
    body: "We explain what applies to your case and what to prepare, and confirm any service fee before we begin.",
  },
  {
    number: "04",
    title: "Prepare with human support",
    body: "Get your paperwork ready with a real person on hand to answer questions and follow up.",
  },
];

/** How It Works: the full five-step journey. */
export const journeySteps: { number: string; title: string; body: string }[] = [
  {
    number: "01",
    title: "Choose a service",
    body: "Find the area your request belongs to — passport, OCI, attestation and more. Not sure? Just ask.",
  },
  {
    number: "02",
    title: "Explain your requirement",
    body: "Message us on WhatsApp with a short description. Please don't send passport copies or other sensitive documents yet.",
  },
  {
    number: "03",
    title: "Receive personalised guidance",
    body: "We ask a few questions, explain which official process and requirements appear to apply, and tell you what we can help with. Before any paid assistance begins, we confirm the scope and our service fee with you.",
  },
  {
    number: "04",
    title: "Prepare your documents",
    body: "With a case-specific checklist, you gather and organise your paperwork. Where needed, we check completeness and help prepare forms, photos and signatures to the stated specifications.",
  },
  {
    number: "05",
    title: "Human assistance and follow-up",
    body: "A real person answers your questions as you go and follows up until you are ready to proceed through the official channel.",
  },
];

export type BenefitArt = "clarity" | "documents" | "personal" | "germany" | "chat" | "independent";

export const benefits: { title: string; body: string; art: BenefitArt; wide: boolean }[] = [
  {
    title: "Clear explanations",
    body: "Requirements explained in plain language, for your specific case.",
    art: "clarity",
    wide: false,
  },
  {
    title: "Organised paperwork",
    body: "Help gathering, ordering and checking the documents your process asks for.",
    art: "documents",
    wide: true,
  },
  {
    title: "A real person",
    body: "Human guidance from first question to final preparation — not a chatbot or generic checklist.",
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
    "Understand published requirements for your case",
    "Organise and check your supporting documents",
    "Prepare forms, photos and signatures to stated specifications",
    "Understand attestation, apostille and signing steps",
    "Prepare for appointments and next steps",
  ],
  authorities: [
    "Set requirements and official fees",
    "Accept and process applications",
    "Issue passports, visas and OCI documents",
    "Perform official attestation and authentication",
    "Make all decisions and set processing times",
  ],
} as const;

/** Hero marquee: the published service names. */
export const marqueeItems = services.map((service) => service.title);

/** Question wall: the questions customers typically start with, across categories. */
export const questions = {
  rowA: [
    "Which documents does my passport renewal need?",
    "Do I need an OCI update or a re-issue?",
    "Is my photo in the right format?",
    "Does my degree need an apostille first?",
    "How do I document a name difference?",
    "What should I prepare for my appointment?",
  ],
  rowB: [
    "Which papers does my child's application need?",
    "Is my application complete?",
    "Where do I submit this?",
    "What do I sign, and where?",
    "Can someone check my documents before I go?",
    "What happens after I submit?",
  ],
};

/** "Your documents and privacy": only what is true today. No security claims (vault, encryption) — roadmap only. */
export const privacyPoints = [
  "Please don't send passport copies or other sensitive documents in your first message.",
  "Once the scope is agreed, share only what is actually needed for your request.",
  "Messages are sent through WhatsApp, which is operated by Meta and processes them under its own terms.",
  "How long we keep information and how it is deleted is described in our Privacy Policy.",
];
