import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { faqs } from "@/content/faqs";
import { whatsappHref } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/FaqList";

export function FaqSection() {
  return (
    <section id="faqs" aria-labelledby="faq-title" className="section bg-canvas">
      <div className="container-site">
        <SectionHeading
          id="faq-title"
          badge="FAQs"
          title="Questions & answers"
          lead="Quick answers to the questions we hear most often."
        />
        <div className="mx-auto mt-12 max-w-[1000px] lg:mt-14" data-reveal>
          <FaqList items={faqs.slice(0, 6)} />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4" data-reveal>
          <p className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full bg-canvas-alt py-2 pl-2 pr-5 text-sm text-ink-2">
            <span className="orb size-9" aria-hidden="true">
              <MessageCircle className="size-4" strokeWidth={1.75} />
            </span>
            Still have a question?
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-topic="general"
              className="inline-flex min-h-8 items-center font-medium text-ink underline underline-offset-4"
            >
              Ask us on WhatsApp
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </a>
          </p>
          <Link href="/faqs/" className="inline-flex min-h-11 items-center px-2 text-sm text-ink-2 underline underline-offset-4 hover:text-ink">
            View all FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
