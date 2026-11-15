"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { FaqCategory } from "@/content/faqs";
import { FaqList } from "@/components/FaqList";
import { useHydrated } from "@/lib/useHydrated";

/**
 * FAQ page body (§12): category filter chips, a search box and one accordion per
 * category. All content is server-rendered; filtering only hides sections.
 * /faqs/#<category> selects that category; /faqs/#<question-id> opens a question.
 */
export function FaqBrowser({ categories }: { categories: FaqCategory[] }) {
  const hydrated = useHydrated();
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (categories.some((c) => c.id === hash)) setActive(hash);
      // A question deep link shows that question's category so it is never hidden by a filter.
      const owner = categories.find((c) => c.items.some((f) => f.id === hash));
      if (owner) {
        setActive(owner.id);
        setQuery("");
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [categories]);

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      categories
        .filter((c) => active === "all" || c.id === active)
        .map((c) => ({
          ...c,
          items: q ? c.items.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q)) : c.items,
        }))
        .filter((c) => c.items.length > 0),
    [categories, active, q],
  );

  return (
    <div>
      <div className="faq-tools">
        <div role="group" aria-label="Filter questions by category" className="flex flex-wrap gap-2">
          {[{ id: "all", label: "All" }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              disabled={!hydrated}
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className="faq-chip"
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="relative block md:w-80">
          <span className="sr-only">Search questions</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-3" strokeWidth={1.75} />
          <input
            type="search"
            disabled={!hydrated}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions"
            className="field !pl-10"
          />
        </label>
      </div>

      <p role="status" className="sr-only">
        {visible.reduce((n, c) => n + c.items.length, 0)} questions shown
      </p>

      {visible.length === 0 ? (
        <p className="mt-10 rounded-[16px] border border-dashed border-line-strong px-5 py-10 text-center text-ink-2">
          No questions match “{query}”. Try another word, or contact us with your question.
        </p>
      ) : (
        <div className="mt-12 flex flex-col gap-14">
          {visible.map((category) => (
            <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-[calc(var(--header-h)+24px)]">
              <h2 id={`${category.id}-title`} className="type-h2 mb-6 !text-[clamp(1.5rem,1.2rem+1.1vw,2.25rem)]">
                {category.label}
              </h2>
              <FaqList items={category.items} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
