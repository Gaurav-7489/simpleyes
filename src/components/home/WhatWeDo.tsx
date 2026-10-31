import { ArrowRight, MapPin, MessagesSquare, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { revealDelay } from "@/lib/style";

const facts = [
  { icon: MapPin, label: "Across Germany" },
  { icon: ShieldCheck, label: "Independent service" },
  { icon: MessagesSquare, label: "Form, WhatsApp or email" },
];

/** §07 section 2 — Introduction: who we are, who we serve, what we solve, how to reach us (≤ ~80 words). */
export function WhatWeDo() {
  return (
    <section aria-labelledby="intro-title" className="section bg-white">
      <div className="container-site flex max-w-[860px] flex-col items-center text-center">
        <div data-reveal>
          <Badge>About SimplYes</Badge>
        </div>
        <h2 id="intro-title" className="type-h2 mt-5" data-reveal style={revealDelay(60)}>
          Documentation help, explained clearly
        </h2>
        <p className="type-lead mt-5 max-w-[60ch]" data-reveal style={revealDelay(120)}>
          {site.name} is an independent documentation assistance service for Indian nationals living in Germany —
          professionals, students, families, long-term residents and employers.
        </p>
        <p className="type-lead mt-3 max-w-[60ch]" data-reveal style={revealDelay(160)}>
          Requirements are often scattered and hard to follow. We help you understand what applies, prepare and organise
          your documents, and know your next step. Start with a short enquiry, on WhatsApp or by email.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3" data-reveal style={revealDelay(200)}>
          {facts.map(({ icon: FactIcon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-canvas py-2 pl-2.5 pr-4 text-sm text-ink"
            >
              <FactIcon aria-hidden="true" className="size-4 text-accent-700" strokeWidth={1.75} />
              {label}
            </li>
          ))}
        </ul>
        <Link href="/about/" className="link-tertiary mt-6" data-reveal>
          Learn about us
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  );
}
