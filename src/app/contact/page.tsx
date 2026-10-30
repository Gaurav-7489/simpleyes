import type { Metadata } from "next";
import { Clock, ListChecks, Mail, MapPin, MessageCircle, ShieldAlert } from "lucide-react";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { breadcrumbJsonLd, contactPageJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CardFrame } from "@/components/ui/CardFrame";
import { WhatsAppButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { PrivacyCard } from "@/components/PrivacyCard";

export const metadata: Metadata = pageMetadata({
  title: `Contact ${site.name} on WhatsApp`,
  description: `Contact ${site.name} on WhatsApp for help with Indian passport, OCI, attestation and other documentation paperwork. We assist customers across Germany.`,
  path: "/contact/",
});

/** Quick topics for the most common services (only those currently published). */
const quickTopics = ["passport-services", "oci-services", "attestation-legalisation", "visa-documentation-support"]
  .map(getService)
  .filter((service) => service !== undefined);

export default function ContactPage() {
  const { email, hours, responseTime } = site.contact;
  return (
    <>
      <PageHero
        badge="Contact"
        title={`Talk to ${site.name}`}
        lead="The quickest way to reach us is WhatsApp. Tell us briefly which service you need and what you'd like help with."
        crumbs={[{ name: "Contact", path: "/contact/" }]}
      >
        <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
      </PageHero>

      <section aria-label="Contact details" className="pb-[var(--section-y)]">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <div data-reveal>
            <CardFrame className="h-full" cardClassName="flex h-full flex-col gap-5">
              <span className="orb size-12" aria-hidden="true">
                <MessageCircle className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <h2 className="type-card-title">WhatsApp</h2>
                <p className="mt-2 type-body">Our primary contact channel for all enquiries.</p>
              </div>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-topic="general"
                className="font-display text-2xl tracking-[-0.02em] text-ink underline decoration-black/20 underline-offset-[6px] hover:decoration-black/60 sm:text-3xl"
              >
                {site.whatsapp.display}
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
              {email && (
                <p className="flex items-center gap-2 type-body">
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
                  <a href={`mailto:${email}`} className="inline-flex min-h-6 items-center underline underline-offset-4">
                    {email}
                  </a>
                </p>
              )}
              {(hours || responseTime) && (
                <p className="flex items-start gap-2 type-body">
                  <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
                  <span>{[hours, responseTime].filter(Boolean).join(" · ")}</span>
                </p>
              )}
              <div className="mt-auto flex flex-wrap gap-3">
                {quickTopics.map((service) => (
                  <WhatsAppButton key={service.slug} service={service} variant="light" size="sm" icon="none">
                    {service.shortTitle ?? service.title}
                  </WhatsAppButton>
                ))}
              </div>
            </CardFrame>
          </div>

          <div className="flex flex-col gap-6" data-reveal>
            <CardFrame cardClassName="flex items-start gap-4">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-700" strokeWidth={1.75} />
              <div>
                <h2 className="type-card-title">Service coverage</h2>
                <p className="mt-2 type-body">{site.coverageStatement} Assistance is provided remotely via WhatsApp.</p>
              </div>
            </CardFrame>
            <CardFrame cardClassName="flex items-start gap-4">
              <ListChecks aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-700" strokeWidth={1.75} />
              <div>
                <h2 className="type-card-title">What to include</h2>
                <p className="mt-2 type-body">
                  Which service you need and what you&apos;d like help with. Please don&apos;t send copies of passports
                  or other sensitive documents in your first message.
                </p>
              </div>
            </CardFrame>
            <CardFrame cardClassName="flex items-start gap-4">
              <ShieldAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-700" strokeWidth={1.75} />
              <div>
                <h2 className="type-card-title">Independent service</h2>
                <p className="mt-2 type-body">{site.shortDisclosure}</p>
              </div>
            </CardFrame>
          </div>
          <div className="md:col-span-2" data-reveal>
            <PrivacyCard />
          </div>
        </div>
      </section>

      <JsonLd data={[contactPageJsonLd(), breadcrumbJsonLd([{ name: "Contact", path: "/contact/" }])]} />
    </>
  );
}
