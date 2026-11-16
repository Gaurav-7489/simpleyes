/**
 * Date each public page's visible content last changed in a meaningful way (sitemap <lastmod>).
 *
 * Update a page's date only when its text, services, problems or FAQs change, never because a build ran or
 * styling changed, so search engines can trust the date. Legal pages use `site.legal.lastUpdated`.
 */
export const pageUpdated: Record<string, string> = {
  "/": "2026-11-16", // November 2026 redesign
  "/services/": "2026-11-16",
  "/services/passport-services/": "2026-11-16",
  "/services/oci-services/": "2026-11-16",
  "/services/attestation-legalisation/": "2026-11-16",
  "/services/visa-documentation-support/": "2026-11-16",
  "/services/family-documentation/": "2026-11-16",
  "/services/student-services/": "2026-11-16",
  "/appointments/": "2026-11-16",
  "/emergency-help/": "2026-11-16",
  "/guides/": "2026-11-16",
  "/missions/": "2026-11-16",
  "/missions/embassy-of-india-berlin/": "2026-11-16",
  "/missions/consulate-general-of-india-frankfurt/": "2026-11-16",
  "/missions/consulate-general-of-india-munich/": "2026-11-16",
  "/missions/consulate-general-of-india-hamburg/": "2026-11-16",
  "/guides/renew-indian-passport-in-germany/": "2026-11-16",
  "/guides/apply-for-e-oci-card-from-germany/": "2026-11-16",
  "/guides/surrender-certificate-after-german-citizenship/": "2026-11-16",
  "/guides/lost-indian-passport-in-germany/": "2026-11-16",
  "/guides/indian-visa-for-german-citizens/": "2026-11-16",
  "/guides/mistakes-that-get-your-application-sent-back/": "2026-11-16",
  "/how-it-works/": "2026-11-13",
  "/about/": "2026-11-13",
  "/faqs/": "2026-11-13",
  "/pricing/": "2026-11-13",
  "/contact/": "2026-11-15",
};
