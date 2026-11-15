import type { Metadata } from "next";
import Link from "next/link";
import { doesDoesNot, journeySteps } from "@/content/home";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { JourneyNarrative } from "@/components/JourneyNarrative";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: `How It Works — Five Clear Steps | ${site.name}`,
  absoluteTitle: true,
  description:
    "How SimplYes works in five steps — and the clear boundary between our documentation assistance and official processing by the authorities.",
  path: "/how-it-works/",
});

/** Five steps, the role boundary, does / does not, and what to expect. */
export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="How It Works"
        lead="A simple, guided process in five steps. Official processing, appointments and final decisions always remain with the relevant authorities."
        crumbs={[{ name: "How It Works", path: "/how-it-works/" }]}
      />

      <section aria-labelledby="steps-title" className="pb-[var(--section-y)]">
        <div className="container-site">
          <h2 id="steps-title" className="sr-only">
            The five steps
          </h2>
          <JourneyNarrative steps={journeySteps} />
          <p className="boundary mt-12">
            <span className="boundary-ours">Steps 1–5: documentation assistance by {site.name}.</span>
            <span className="boundary-theirs">Official processing, appointments and final decisions: the relevant authority.</span>
          </p>
        </div>
      </section>

      <section aria-labelledby="ledger-title" className="section-tight bg-canvas-alt">
        <div className="container-site">
          <h2 id="ledger-title" className="type-h2 max-w-[18ch]">
            Where our help starts and stops
          </h2>
          <div className="scope-grid mt-10">
            <div className="scope-col paper">
              <h3 className="type-card-title">What {site.name} does</h3>
              <ul className="check-list mt-5">
                {doesDoesNot.does.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="scope-col scope-col-out">
              <h3 className="type-card-title">What {site.name} does not do</h3>
              <ul className="check-list mt-5" data-variant="cross">
                {doesDoesNot.doesNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="expect-title" className="section-tight">
        <div className="container-site service-split">
          <h2 id="expect-title" className="type-h2 max-w-[12ch]">
            What to expect
          </h2>
          <dl className="expect-list">
            <div>
              <dt>Transparency</dt>
              <dd>Clear scope, and any service fee explained before paid assistance begins.</dd>
            </div>
            <div>
              <dt>Communication</dt>
              <dd>Start by form, WhatsApp or email. How we stay in touch is agreed with you.</dd>
            </div>
            <div>
              <dt>Getting started</dt>
              <dd>
                <Link href="/contact/" className="link-tertiary">
                  Send an enquiry
                </Link>{" "}
                — no documents are needed at this stage.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <FinalCta compact />
      <JsonLd data={breadcrumbJsonLd([{ name: "How It Works", path: "/how-it-works/" }])} />
    </>
  );
}
