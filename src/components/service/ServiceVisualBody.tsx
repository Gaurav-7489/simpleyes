import type { Service } from "@/content/services";
import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { SituationPicker } from "@/components/service/SituationPicker";

/**
 * Short, interactive service page body: pick your situation, read one sentence on how we help,
 * act on it. The FAQs, official sources and the closing CTA follow from the page.
 */
export function ServiceVisualBody({ service, ctaHref, ctaLabel }: { service: Service; ctaHref: string; ctaLabel: string }) {
  const tiles = service.visual.tiles.map((t, i) => ({ ...t, answer: service.situations[i]?.howWeHelp ?? "" }));
  return (
    <section aria-labelledby="situations" className="section !pt-0">
      <div className="container-site">
        <h2 id="situations" className="type-h2 text-center" data-reveal>
          Which one is you?
        </h2>
        <div data-reveal>
          <SituationPicker
            tiles={tiles}
            actions={
              <>
                <ButtonLink href={ctaHref} location="service-mid">
                  {ctaLabel}
                </ButtonLink>
                <WhatsAppButton service={service} variant="light" location="service-mid">
                  Ask on WhatsApp
                </WhatsAppButton>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
