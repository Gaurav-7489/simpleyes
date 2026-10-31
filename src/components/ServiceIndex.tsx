"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Icon } from "@/components/ui/Icon";
import { ServiceArt } from "@/components/illustrations/ServiceArt";

/**
 * Editorial service index (replaces the grid of identical cards): large numbered
 * rows on the left, a live preview on the right that follows hover/focus.
 * Every row is a real link (one tab stop each); the preview is decorative
 * (aria-hidden) because the row already carries the same text. On phones the
 * summary is shown inline under each row and the preview is hidden.
 */
export function ServiceIndex({ services, headingLevel = "h3" }: { services: Service[]; headingLevel?: "h2" | "h3" }) {
  const [active, setActive] = useState(0);
  const Heading = headingLevel;
  const current = services[active] ?? services[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
      <ul className="service-index">
        {services.map((service, i) => (
          <li key={service.slug} data-active={i === active}>
            <Link
              href={`/services/${service.slug}/`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="service-row group"
            >
              <span className="service-row-num" aria-hidden="true">
                {service.number}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <Heading className="service-row-title">{service.title}</Heading>
                <span className="service-row-summary">{service.summary}</span>
              </span>
              <span className="service-row-arrow" aria-hidden="true">
                <ArrowUpRight className="size-5" strokeWidth={1.75} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {current && (
        <div aria-hidden="true" className="hidden lg:block">
          <div className="service-preview sticky top-[calc(var(--header-h)+32px)]">
            <div key={current.slug} className="service-preview-inner">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[18px] bg-gradient-to-br from-white to-accent-50">
                <ServiceArt kind={current.illustration} uid={`idx-${current.slug}`} className="absolute inset-0 h-full w-full" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-ink ring-1 ring-line">
                  <Icon name={current.icon} className="size-4 text-accent-700" />
                  {current.mainlyFor}
                </span>
                <span className="absolute bottom-3 right-5 font-display text-[5.5rem] font-semibold leading-none text-accent-700/10">
                  {current.number}
                </span>
              </div>
              <p className="mt-5 font-display text-2xl font-medium leading-snug text-ink">{current.outcome}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {current.helpsWith.slice(0, 4).map((item) => (
                  <li key={item} className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.8125rem] text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
              <span className="link-tertiary mt-5">
                Open {current.title}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
