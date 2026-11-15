import { ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { BerlinScene } from "@/components/illustrations/BerlinScene";

/**
 * §07 section 1: a full-screen hero. The existing Berlin scene fills the first screen edge to edge (lower half
 * on phones/tablets, right side from 1280px) under a soft wash that keeps the text readable. One headline,
 * one short line, Get Assistance as the primary action. The eight services follow in the next section.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-full relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-full-wash" />

      <div className="hero-full-copy container-site relative">
        <div className="flex max-w-[34rem] flex-col items-start">
          <p className="hero-intro eyebrow-caps">{site.tagline.replace(/\.$/, "")}</p>
          <h1 id="hero-title" className="type-hero hero-intro mt-4 max-w-[15ch]" style={revealDelay(60)}>
            Your Documentation Journey, <span className="text-accent-700">Made Simpler.</span>
          </h1>
          <p className="type-lead hero-intro mt-4 max-w-[30rem] !text-ink-2" style={revealDelay(120)}>
            Independent help for Indians in Germany with passport, OCI and other documentation.
          </p>
          <div className="hero-intro mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={revealDelay(180)}>
            <ButtonLink href="/contact/" location="hero">
              Get Assistance
            </ButtonLink>
            <ButtonLink href="/#services" variant="light" icon="none" location="hero">
              Explore Services
            </ButtonLink>
          </div>
          <p className="hero-intro mt-5 flex items-start gap-2 text-sm text-ink-2" style={revealDelay(240)}>
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
            Not an embassy, consulate or government authority.
          </p>
        </div>
      </div>

      {/* Full-bleed scene (decorative): a band under the text on phones/tablets, the right side from 1280px. */}
      <div aria-hidden="true" className="hero-full-art">
        <BerlinScene className="hero-full-svg" />
      </div>
    </section>
  );
}
