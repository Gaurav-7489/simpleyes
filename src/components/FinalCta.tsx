import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { enquiryHref, type Service } from "@/content/services";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { DocumentStage } from "@/components/scene/DocumentStage";

/**
 * Closing invitation on every page: a dark folder band with an envelope composition. One primary action (the
 * enquiry, pre-selecting the service on service pages) and WhatsApp as the alternative.
 */
export function FinalCta({
  title = "Let's make your documentation journey simpler.",
  lead = "Tell us what you need. A real person will get back to you and explain the next step.",
  service,
  primaryLabel = service ? "Get Assistance With This Service" : "Get Assistance",
  primaryHref,
  compact = false,
}: {
  title?: string;
  lead?: string;
  service?: Service;
  primaryLabel?: string;
  primaryHref?: string;
  /** Slightly shorter band for inner pages. */
  compact?: boolean;
}) {
  return (
    <section aria-labelledby="final-cta-title" className={compact ? "pb-[var(--section-y-compact)] pt-[calc(var(--section-y-compact)*0.5)]" : "section"}>
      <div className="container-site">
        <div className="cta-band final-cta relative isolate overflow-hidden rounded-[32px]" data-compact={compact} data-wa-anchor>
          <div className="final-cta-copy">
            <h2 id="final-cta-title" className={`${compact ? "type-card-title !text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] !font-normal" : "type-h2"} max-w-[20ch] text-white`}>
              {title}
            </h2>
            <p className="mt-4 max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/80">{lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={primaryHref ?? enquiryHref(service)} data-cta-location="final-cta" className="btn btn-on-dark">
                <span className="btn-face">{primaryLabel}</span>
              </Link>
              <a
                href={whatsappHref(service)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-cta-location="final-cta"
                data-topic={service?.slug ?? "general"}
                className="btn btn-outline-on-dark"
              >
                <span className="btn-face">
                  <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  WhatsApp {site.whatsapp.display}
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </span>
              </a>
            </div>
          </div>
          <div className="final-cta-stage" aria-hidden="true">
            <DocumentStage scene="contact" ratio="1 / 0.8" />
          </div>
        </div>
      </div>
    </section>
  );
}
