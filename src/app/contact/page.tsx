import type { Metadata } from "next";
import Link from "next/link";
import { Building2, LockKeyhole, Mail, MapPin, MessageCircle } from "lucide-react";
import { enquiryHref, getService, services } from "@/content/services";
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
    "Contact SimplYes: send an enquiry, chat on WhatsApp, or use the corporate enquiry option. Documentation assistance for Indians across Germany.",
  path: "/contact/",
});

/** §13 — enquiry form, WhatsApp, email (when approved) and a separate corporate enquiry route. */
export default function ContactPage() {
  const { email, hours, responseTime } = site.contact;
  return (
    <>
      <PageHero
        badge="Contact"
        title="Get assistance"
        lead="Tell us what you need — a short description is enough. A real person will get back to you and explain the next step."
        crumbs={[{ name: "Contact Us", path: "/contact/" }]}
      />

      <section aria-label="Contact options" className="pb-[var(--section-y)]">
        <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <EnquiryForm
            services={services.map((s) => ({ slug: s.slug, title: s.title }))}
            endpoint={site.enquiryEndpoint}
            whatsappHref={whatsappHref()}
            email={email}
          />

          <div className="flex flex-col gap-4 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <div className="card flex flex-col gap-3">
              <h2 className="type-card-title flex items-center gap-2">
                <MessageCircle aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                WhatsApp
              </h2>
              <p className="type-body">Prefer to chat? Message us with the service you need.</p>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-cta-location="contact-aside"
                data-topic="general"
                className="font-display text-xl text-ink underline decoration-line underline-offset-[6px] hover:decoration-accent-700"
              >
                {site.whatsapp.display}
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
              {(hours || responseTime) && <p className="text-sm text-ink-2">{[hours, responseTime].filter(Boolean).join(" · ")}</p>}
            </div>

            {email && (
              <div className="card flex flex-col gap-3">
                <h2 className="type-card-title flex items-center gap-2">
                  <Mail aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                  Email
                </h2>
                <a href={`mailto:${email}`} data-cta="email" data-cta-location="contact-aside" className="text-[1.0625rem] text-accent-700 underline underline-offset-4">
                  {email}
                </a>
              </div>
            )}

            <div className="card flex flex-col gap-3">
              <h2 className="type-card-title flex items-center gap-2">
                <Building2 aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                Corporate enquiry
              </h2>
              <p className="type-body">
                For employers, HR and relocation teams. The corporate option pre-selects Corporate Services and asks for your
                company name and approximate team size.
              </p>
              <Link href={enquiryHref(getService("corporate-services"), "corporate")} className="link-tertiary">
                Start a corporate enquiry
              </Link>
            </div>

            <div className="card card-mint flex flex-col gap-3">
              <h2 className="type-card-title flex items-center gap-2">
                <LockKeyhole aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
                How we handle your details
              </h2>
              <p className="type-body">
                We use the details you send only to respond to your enquiry, as explained in our{" "}
                <Link href="/privacy/" className="text-accent-700 underline underline-offset-4">
                  Privacy Policy
                </Link>
                . Please don&apos;t send identity documents or passport numbers through the form.
              </p>
            </div>

            <p className="flex items-start gap-2 px-1 text-sm text-ink-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
              {site.coverageStatement}
            </p>
          </div>
        </div>
      </section>

      <JsonLd data={[contactPageJsonLd(), breadcrumbJsonLd([{ name: "Contact Us", path: "/contact/" }])]} />
    </>
  );
}
