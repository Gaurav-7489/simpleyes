import { site } from "@/content/site";
import type { Service } from "@/content/services";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppButton } from "@/components/ui/Button";

/** Concluding conversion block, framed like the reference cards with the hero orb behind. */
export function FinalCta({
  title = "Need help with your Indian documents?",
  lead = "Tell us what you need on WhatsApp. A real person will reply and explain the next step.",
  service,
}: {
  title?: string;
  lead?: string;
  service?: Service;
}) {
  return (
    <section aria-labelledby="final-cta-title" className="section bg-canvas-alt">
      <div className="container-site">
        <div className="frame" data-reveal data-wa-anchor>
          <div className="frame-inner">
            <div className="relative isolate overflow-hidden rounded-[8px] bg-canvas px-6 py-[clamp(56px,7vw,96px)] text-center shadow-[var(--shadow-card)]">
              <div aria-hidden="true" className="hero-rings -z-10 opacity-80" />
              <div aria-hidden="true" className="hero-orb -z-10 !top-1/2 opacity-90" />
              <div className="flex flex-col items-center gap-6">
                <Badge>Get started</Badge>
                <h2 id="final-cta-title" className="type-h2 max-w-[16ch]">
                  {title}
                </h2>
                <p className="type-lead max-w-[40ch]">{lead}</p>
                <WhatsAppButton service={service} className="mt-2">
                  Chat on WhatsApp
                </WhatsAppButton>
                <p className="text-[0.8125rem] text-ink-2">
                  WhatsApp {site.whatsapp.display} · {site.coverageStatement}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
