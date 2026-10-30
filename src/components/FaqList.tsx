import { Plus } from "lucide-react";
import type { Faq } from "@/content/faqs";

/**
 * Reference FAQ: two columns of compact cards with a +/× toggle.
 * Built on native <details>/<summary>: keyboard and screen-reader accessible
 * with zero JavaScript; height animates where `::details-content` is supported.
 */
export function FaqList({
  items,
  openFirst = true,
  headingLevel = "h3",
}: {
  items: Faq[];
  openFirst?: boolean;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];
  return (
    <div className="grid items-start gap-4 md:grid-cols-2 md:gap-5">
      {columns.map((column, c) => (
        <div key={c} className="flex flex-col gap-4">
          {column.map((faq, i) => (
            <details key={faq.question} className="faq-item" open={openFirst && c === 0 && i === 0}>
              <summary>
                <Heading className="font-sans text-[0.9375rem] font-medium leading-snug">{faq.question}</Heading>
                <span className="faq-toggle" aria-hidden="true">
                  <Plus className="size-3.5" strokeWidth={1.75} />
                </span>
              </summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}
