import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { enquiryHref, type Service } from "@/content/services";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Closing invitation: deep green band with Get Assistance (primary) and WhatsApp (secondary).
 * On service pages the CTA pre-selects that service in the enquiry form.
 */
export function FinalCta({
  title = "Let's make your documentation simpler.",
  lead = "Tell us what you need. A real person will get back to you and explain the next step.",
  service,
  primaryLabel = service ? "Get Assistance With This Service" : "Get Assistance",
  primaryHref,
}: {
  title?: string;
  lead?: string;
  service?: Service;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section aria-labelledby="final-cta-title" className="pb-[var(--section-y)] pt-[calc(var(--section-y)*0.35)]">
      <div className="container-site">
        <div className="cta-band px-6 py-[clamp(48px,6vw,88px)] sm:px-12" data-reveal data-wa-anchor>
          <svg aria-hidden="true" viewBox="0 0 800 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 -z-10 h-24 w-full opacity-40">
            <path d="M0 140c160-50 300-30 420-6s260 30 380-30v96H0Z" fill="#0b7f8c" opacity="0.5" />
            <path d="M0 160c150-30 290-10 410 6s250 20 390-26" fill="none" stroke="#b8e05a" strokeWidth="2" opacity="0.7" />
          </svg>
          <div className="mx-auto flex max-w-[680px] flex-col items-center gap-5 text-center">
            <h2 id="final-cta-title" className="type-h2 text-white">
              {title}
            </h2>
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/85">{lead}</p>
            <div className="mt-3 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link href={primaryHref ?? enquiryHref(service)} data-cta-location="final-cta" className="btn btn-on-dark">
                <span className="btn-face">
                  {primaryLabel}
                  <ArrowRight aria-hidden="true" className="btn-icon size-4" strokeWidth={1.75} />
                </span>
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
                  Chat on WhatsApp
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
