import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, Mail, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { ThankYouTracker } from "@/components/contact/ThankYouTracker";

export const metadata: Metadata = pageMetadata({
  title: "Thank you",
  description: "Your enquiry has been received.",
  path: "/thank-you/",
  noindex: true,
});

/** §13 — confirms the enquiry, restates what happens next, offers urgent routes; noindex. */
export default function ThankYouPage() {
  const { responseTime, email } = site.contact;
  return (
    <section className="relative isolate overflow-hidden pb-[var(--section-y)] pt-[clamp(112px,12vw,160px)]">
      <div aria-hidden="true" className="hero-rings -z-10 opacity-70" />
      <ThankYouTracker />
      <div className="container-site flex max-w-[720px] flex-col items-center text-center">
        <span className="grid size-16 place-items-center rounded-full bg-accent-50 text-accent-700 ring-1 ring-accent-100">
          <CircleCheck aria-hidden="true" className="size-8" strokeWidth={1.6} />
        </span>
        <h1 className="type-hero mt-6">Thank you — we&apos;ve received your enquiry</h1>
        <p className="type-lead mt-4 max-w-[52ch]">
          A member of the {site.name} team will review your message and get back to you
          {responseTime ? ` ${responseTime}` : ""} using the contact details you provided.
        </p>
        <ol className="mt-8 w-full max-w-[520px] text-left">
          {[
            "We review your enquiry and the service you selected.",
            "We get back to you to understand your situation and explain the requirements.",
            "If you'd like to proceed, we explain our assistance and any service fee first.",
          ].map((step, i) => (
            <li key={step} className="flex items-start gap-3 border-b border-dashed border-line py-3 last:border-0">
              <span className="stepper-num !size-8 shrink-0 !text-sm" aria-hidden="true">
                {i + 1}
              </span>
              <span className="self-center text-[0.9375rem] text-ink-2">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-ink-2">Something urgent?</p>
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp"
            data-cta-location="thank-you"
            className="link-tertiary"
          >
            <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {email && (
            <a href={`mailto:${email}`} data-cta="email" className="link-tertiary">
              <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
              {email}
            </a>
          )}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/services/" location="thank-you">
            Back to Services
          </ButtonLink>
          <Link href="/" className="btn btn-light">
            <span className="btn-face">Go to Homepage</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
