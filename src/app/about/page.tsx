import type { Metadata } from "next";
import {
  HeartHandshake,
  Lightbulb,
  LockKeyhole,
  MessagesSquare,
  Scale,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { about, independenceStatement } from "@/content/home";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { DisclosureList } from "@/components/DisclosureList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `About Us — Independent Documentation Assistance | ${site.name}`,
  absoluteTitle: true,
  description:
    "Why SimplYes exists, our mission, vision and values, and how we work: independent documentation assistance for Indians living in Germany.",
  path: "/about/",
});

const valueIcons: Record<string, LucideIcon> = {
  Clarity: Lightbulb,
  Trust: ShieldCheck,
  Responsibility: LockKeyhole,
  Convenience: MessagesSquare,
  Transparency: Scale,
  "Customer-first service": HeartHandshake,
  "Continuous improvement": TrendingUp,
};

/** §10 — intro, story, independence, values, mission & vision, approach, closing CTA — in the owners' short layout. */
export default function AboutPage() {
  return (
    <>
      <PageHero badge="About us" title="About SimplYes" lead={about.intro} crumbs={[{ name: "About Us", path: "/about/" }]} />

      <section aria-labelledby="our-story" className="pb-[var(--section-y-compact)]">
        <div className="container-site grid gap-3 lg:grid-cols-[1.4fr_1fr] lg:gap-4">
          <div className="card !p-5">
            <h2 id="our-story" className="type-card-title">
              Our story
            </h2>
            <p className="mt-2 font-display text-lg leading-snug text-ink">{about.story}</p>
          </div>
          <div className="card card-mint !p-5">
            <h2 className="type-card-title flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="size-5 text-accent-700" strokeWidth={1.75} />
              Our independence
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{independenceStatement}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="pb-[var(--section-y-compact)]">
        <div className="container-site">
          <h2 id="values" className="type-card-title !text-[1.375rem]">
            Our values
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {about.values.map((value) => {
              const ValueIcon = valueIcons[value.title] ?? Lightbulb;
              return (
                <li key={value.title} className="value-tile">
                  <span aria-hidden="true" className="icon-tile grid size-10 place-items-center rounded-[12px] text-accent-600">
                    <ValueIcon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-[1rem] font-medium leading-tight text-ink">{value.title}</h3>
                  <p className="text-[0.8125rem] leading-snug text-ink-2 sm:text-sm">{value.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-label="Mission, vision and approach" className="pb-[var(--section-y-compact)]">
        <div className="container-site">
          <DisclosureList
            items={[
              {
                id: "mission-vision",
                title: "Mission & vision",
                content: (
                  <div className="flex flex-col gap-3 type-body">
                    <p>
                      <strong className="font-medium text-ink">Mission:</strong> {about.mission}
                    </p>
                    <p>
                      <strong className="font-medium text-ink">Vision:</strong> {about.vision}
                    </p>
                    <p className="text-xs text-ink-3">Our vision describes where we are heading, not services available today.</p>
                  </div>
                ),
              },
              { id: "customer-first", title: "Customer-first approach", content: <p className="type-body">{about.customerFirst}</p> },
              { id: "clarity", title: "Clarity & transparency", content: <p className="type-body">{about.clarity}</p> },
            ]}
          />
        </div>
      </section>

      <FinalCta compact primaryLabel="Contact Us" primaryHref="/contact/" />
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about/" }])} />
    </>
  );
}
