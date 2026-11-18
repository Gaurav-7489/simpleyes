import Link from "next/link";
import { enquiryHref, type Service } from "@/content/services";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Closing invitation on every page: a dark green band with one primary action (the enquiry, pre-selecting the
 * service on service pages), WhatsApp as the alternative and the email address.
 */
export function FinalCta({
  title = "Let's make your Indian paperwork simpler.",
  lead = "Tell us your service and city. We reply with the exact documents and the next step.",
  service,
  primaryLabel = "Get Assistance",
  primaryHref,
  compact = false,
}: {
  title?: string;
  lead?: string;
  service?: Service;
  primaryLabel?: string;
  primaryHref?: string;
  /** Less vertical space around the band, for inner pages. */
  compact?: boolean;
}) {
  return (
    <section aria-labelledby="final-cta-title" className={compact ? "pb-[var(--section-y-compact)] pt-[calc(var(--section-y-compact)*0.5)]" : "section"}>
      <div className="container-site">
        <div className="cta-band cta2" data-wa-anchor>
          <h2 id="final-cta-title" className="cta2-title">
            {title}
          </h2>
          <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-white/80">{lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
                WhatsApp {site.whatsapp.display}
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </span>
            </a>
            {site.contact.email && (
              <a href={`mailto:${site.contact.email}`} data-cta="email" data-cta-location="final-cta" className="cta2-email">
                {site.contact.email.toLowerCase()}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
