import type { Metadata } from "next";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CardFrame } from "@/components/ui/CardFrame";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Transparency } from "@/components/home/Transparency";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "About Simplyes — independent consular assistance",
  description:
    "Simplyes is an independent private assistance service helping Indians living in Germany understand Indian consular and administrative processes. Not affiliated with any government authority.",
  path: "/about/",
});

const facts = [
  { term: "What Simplyes is", detail: "An independent private assistance service." },
  { term: "Who we help", detail: "Indians and people of Indian origin living in Germany." },
  {
    term: "What we help with",
    detail: "Understanding Indian consular and administrative requirements, documents, forms, photos, signatures and next steps.",
  },
  { term: "Where", detail: site.coverageStatement },
  { term: "How to reach us", detail: `WhatsApp ${site.whatsapp.display}.` },
  {
    term: "What we don't do",
    detail: "Issue documents, approve applications, guarantee appointments or speed up official processing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About"
        title="Redefining consular services, simply"
        lead="Simplyes exists to make Indian consular and administrative processes easier to understand for the Indian community in Germany — with clear explanations, careful preparation and honest boundaries."
        crumbs={[{ name: "About", path: "/about/" }]}
      >
        <WhatsAppButton topic="general">Talk to Simplyes</WhatsAppButton>
        <ButtonLink href="/services/" variant="light">
          Our Services
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="about-facts" className="pb-[var(--section-y)]">
        <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="flex flex-col gap-5" data-reveal>
            <h2 id="about-facts" className="type-h2 max-w-[14ch]">
              Simplyes at a glance
            </h2>
            <p className="type-lead max-w-[46ch]">
              Official procedures can be detailed and change over time. Many people simply want someone to explain
              what applies to them and help them prepare properly. That&apos;s the gap Simplyes fills — as a private
              service that is transparent about what it can and cannot do.
            </p>
          </div>
          <div data-reveal>
            <CardFrame>
              <dl className="divide-y divide-dashed divide-black/15">
                {facts.map((fact) => (
                  <div key={fact.term} className="grid gap-1 py-4 first:pt-1 last:pb-1 sm:grid-cols-[180px_1fr] sm:gap-6">
                    <dt className="text-sm font-medium text-ink">{fact.term}</dt>
                    <dd className="text-sm leading-relaxed text-ink-2">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </CardFrame>
          </div>
        </div>
      </section>

      <Transparency />
      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about/" }])} />
    </>
  );
}
