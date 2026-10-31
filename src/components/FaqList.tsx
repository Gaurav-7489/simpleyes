"use client";

import { useEffect, useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/faqs";

/**
 * Accessible FAQ accordion (§12/§14): <button aria-expanded aria-controls>,
 * multiple panels may be open, Enter/Space toggle, visible focus. Answers are
 * server-rendered; without JavaScript every answer stays visible. An item whose
 * id matches the URL hash opens automatically (deep links such as /faqs/#oci).
 */
export function FaqList({
  items,
  openFirst = false,
  headingLevel = "h3",
}: {
  items: Faq[];
  openFirst?: boolean;
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const Heading = headingLevel;
  const uid = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set(openFirst && items.length ? [0] : []));

  useEffect(() => {
    const openFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const index = items.findIndex((faq) => faq.id === hash);
      if (index >= 0) setOpen((prev) => new Set(prev).add(index));
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [items]);

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, i) => {
        const isOpen = open.has(i);
        const buttonId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <div key={faq.question} id={faq.id} className="faq-item scroll-mt-[calc(var(--header-h)+24px)]" data-open={isOpen}>
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="faq-button"
              >
                <span>{faq.question}</span>
                <span className="faq-toggle" aria-hidden="true">
                  <Plus className="size-3.5" strokeWidth={1.75} />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-panel" data-open={isOpen}>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
