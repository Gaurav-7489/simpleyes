import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { revealDelay } from "@/lib/style";

const facts = ["Across Germany", "Independent service", "Form, WhatsApp or email"];

/** §07 section 2 — Introduction, as an editorial split: statement left, detail right (≤ ~80 words). */
export function WhatWeDo() {
  return (
    <section aria-labelledby="intro-title" className="section bg-white">
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div data-reveal>
          <Badge index="01">About SimplYes</Badge>
          <h2 id="intro-title" className="type-h2 mt-5 max-w-[16ch]">
            Documentation help, <span className="text-accent-700">explained clearly</span>
          </h2>
        </div>
        <div className="lg:pt-12" data-reveal style={revealDelay(100)}>
          <p className="font-display text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-snug text-ink">
            {site.name} is an independent documentation assistance service for Indian nationals living in Germany —
            professionals, students, families, long-term residents and employers.
          </p>
          <p className="type-lead mt-4">
            Requirements are often scattered and hard to follow. We help you understand what applies, prepare and organise
            your documents, and know your next step.
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-ink">
            {facts.map((label, i) => (
              <li key={label} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-accent-300" />}
                {label}
              </li>
            ))}
          </ul>
          <Link href="/about/" className="link-tertiary mt-5">
            Learn about us
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
