import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Target } from "lucide-react";
import { about, audiences, independenceStatement } from "@/content/home";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/Icon";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `About Us — Independent Documentation Assistance | ${site.name}`,
  absoluteTitle: true,
  description:
    "Why SimplYes exists, our mission, values and how we work: independent documentation assistance for Indians living in Germany.",
  path: "/about/",
});

/** About: identity, independent model, mission, who we help, approach, boundaries, contact. */
export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About SimplYes"
        title="Making documentation easier to understand and manage"
        lead={about.intro}
        crumbs={[{ name: "About Us", path: "/about/" }]}
      >
        <ButtonLink href="/contact/" location="about-hero">
          Contact Us
        </ButtonLink>
      </PageHero>

      {/* Story + mission */}
      <section aria-labelledby="our-story" className="section">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
          <div data-reveal>
            <h2 id="our-story" className="type-h2">
              Why we exist
            </h2>
            <p className="mt-6 font-display text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-snug text-ink">{about.story}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="card card-mint flex gap-4" data-reveal style={revealDelay(60)}>
              <Target aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-accent-700" strokeWidth={1.6} />
              <div>
                <h2 className="type-card-title">Mission</h2>
                <p className="type-body mt-1.5">{about.mission}</p>
              </div>
            </div>
            <div className="card flex gap-4" data-reveal style={revealDelay(120)}>
              <Compass aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-accent-700" strokeWidth={1.6} />
              <div>
                <h2 className="type-card-title">Vision</h2>
                <p className="type-body mt-1.5">{about.vision}</p>
                <p className="mt-2 text-xs text-ink-3">Our vision describes where we are heading, not services available today.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section aria-labelledby="who-we-help" className="section section-tint">
        <div className="container-site">
          <div className="max-w-[640px]" data-reveal>
            <h2 id="who-we-help" className="type-h2">
              Who we help
            </h2>
            <p className="type-lead mt-4">{site.coverageStatement} Each group links to the services that usually fit.</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {audiences.map((a, i) => (
              <li key={a.title} className="card flex flex-col gap-3 !bg-canvas !p-5 !shadow-none" data-reveal style={revealDelay((i % 5) * 50)}>
                <IconTile name={a.icon} size="sm" />
                <h3 className="type-card-title">{a.title}</h3>
                <p className="type-body flex-1 !text-[0.9375rem]">{a.body}</p>
                <ul className="flex flex-col gap-1">
                  {a.links.map((slug) => {
                    const s = getService(slug);
                    return s ? (
                      <li key={slug}>
                        <Link href={`/services/${slug}/`} className="link-tertiary !min-h-8 text-sm">
                          {s.title}
                          <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values" className="section">
        <div className="container-site">
          <h2 id="values" className="type-h2" data-reveal>
            Our values
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, i) => (
              <li key={value.title} className="border-t border-line pt-5" data-reveal style={revealDelay((i % 4) * 50)}>
                <h3 className="type-card-title">{value.title}</h3>
                <p className="type-body mt-2">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Independence + approach */}
      <section aria-label="Independence and approach" className="pb-[var(--section-y)]">
        <div className="container-site grid gap-4 lg:grid-cols-3">
          <div className="card card-mint flex flex-col gap-3" data-reveal>
            <h2 className="type-card-title flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
              Our independence
            </h2>
            <p className="type-body">{independenceStatement}</p>
            <Link href="/disclaimer/" className="link-tertiary mt-auto">
              Read our disclaimer
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </Link>
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
      <JsonLd data={[breadcrumbJsonLd([{ name: "About Us", path: "/about/" }]), aboutPageJsonLd()]} />
    </>
  );
}

function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${site.name}`,
    url: `${site.url}/about/`,
    about: { "@id": `${site.url}/#organization` },
  };
}
