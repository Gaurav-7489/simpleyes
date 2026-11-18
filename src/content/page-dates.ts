/**
 * Date each public page's visible content last changed in a meaningful way (sitemap <lastmod>).
 *
 * Update a page's date only when its text, services, problems or FAQs change, never because a build ran or
 * styling changed, so search engines can trust the date. Legal pages use `site.legal.lastUpdated`.
 */
export const pageUpdated: Record<string, string> = {
  "/": "2026-11-18", // video guides section
  "/services/": "2026-11-15", // service tiles with problem choices
  "/services/passport-services/": "2026-11-15",
  "/services/oci-services/": "2026-11-15",
  "/services/attestation-legalisation/": "2026-11-15",
  "/services/affidavits-declarations/": "2026-11-15",
  "/services/visa-documentation-support/": "2026-11-15",
  "/services/family-documentation/": "2026-11-15",
  "/services/student-services/": "2026-11-15",
  "/services/corporate-services/": "2026-11-15", // service pages: problem picker and shortened content
  "/how-it-works/": "2026-11-13",
  "/about/": "2026-11-13",
  "/faqs/": "2026-11-13",
  "/pricing/": "2026-11-13", // compact page rewrite
  "/contact/": "2026-11-15", // prefilled service and problem
};
