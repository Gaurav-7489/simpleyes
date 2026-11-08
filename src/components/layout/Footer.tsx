import Link from "next/link";
import type { ReactNode } from "react";
import { Mail, MessageCircle, ShieldCheck } from "lucide-react";
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
      <h2 className="font-display text-[0.9375rem] font-medium text-ink">{title}</h2>
      <ul className="mt-3 flex flex-col gap-0.5">{children}</ul>
    </div>
  );
}

/** §07 section 11 footer: Company · Services · Information · Contact, independence disclaimer, copyright. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-4 border-t border-line bg-white" aria-label="Site footer">
      <div className="container-site pb-[max(6rem,calc(env(safe-area-inset-bottom)+5rem))] pt-14 lg:pb-12 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="col-span-2 sm:max-w-sm lg:col-span-1">
            <Wordmark />
            <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-2">
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

        <p className="note mt-12 !text-sm">
          <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-700" strokeWidth={1.75} />
          <span>
            <strong className="font-medium text-ink">Independent service.</strong> {independenceStatement}
          </span>
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-6 text-sm text-ink-2">
          <p>
            © {year} {site.name}. {site.tagline}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
