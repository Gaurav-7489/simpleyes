import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateEnquiryConfiguration } from "../../scripts/check-enquiry-config.mjs";

const config = JSON.parse(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"));
const csp = config.headers.flatMap((rule) => rule.headers).find((header) => header.key === "Content-Security-Policy").value;
const configured = {
  NEXT_PUBLIC_ENQUIRY_ENDPOINT: "https://api.formdall.de/api/v1/f/ci-mock-not-a-live-form",
  NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD: "_ci_honey",
};

test("the unconfigured site can build with working contact fallbacks", () => {
  assert.doesNotThrow(() => validateEnquiryConfiguration({}, csp));
});
test("the approved provider is allowed by both deployed CSP directives", () => {
  assert.doesNotThrow(() => validateEnquiryConfiguration(configured, csp));
});
test("personal details cannot be submitted to HTTP, a credential-bearing URL or an unapproved host", () => {
  for (const endpoint of ["http://api.formdall.de/submit", "https://user:password@api.formdall.de/submit", "https://example.com/submit", "/submit", "not-a-url"]) {
    assert.throws(() => validateEnquiryConfiguration({ ...configured, NEXT_PUBLIC_ENQUIRY_ENDPOINT: endpoint }, csp));
  }
});
test("an endpoint blocked by either CSP directive cannot be enabled", () => {
  for (const directive of ["connect-src", "form-action"]) {
    const blocked = csp.replace(new RegExp(`${directive}[^;]+`), `${directive} 'self'`);
    assert.throws(() => validateEnquiryConfiguration(configured, blocked));
  }
});
test("Formdall cannot be enabled with a guessed or missing spam-field name", () => {
  assert.throws(() => validateEnquiryConfiguration({ ...configured, NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD: "" }, csp));
});
test("the hidden field cannot overwrite customer information or metadata", () => {
  for (const name of ["email", "message", "subject", "service", "consent", "__proto__", "constructor", "utm_source"]) {
    assert.throws(() => validateEnquiryConfiguration({ ...configured, NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD: name }, csp));
  }
});
test("invalid spam-field names and malformed URLs are rejected", () => {
  for (const name of ["bad name", "a[b]", "_".repeat(101)]) {
    assert.throws(() => validateEnquiryConfiguration({ ...configured, NEXT_PUBLIC_ENQUIRY_HONEYPOT_FIELD: name }, csp));
  }
  for (const endpoint of [` ${configured.NEXT_PUBLIC_ENQUIRY_ENDPOINT}`, `${configured.NEXT_PUBLIC_ENQUIRY_ENDPOINT}#fragment`]) {
    assert.throws(() => validateEnquiryConfiguration({ ...configured, NEXT_PUBLIC_ENQUIRY_ENDPOINT: endpoint }, csp));
  }
});
