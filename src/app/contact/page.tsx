import type { Metadata } from "next";
import Link from "next/link";
import { Building2, LockKeyhole, Mail, MapPin, MessageCircle } from "lucide-react";
import { enquiryHref, services } from "@/content/services";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { breadcrumbJsonLd, contactPageJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `Contact Us — Get Assistance | ${site.name}`,
  absoluteTitle: true,
  description:
    "Contact Simplyes: send an enquiry, chat on WhatsApp, or use the corporate enquiry option. Documentation assistance for Indians across Germany.",
  path: "/contact/",
});

/** §13 — enquiry form, WhatsApp, email (when approved) and a separate corporate enquiry route. */
export default function ContactPage() {
  const { email, hours, responseTime } = site.contact;
  return (
    <>
      <PageHero
        title="Get assistance"
        lead="Pick your service and problem, add a few details, and a real person will get back to you."
        crumbs={[{ name: "Contact Us", path: "/contact/" }]}
      />

      <section aria-label="Contact options" className="pb-[var(--section-y)]">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <EnquiryForm
            services={services.map((s) => ({ slug: s.slug, title: s.title, issues: s.issues }))}
            endpoint={site.enquiryEndpoint}
            honeypotField={site.enquiryHoneypotField}
            whatsappHref={whatsappHref()}
            email={email}
          />

          <aside aria-label="Other ways to reach us" className="contact-aside lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <div className="contact-aside-block">
              <h2 className="type-card-title flex items-center gap-2.5">
                <MessageCircle aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                WhatsApp
              </h2>
              <p className="mt-2 text-[0.9375rem] text-ink-2">Prefer to chat? Message us with the service you need.</p>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-cta-location="contact-aside"
                data-topic="general"
                className="mt-3 inline-flex min-h-11 items-center font-display text-[1.375rem] text-ink underline decoration-line-strong decoration-1 underline-offset-[7px] hover:decoration-accent-700"
              >
                {site.whatsapp.display}
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
              {(hours || responseTime) && <p className="mt-1 text-sm text-ink-2">{[hours, responseTime].filter(Boolean).join(". ")}</p>}
            </div>

            {email && (
              <div className="contact-aside-block">
                <h2 className="type-card-title flex items-center gap-2.5">
                  <Mail aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                  Email
                </h2>
                <a
                  href={`mailto:${email}`}
                  data-cta="email"
                  data-cta-location="contact-aside"
                  className="mt-2 inline-flex min-h-11 items-center break-all text-[1.0625rem] text-accent-700 underline decoration-accent-300 underline-offset-4 hover:decoration-current"
                >
                  {email}
                </a>
              </div>
            )}

            <div className="contact-aside-block">
              <h2 className="type-card-title flex items-center gap-2.5">
                <Building2 aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                Corporate enquiry
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                For employers, HR and relocation teams. Asks for your company name and approximate team size.
              </p>
              <Link href={enquiryHref(undefined, "corporate")} className="link-tertiary mt-2">
                Start a corporate enquiry
              </Link>
            </div>

            <div className="contact-aside-block">
              <h2 className="type-card-title flex items-center gap-2.5">
                <LockKeyhole aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                How we handle your details
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                We use the details you send only to respond to your enquiry, as explained in our{" "}
                <Link href="/privacy/" className="link-tertiary !min-h-0 !inline">
                  Privacy Policy
                </Link>
                . Please don&apos;t send identity documents or passport numbers through the form.
              </p>
            </div>

            <p className="flex items-start gap-2 pt-5 text-sm text-ink-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
              {site.coverageStatement}
            </p>
          </aside>
        </div>
      </section>

      <JsonLd data={[contactPageJsonLd(), breadcrumbJsonLd([{ name: "Contact Us", path: "/contact/" }])]} />
    </>
  );
}
