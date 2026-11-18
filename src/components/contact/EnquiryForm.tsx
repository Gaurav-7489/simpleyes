"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { CircleAlert, Loader2, MessageCircle, TriangleAlert } from "lucide-react";
import { track } from "@/lib/analytics";
import { selectionWhatsappMessage, whatsappHrefForMessage } from "@/lib/whatsapp";
import { clearEnquiryStorage, DRAFT_KEY, OTHER_ISSUE, OTHER_NOTE_KEY, readStored, writeStored } from "@/lib/enquiry-keys";
import { ENQUIRY_LIMITS } from "@/lib/enquiry-schema";
import { useHydrated } from "@/lib/useHydrated";

type ServiceOption = { slug: string; title: string; issues: { id: string; label: string }[] };

/** "Something else": valid for every service; the visitor then describes the problem in the message. */
const OTHER = OTHER_ISSUE;

type Props = {
  services: ServiceOption[];
  endpoint: string | null;
  /** Name of the form service's hidden anti-spam field (see site.enquiryHoneypotField). */
  honeypotField: string;
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
  /** Selected problem id (validated against the service), "other", "" (none), or null = use the URL. */
  issue: string | null;
  contactMethod: "" | "Email" | "Phone" | "WhatsApp";
  message: string;
  corporate: boolean | null;
  company: string;
  employees: string;
  consent: boolean;
};

type Field = "name" | "email" | "phone" | "service" | "issue" | "message" | "consent" | "company";
type Errors = Partial<Record<Field, string>>;

const MESSAGE_MIN = 20;
const MESSAGE_MAX = ENQUIRY_LIMITS.message;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s./-]{6,24}$/;
export const LEAD_FLAG = "simplyes-lead";

type Resolved = Omit<Values, "service" | "issue" | "corporate"> & { service: string; issue: string; corporate: boolean };

function validate(v: Resolved): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  else if (v.name.trim().length > ENQUIRY_LIMITS.name) e.name = `Please keep your name under ${ENQUIRY_LIMITS.name} characters.`;
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim()) || v.email.trim().length > ENQUIRY_LIMITS.email) e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a phone number with country code, e.g. +49 …";
  if (!v.service) e.service = "Please choose a service category.";
  const len = v.message.trim().length;
  // A specific problem already says what is needed, so the description is optional; otherwise ask for one.
  const needsMessage = !v.issue || v.issue === OTHER;
  if (needsMessage && !len) e.message = v.issue === OTHER ? "Please describe what you need help with." : "Please choose a problem above or tell us briefly what you need.";
  else if (needsMessage && len < MESSAGE_MIN) e.message = `Please add a little more detail (at least ${MESSAGE_MIN} characters).`;
  else if (len > MESSAGE_MAX) e.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  if (v.corporate && !v.company.trim()) e.company = "Please enter your company name.";
  else if (v.corporate && v.company.trim().length > ENQUIRY_LIMITS.company) e.company = `Please keep the company name under ${ENQUIRY_LIMITS.company} characters.`;
  if (!v.consent) e.consent = "Please confirm you have read the Privacy Policy.";
  return e;
}

const order: Field[] = ["name", "email", "service", "issue", "message", "phone", "company", "consent"];

/**
 * §13 enquiry form: visible labels, inline errors (aria-describedby, not colour
 * alone), focus moves to the first error, honeypot spam check, disabled +
 * "Sending…" state to block repeat submits, redirect to /thank-you/ only after
 * the endpoint accepts. No document uploads, ever.
 */
