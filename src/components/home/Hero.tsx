import { ShieldCheck } from "lucide-react";
import { marqueeItems } from "@/content/home";
import { site } from "@/content/site";
import { revealDelay } from "@/lib/style";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { LazyHeroPhysics } from "@/components/home/LazyHeroPhysics";

/** Reference hero: centered pill label, oversized two-line headline with a glass word, two CTAs, marquee. */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-[clamp(56px,7vw,100px)] pt-[clamp(120px,11vw,160px)]"
    >
      <div aria-hidden="true" className="hero-rings -z-10" />
      <div aria-hidden="true" className="hero-orb -z-10" />
      <LazyHeroPhysics />

      <div className="container-site flex flex-col items-center text-center">
        <p className="badge hero-intro">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ink" />
          {site.tagline}
        </p>

        <h1 id="hero-title" className="type-hero hero-intro mt-7 max-w-[1000px]" style={revealDelay(60)}>
          <span className="word-mask block">
            <span className="word-in" style={revealDelay(80)}>
              Indian documents,
            </span>
          </span>
          <span className="mt-[0.06em] inline-block">
            <span className="glass-word word-pop" style={revealDelay(420)}>
              made clear.
            </span>
          </span>
        </h1>

        <p
          className="type-lead hero-intro mt-6 max-w-[34rem] text-[0.9375rem] sm:text-base"
          style={revealDelay(140)}
        >
          Clear guidance for your Indian documentation in Germany. {site.name} helps you understand requirements, organise paperwork and prepare your application with personal
          guidance across passport, OCI and other documentation services.
        </p>

        <div
          className="hero-intro mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          style={revealDelay(200)}
        >
          <ButtonLink href="/services/" variant="light">
            Explore Services
          </ButtonLink>
          <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
        </div>

        <p className="hero-intro mt-6 max-w-[34ch] text-[0.8125rem] text-ink-2 sm:max-w-none" style={revealDelay(240)}>
          <ShieldCheck
            aria-hidden="true"
            className="mr-1.5 inline-block size-4 align-[-3px] text-accent-700"
            strokeWidth={1.75}
          />
          {site.heroNote}
        </p>
      </div>

      <div className="marquee mx-auto mt-[clamp(40px,5vw,64px)] max-w-[900px] overflow-hidden" aria-hidden="true">
        <div className="marquee-track gap-10 pr-10">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-2.5 font-display text-lg font-medium tracking-[-0.01em] text-ink/45">
              <span className="size-2 rounded-full bg-accent-500/70" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
