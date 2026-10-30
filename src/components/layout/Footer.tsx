import Link from "next/link";
import { footerNav, legalNav, site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/ui/Wordmark";
import { BackToTop } from "./BackToTop";

const linkClass = "inline-flex min-h-8 items-center text-sm text-ink-2 underline-offset-4 hover:text-ink hover:underline";

/** Compact footer: brand, one row of links, the independence disclosure and copyright. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/[0.06] bg-canvas" aria-label="Site footer">
      <div className="container-site flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Wordmark />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {[...footerNav, ...legalNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  data-topic="general"
                  className={linkClass}
                >
                  WhatsApp
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="rounded-[14px] bg-canvas-alt px-5 py-4 text-[0.8125rem] leading-relaxed text-ink-2">
          <strong className="font-medium text-ink">Independent service disclosure:</strong> {site.shortDisclosure}
        </p>

        <div className="flex items-center justify-between gap-4 text-sm text-ink-2">
          <p>
            © {year} {site.name}. {site.coverageStatement}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
