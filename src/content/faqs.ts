import { site } from "./site";

export type Faq = { question: string; answer: string; id?: string };

export type FaqCategory = {
  id: "general" | "services" | "process" | "pricing" | "privacy" | "limitations";
  label: string;
  items: Faq[];
};

/**
 * The FAQ page's six categories (§12). Single source of truth: the homepage
 * selection and the service pages pull from here or from services.ts.
 *
 * Questions whose answers depend on owner decisions that are still open
 * (payment methods, cancellation terms, remote delivery, update channels) are
 * deliberately not published yet — see docs/OWNER-REGISTER.md. Never fill them
 * with guesses.
 */
export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        id: "what-is-simplyes",
        question: "What is SimplYes?",
        answer:
          "SimplYes is an independent documentation assistance service that helps Indian nationals living in Germany understand, prepare and organise documentation for administrative processes.",
      },
      {
        id: "who-can-use",
        question: "Who can use SimplYes?",
        answer:
          "Individuals, families and students — including working professionals, long-term residents, German citizens of Indian origin, spouses and new arrivals in Germany.",
      },
      {
        id: "official-service",
        question: "Is SimplYes an official government service?",
        answer:
          "No. SimplYes is an independent documentation assistance service. We are not an embassy, consulate or government authority, and we are not affiliated with any of them.",
      },
      {
        id: "part-of-embassy",
        question: "Are you part of the Embassy or a Consulate?",
        answer: "No. SimplYes is an independent service. Decisions on every application remain with the authorities.",
      },
      {
        id: "cities",
        question: "Can people from different cities in Germany use the service?",
        answer: "Yes. We assist customers across Germany.",
      },
      {
        id: "contact",
        question: "How can I contact SimplYes?",
        answer: site.contact.email
          ? `Use the enquiry form on our Contact page, message us on WhatsApp or email us at ${site.contact.email}. All three routes are shown on every page.`
          : "Use the enquiry form on our Contact page or message us on WhatsApp. Both routes are shown on every page.",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    items: [
      {
        id: "which-services",
        question: "What documentation services do you offer?",
        answer:
          "Six services, named the way the consulates name them: Passport Services, e-OCI Services, Attestation & Affidavits, Visa Services, Family Documentation and Student Services. Each has its own page with full details.",
      },
      {
        id: "passport",
        question: "Can I get help with passport renewal?",
        answer:
          "Yes — renewals, lost or damaged passports, name and detail changes, PCC, Emergency Certificate and surrender certificate. See Passport Services.",
      },
      {
        id: "oci",
        question: "Do you assist with e-OCI applications?",
        answer: "Yes — fresh e-OCI, renewal after a new passport and updates of your details, for adults, children and foreign spouses. See e-OCI Services.",
      },
      {
        id: "attestation",
        question: "Do you help with document attestation and affidavits?",
        answer:
          "Yes — attestation of personal, educational and commercial documents, name change, name split and other affidavits, and Power of Attorney. See Attestation & Affidavits.",
      },
      {
        id: "book-appointment",
        question: "Can you book my consulate appointment?",
        answer:
          "Yes. We help you book your appointment at the Embassy, Consulate or application centre and prepare what you need to bring. The available slots are set by the mission.",
      },
      {
        id: "lost-passport",
        question: "I lost my passport and need to fly to India. What now?",
        answer:
          "Report it to the police, then WhatsApp us with URGENT. We help with the Emergency Certificate and the documents for your new passport.",
      },
      {
        id: "family",
        question: "Can you help with family documentation?",
        answer: "Yes — passport, e-OCI and visa for the whole family as one case, with one point of contact. See Family Documentation.",
      },
      {
        id: "students",
        question: "Do you support students?",
        answer: "Yes — passport renewal, attestation of educational documents and PCC for Indian students in Germany. See Student Services.",
      },
    ],
  },
  {
    id: "process",
    label: "Process",
    items: [
      {
        id: "get-started",
        question: "How do I get started?",
        answer:
          "Send an enquiry through the form, WhatsApp or email. We understand your situation, explain the requirements, guide your document preparation, review where agreed and explain the next steps.",
      },
      {
        id: "what-to-provide",
        question: "What information do I need to provide?",
        answer:
          "Only basic details at enquiry stage: your name, how to reach you, the service and a short description. Please do not send passport numbers or upload documents through the form.",
      },
      {
        id: "document-review",
        question: "How does document review work?",
        answer:
          "Where review is agreed as part of your assistance, we explain how and when documents are shared at that point. Documents are never collected through the public enquiry form.",
      },
      {
        id: "how-long",
        question: "How long does the assistance process take?",
        answer:
          "It depends on the service and your situation. Official processing times are set by the authorities, so we never promise timelines.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & payments",
    items: [
      {
        id: "how-much",
        question: "How much does SimplYes charge?",
        answer:
          "Our fees depend on the service and your situation. We explain the fee and what it covers before any paid assistance begins. See our Pricing page for what affects a quote.",
      },
      {
        id: "official-fees",
        question: "Are official fees included?",
        answer:
          "No. Official fees are paid to the mission. Our service fee is separate and agreed before we start.",
      },
      {
        id: "quotation",
        question: "Can I request a quotation?",
        answer: "Yes. Use “Request a Service Quote” on the Pricing page, or choose your service in the enquiry form.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy & security",
    items: [
      {
        id: "personal-documents",
        question: "How does SimplYes handle personal documents?",
        answer:
          "As described in our Privacy Policy. Personal documents are never requested or accepted through the public enquiry form.",
      },
      {
        id: "who-accesses",
        question: "Who can access my information?",
        answer: "Only the authorised SimplYes team and the service providers named in our Privacy Policy.",
      },
      {
        id: "retention",
        question: "How long are documents retained?",
        answer: "Retention periods are set out in our Privacy Policy.",
      },
      {
        id: "deletion",
        question: "Can I request deletion of my information?",
        answer: "Yes. Our Privacy Policy explains how to request access to or deletion of your information.",
      },
    ],
  },
  {
    id: "limitations",
    label: "Service limitations",
    items: [
      {
        id: "guarantee",
        question: "Can SimplYes guarantee approval?",
        answer: "No. Decisions rest with the relevant authorities. We help you prepare; we cannot influence the outcome.",
      },
      {
        id: "represent",
        question: "Does SimplYes represent customers before government authorities?",
        answer: "No. You remain in control of your application and submit it through the official channel.",
      },
      {
        id: "legal-advice",
        question: "Does SimplYes provide legal advice?",
        answer: "No — documentation assistance only. Where a matter needs legal advice, we will tell you to consult a qualified professional.",
      },
      {
        id: "final-decision",
        question: "Who makes the final application decision?",
        answer: "The relevant authority.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqCategories.flatMap((category) => category.items);

function pick(ids: string[]): Faq[] {
  return ids.map((id) => allFaqs.find((faq) => faq.id === id)).filter((faq): faq is Faq => faq !== undefined);
}

/** Homepage selection (Nov 2026 redesign): the four questions everyone asks. */
export const homeFaqs: Faq[] = pick(["book-appointment", "lost-passport", "official-fees", "part-of-embassy"]);
