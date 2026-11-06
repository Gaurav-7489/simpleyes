#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import nextEnv from "@next/env";

const reserved = new Set([
  "subject", "name", "email", "phone", "city", "service", "preferred_contact", "message", "corporate",
  "company", "employees", "consent", "context", "submitted_at", "source_page", "utm_source", "utm_medium",
  "utm_campaign", "contactMethod", "__proto__", "constructor", "prototype",
]);

/** Fail before publishing a form that leaks data or cannot submit under the deployed CSP. */
export function validateEnquiryConfiguration(env, csp) {
  const endpoint = env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;
  if (!endpoint) return;
  let url;
  try { url = new URL(endpoint); } catch { throw new Error("Enquiry endpoint must be an absolute HTTPS URL."); }
  if (url.protocol !== "https:" || url.username || url.password || url.hash || endpoint !== endpoint.trim()) {
    throw new Error("Enquiry endpoint must use HTTPS without credentials, a fragment or surrounding spaces.");
  }
  for (const directive of ["connect-src", "form-action"]) {
    const sources = csp.split(";").map((part) => part.trim().split(/\s+/)).find((part) => part[0] === directive);
    if (!sources?.slice(1).includes(url.origin)) {
      throw new Error(`Enquiry endpoint origin must be explicitly approved in CSP ${directive} (vercel.json).`);
    }
  }
  const honeypot = env.NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD || "_gotcha";
  if (url.hostname === "api.formdall.de" && !env.NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD) {
    throw new Error("Copy NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD from the Formdall embed snippet before enabling enquiries.");
  }
  if (!/^[a-zA-Z_][a-zA-Z0-9_-]{0,99}$/.test(honeypot) || reserved.has(honeypot)) {
    throw new Error("Enquiry honeypot must be a valid field name that does not overwrite an enquiry field.");
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  nextEnv.loadEnvConfig(fileURLToPath(new URL("../", import.meta.url)));
  const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  const csp = config.headers.flatMap((rule) => rule.headers).find((header) => header.key === "Content-Security-Policy")?.value ?? "";
  try {
    validateEnquiryConfiguration(process.env, csp);
    console.log(`[enquiry] ${process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ? "Endpoint and spam-field configuration validated." : "Not configured; WhatsApp/email fallback stays active."}`);
  } catch (error) {
    console.error(`[enquiry] ${error.message}`);
    process.exitCode = 1;
  }
}
