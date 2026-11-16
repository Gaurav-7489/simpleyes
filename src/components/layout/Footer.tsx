import Link from "next/link";
import type { ReactNode } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { companyNav, informationNav, site } from "@/content/site";
import { services } from "@/content/services";
import { independenceStatement } from "@/content/home";
import { whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/ui/Wordmark";
import { YouTubeIcon } from "@/components/ui/YouTubeLink";
import { BackToTop } from "./BackToTop";
import { ConsentSettingsButton } from "@/components/analytics/Analytics";

const linkClass =
  "inline-flex min-h-9 items-center text-[0.9375rem] leading-snug text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-[0.9375rem] font-medium text-lime">{title}</h2>
      <ul className="mt-3 flex flex-col">{children}</ul>
    </div>
  );
}

/**
 * Footer on the dark folder band: Company · Services · Information · Contact, the independence statement and
 * copyright. Phones use two columns so the footer stays short; every link stays visible.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="folder-band" aria-label="Site footer">
      <div className="container-site pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-14 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <Wordmark idSuffix="footer" tone="light" />
            <p className="mt-5 font-display text-[1.375rem] font-light leading-snug tracking-[-0.015em] text-white">
              Independent documentation assistance for Indians in Germany.
            </p>
            <p className="mt-3 text-[0.9375rem] text-white/70">{site.coverageStatement}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
            <nav aria-label="Footer" className="contents">
              <Column title="Company">
                {companyNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </Column>
              <Column title="Services">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}/`} className={linkClass}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </Column>
              <Column title="Information">
                {informationNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                {site.gaMeasurementId && (
                  <li>
                    <ConsentSettingsButton className={linkClass} />
                  </li>
                )}
              </Column>
            </nav>

            <Column title="Contact">
              {site.contact.email && (
                <li>
                  <a href={`mailto:${site.contact.email}`} data-cta="email" data-cta-location="footer" className={`${linkClass} gap-2 break-all`}>
                    <Mail aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
                    {site.contact.email}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  data-cta-location="footer"
                  data-topic="general"
                  className={`${linkClass} gap-2`}
                >
                  <MessageCircle aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
                  WhatsApp {site.whatsapp.display}
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={site.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="youtube"
                  data-cta-location="footer"
                  className={`${linkClass} gap-2`}
                >
                  <YouTubeIcon className="size-4 shrink-0" />
                  YouTube {site.youtube.handle}
                  <span className="sr-only"> (opens the SimplYes YouTube channel in a new tab)</span>
                </a>
              </li>
              <li>
                <Link href="/contact/" className={linkClass}>
                  Enquiry form
                </Link>
              </li>
            </Column>
          </div>
        </div>

        <p className="mt-12 max-w-[78ch] border-l-2 border-lime pl-4 text-[0.9375rem] leading-relaxed text-white/80">
          <strong className="font-medium text-white">Independent service.</strong> {independenceStatement}
        </p>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/12 pt-6 text-sm text-white/70">
          <p>
            © {year} {site.name}. {site.tagline}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
