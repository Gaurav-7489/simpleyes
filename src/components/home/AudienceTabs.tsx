"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { IconKey } from "@/content/home";
import { Icon } from "@/components/ui/Icon";

export type AudiencePanel = {
  icon: IconKey;
  title: string;
  body: string;
  links: { href: string; label: string }[];
};

/**
 * WAI-ARIA tabs (§07 section 6 "Who we help"): arrow keys / Home / End move
 * between groups, each panel links to the relevant service pages. Without JS all
 * panels stay visible (the hidden state is applied only once hydrated).
 */
export function AudienceTabs({ groups }: { groups: AudiencePanel[] }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = groups.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (active + 1) % groups.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (active - 1 + groups.length) % groups.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
      <div role="tablist" aria-label="Who we help" aria-orientation="vertical" onKeyDown={onKey} className="audience-tabs">
        {groups.map((g, i) => (
          <button
            key={g.title}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className="audience-tab"
          >
            <span className="audience-tab-icon" aria-hidden="true">
              <Icon name={g.icon} className="size-5" />
            </span>
            <span className="font-display text-lg font-medium">{g.title}</span>
            <ArrowRight aria-hidden="true" className="audience-tab-arrow ml-auto size-4" strokeWidth={1.75} />
          </button>
        ))}
      </div>

      <div className="audience-stage">
        {groups.map((g, i) => (
          <div
            key={g.title}
            role="tabpanel"
            id={`${uid}-panel-${i}`}
            aria-labelledby={`${uid}-tab-${i}`}
            data-active={i === active}
            tabIndex={0}
            className="audience-panel"
          >
            <span aria-hidden="true" className="audience-panel-icon">
              <Icon name={g.icon} className="size-8" />
            </span>
            <h3 className="type-h2 !text-[clamp(1.5rem,1.2rem+1vw,2rem)] text-white">{g.title}</h3>
            <p className="mt-3 max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/85">{g.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="audience-link">
                    {l.label}
                    <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
