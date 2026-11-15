import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { ThankYouTracker } from "@/components/contact/ThankYouTracker";
import { DocumentStage } from "@/components/scene/DocumentStage";

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
    <section className="page-hero" data-has-scene="">
      <ThankYouTracker />
      <div className="container-site page-hero-grid">
        <div className="page-hero-copy">
          <p className="font-display text-[1rem] text-accent-700">Enquiry received</p>
          <h1 className="type-page-title mt-5 max-w-[16ch]">Thank you — we&apos;ve received your enquiry</h1>
          <p className="type-lead mt-5 max-w-[40rem]">
            A member of the {site.name} team will review your message and get back to you
            {responseTime ? ` ${responseTime}` : ""} using the contact details you provided.
          </p>
          <h2 className="mt-10 text-[0.9375rem] font-medium text-ink">What happens next</h2>
          <ol className="quote-steps mt-4 max-w-[520px]">
            {[
              "We review your enquiry and the service you selected.",
              "We get back to you to understand your situation and explain the requirements.",
              "If you'd like to proceed, we explain our assistance and any service fee first.",
            ].map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-8 text-[0.9375rem] text-ink-2">Something urgent?</p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
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
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services/" location="thank-you">
              Back to Services
            </ButtonLink>
            <Link href="/" className="btn btn-light">
              <span className="btn-face">Go to Homepage</span>
            </Link>
          </div>
        </div>
        <div className="page-hero-stage" aria-hidden="true">
          <DocumentStage scene="thanks" intro ratio="1 / 0.8" />
        </div>
      </div>
    </section>
  );
}
