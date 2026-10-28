import type { Metadata } from "next";
import { ListChecks, MapPin, MessageCircle, ShieldAlert } from "lucide-react";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { breadcrumbJsonLd, contactPageJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CardFrame } from "@/components/ui/CardFrame";
import { WhatsAppButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Contact Simplyes on WhatsApp",
  description:
    "Contact Simplyes on WhatsApp for help with Indian consular and administrative processes. We assist customers across Germany.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Let's talk about your next step"
        lead="The quickest way to reach Simplyes is WhatsApp. Tell us briefly what you need help with and we'll take it from there."
        crumbs={[{ name: "Contact", path: "/contact/" }]}
      >
        <WhatsAppButton topic="general">Chat With Us on WhatsApp</WhatsAppButton>
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
                href={whatsappHref("general")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-topic="general"
                className="font-display text-2xl tracking-[-0.02em] text-ink underline decoration-black/20 underline-offset-[6px] hover:decoration-black/60 sm:text-3xl"
              >
                {site.whatsapp.display}
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
              <div className="mt-auto flex flex-wrap gap-3">
                <WhatsAppButton topic="documents" variant="light" size="sm" icon="none">
                  Document question
                </WhatsAppButton>
                <WhatsAppButton topic="application" variant="light" size="sm" icon="none">
                  Application help
                </WhatsAppButton>
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
                  Which process you&apos;re dealing with and what you&apos;d like help with. Please don&apos;t send
                  copies of passports or other sensitive documents in your first message.
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
        </div>
      </section>

      <JsonLd data={[contactPageJsonLd(), breadcrumbJsonLd([{ name: "Contact", path: "/contact/" }])]} />
    </>
  );
}
