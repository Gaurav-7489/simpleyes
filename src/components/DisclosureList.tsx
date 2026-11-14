"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { useHydrated } from "@/lib/useHydrated";

export type DisclosureItem = {
  /** Anchor id: /page/#id opens this item. */
  id: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
};

/**
 * Compact accordion for long page sections (owners' mockup: short pages, tap to expand). Same accessible
 * pattern as the FAQ list: a real heading containing <button aria-expanded aria-controls>, so headings stay
 * in the outline and the page stays short. Content is server-rendered and stays visible without JavaScript
 * (only `.js` pages collapse panels), so nothing is hidden from search engines or no-JS visitors.
 */
export function DisclosureList({ items, headingLevel = "h2" }: { items: DisclosureItem[]; headingLevel?: "h2" | "h3" }) {
  const hydrated = useHydrated();
  const Heading = headingLevel;
  const uid = useId();
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const openFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (items.some((item) => item.id === hash)) setOpen((prev) => new Set(prev).add(hash));
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [items]);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `${uid}-${item.id}-b`;
        const panelId = `${uid}-${item.id}-p`;
        return (
          <div key={item.id} id={item.id} className="faq-item scroll-mt-[calc(var(--header-h)+24px)]" data-open={isOpen}>
            <Heading className="m-0">
              <button
                type="button"
                disabled={!hydrated}
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="faq-button"
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.title}</span>
                </span>
                <span className="faq-toggle" aria-hidden="true">
                  <Plus className="size-3.5" strokeWidth={1.75} />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-panel" data-open={isOpen}>
              <div className="disclosure-body">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
