"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/content/services";
import { Icon } from "@/components/ui/Icon";

const INTERVAL = 6000;

/**
 * Agencee-style service showcase. Left: the eight services as links with a
 * progress bar on the active one. Right (desktop): a composition of framed cards
 * for the active service that animates in — glossy orb + outcome, a ticking
 * checklist, and a number tile. Auto-advances slowly; pauses on hover/focus,
 * when off screen and for reduced motion. Phones get the list with taglines.
 */
export function ServiceShowcase({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = visible && !paused && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % services.length), INTERVAL);
    return () => clearTimeout(t);
  }, [running, active, services.length]);

  const current = services[active] ?? services[0];

  return (
    <div
      ref={rootRef}
      className="showcase"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul className="showcase-list">
        {services.map((service, i) => (
          <li key={service.slug} data-active={i === active} data-running={running}>
            <Link href={`/services/${service.slug}/`} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} className="showcase-item">
              <span className="showcase-icon" aria-hidden="true">
                <Icon name={service.icon} className="size-[18px]" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <h3 className="showcase-title">{service.title}</h3>
                <span className="showcase-tagline">{service.tagline}</span>
              </span>
              <ArrowRight aria-hidden="true" className="showcase-arrow size-4" strokeWidth={1.75} />
              <span aria-hidden="true" className="showcase-progress" style={{ animationDuration: `${INTERVAL}ms` }} />
            </Link>
          </li>
        ))}
      </ul>

      {current && (
        <div aria-hidden="true" className="showcase-stage">
          <div key={current.slug} className="showcase-comp">
            <div className="comp-main soft-frame">
              <div className="flex items-start justify-between">
                <span className="orb-glass size-14">
                  <Icon name={current.icon} className="size-6" />
                </span>
                <span className="comp-tag">Service {current.number}</span>
              </div>
              <p className="comp-headline">{current.outcome}</p>
              <span className="link-tertiary">
                Learn more about {current.title}
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </span>
            </div>
            <div className="comp-list soft-frame">
              <p className="comp-label">We help with</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {current.helpsWith.slice(0, 3).map((item, i) => (
                  <li key={item} className="comp-check" style={{ animationDelay: `${0.5 + i * 0.25}s` }}>
                    <span className="comp-tick">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="comp-pill soft-frame">
              <span className="orb-glass size-12 font-display text-sm font-semibold">{current.number}</span>
              <span className="comp-pill-count">
                {current.number}
                <span className="text-ink-3">/0{services.length}</span>
              </span>
              <span className="comp-pill-label">{current.mainlyFor}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
