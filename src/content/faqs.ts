export type Faq = { question: string; answer: string };

/** Answer-first FAQ copy. Rendered as server HTML (and FAQPage JSON-LD on /faqs/). */
export const faqs: Faq[] = [
  {
    question: "What is Simplyes?",
    answer:
      "Simplyes is an independent private assistance service for Indians living in Germany. We help you understand Indian consular and administrative requirements, check whether your documents appear complete, prepare forms, and format photos and signatures — so you can continue through the official channels with clarity.",
  },
  {
    question: "Is Simplyes part of the Embassy of India?",
    answer:
      "No. Simplyes is not part of, affiliated with, or authorised by the Embassy of India, the Consulates General of India, or any outsourced application centre. We are a private assistance service and do not act on behalf of any authority.",
  },
  {
    question: "What kind of assistance does Simplyes provide?",
    answer:
      "We help with understanding document requirements, checking document completeness, preparing and reviewing forms, formatting photos and signatures to the stated requirements, explaining appointment-related steps, and clarifying the next step in your process.",
  },
  {
    question: "Can Simplyes submit or approve applications?",
    answer:
      "Simplyes cannot approve, issue or decide anything — passports, visas and all other official decisions are made only by the respective authorities or their designated service providers. Applications are handled through the official channels; if you're unsure how that works for your case, we'll explain the steps.",
  },
  {
    question: "Can Simplyes guarantee appointments or processing times?",
    answer:
      "No. Appointment availability and processing times are controlled by the official authorities and their service providers. Simplyes cannot guarantee, reserve or accelerate either — we help you prepare so you can proceed with confidence.",
  },
  {
    question: "Do you assist people throughout Germany?",
    answer: "Yes. We assist customers across Germany, and most assistance happens conveniently over WhatsApp.",
  },
  {
    question: "How do I get started?",
    answer:
      "Send us a message on WhatsApp with a short description of what you need help with. We'll reply, ask a few questions to understand your situation, and explain how we can help.",
  },
  {
    question: "What documents should I prepare before contacting you?",
    answer:
      "You don't need everything ready to start. A short description of your process and any instructions or checklists you've already received are enough. Please don't send copies of passports or other sensitive documents until we've discussed what is actually needed.",
  },
  {
    question: "Is Simplyes a paid service?",
    answer:
      "Simplyes is a private service. Whether a service fee applies depends on the assistance you need — please confirm any fees with us before assistance begins. Official fees charged by the authorities or their service providers are separate and paid to them directly.",
  },
];
