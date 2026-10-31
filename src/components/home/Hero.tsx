import { CircleCheck, ShieldCheck } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { LazyHeroPhysics } from "@/components/home/LazyHeroPhysics";

/** Chip anchor positions inside the illustration panel (fractions of width/height). */
const chipSpots: [number, number][] = [
  [0.22, 0.12],
  [0.74, 0.1],
  [0.12, 0.38],
  [0.88, 0.36],
  [0.13, 0.64],
  [0.87, 0.64],
  [0.26, 0.9],
  [0.74, 0.9],
];

const chipLabels: Record<string, string> = {
  "visa-documentation-support": "Visa & Documents",
  "affidavits-declarations": "Affidavits",
  "attestation-legalisation": "Attestation",
};

/**
 * §07 section 1: split layout — copy left, calm illustration right (below the copy on mobile).
 * H1 and supporting copy are the confirmed wording.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-[clamp(48px,6vw,96px)] pt-[clamp(96px,10vw,140px)]">
      <div aria-hidden="true" className="hero-rings -z-10 opacity-70" />
      <div className="container-site grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        <div className="flex flex-col items-start">
          <Badge className="hero-intro">{site.tagline}</Badge>
          <h1 id="hero-title" className="type-hero hero-intro mt-5 max-w-[16ch]" style={revealDelay(60)}>
            Your Documentation Journey, <span className="text-accent-700">Made Simpler.</span>
          </h1>
          <p className="type-lead hero-intro mt-5 max-w-[34rem]" style={revealDelay(120)}>
            From passport and OCI assistance to document preparation and family documentation, SimplYes helps Indians
            in Germany navigate complex administrative processes with clarity and confidence.
          </p>
          <div className="hero-intro mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={revealDelay(180)}>
            <ButtonLink href="/#services" location="hero">
              Explore Our Services
            </ButtonLink>
            <ButtonLink href="/contact/" variant="light" icon="none" location="hero">
              Get Assistance
            </ButtonLink>
          </div>
          <p className="hero-intro mt-6 flex items-start gap-2 text-sm text-ink-2" style={revealDelay(240)}>
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
            Independent service — not an embassy, consulate or government authority.
          </p>
        </div>

        {/* Illustration (decorative): the eight services around a preparation checklist. */}
        <div
          aria-hidden="true"
          className="hero-panel hero-intro relative h-[clamp(300px,58vw,480px)] select-none overflow-hidden rounded-[24px] border border-accent-100 bg-gradient-to-br from-white to-accent-50"
          style={revealDelay(140)}
        >
          <div className="hero-orb !top-1/2 !w-[120%] opacity-80" />
          <div
            data-core
            className="absolute left-1/2 top-1/2 w-[min(230px,68%)] sm:w-[min(230px,52%)] -translate-x-1/2 -translate-y-1/2 rounded-[16px] border border-line bg-white p-4 shadow-[0_24px_48px_-28px_rgb(19_33_29/0.45)]"
          >
            <p className="font-display text-sm font-medium text-ink">Your checklist</p>
            <ul className="mt-3 flex flex-col gap-2 text-[0.8125rem] text-ink-2">
              {["Situation understood", "Requirements explained", "Documents organised", "Next steps clear"].map((item, i) => (
                <li key={item} className="flex items-center gap-2">
                  <CircleCheck className={`size-4 shrink-0 ${i < 3 ? "text-accent-600" : "text-ink-3"}`} strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {services.map((service, i) => {
            const [x, y] = chipSpots[i] ?? [0.5, 0.5];
            return (
              <div
                key={service.slug}
                // Side chips (3–6) only fit from 640px; phones show the four top/bottom chips.
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${i >= 2 && i <= 5 ? "hidden sm:block" : ""}`}
                style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
              >
                <div data-chip className="physics-chip" style={{ animationDelay: `${i * 70}ms` }}>
                  <Icon name={service.icon} className="size-4 text-accent-700" />
                  {chipLabels[service.slug] ?? service.title.replace(" Services", "").replace(" Documentation", "")}
                </div>
              </div>
            );
          })}
          <LazyHeroPhysics />
        </div>
      </div>
    </section>
  );
}
