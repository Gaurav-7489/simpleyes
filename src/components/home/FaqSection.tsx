import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeFaqs } from "@/content/faqs";
import { FaqList } from "@/components/FaqList";

/** §07 section 9 — selected FAQs (same wording as the FAQ page — single source of truth). */
export function FaqSection() {
  return (
    <section id="faqs" aria-labelledby="faq-title" className="section-home bg-white">
      <div className="container-site">
        <h2 id="faq-title" className="type-h2">
          Common questions
        </h2>
        <div className="mt-6">
          <FaqList items={homeFaqs} />
        </div>
        <div className="mt-5">
          <Link href="/faqs/" className="link-tertiary">
            View all FAQs
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
