import { site } from "@/content/site";

/** Prefilled, non-sensitive conversation starters. Never include personal data. */
export const whatsappMessages = {
  general: "Hello Simplyes, I would like assistance with a consular or administrative process.",
  documents: "Hello Simplyes, I need help understanding my document requirements.",
  application: "Hello Simplyes, I would like guidance with preparing an application.",
  photo: "Hello Simplyes, I need help preparing my photo and signature in the required format.",
  appointment: "Hello Simplyes, I would like guidance on preparing for my appointment.",
  process: "Hello Simplyes, I would like help understanding the steps of my process.",
  personal: "Hello Simplyes, I have a specific question about my consular or administrative matter.",
} as const;

export type WhatsappTopic = keyof typeof whatsappMessages;

/** Builds a properly encoded wa.me deep link. Opens only on user click. */
export function whatsappHref(topic: WhatsappTopic = "general"): string {
  const text = encodeURIComponent(whatsappMessages[topic]);
  return `https://wa.me/${site.whatsapp.number}?text=${text}`;
}
