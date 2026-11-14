import Link from "next/link";
import { FileText, Plane, ShieldCheck } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { revealDelay } from "@/lib/style";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { BerlinScene } from "@/components/illustrations/BerlinScene";

/** Short visual labels for the service strip; the link's accessible name is always the full title (§05). */
const shortLabels: Record<string, string> = {
  "passport-services": "Passport",
  "oci-services": "OCI",
  "attestation-legalisation": "Attestation",
  "affidavits-declarations": "Affidavits",
  "visa-documentation-support": "Visa Support",
  "family-documentation": "Family Docs",
  "student-services": "Student Services",
  "corporate-services": "Corporate Services",
};

/**
 * §07 section 1, in the owners' mockup layout: copy left, Berlin scene right (below on phones), and a
 * strip of the eight services under both. H1, supporting copy and CTAs are the confirmed wording.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-mint relative isolate overflow-hidden pb-[clamp(48px,6vw,96px)] pt-[clamp(112px,12vw,176px)]"
    >
      <div className="container-site">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12">
          <div className="flex flex-col items-start">
            <p className="hero-intro eyebrow-caps">{site.tagline.replace(/\.$/, "")}</p>
            <h1 id="hero-title" className="type-hero hero-intro mt-4 max-w-[15ch]" style={revealDelay(60)}>
              Your Documentation Journey, <span className="text-accent-500">Made Simpler.</span>
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

          {/* Decorative scene: Berlin at golden hour, with floating icon tiles. */}
          <div aria-hidden="true" className="hero-intro relative" style={revealDelay(140)}>
            <div className="scene-card aspect-[4/3] w-full sm:aspect-[16/11]">
              <BerlinScene className="absolute inset-0 size-full" />
            </div>
            <span className="float-tile left-[-10px] top-[58%] sm:left-[-18px]">
              <FileText className="size-6" strokeWidth={1.75} />
            </span>
            <span className="float-tile float-tile-b right-[14px] top-[12%]">
              <Plane className="size-5" strokeWidth={1.75} />
            </span>
          </div>
        </div>

        {/* Quick access to the eight services (mockup strip). */}
        <nav aria-label="Services" className="hero-intro mt-12 lg:mt-16" style={revealDelay(220)}>
          <ul className="service-strip">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}/`} className="service-strip-link" data-cta-location="hero-strip">
                  <Icon name={service.icon} className="size-6 text-accent-600" />
                  <span aria-hidden="true">{shortLabels[service.slug] ?? service.title}</span>
                  <span className="sr-only">{service.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
