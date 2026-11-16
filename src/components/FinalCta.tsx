import Link from "next/link";
import { enquiryHref, type Service } from "@/content/services";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Closing invitation (redesign, Nov 2026): a dark rounded band with one primary action (the enquiry,
 * pre-selecting the service on service pages), WhatsApp with the number, and the email address.
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
  /** Slightly shorter band for inner pages. */
  compact?: boolean;
}) {
  const email = site.contact.email?.toLowerCase();
  return (
    <section aria-labelledby="final-cta-title" className={compact ? "rd-section-compact" : "rd-section"}>
      <div className="container-site">
        <div className="cta-band rd-cta" data-wa-anchor>
          <h2 id="final-cta-title" className="rd-cta-title">
            {title}
          </h2>
          <p className="mt-5 max-w-[44ch] text-[1rem] leading-relaxed text-white/85">{lead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
            {email && (
              <a href={`mailto:${email}`} data-cta="email" data-cta-location="final-cta" className="rd-cta-mail">
                {email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
