import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { about, independenceStatement } from "@/content/home";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `About Us — Independent Documentation Assistance | ${site.name}`,
  absoluteTitle: true,
  description:
    "Why SimplYes exists, our mission, vision and values, and how we work: independent documentation assistance for Indians living in Germany.",
  path: "/about/",
});

/** §10 — company intro, story, mission & vision, values, independence, approach, clarity, closing CTA. */
export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About us"
        title="Making documentation easier to understand and manage"
        lead={about.intro}
        crumbs={[{ name: "About Us", path: "/about/" }]}
      >
        <ButtonLink href="/contact/" location="about-hero">
          Contact Us
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="our-story" className="pb-[var(--section-y)]">
        <div className="container-site grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="card lg:row-span-1" data-reveal>
            <h2 id="our-story" className="type-card-title">
              Our story
            </h2>
            <p className="mt-3 font-display text-xl leading-snug text-ink">{about.story}</p>
          </div>
          <div className="card card-mint" data-reveal style={revealDelay(60)}>
            <h2 className="type-card-title">Mission</h2>
            <p className="type-body mt-3">{about.mission}</p>
          </div>
          <div className="card card-mint" data-reveal style={revealDelay(120)}>
            <h2 className="type-card-title">Vision</h2>
            <p className="type-body mt-3">{about.vision}</p>
            <p className="mt-3 text-xs text-ink-3">Our vision describes where we are heading, not services available today.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="section bg-white">
        <div className="container-site max-w-[980px] text-center">
          <h2 id="values" className="type-h2" data-reveal>
            Our values
          </h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-3" data-reveal>
            {about.values.map((value) => (
              <li key={value.title} title={value.body} className="chip chip-strong !px-5 !py-3 !text-base">
                {value.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Independence and approach" className="section">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          <div className="card card-mint soft-frame flex flex-col gap-3" data-reveal>
            <h2 className="type-card-title flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
              Our independence
            </h2>
            <p className="type-body">{independenceStatement}</p>
          </div>
          <div className="card flex flex-col gap-3" data-reveal style={revealDelay(60)}>
            <h2 className="type-card-title">Customer-first approach</h2>
            <p className="type-body">{about.customerFirst}</p>
          </div>
          <div className="card flex flex-col gap-3" data-reveal style={revealDelay(120)}>
            <h2 className="type-card-title">Clarity &amp; transparency</h2>
            <p className="type-body">{about.clarity}</p>
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about/" }])} />
    </>
  );
}
