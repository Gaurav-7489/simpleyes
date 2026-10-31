import { services } from "../../src/content/services";

/** Legal pages stay noindex until the owners/advisers have reviewed them (site.legal.reviewed). */
export const legalRoutes = ["/privacy/", "/terms/", "/disclaimer/", "/impressum/"];

export const routes = [
  "/",
  "/services/",
  ...services.map((s) => `/services/${s.slug}/`),
  "/how-it-works/",
  "/about/",
  "/faqs/",
  "/pricing/",
  "/contact/",
  "/thank-you/",
  ...legalRoutes,
];

export const indexableRoutes = routes.filter((r) => !legalRoutes.includes(r) && r !== "/thank-you/");

export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "4917662510556").replace(/\D/g, "");
