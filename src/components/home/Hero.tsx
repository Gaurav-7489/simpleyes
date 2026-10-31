import { ShieldCheck } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroParallax } from "@/components/home/HeroParallax";

/**
 * §07 section 1, in the client-selected Agencee style: centered hero over a slow,
 * glassy sphere, the confirmed H1 with "Made Simpler." in a glass pill, two CTAs,
 * the independence note and a slow marquee of the eight services.
 * Entrance motion animates transform only (never opacity on the H1) so LCP is unaffected.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero relative isolate overflow-hidden pb-[clamp(56px,7vw,104px)] pt-[clamp(120px,12vw,176px)]"
    >
      <div aria-hidden="true" className="hero-rings -z-10" />
      <div aria-hidden="true" className="hero-sphere -z-10">
        <span className="hero-sphere-core" />
        <span className="hero-sphere-shine" />
        <span className="hero-sphere-rim" />
      </div>
      <HeroParallax />

      <div className="container-site flex flex-col items-center text-center">
        <p className="hero-pill hero-intro">
          <span aria-hidden="true" className="hero-pill-dot" />
          {site.tagline.replace(/\.$/, "")}
        </p>

        <h1 id="hero-title" className="hero-display mt-7 max-w-[20ch]">
          <span className="line-mask">
            <span className="line-rise" style={revealDelay(120)}>
              Your Documentation Journey,
            </span>
          </span>{" "}
          <span className="line-mask">
            <span className="line-rise" style={revealDelay(320)}>
              <span className="glass-pill">Made Simpler.</span>
            </span>
          </span>
        </h1>

        <p className="type-lead hero-intro mt-7 max-w-[36rem] !text-[clamp(1rem,0.95rem+0.3vw,1.1875rem)]" style={revealDelay(520)}>
          From passport and OCI assistance to document preparation and family documentation, SimplYes helps Indians in
          Germany navigate complex administrative processes with clarity and confidence.
        </p>

        <div className="hero-intro mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4" style={revealDelay(680)}>
          <ButtonLink href="/#services" variant="light" location="hero" className="w-full sm:w-auto">
            Explore Our Services
          </ButtonLink>
          <ButtonLink href="/contact/" icon="none" location="hero" className="w-full sm:w-auto">
            Get Assistance
          </ButtonLink>
        </div>

        <p className="hero-intro mt-6 flex items-start gap-2 text-sm text-ink-2" style={revealDelay(800)}>
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
          Independent service — not an embassy, consulate or government authority.
        </p>
      </div>

      <div aria-hidden="true" className="hero-marquee hero-fade marquee mx-auto mt-[clamp(48px,6vw,80px)] max-w-[980px] overflow-hidden" style={revealDelay(900)}>
        <div className="marquee-track gap-12 pr-12">
          {[...services, ...services].map((service, i) => (
            <span key={`${service.slug}-${i}`} className="flex shrink-0 items-center gap-2.5 font-display text-[1.125rem] font-medium tracking-[-0.01em] text-ink/40">
              <Icon name={service.icon} className="size-5" />
              {service.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
