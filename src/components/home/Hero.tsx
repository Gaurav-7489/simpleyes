import { ShieldCheck } from "lucide-react";
import { getAssistance, site } from "@/content/site";
import { homeHero } from "@/content/home";
import { revealDelay } from "@/lib/style";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { HeroVisual } from "@/components/home/HeroVisual";

/** Homepage hero (Concept 2): copy left, original Berlin illustration right; stacked on phones. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-[calc(var(--header-h)+12px)] lg:pt-[calc(var(--header-h)+20px)]">
      <div className="container-site">
        <div className="hero-shell grid lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="flex flex-col items-start px-6 pb-8 pt-10 sm:px-10 sm:pt-12 lg:justify-center lg:pb-28 lg:pl-14 lg:pr-4 lg:pt-14">
            <p className="hero-in text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink-3">{homeHero.eyebrow}</p>
            <h1 id="hero-title" className="type-hero hero-rise mt-5 max-w-[15ch]" style={revealDelay(40)}>
              {homeHero.titleLead} <span className="text-accent-word">{homeHero.titleAccent}</span>
            </h1>
            <p className="type-lead hero-in mt-5 max-w-[34rem]" style={revealDelay(120)}>
              {homeHero.lead}
            </p>
            <div className="hero-in mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={revealDelay(200)}>
              <ButtonLink href={getAssistance.href} location="hero">
                {getAssistance.label}
              </ButtonLink>
              <WhatsAppButton variant="light" location="hero">
                Chat on WhatsApp
              </WhatsAppButton>
            </div>
            <p className="hero-in mt-6 flex items-start gap-2 text-sm text-ink-2" style={revealDelay(260)}>
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
              {site.heroNote}
            </p>
          </div>

          <div className="hero-visual-in relative min-h-[260px] sm:min-h-[380px] lg:min-h-0" style={revealDelay(100)}>
            <HeroVisual className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
