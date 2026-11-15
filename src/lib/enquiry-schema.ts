import type { Service } from "@/content/services";
import { OTHER_ISSUE } from "@/lib/enquiry-keys";

/**
 * The enquiry contract shared by the browser form and the Formdall field schema (server-side validation).
 *
 * Formdall's "Field schema" (docs.formdall.de/formulare/feld-schema) checks each submission's field names, types,
 * required flags, max lengths and allowed values; in `reject` mode anything else is refused with a 4xx, which the
 * form shows as a failure. Configure the form's schema from /enquiry-schema.json (generated from this file), so
 * the browser checks and the provider's checks can never drift apart.
 */

export const ENQUIRY_LIMITS = {
  subject: 300,
  name: 100,
  email: 160,
  phone: 24,
  city: 80,
  serviceTitle: 80,
  issueLabel: 80,
  message: 2000,
  company: 120,
  timestamp: 40,
  sourcePage: 200,
  utm: 100,
} as const;

export const CONTACT_METHODS = ["Email", "Phone", "WhatsApp"] as const;
export const TEAM_SIZES = ["1–5", "6–20", "21–50", "More than 50"] as const;
export const CONTEXTS = ["pricing", "corporate"] as const;

export type SchemaField = {
  name: string;
  type: "text" | "email" | "number" | "select" | "boolean";
  required: boolean;
  max_length?: number;
  allowed_values: string[];
};

/** Formdall field schema (mode `reject`) for the enquiry form. Optional fields are only sent when filled in. */
export function buildEnquirySchema(services: Pick<Service, "slug" | "issues">[]): { mode: "reject"; fields: SchemaField[] } {
  const issueIds = [...new Set([...services.flatMap((s) => s.issues.map((i) => i.id)), OTHER_ISSUE])].sort();
  const text = (name: string, max: number, required = false): SchemaField => ({ name, type: "text", required, max_length: max, allowed_values: [] });
  const select = (name: string, values: readonly string[], required = false): SchemaField => ({
    name,
    type: "select",
    required,
    allowed_values: [...values],
  });
  return {
    mode: "reject",
    fields: [
      text("subject", ENQUIRY_LIMITS.subject, true),
      text("name", ENQUIRY_LIMITS.name, true),
      { name: "email", type: "email", required: true, max_length: ENQUIRY_LIMITS.email, allowed_values: [] },
      text("phone", ENQUIRY_LIMITS.phone),
      text("city", ENQUIRY_LIMITS.city),
      text("service", ENQUIRY_LIMITS.serviceTitle, true),
      select("service_id", services.map((s) => s.slug), true),
      text("issue", ENQUIRY_LIMITS.issueLabel),
      select("issue_id", issueIds),
      select("preferred_contact", CONTACT_METHODS),
      text("message", ENQUIRY_LIMITS.message),
      { name: "corporate", type: "boolean", required: true, allowed_values: [] },
      text("company", ENQUIRY_LIMITS.company),
      select("employees", TEAM_SIZES),
      { name: "consent", type: "boolean", required: true, allowed_values: [] },
      select("context", CONTEXTS),
      text("submitted_at", ENQUIRY_LIMITS.timestamp, true),
      text("source_page", ENQUIRY_LIMITS.sourcePage),
      text("utm_source", ENQUIRY_LIMITS.utm),
      text("utm_medium", ENQUIRY_LIMITS.utm),
      text("utm_campaign", ENQUIRY_LIMITS.utm),
    ],
  };
}
