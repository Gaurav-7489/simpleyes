import type { WhatsappTopic } from "@/lib/whatsapp";

export type IllustrationKind = "documents" | "form" | "photo" | "appointment" | "process" | "personal";

export type Service = {
  slug: string;
  title: string;
  /** Card copy (one or two sentences). */
  summary: string;
  /** Answer-first definition used at the top of the detail page and in metadata. */
  definition: string;
  metaDescription: string;
  helpsWith: string[];
  goodToKnow: string[];
  whatsappTopic: WhatsappTopic;
  illustration: IllustrationKind;
};

/**
 * The six approved service categories. Copy deliberately avoids guarantees,
 * official-sounding claims and specific requirements that could change —
 * requirements always come from the official source.
 */
export const services: Service[] = [
  {
    slug: "document-guidance",
    title: "Document Guidance",
    summary:
      "Help understanding which documents your process asks for, and checking whether the materials you have appear complete.",
    definition:
      "Simplyes helps you understand which documents an Indian consular or administrative process asks for, and reviews the copies you choose to share to see whether anything appears to be missing or inconsistent before you proceed.",
    metaDescription:
      "Help for Indians in Germany understanding Indian consular document requirements and checking whether your documents appear complete. Independent private service.",
    helpsWith: [
      "Walking through the official document checklist for your process, step by step",
      "Explaining the terms and document names used in requirement lists",
      "Reviewing the copies you share for apparent gaps, such as missing pages or details that don't match",
      "Pointing you to the official source for the current requirements",
    ],
    goodToKnow: [
      "Requirements are set by the Embassy, the Consulates General or their designated service providers, and they can change.",
      "A completeness check by Simplyes is guidance, not an official verification, and cannot guarantee acceptance.",
      "Please don't send copies of sensitive documents until we've discussed what is actually needed.",
    ],
    whatsappTopic: "documents",
    illustration: "documents",
  },
  {
    slug: "application-form-assistance",
    title: "Application Form Assistance",
    summary: "Support preparing your forms and understanding exactly what information each section requires.",
    definition:
      "Simplyes helps you prepare the forms for your Indian consular or administrative application — explaining what each section asks for, helping you gather the right information, and reviewing your draft for obvious gaps.",
    metaDescription:
      "Guidance for Indians in Germany preparing Indian consular application forms: what each section means, what information is needed, and a review of your draft.",
    helpsWith: [
      "Explaining what each section and field of the form is asking for",
      "Helping you collect the information you need before you start",
      "Reviewing your draft for missing or inconsistent entries",
      "Explaining what typically happens after the form is completed",
    ],
    goodToKnow: [
      "You remain responsible for the accuracy of the information in your application.",
      "Simplyes does not approve or decide applications — decisions rest with the authorities.",
    ],
    whatsappTopic: "application",
    illustration: "form",
  },
  {
    slug: "photo-signature-preparation",
    title: "Photo & Signature Preparation",
    summary: "Help preparing photographs and signatures in the formats requested by the application instructions.",
    definition:
      "Simplyes helps you prepare your photograph and signature so that they follow the size, file and format requirements stated in the official instructions for your application.",
    metaDescription:
      "Help formatting photos and signatures to the requirements stated in Indian consular application instructions — for Indians living in Germany.",
    helpsWith: [
      "Reading the photo and signature requirements stated for your application",
      "Resizing, cropping and formatting digital images to the stated specifications",
      "Checking file type and file size against the instructions",
      "Explaining when a new photograph may be needed instead of an edit",
    ],
    goodToKnow: [
      "Specifications are defined in the official instructions for each application and can change.",
      "Final acceptance of a photo or signature is decided by the authority or its service provider.",
    ],
    whatsappTopic: "photo",
    illustration: "photo",
  },
  {
    slug: "appointment-guidance",
    title: "Appointment Guidance",
    summary: "Clear explanations of appointment-related steps and how to prepare for them.",
    definition:
      "Simplyes explains the appointment-related steps of your Indian consular or administrative process and helps you prepare what to bring and what to expect.",
    metaDescription:
      "Guidance for Indians in Germany on appointment-related steps for Indian consular processes and how to prepare. Independent service — no guaranteed appointments.",
    helpsWith: [
      "Explaining whether and when your process involves an appointment",
      "Helping you prepare documents and copies to bring along",
      "Explaining what usually happens on the day and afterwards",
    ],
    goodToKnow: [
      "Simplyes cannot guarantee, reserve or speed up appointments; availability is controlled by the official channels.",
      "Processing times are set by the authorities and are outside our control.",
    ],
    whatsappTopic: "appointment",
    illustration: "appointment",
  },
  {
    slug: "process-clarification",
    title: "Process Clarification",
    summary: "Plain-language explanations of the requirements and administrative steps that apply to you.",
    definition:
      "Simplyes explains Indian consular and administrative procedures in plain language — which steps apply to your situation, in what order, and what the next step is.",
    metaDescription:
      "Plain-language explanations of Indian consular and administrative procedures for Indians in Germany: which steps apply, in what order, and what comes next.",
    helpsWith: [
      "Identifying which procedure most likely applies to your situation",
      "Explaining the sequence of steps from preparation to completion",
      "Clarifying confusing terms, letters or instructions you have received",
      "Telling you where to find the official, current information",
    ],
    goodToKnow: [
      "Our explanations are general guidance based on publicly available requirements.",
      "Where official instructions differ from our explanation, the official instructions apply.",
    ],
    whatsappTopic: "process",
    illustration: "process",
  },
  {
    slug: "personalized-assistance",
    title: "Personalized Assistance",
    summary: "Guidance shaped around your specific consular or administrative question.",
    definition:
      "Simplyes offers one-to-one guidance on your specific Indian consular or administrative question, so you understand your situation and the appropriate next step.",
    metaDescription:
      "One-to-one guidance for Indians in Germany on specific Indian consular or administrative questions. Start a conversation on WhatsApp.",
    helpsWith: [
      "Listening to your situation and identifying the relevant process",
      "Answering follow-up questions as you prepare",
      "Combining document, form and photo help where your case needs it",
    ],
    goodToKnow: [
      "Any applicable service fee is confirmed with you before assistance begins.",
      "Simplyes is a private service and cannot act as, or on behalf of, an official authority.",
    ],
    whatsappTopic: "personal",
    illustration: "personal",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
