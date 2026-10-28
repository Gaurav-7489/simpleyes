import type { Metadata } from "next";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "FAQs — Simplyes consular assistance in Germany",
  description:
    "Answers about Simplyes: what we do, whether we are part of the Embassy of India (we are not), what we can and cannot do, coverage across Germany, and how to get started.",
  path: "/faqs/",
});

export default function FaqsPage() {
  return (
    <>
      <PageHero
        badge="FAQs"
        title="Questions & answers"
        lead="Clear answers about what Simplyes does, what it doesn't do, and how to get started."
        crumbs={[{ name: "FAQs", path: "/faqs/" }]}
      />
      <section aria-label="Frequently asked questions" className="pb-[var(--section-y)]">
        <div className="container-site max-w-[1080px]">
          <h2 className="sr-only">Frequently asked questions</h2>
          <FaqList items={faqs} />
          <p className="mx-auto mt-10 max-w-[64ch] text-center text-[0.8125rem] leading-relaxed text-ink-2">
            {site.disclosure}
          </p>
          <p className="mt-3 text-center text-xs text-ink-3">Content last reviewed: {site.legal.lastUpdated}</p>
        </div>
      </section>
      <FinalCta />
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd([{ name: "FAQs", path: "/faqs/" }])]} />
    </>
  );
}
