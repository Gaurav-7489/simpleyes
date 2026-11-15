import type { Metadata } from "next";
import { about, independenceStatement } from "@/content/home";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `About Us — Independent Documentation Assistance | ${site.name}`,
  absoluteTitle: true,
  description:
    "Why SimplYes exists, our mission, vision and values, and how we work: independent documentation assistance for Indians living in Germany.",
  path: "/about/",
});

/** About: story, independence, mission & vision, values and how we work — the approved wording only. */
export default function AboutPage() {
  return (
    <>
      <PageHero title="About SimplYes" lead={about.intro} crumbs={[{ name: "About Us", path: "/about/" }]} scene="about" />

      <section aria-labelledby="our-story" className="section-tight">
        <div className="container-site service-split">
          <h2 id="our-story" className="type-h2 max-w-[10ch]">
            Our story
          </h2>
          <div>
            <p className="type-intro max-w-[30ch] text-ink">{about.story}</p>
            <div className="mt-10 max-w-[60ch] border-l-2 border-lime pl-5">
              <h3 className="type-card-title">Our independence</h3>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-2">{independenceStatement}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-vision" className="section-tight">
        <div className="container-site">
          <h2 id="mission-vision" className="sr-only">
            Mission and vision
          </h2>
          <div className="mv-grid">
            <div className="mv-block paper">
              <h3 className="font-display text-[1rem] font-medium text-accent-700">Mission</h3>
              <p className="type-intro mt-4 text-ink">{about.mission}</p>
            </div>
            <div className="mv-block mv-block-vision">
              <h3 className="font-display text-[1rem] font-medium text-lime">Vision</h3>
              <p className="type-intro mt-4 text-white">{about.vision}</p>
              <p className="mt-6 text-sm text-white/70">Our vision describes where we are heading, not services available today.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="section-tight">
        <div className="container-site">
          <h2 id="values" className="type-h2">
            Our values
          </h2>
          <dl className="values-grid mt-10">
            {about.values.map((value) => (
              <div key={value.title} className="value">
                <dt>{value.title}</dt>
                <dd>{value.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="how-we-work" className="section-tight">
        <div className="container-site service-split">
          <h2 id="how-we-work" className="type-h2 max-w-[10ch]">
            How we work
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="type-card-title">Customer-first approach</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">{about.customerFirst}</p>
            </div>
            <div>
              <h3 className="type-card-title">Clarity &amp; transparency</h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">{about.clarity}</p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta compact primaryLabel="Contact Us" primaryHref="/contact/" />
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about/" }])} />
    </>
  );
}
