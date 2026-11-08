import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeFaqs } from "@/content/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/FaqList";

/** Common questions — same wording as the FAQ page (single source of truth). */
export function FaqSection() {
  return (
    <section id="faqs" aria-labelledby="faq-title" className="section">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <SectionHeading
            id="faq-title"
            badge="FAQs"
            title="Common questions"
            lead="Short answers to what people ask first. Anything else — just ask us."
            align="left"
          />
          <Link href="/faqs/" className="link-tertiary" data-reveal>
            View all FAQs
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
        <div data-reveal>
          <FaqList items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
