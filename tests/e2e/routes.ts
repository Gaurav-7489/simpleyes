import { services } from "../../src/content/services";
import { guides } from "../../src/content/guides";
import { missions } from "../../src/content/missions";

/** Legal pages stay noindex until the owners/advisers have reviewed them (site.legal.reviewed). */
export const legalRoutes = ["/privacy/", "/terms/", "/disclaimer/", "/impressum/"];

export const routes = [
  "/",
  "/services/",
  ...services.map((s) => `/services/${s.slug}/`),
  "/appointments/",
  "/emergency-help/",
  "/guides/",
  ...guides.map((g) => `/guides/${g.slug}/`),
  "/missions/",
  ...missions.map((m) => `/missions/${m.slug}/`),
  "/how-it-works/",
  "/about/",
  "/faqs/",
  "/pricing/",
  "/contact/",
  "/thank-you/",
  ...legalRoutes,
];

export const indexableRoutes = routes.filter((r) => !legalRoutes.includes(r) && r !== "/thank-you/");

export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "4915216627596").replace(/\D/g, "");
