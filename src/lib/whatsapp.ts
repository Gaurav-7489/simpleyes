import { site } from "@/content/site";
import type { Service } from "@/content/services";

/** Prefilled, non-sensitive conversation starters. Never include personal data. */
export const generalWhatsappMessage =
  "Hello Simplyes, I would like help with an Indian documentation matter. Could you explain the next steps?";

export function serviceWhatsappMessage(service: Pick<Service, "title" | "whatsappMessage">): string {
  return service.whatsappMessage ?? `Hello Simplyes, I would like help with ${service.title}. Could you explain the next steps?`;
}

/**
 * Message for a chosen service and problem, e.g. "Hello Simplyes, I need assistance with Passport Services — Passport
 * renewal." Only the approved labels go in; never the visitor's own text or personal data.
 */
export function selectionWhatsappMessage(serviceTitle: string, issueLabel?: string): string {
  return `Hello Simplyes, I need assistance with ${serviceTitle}${issueLabel ? ` — ${issueLabel}` : ""}.`;
}

/** wa.me link for an arbitrary approved message (built from approved labels only). */
export function whatsappHrefForMessage(message: string): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Builds a properly encoded wa.me deep link. Opens only on user click. */
export function whatsappHref(service?: Pick<Service, "title" | "whatsappMessage">): string {
  const text = encodeURIComponent(service ? serviceWhatsappMessage(service) : generalWhatsappMessage);
  return `https://wa.me/${site.whatsapp.number}?text=${text}`;
}
