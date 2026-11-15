import { site } from "@/content/site";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { DocumentStage } from "@/components/scene/DocumentStage";

/**
 * Homepage hero: the headline set large across a 3D composition of documents that settle into place on
 * entry. Copy and both actions are ordinary HTML in front of the stage; the stage is decoration only.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="home-hero relative isolate">
      <div className="container-site home-hero-grid">
        <div className="home-hero-copy">
          <p className="home-hero-kicker hero-intro">{site.tagline}</p>
          <h1 id="hero-title" className="type-display hero-intro mt-5" style={revealDelay(40)}>
            <span className="block">Your Documentation Journey,</span>{" "}
            <span className="home-hero-indent block">Made Simpler.</span>
          </h1>
          <p className="type-lead hero-intro mt-6 max-w-[34rem]" style={revealDelay(100)}>
            From passport and OCI assistance to document preparation and family documentation, SimplYes helps Indians in
            Germany navigate complex administrative processes with clarity and confidence.
          </p>
          <div className="hero-intro mt-8 flex flex-col gap-3 sm:flex-row" style={revealDelay(160)}>
            <ButtonLink href="/#services" location="hero">
              Explore Services
            </ButtonLink>
            <ButtonLink href="/contact/" variant="light" location="hero">
              Get Assistance
            </ButtonLink>
          </div>
          <p className="home-hero-note hero-intro mt-7" style={revealDelay(220)}>
            Independent private service. Not an embassy, consulate or government authority.
          </p>
        </div>
        <div className="home-hero-stage">
          <DocumentStage scene="hero" intro tilt ratio="1 / 0.86" />
        </div>
      </div>
    </section>
  );
}
