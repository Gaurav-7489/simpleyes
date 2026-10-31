import { site } from "@/content/site";
import type { Service } from "@/content/services";

/** Prefilled, non-sensitive conversation starters. Never include personal data. */
export const generalWhatsappMessage =
  "Hello SimplYes, I would like help with an Indian documentation matter. Could you explain the next steps?";

export function serviceWhatsappMessage(service: Pick<Service, "title" | "whatsappMessage">): string {
  return service.whatsappMessage ?? `Hello SimplYes, I would like help with ${service.title}. Could you explain the next steps?`;
}

/** Builds a properly encoded wa.me deep link. Opens only on user click. */
export function whatsappHref(service?: Pick<Service, "title" | "whatsappMessage">): string {
  const text = encodeURIComponent(service ? serviceWhatsappMessage(service) : generalWhatsappMessage);
  return `https://wa.me/${site.whatsapp.number}?text=${text}`;
}
