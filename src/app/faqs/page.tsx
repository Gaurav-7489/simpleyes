import type { Metadata } from "next";
import { allFaqs, faqCategories } from "@/content/faqs";
import { site } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FaqBrowser } from "@/components/FaqBrowser";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `FAQs — Documentation Assistance Questions | ${site.name}`,
  absoluteTitle: true,
  description:
    "Answers about SimplYes: what we do, independence, services, process, pricing, privacy and service limitations. We are not a government service.",
  path: "/faqs/",
});

/** §12 — six categories, filter chips, search, accessible accordion, deep links. */
export default function FaqsPage() {
  return (
    <>
      <PageHero
        badge="FAQs"
        title="Questions & answers"
        lead={`Clear answers about what ${site.name} does, what it doesn't do, and how to get started.`}
        crumbs={[{ name: "FAQs", path: "/faqs/" }]}
      />
      <section aria-label="Frequently asked questions" className="pb-[var(--section-y)]">
        <div className="container-site max-w-[960px]">
          <FaqBrowser categories={faqCategories} />
        </div>
      </section>
      <FinalCta title="Still have a question?" lead="Contact us — a real person will get back to you." primaryLabel="Contact Us" primaryHref="/contact/" />
      <JsonLd data={[faqJsonLd(allFaqs), breadcrumbJsonLd([{ name: "FAQs", path: "/faqs/" }])]} />
    </>
  );
}
