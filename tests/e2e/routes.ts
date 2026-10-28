import { services } from "../../src/content/services";

export const routes = [
  "/",
  "/services/",
  ...services.map((s) => `/services/${s.slug}/`),
  "/how-it-works/",
  "/about/",
  "/faqs/",
  "/contact/",
  "/impressum/",
  "/privacy/",
];

export const indexableRoutes = routes.filter((r) => r !== "/impressum/" && r !== "/privacy/");

export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "4917662510556").replace(/\D/g, "");
