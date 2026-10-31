"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { CircleAlert, Loader2, MessageCircle, TriangleAlert } from "lucide-react";
import { track } from "@/lib/analytics";

type ServiceOption = { slug: string; title: string };

type Props = {
  services: ServiceOption[];
  endpoint: string | null;
  whatsappHref: string;
  email: string | null;
};

type Values = {
  name: string;
  email: string;
  phone: string;
  city: string;
  /** null = not chosen yet, so the URL pre-selection applies. */
  service: string | null;
  contactMethod: "" | "Email" | "Phone" | "WhatsApp";
  message: string;
  corporate: boolean | null;
  company: string;
  employees: string;
  consent: boolean;
};

type Field = "name" | "email" | "phone" | "service" | "message" | "consent" | "company";
type Errors = Partial<Record<Field, string>>;

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s./-]{6,24}$/;
export const LEAD_FLAG = "simplyes-lead";

type Resolved = Omit<Values, "service" | "corporate"> & { service: string; corporate: boolean };

function validate(v: Resolved): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  else if (v.name.trim().length > 100) e.name = "Please keep your name under 100 characters.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a phone number with country code, e.g. +49 …";
  if (!v.service) e.service = "Please choose a service category.";
  const len = v.message.trim().length;
  if (!len) e.message = "Please tell us briefly what you need.";
  else if (len < MESSAGE_MIN) e.message = `Please add a little more detail (at least ${MESSAGE_MIN} characters).`;
  else if (len > MESSAGE_MAX) e.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  if (v.corporate && !v.company.trim()) e.company = "Please enter your company name.";
  if (!v.consent) e.consent = "Please confirm you have read the Privacy Policy.";
  return e;
}

const order: Field[] = ["name", "email", "phone", "service", "company", "message", "consent"];

/**
 * §13 enquiry form: visible labels, inline errors (aria-describedby, not colour
 * alone), focus moves to the first error, honeypot spam check, disabled +
 * "Sending…" state to block repeat submits, redirect to /thank-you/ only after
 * the endpoint accepts. No document uploads, ever.
 */
