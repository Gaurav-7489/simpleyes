/**
 * Date each public page's visible content last changed in a meaningful way (sitemap <lastmod>).
 *
 * Update a page's date only when its text, services, problems or FAQs change, never because a build ran or
 * styling changed, so search engines can trust the date. Legal pages use `site.legal.lastUpdated`.
 */
export const pageUpdated: Record<string, string> = {
  "/": "2026-11-18", // Nov 2026 redesign
  "/services/passport-services/": "2026-11-18",
  "/services/oci-services/": "2026-11-18",
  "/services/attestation-affidavits/": "2026-11-18",
  "/services/visa-documentation-support/": "2026-11-18",
  "/services/family-documentation/": "2026-11-18",
  "/services/student-services/": "2026-11-18", // six services, mockup page layout
  "/services/": "2026-11-18",
  "/appointments/": "2026-11-18",
  "/emergency/": "2026-11-18",
  "/guides/": "2026-11-18",
  "/how-it-works/": "2026-11-18",
  "/about/": "2026-11-13",
  "/faqs/": "2026-11-18",
  "/pricing/": "2026-11-13", // compact page rewrite
  "/contact/": "2026-11-15", // prefilled service and problem
};
