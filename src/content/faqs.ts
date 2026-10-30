export type Faq = { question: string; answer: string };

/**
 * General FAQs, answer-first. Rendered as server HTML (and FAQPage JSON-LD on /faqs/).
 * Service-specific FAQs live on each service in services.ts.
 */
export const faqs: Faq[] = [
  {
    question: "Is SimplYes a government service?",
    answer:
      "No. SimplYes is an independent private documentation-assistance service. We are not affiliated with, authorised by or acting for the Embassy of India, the Consulates General of India or any outsourced application centre.",
  },
  {
    question: "What assistance do you provide?",
    answer:
      "We help you understand published requirements, organise and check supporting documents, prepare forms, photos and signatures to stated specifications, understand attestation and signing steps, and prepare for appointments — across passport, OCI, attestation, affidavit, family and student paperwork.",
  },
  {
    question: "How do I start an enquiry?",
    answer:
      "Send us a WhatsApp message with the service and a short description of what you need. We'll reply, ask a few questions and explain the next step.",
  },
  {
    question: "Can you guarantee approval?",
    answer:
      "No. Every decision — and the processing time — rests with the relevant authority. We help you prepare carefully; we cannot influence the outcome.",
  },
  {
    question: "How are document requirements established?",
    answer:
      "From the current official instructions published by the Indian mission responsible for your place of residence, its application centre and the relevant Indian ministries. Requirements depend on your case and can change, so we check the current official source for your situation rather than relying on a fixed list. Where the official instruction differs from anything we have said, the official instruction applies.",
  },
  {
    question: "How are your fees communicated?",
    answer:
      "Before any paid assistance begins, we tell you what we will do and what our service fee is, and you decide whether to go ahead.",
  },
  {
    question: "How do official charges differ from your service fee?",
    answer:
      "Official fees are set by the authorities and paid to them or their application centre. Courier, notary, translation and similar costs are charged by those providers. Our service fee covers only our own assistance.",
  },
  {
    question: "How will I receive next-step guidance?",
    answer:
      "In your WhatsApp conversation with our team, usually as a short explanation and a checklist for your case.",
  },
  {
    question: "Do you help people throughout Germany?",
    answer: "Yes. We assist customers across Germany, and most assistance happens conveniently over WhatsApp.",
  },
  {
    question: "What should I prepare before contacting you?",
    answer:
      "You don't need everything ready to start. A short description of your process and any instructions or checklists you've already received are enough. Please don't send copies of passports or other sensitive documents until we've discussed what is actually needed.",
  },
  {
    question: "Can SimplYes submit applications for me?",
    answer: "Applications are submitted by you through the official channel. We help you prepare.",
  },
];
