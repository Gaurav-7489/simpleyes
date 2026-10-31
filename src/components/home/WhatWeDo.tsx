import { Info, MapPin, MessagesSquare, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { revealDelay } from "@/lib/style";

const facts = [
  { icon: MapPin, label: "Across Germany" },
  { icon: ShieldCheck, label: "Independent service" },
  { icon: MessagesSquare, label: "Form, WhatsApp or email" },
];

/** Agencee "What we do": a centered three-line statement with a muted middle line and fact pills. */
export function WhatWeDo() {
  return (
    <section aria-labelledby="intro-title" className="section bg-white">
      <div className="container-site flex flex-col items-center text-center">
        <div data-reveal>
          <Badge icon={<Info className="size-3.5" strokeWidth={2} />}>What we do</Badge>
        </div>
        <h2 id="intro-title" className="statement mt-7">
          <span className="block" data-reveal style={revealDelay(80)}>
            Less confusion.
          </span>
          <span className="block text-ink-3/70" data-reveal style={revealDelay(200)}>
            More clarity.
          </span>
          <span className="block" data-reveal style={revealDelay(320)}>
            Better prepared.
          </span>
        </h2>
        <p className="type-lead mt-7 max-w-[46ch]" data-reveal style={revealDelay(440)}>
          We help Indians in Germany understand what applies, organise their documents and know the next step.
        </p>
        <ul className="mt-9 flex flex-wrap justify-center gap-4" data-reveal style={revealDelay(560)}>
          {facts.map(({ icon: FactIcon, label }) => (
            <li key={label} className="fact-pill">
              <span className="orb-glass size-9" aria-hidden="true">
                <FactIcon className="size-4" strokeWidth={1.75} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
