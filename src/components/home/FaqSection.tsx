import Link from "next/link";
import { homeFaqs } from "@/content/faqs";

/** The four questions everyone asks, open by default (native <details>: works without JavaScript). */
export function FaqSection() {
  return (
    <section id="faqs" aria-labelledby="faq-title" className="section faq2">
      <div className="container-site faq2-grid">
        <div>
          <p className="eyebrow">FAQs</p>
          <h2 id="faq-title" className="type-h2 mt-4 max-w-[10ch]">
            Common questions
          </h2>
          <p className="mt-5 text-[0.9375rem] text-ink-2">
            More answers on the{" "}
            <Link href="/faqs/" className="link-inline">
              FAQs page
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {homeFaqs.map((faq) => (
            <details key={faq.question} className="faq-card" open>
              <summary>
                <h3>{faq.question}</h3>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
