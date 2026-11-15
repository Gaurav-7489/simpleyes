import Link from "next/link";
import { homeFaqs } from "@/content/faqs";
import { independenceStatement } from "@/content/home";
import { FaqList } from "@/components/FaqList";

/** Selected FAQs (same wording as the FAQ page — single source of truth), beside the independence statement. */
export function FaqSection() {
  return (
    <section id="faqs" aria-labelledby="faq-title" className="section faq-home">
      <div className="container-site faq-home-grid">
        <div>
          <h2 id="faq-title" className="type-h2 max-w-[12ch]">
            Common questions
          </h2>
          <p className="mt-6 max-w-[26rem] border-l-2 border-lime pl-4 text-[0.9875rem] leading-relaxed text-ink-2">
            {independenceStatement}
          </p>
          <p className="mt-6">
            <Link href="/faqs/" className="link-tertiary">
              Read all FAQs
            </Link>
          </p>
        </div>
        <FaqList items={homeFaqs} />
      </div>
    </section>
  );
}