export function EnquiryForm({ services, endpoint, whatsappHref, email }: Props) {
  const router = useRouter();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const [raw, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    city: "",
    service: null,
    contactMethod: "",
    message: "",
    corporate: null,
    company: "",
    employees: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  useEffect(() => () => document.documentElement.removeAttribute("data-form-focus"), []);
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");

  // Pre-selection from service pages: /contact/?service=<slug>&context=pricing|corporate (read from the URL, not state).
  const search = useSyncExternalStore(
    () => () => {},
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);
  const ctxParam = params.get("context") ?? "";
  const context = ctxParam === "pricing" || ctxParam === "corporate" ? ctxParam : "";
  const slugParam = params.get("service") ?? "";
  const preService = services.some((s) => s.slug === slugParam) ? slugParam : context === "corporate" ? "corporate-services" : "";
  const values: Resolved = {
    ...raw,
    service: raw.service ?? preService,
    corporate: raw.corporate ?? (context === "corporate" || preService === "corporate-services"),
  };

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    if (!started.current) {
      started.current = true;
      track("form_start", { form_id: "enquiry", service: values.service || undefined });
    }
    setValues((v) => {
      const next = { ...v, [key]: value };
      if (key === "corporate" && value === true) next.service = "corporate-services";
      if (key === "corporate" && next.service === null) next.service = values.service;
      return next;
    });
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const id = (name: string) => `${uid}-${name}`;
  const describe = (name: Field, hint?: string) =>
    [errors[name] ? id(`${name}-error`) : null, hint ? id(`${name}-hint`) : null].filter(Boolean).join(" ") || undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const found = validate(values);
    setErrors(found);
    const first = order.find((f) => found[f]);
    if (first) {
      for (const field of order) if (found[field]) track("form_error", { field, error_type: "validation" });
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Honeypot: real visitors never fill this hidden field.
    const honeypot = (form.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    if (honeypot) {
      router.push("/thank-you/");
      return;
    }
    if (!endpoint) {
      setStatus("failed");
      track("form_error", { field: "form", error_type: "not_configured" });
      return;
    }

    setStatus("sending");
    const params = new URLSearchParams(window.location.search);
    const service = services.find((s) => s.slug === values.service);
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      city: values.city.trim(),
      service: service?.title ?? values.service,
      preferred_contact: values.contactMethod,
      message: values.message.trim(),
      corporate: values.corporate ? "yes" : "no",
      company: values.corporate ? values.company.trim() : "",
      employees: values.corporate ? values.employees.trim() : "",
      consent: "yes",
      context,
      // Hidden metadata (§13): timestamp, source page, lead source.
      submitted_at: new Date().toISOString(),
      source_page: document.referrer ? new URL(document.referrer, window.location.href).pathname : window.location.pathname,
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      _subject: `New enquiry — ${service?.title ?? "General"}${values.city.trim() ? ` — ${values.city.trim()}` : ""}`,
      _gotcha: "",
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      try {
        window.sessionStorage.setItem(LEAD_FLAG, JSON.stringify({ service: service?.title ?? "", preferred_contact: values.contactMethod }));
      } catch {
        /* storage unavailable: the thank-you page simply won't fire the conversion event */
      }
      router.push("/thank-you/");
    } catch {
      setStatus("failed");
      track("form_error", { field: "form", error_type: "submission_failed" });
    }
  }

  const err = (name: Field) =>
    errors[name] ? (
      <p id={id(`${name}-error`)} className="field-error">
        <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
        {errors[name]}
      </p>
    ) : null;

  const messageLength = values.message.trim().length;
  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      id="enquiry"
      noValidate
      onSubmit={onSubmit}
      onFocus={() => document.documentElement.setAttribute("data-form-focus", "")}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) document.documentElement.removeAttribute("data-form-focus");
      }}
      className="card scroll-mt-[calc(var(--header-h)+24px)] !p-6 sm:!p-8"
      aria-labelledby={id("title")}
    >
      <h2 id={id("title")} className="type-card-title !text-[1.5rem]">
        {context === "pricing" ? "Request a service quote" : context === "corporate" ? "Corporate enquiry" : "Get Assistance"}
      </h2>
      <p className="type-body mt-1">Tell us what you need and we&apos;ll get back to you. Fields marked * are required.</p>

      {!endpoint && (
        <p role="note" className="mt-4 flex items-start gap-2 rounded-[12px] border border-[#e8c46a] bg-[#fdf6e3] px-4 py-3 text-sm text-[#5c4510]">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
          <span>
            The online form is being connected. Until then, please reach us on{" "}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" className="font-medium underline underline-offset-4">
              WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
            {email && (
              <>
                {" "}or by{" "}
                <a href={`mailto:${email}`} data-cta="email" className="font-medium underline underline-offset-4">
                  email
                </a>
              </>
            )}
            .
          </span>
        </p>
      )}

      {status === "failed" && (
        <div role="alert" className="mt-4 rounded-[12px] border border-[#f3b8b2] bg-[#fef3f2] px-4 py-3 text-sm text-[#7a271a]">
          <p className="font-medium">Your enquiry could not be sent.</p>
          <p className="mt-1">
            Your details are still here — please try again in a moment, or contact us on{" "}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" className="font-medium underline underline-offset-4">
              WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
            {email && (
              <>
                {" "}or{" "}
                <a href={`mailto:${email}`} data-cta="email" className="font-medium underline underline-offset-4">
                  email
                </a>
              </>
            )}
            .
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="field-label">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            className="field"
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={id("email")} className="field-label">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={160}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            className="field"
          />
          {err("email")}
        </div>
        <div>
          <label htmlFor={id("phone")} className="field-label">
            Phone (with country code)
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={24}
            placeholder="+49 …"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describe("phone")}
            className="field"
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={id("city")} className="field-label">
            City in Germany
          </label>
          <input
            id={id("city")}
            name="city"
            type="text"
            autoComplete="address-level2"
            maxLength={80}
            placeholder="e.g. Frankfurt"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            className="field"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("service")} className="field-label">
            Service category <span aria-hidden="true">*</span>
          </label>
          <select
            id={id("service")}
            name="service"
            required
            value={values.service}
            onChange={(e) => set("service", e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={describe("service")}
            className="field"
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          {err("service")}
        </div>

        <div className="sm:col-span-2">
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[0.9375rem] text-ink">
            <input
              type="checkbox"
              name="corporate"
              checked={values.corporate}
              onChange={(e) => set("corporate", e.target.checked)}
              className="size-5 shrink-0 accent-[var(--color-accent-700)]"
            />
            This is a corporate enquiry (for employers and HR teams)
          </label>
        </div>
        {values.corporate && (
          <>
            <div>
              <label htmlFor={id("company")} className="field-label">
                Company name <span aria-hidden="true">*</span>
              </label>
              <input
                id={id("company")}
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={120}
                value={values.company}
                onChange={(e) => set("company", e.target.value)}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={describe("company")}
                className="field"
              />
              {err("company")}
            </div>
            <div>
              <label htmlFor={id("employees")} className="field-label">
                Approximate number of employees
              </label>
              <select
                id={id("employees")}
                name="employees"
                value={values.employees}
                onChange={(e) => set("employees", e.target.value)}
                className="field"
              >
                <option value="">Prefer not to say</option>
                {["1–5", "6–20", "21–50", "More than 50"].map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <fieldset className="sm:col-span-2">
          <legend className="field-label">Preferred contact method</legend>
          <div className="flex flex-wrap gap-2">
            {(["Email", "Phone", "WhatsApp"] as const).map((method) => (
              <label
                key={method}
                className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-700 ${
                  values.contactMethod === method ? "border-accent-700 bg-accent-50 font-medium text-accent-900" : "border-line bg-white text-ink-2"
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={values.contactMethod === method}
                  onChange={() => set("contactMethod", method)}
                  className="sr-only"
                />
                {method}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="field-label">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={id("message")}
            name="message"
            required
            maxLength={MESSAGE_MAX + 200}
            placeholder="Tell us about your requirement…"
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describe("message", "hint")}
            className="field"
          />
          <p id={id("message-hint")} className="mt-1.5 flex justify-between gap-3 text-sm text-ink-3">
            <span>Please don&apos;t include passport numbers or other ID numbers.</span>
            <span aria-hidden="true" className={messageLength > MESSAGE_MAX ? "text-[#b42318]" : ""}>
              {messageLength}/{MESSAGE_MAX}
            </span>
          </p>
          {err("message")}
        </div>

        {/* Honeypot (spam protection): hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("gotcha")}>Leave this field empty</label>
          <input id={id("gotcha")} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-snug text-ink">
            <input
              type="checkbox"
              name="consent"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describe("consent")}
              className="mt-0.5 size-5 shrink-0 accent-[var(--color-accent-700)]"
            />
            <span>
              I have read the{" "}
              <Link href="/privacy/" className="text-accent-700 underline underline-offset-4">
                Privacy Policy
              </Link>{" "}
              and agree to SimplYes processing my details to respond to this enquiry. <span aria-hidden="true">*</span>
            </span>
          </label>
          {err("consent")}
        </div>
      </div>

      <button type="submit" disabled={sending} aria-disabled={sending} className="btn btn-dark mt-7 w-full">
        <span className="btn-face w-full">
          {sending ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send Enquiry"
          )}
        </span>
      </button>
      <p className="mt-3 text-center text-sm text-ink-2">Please don&apos;t include passport numbers or upload documents here.</p>
      <p className="mt-4 flex items-start justify-center gap-2 text-center text-sm text-ink-2">
        <MessageCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
        <span>
          Prefer WhatsApp?{" "}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location="form" className="text-accent-700 underline underline-offset-4">
            Chat with us<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </span>
      </p>
    </form>
  );
}
