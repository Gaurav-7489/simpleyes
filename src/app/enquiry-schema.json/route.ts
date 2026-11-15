import { services } from "@/content/services";
import { buildEnquirySchema } from "@/lib/enquiry-schema";

export const dynamic = "force-static";

/**
 * The Formdall field schema for the enquiry form, generated from the canonical service/issue list.
 * Owners copy these fields into the form's "Field schema" tab (mode: reject). Public by design: it holds only
 * field names and the approved ids already visible on the site — no endpoint, key or personal data.
 */
export function GET() {
  return new Response(JSON.stringify(buildEnquirySchema(services), null, 2) + "\n", {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
