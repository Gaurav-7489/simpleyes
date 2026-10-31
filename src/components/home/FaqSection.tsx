import Link from "next/link";
import { ArrowRight, CircleHelp } from "lucide-react";
import { homeFaqs } from "@/content/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/FaqList";

/** §07 section 9 — selected FAQs (same wording as the FAQ page — single source of truth). */
export function FaqSection() {
  return (
    <section id="faqs" aria-labelledby="faq-title" className="section bg-white">
      <div className="container-site max-w-[1080px]">
        <SectionHeading id="faq-title" icon={<CircleHelp className="size-3.5" strokeWidth={2} />} badge="FAQs" title="Common questions" />
        <div className="mt-10" data-reveal>
          <FaqList items={homeFaqs} columns={2} />
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/faqs/" className="link-tertiary">
            View all FAQs
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
