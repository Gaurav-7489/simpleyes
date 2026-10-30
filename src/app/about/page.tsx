import type { Metadata } from "next";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/style";
import { PageHero } from "@/components/PageHero";
import { CardFrame } from "@/components/ui/CardFrame";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Transparency } from "@/components/home/Transparency";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `About ${site.name} — independent documentation assistance`,
  description: `${site.name} is an independent private service helping Indians in Germany with Indian consular and administrative paperwork. Not affiliated with any authority.`,
  path: "/about/",
});

const sections = [
  {
    title: "Who we serve",
    body: "Indian citizens and people of Indian origin living anywhere in Germany — individuals, families, students and working professionals.",
  },
  {
    title: "Why we exist",
    body: `Official instructions are detailed, change over time and differ by case and by consular jurisdiction. Many people simply want someone to explain what applies to them and help them prepare properly. That is the gap ${site.name} fills.`,
  },
  {
    title: "Our approach",
    body: "Human-led and practical. We listen to your situation, explain the published requirements in plain language, help you organise and check your paperwork, and follow up as you prepare. You stay in control of your application.",
  },
  {
    title: "How we reduce confusion",
    body: "One conversation, one checklist for your case, clear next steps, and a person to ask when something is unclear.",
  },
];

const facts = [
  { term: `What ${site.name} is`, detail: "An independent private documentation-assistance service." },
  { term: "Who we help", detail: "Indians and people of Indian origin living in Germany." },
  {
    term: "What we help with",
    detail: "Passport, OCI, attestation and legalisation, affidavits and declarations, family and student paperwork.",
  },
  { term: "Where", detail: site.coverageStatement },
  { term: "How to reach us", detail: `WhatsApp ${site.whatsapp.display}.` },
  {
    term: "What we don't do",
    detail: "Issue documents, approve applications, attest or notarise, guarantee appointments or speed up official processing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About"
        title="Practical help with Indian paperwork in Germany"
        lead={`${site.name} exists to make Indian consular and administrative paperwork easier to understand for people living in Germany — with clear explanations, careful preparation and honest boundaries.`}
        crumbs={[{ name: "About", path: "/about/" }]}
      >
        <WhatsAppButton>Talk to {site.name}</WhatsAppButton>
        <ButtonLink href="/services/" variant="light">
          Our Services
        </ButtonLink>
      </PageHero>

      <section aria-label={`About ${site.name}`} className="pb-[var(--section-y)]">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {sections.map((s, i) => (
            <div key={s.title} data-reveal style={revealDelay((i % 2) * 90)}>
              <CardFrame className="h-full" cardClassName="flex h-full flex-col gap-3">
                <h2 className="type-card-title">{s.title}</h2>
                <p className="type-body">{s.body}</p>
              </CardFrame>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="about-facts" className="section bg-canvas">
        <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="flex flex-col gap-5" data-reveal>
            <h2 id="about-facts" className="type-h2 max-w-[14ch]">
              {site.name} at a glance
            </h2>
            <p className="max-w-[56ch] rounded-[14px] bg-canvas-alt px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-2">
              <strong className="font-medium text-ink">Independent status:</strong> {site.disclosure}
            </p>
          </div>
          <div data-reveal>
            <CardFrame>
              <dl className="divide-y divide-dashed divide-black/15">
                {facts.map((fact) => (
                  <div key={fact.term} className="grid gap-1 py-4 first:pt-1 last:pb-1 sm:grid-cols-[180px_1fr] sm:gap-6">
                    <dt className="text-sm font-medium text-ink">{fact.term}</dt>
                    <dd className="text-sm leading-relaxed text-ink-2">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </CardFrame>
          </div>
        </div>
      </section>

      <Transparency />
      <FinalCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about/" }])} />
    </>
  );
}
