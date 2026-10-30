import { Info, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { revealDelay } from "@/lib/style";

const facts = [
  { icon: MapPin, label: "Across Germany" },
  { icon: ShieldCheck, label: "Independent private service" },
  { icon: MessageCircle, label: "Real people on WhatsApp" },
];

/** Reference "What we do": centered editorial statement with muted highlight words + fact pills. */
export function WhatWeDo() {
  return (
    <section aria-labelledby="what-we-do-title" className="section bg-white/80">
      <div className="container-site flex flex-col items-center text-center">
        <div data-reveal>
          <Badge>What we do</Badge>
        </div>

        <h2 id="what-we-do-title" className="type-h2 mt-6" data-reveal style={revealDelay(60)}>
          <span className="block">Less confusion.</span>
          <span className="block text-ink-3">More clarity.</span>
          <span className="block">Better prepared.</span>
        </h2>

        <p className="type-intro mt-6 max-w-[38ch] !text-[clamp(1.0625rem,0.95rem+0.6vw,1.375rem)] text-ink-2" data-reveal style={revealDelay(120)}>
          Indian consular paperwork can involve detailed requirements, supporting documents and steps that differ by case
          and by consular jurisdiction.{" "}
          <span className="text-ink">
            {site.name} explains what applies to you, helps you organise and check your paperwork, and stays with you as
            you prepare — so you approach the official process ready.
          </span>
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-3" data-reveal style={revealDelay(180)}>
          {facts.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-3 rounded-full bg-canvas py-1.5 pl-1.5 pr-4 text-sm text-ink shadow-[0_0_0_1px_rgb(0_0_0/0.05),var(--shadow-card)]"
            >
              <span className="orb size-8">
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </span>
              {label}
            </li>
          ))}
        </ul>

        <p
          className="mt-8 inline-flex max-w-[60ch] items-start gap-2.5 rounded-[14px] bg-canvas-alt px-4 py-3 text-left text-[0.8125rem] leading-relaxed text-ink-2"
          data-reveal
          style={revealDelay(220)}
        >
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
          <span>{site.shortDisclosure}</span>
        </p>
      </div>
    </section>
  );
}
