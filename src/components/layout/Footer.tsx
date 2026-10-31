import Link from "next/link";
import type { ReactNode } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { companyNav, informationNav, site } from "@/content/site";
import { services } from "@/content/services";
import { independenceStatement } from "@/content/home";
import { whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/ui/Wordmark";
import { BackToTop } from "./BackToTop";
import { ConsentSettingsButton } from "@/components/analytics/Analytics";

const linkClass =
  "inline-flex min-h-9 items-center text-[0.9375rem] text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-ink">{title}</h2>
      <ul className="mt-3 flex flex-col">{children}</ul>
    </div>
  );
}

/** §07 section 11 footer: Company · Services · Information · Contact, independence disclaimer, copyright. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-white" aria-label="Site footer">
      <div className="container-site py-12 pb-[max(3rem,env(safe-area-inset-bottom))] lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="sm:max-w-sm">
            <Wordmark />
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              Independent documentation assistance for Indians in Germany. {site.coverageStatement}
            </p>
          </div>

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
                <a href={`mailto:${site.contact.email}`} data-cta="email" data-cta-location="footer" className={`${linkClass} gap-2`}>
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
              <Link href="/contact/" className={linkClass}>
                Enquiry form
              </Link>
            </li>
          </Column>
        </div>

        <p className="mt-10 rounded-[14px] border border-accent-100 bg-accent-50 px-5 py-4 text-sm leading-relaxed text-ink-2">
          <strong className="font-medium text-ink">Independent service:</strong> {independenceStatement}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-ink-2">
          <p>
            © {year} {site.name}. {site.tagline}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