export function EnquiryForm({ services, endpoint, honeypotField, whatsappHref, email }: Props) {
  const hydrated = useHydrated();
  const router = useRouter();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const submitting = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  const [raw, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    city: "",
    service: null,
    issue: null,
    contactMethod: "",
    message: "",
    corporate: null,
    company: "",
    employees: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  useEffect(() => () => {
    document.documentElement.removeAttribute("data-form-focus");
    requestRef.current?.abort();
  }, []);
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
  const urlService = services.find((s) => s.slug === slugParam);
  const preService = urlService ? urlService.slug : "";
  // Only an issue that belongs to the URL's service is accepted; anything else is ignored.
  const issueParam = params.get("issue") ?? "";
  const preIssue = urlService && (issueParam === OTHER || urlService.issues.some((i) => i.id === issueParam)) ? issueParam : "";
  const resolvedService = raw.service ?? preService;
  const serviceOption = services.find((s) => s.slug === resolvedService);
  const rawIssue = raw.issue ?? (resolvedService === preService ? preIssue : "");
  const values: Resolved = {
    ...raw,
    service: resolvedService,
    issue: rawIssue === OTHER || serviceOption?.issues.some((i) => i.id === rawIssue) ? rawIssue : "",
    corporate: raw.corporate ?? context === "corporate",
  };
  const issueLabel =
    values.issue === OTHER ? "Something else" : serviceOption?.issues.find((i) => i.id === values.issue)?.label ?? "";
  const selectionHref = serviceOption
    ? whatsappHrefForMessage(selectionWhatsappMessage(serviceOption.title, values.issue && values.issue !== OTHER ? issueLabel : undefined))
    : whatsappHref;

  // Restore this tab's draft (e.g. after going Back to a service page) without overriding a fresh URL selection,
  // and pick up a "Something else" note typed on a service page.
  useEffect(() => {
    const draft = readStored<Partial<Values>>(DRAFT_KEY);
    const note = readStored<{ service?: string; note?: string }>(OTHER_NOTE_KEY);
    try {
      window.sessionStorage.removeItem(OTHER_NOTE_KEY);
    } catch {
      /* storage unavailable */
    }
    const fromUrl = Boolean(new URLSearchParams(window.location.search).get("service"));
    const text = (key: keyof Values) => (draft && typeof draft[key] === "string" ? (draft[key] as string).slice(0, 2200) : "");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore after hydration (sessionStorage is client-only)
    setValues((v) => ({
      ...v,
      name: v.name || text("name"),
      email: v.email || text("email"),
      phone: v.phone || text("phone"),
      city: v.city || text("city"),
      company: v.company || text("company"),
      message:
        v.message ||
        text("message") ||
        (note && typeof note.note === "string" && note.service === new URLSearchParams(window.location.search).get("service") ? note.note.slice(0, MESSAGE_MAX) : ""),
      // A new selection in the URL wins over the saved one.
      service: v.service ?? (!fromUrl && draft?.service ? draft.service : null),
      issue: v.issue ?? (!fromUrl && typeof draft?.issue === "string" ? draft.issue : null),
    }));
  }, []);

  // Keep the draft in this tab only (sessionStorage, 30-minute expiry), so Back/forward navigation never loses
  // what was typed. Consent is never saved; everything is removed once an enquiry is accepted.
  useEffect(() => {
    if (!started.current) return;
    const { consent: _consent, ...draft } = raw;
    void _consent;
    writeStored(DRAFT_KEY, draft);
  }, [raw]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    if (!started.current) {
      started.current = true;
      track("form_start", { form_id: "enquiry", service: values.service || undefined });
    }
    setValues((v) => {
      const next = { ...v, [key]: value };
      // Freeze the URL selection into state on first edit, so later changes start from what the visitor sees.
      if (next.service === null) next.service = values.service;
      if (next.issue === null) next.issue = values.issue;
      // A different service has different problems: reset the problem, keep everything else typed.
      if (key === "service" || (key === "corporate" && value === true)) {
        const svc = services.find((s) => s.slug === next.service);
        if (next.issue !== OTHER && !svc?.issues.some((i) => i.id === next.issue)) next.issue = "";
      }
      return next;
    });
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const id = (name: string) => `${uid}-${name}`;
  const describe = (name: Field, hint?: string) =>
    [errors[name] ? id(`${name}-error`) : null, hint ? id(`${name}-hint`) : null].filter(Boolean).join(" ") || undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
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
    const honeypot = (form.elements.namedItem(honeypotField) as HTMLInputElement | null)?.value;
    if (honeypot) {
      setStatus("failed");
      return;
    }
    if (!endpoint) {
      setStatus("failed");
      track("form_error", { field: "form", error_type: "not_configured" });
      return;
    }

    submitting.current = true;
    setStatus("sending");
    const params = new URLSearchParams(window.location.search);
    const service = services.find((s) => s.slug === values.service);
    // Field order matters: the form service lists fields in the notification email in this order.
    const clip = (value: string, max: number) => value.trim().slice(0, max);
    const sourcePage = document.referrer ? new URL(document.referrer, window.location.href).pathname : window.location.pathname;
    // Field order matters: the form service lists fields in the notification email in this order. The contract
    // (names, types, limits, allowed ids) is src/lib/enquiry-schema.ts, enforced again by the Formdall field schema.
    // Optional fields are sent only when filled in, so nothing empty reaches the provider or the inbox.
    const fields: [string, string][] = [
      ["subject", clip(`New Simplyes Enquiry — ${service?.title ?? "General"}${issueLabel ? ` — ${issueLabel}` : ""}`, ENQUIRY_LIMITS.subject)],
      ["name", values.name.trim()],
      ["email", values.email.trim()],
      ["phone", values.phone.trim()],
      ["city", clip(values.city, ENQUIRY_LIMITS.city)],
      ["service", service?.title ?? ""],
      ["service_id", service?.slug ?? ""],
      ["issue", issueLabel],
      ["issue_id", values.issue],
      ["preferred_contact", values.contactMethod],
      ["message", values.message.trim()],
      ["corporate", values.corporate ? "yes" : "no"],
      ["company", values.corporate ? values.company.trim() : ""],
      ["employees", values.corporate ? values.employees : ""],
      ["consent", "yes"],
      ["context", context],
      // Hidden metadata (§13): timestamp, source page, lead source.
      ["submitted_at", new Date().toISOString()],
      ["source_page", clip(sourcePage, ENQUIRY_LIMITS.sourcePage)],
      ["utm_source", clip(params.get("utm_source") ?? "", ENQUIRY_LIMITS.utm)],
      ["utm_medium", clip(params.get("utm_medium") ?? "", ENQUIRY_LIMITS.utm)],
      ["utm_campaign", clip(params.get("utm_campaign") ?? "", ENQUIRY_LIMITS.utm)],
    ];
    const payload: Record<string, string> = Object.fromEntries(fields.filter(([, value]) => value !== ""));
    // The service's honeypot must be present (and empty) or a JSON submission is rejected.
    payload[honeypotField] = "";

    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
        redirect: "error",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // A login/error page or malformed JSON with HTTP 200 is not proof of acceptance.
      // Formdall uses success:true; a compatible provider may use ok:true or HTTP 204.
      if (res.status !== 204) {
        const body: unknown = await res.json();
        if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("invalid_response");
        const reply = body as { success?: unknown; ok?: unknown; error?: unknown; errors?: unknown };
        if (reply.success === false || reply.ok === false || reply.error || reply.errors ||
            (reply.success !== true && reply.ok !== true)) throw new Error("rejected");
      }
      clearEnquiryStorage();
      try {
        window.sessionStorage.setItem(LEAD_FLAG, JSON.stringify({ service: service?.title ?? "", preferred_contact: values.contactMethod }));
      } catch {
        /* storage unavailable: the thank-you page simply won't fire the conversion event */
      }
      router.push("/thank-you/");
    } catch {
      submitting.current = false;
      setStatus("failed");
      track("form_error", { field: "form", error_type: "submission_failed" });
    } finally {
      window.clearTimeout(timeout);
      requestRef.current = null;
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
      aria-busy={sending}
    >
      <h2 id={id("title")} className="type-card-title !text-[1.5rem]">
        {context === "pricing" ? "Request a service quote" : context === "corporate" ? "Corporate enquiry" : "Get Assistance"}
      </h2>
      <p className="type-body mt-1">Tell us what you need and we&apos;ll get back to you. Fields marked * are required.</p>
      {serviceOption && (
        <p className="selection-summary mt-4" aria-live="polite">
          <span className="text-ink-3">Your selection:</span>{" "}
          <strong className="font-medium text-ink">{serviceOption.title}</strong>
          {issueLabel && (
            <>
              {" "}— <strong className="font-medium text-ink">{issueLabel}</strong>
            </>
          )}
          <span className="text-ink-3"> · you can change it below</span>
        </p>
      )}

      {!endpoint && (
        <p role="note" className="mt-4 flex items-start gap-2 rounded-[12px] border border-[#e8c46a] bg-[#fdf6e3] px-4 py-3 text-sm text-[#5c4510]">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
          <span>
            The online form is being connected. Until then, please reach us on{" "}
            <a href={selectionHref} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" className="font-medium underline underline-offset-4">
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
            <a href={selectionHref} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" className="font-medium underline underline-offset-4">
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

      <noscript>
        <p className="mt-4 text-sm text-ink-2">To send an online enquiry, enable JavaScript or contact us by email or WhatsApp.</p>
      </noscript>
      <fieldset disabled={!hydrated} className="mt-6 grid min-w-0 gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your enquiry details</legend>
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
          <label htmlFor={id("issue")} className="field-label">
            Selected problem
          </label>
          <select
            id={id("issue")}
            name="issue"
            value={values.issue}
            onChange={(e) => set("issue", e.target.value)}
            disabled={!serviceOption}
            aria-describedby={id("issue-hint")}
            className="field"
          >
            <option value="">{serviceOption ? "Choose a problem (optional)" : "Choose a service first"}</option>
            {serviceOption?.issues.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
            {serviceOption && <option value={OTHER}>Something else</option>}
          </select>
          <p id={id("issue-hint")} className="mt-1.5 text-sm text-ink-3">
            Picking a problem is enough — the description below is then optional.
          </p>
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


        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="field-label">
            Describe your problem{" "}
            {values.issue && values.issue !== OTHER ? (
              <span className="font-normal text-ink-3">(optional)</span>
            ) : (
              <span aria-hidden="true">*</span>
            )}
          </label>
          <textarea
            id={id("message")}
            name="message"
            required={!values.issue || values.issue === OTHER}
            maxLength={MESSAGE_MAX + 200}
            placeholder="Anything we should know — dates, family members, what you have tried…"
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

        {/* Honeypot (spam protection): hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("gotcha")}>Leave this field empty</label>
          <input id={id("gotcha")} name={honeypotField} type="text" tabIndex={-1} autoComplete="off" />
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
              and agree to Simplyes processing my details to respond to this enquiry. <span aria-hidden="true">*</span>
            </span>
          </label>
          {err("consent")}
        </div>
      </fieldset>

      <button type="submit" disabled={!hydrated || sending} aria-disabled={!hydrated || sending} className="btn btn-dark mt-7 w-full">
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
          <a href={selectionHref} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location="form" className="text-accent-700 underline underline-offset-4">
            Chat with us<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </span>
      </p>
    </form>
  );
}
