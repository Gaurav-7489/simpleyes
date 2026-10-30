import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `FAQs — ${site.name} documentation assistance in Germany`,
  description: `Answers about ${site.name}: what we do, whether we are part of the Embassy (we are not), fees, how requirements are established, and questions by service.`,
  path: "/faqs/",
});

const serviceGroups = services.filter((service) => service.faqs.length > 0);

export default function FaqsPage() {
  return (
    <>
      <PageHero
        badge="FAQs"
        title="Questions & answers"
        lead={`Clear answers about what ${site.name} does, what it doesn't do, and how to get started.`}
        crumbs={[{ name: "FAQs", path: "/faqs/" }]}
      />
      <section aria-labelledby="general-faqs" className="pb-[var(--section-y)]">
        <div className="container-site max-w-[1080px]">
          <h2 id="general-faqs" className="type-h2 mb-8 text-center">
            General
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <section aria-labelledby="service-faqs" className="section bg-canvas-alt">
        <div className="container-site max-w-[1080px]">
          <h2 id="service-faqs" className="type-h2 text-center">
            By service
          </h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1">
            {serviceGroups.map((service) => (
              <li key={service.slug}>
                <a href={`#${service.slug}`} className="inline-flex min-h-8 items-center text-sm text-ink-2 underline underline-offset-4 hover:text-ink">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-12">
            {serviceGroups.map((service) => (
              <div key={service.slug} id={service.slug} className="scroll-mt-[calc(var(--header-h)+24px)]">
                <h3 className="type-card-title mb-5">
                  <Link href={`/services/${service.slug}/`} className="underline-offset-4 hover:underline">
                    {service.title}
                  </Link>
                </h3>
                <FaqList items={service.faqs} openFirst={false} headingLevel="h4" />
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-[64ch] text-center text-[0.8125rem] leading-relaxed text-ink-2">
            {site.disclosure}
          </p>
          <p className="mt-3 text-center text-xs text-ink-3">Content last reviewed: {site.legal.lastUpdated}</p>
        </div>
      </section>
      <FinalCta />
      <JsonLd
        data={[
          faqJsonLd([...faqs, ...serviceGroups.flatMap((service) => service.faqs)]),
          breadcrumbJsonLd([{ name: "FAQs", path: "/faqs/" }]),
        ]}
      />
    </>
  );
}
