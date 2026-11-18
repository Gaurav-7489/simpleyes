import Link from "next/link";
import type { ReactNode } from "react";
import { helpNav, informationNav, site } from "@/content/site";
import { services } from "@/content/services";
import { whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/ui/Wordmark";
import { BackToTop } from "./BackToTop";
import { ConsentSettingsButton } from "@/components/analytics/Analytics";

const linkClass = "footer-link";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="footer-heading">{title}</h2>
      <ul className="mt-3 flex flex-col gap-0.5">{children}</ul>
    </div>
  );
}

/**
 * Footer on the dark folder band: the wordmark and promise, then Services · Help · Information · Contact, and the
 * independence line with the copyright. Phones use two columns so the footer stays short; every link stays visible.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="folder-band site-footer" aria-label="Site footer">
      <div className="container-site pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.6fr] lg:gap-12">
          <div className="max-w-xs">
            <Wordmark tone="light" />
            <p className="mt-4 font-display text-[1.125rem] font-medium leading-snug tracking-[-0.01em] text-white">
              {site.tagline}
            </p>
            <p className="mt-2 text-[0.875rem] text-white/70">{site.coverageStatement}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <nav aria-label="Footer" className="contents">
              <Column title="Services">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}/`} className={linkClass}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </Column>
              <Column title="Help">
                {helpNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
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
                  <a href={`mailto:${site.contact.email}`} data-cta="email" data-cta-location="footer" className={`${linkClass} break-all`}>
                    {site.contact.email.toLowerCase()}
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
                  className={linkClass}
                >
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
                  className={linkClass}
                >
                  YouTube {site.youtube.handle}
                  <span className="sr-only"> (opens the SimplYes YouTube channel in a new tab)</span>
                </a>
              </li>
            </Column>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/12 pt-6">
          <p className="text-[0.8125rem] leading-relaxed text-white/70">
            {site.name} is an independent service, not affiliated with the Embassy of India or the Consulates General of
            India. © {year} {site.name}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
