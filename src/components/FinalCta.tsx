import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { enquiryHref, type Service } from "@/content/services";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Closing invitation (§07 section 10): dark green band, white text, Get Assistance + Contact Us.
 * On service pages the CTA pre-selects that service in the enquiry form (§08 section 13).
 */
export function FinalCta({
  title = "Let's make your documentation journey simpler.",
  lead = "Tell us what you need. A real person will get back to you and explain the next step.",
  service,
  primaryLabel = service ? "Get Assistance With This Service" : "Get Assistance",
  primaryHref,
  variant = "dark",
}: {
  title?: string;
  lead?: string;
  service?: Service;
  primaryLabel?: string;
  primaryHref?: string;
  /** "light" = Agencee framed card over the glass sphere (homepage). */
  variant?: "dark" | "light";
}) {
  if (variant === "light") {
    return (
      <section aria-labelledby="final-cta-title" className="section">
        <div className="container-site">
          <div className="cta-frame" data-reveal data-wa-anchor>
            <div className="cta-well">
              <div className="cta-card">
                <div aria-hidden="true" className="hero-rings -z-10 opacity-80" />
                <div aria-hidden="true" className="hero-sphere cta-sphere -z-10">
                  <span className="hero-sphere-core" />
                  <span className="hero-sphere-shine" />
                  <span className="hero-sphere-rim" />
                </div>
                <h2 id="final-cta-title" className="hero-display !text-[clamp(2rem,1.2rem+3vw,3.75rem)] max-w-[16ch]">
                  {title}
                </h2>
                <p className="type-lead mt-5 max-w-[44ch]">{lead}</p>
                <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
                  <Link href={primaryHref ?? enquiryHref(service)} data-cta-location="final-cta" className="btn btn-dark">
                    <span className="btn-face">{primaryLabel}</span>
                  </Link>
                  <Link href="/contact/" data-cta-location="final-cta" className="btn btn-light">
                    <span className="btn-face">Contact Us</span>
                  </Link>
                </div>
                <a
                  href={whatsappHref(service)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  data-cta-location="final-cta"
                  data-topic={service?.slug ?? "general"}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-ink-2 underline underline-offset-4 hover:text-ink"
                >
                  <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  Or chat on WhatsApp ({site.whatsapp.display})
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="final-cta-title" className="section">
      <div className="container-site">
        <div
          className="cta-band relative isolate overflow-hidden rounded-[24px] px-6 py-[clamp(48px,6vw,80px)] text-center text-white"
          data-reveal
          data-wa-anchor
        >
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5">
            <h2 id="final-cta-title" className="type-h2 text-white">
              {title}
            </h2>
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/85">{lead}</p>
            <div className="mt-2 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link href={primaryHref ?? enquiryHref(service)} data-cta-location="final-cta" className="btn btn-on-dark">
                <span className="btn-face">{primaryLabel}</span>
              </Link>
              <Link href="/contact/" data-cta-location="final-cta" className="btn btn-outline-on-dark">
                <span className="btn-face">Contact Us</span>
              </Link>
            </div>
            <a
              href={whatsappHref(service)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-cta-location="final-cta"
              data-topic={service?.slug ?? "general"}
              className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-white/90 underline underline-offset-4 hover:text-white"
            >
              <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Or chat on WhatsApp ({site.whatsapp.display})
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
