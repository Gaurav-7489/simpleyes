import Link from "next/link";
import type { ReactNode } from "react";
import { helpNav, informationNav, site } from "@/content/site";
import { services } from "@/content/services";
import { whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/ui/Wordmark";
import { BackToTop } from "./BackToTop";
import { ConsentSettingsButton } from "@/components/analytics/Analytics";

const linkClass = "footer-link";

function Column({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="footer-heading">{title}</h2>
      <ul className="mt-3 flex flex-col gap-1">{children}</ul>
    </div>
  );
}

/**
 * Footer on the dark folder band (redesign, Nov 2026): wordmark and tagline, then Services · Help ·
 * Information · Contact, and the independence line with the copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="folder-band site-footer" aria-label="Site footer">
      <div className="container-site pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_3fr] lg:gap-10">
          <div className="max-w-sm">
            <Wordmark tone="light" size="lg" />
            <p className="mt-4 font-display text-[1.3125rem] font-medium leading-snug tracking-[-0.015em] text-white">{site.tagline}</p>
            <p className="mt-3 text-[0.9375rem] text-white/75">{site.coverageStatement}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-[1fr_1fr_1fr_1.3fr]">
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

            <Column title="Contact" className="col-span-2 sm:col-span-1">
              {site.contact.email && (
                <li>
                  <a href={`mailto:${site.contact.email.toLowerCase()}`} data-cta="email" data-cta-location="footer" className={`${linkClass} break-all`}>
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
                  WhatsApp <span className="xl:whitespace-nowrap">{site.whatsapp.display}</span>
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
                  <span className="sr-only"> (opens the Simplyes YouTube channel in a new tab)</span>
                </a>
              </li>
            </Column>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/12 pt-6">
          <p className="text-[0.875rem] leading-relaxed text-white/75">
            {site.footerDisclosure} © {year} {site.name}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
