import { getAssistance, primaryNav } from "@/content/site";
import { services } from "@/content/services";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/** §14 header: logo → home, primary nav with Services dropdown, Get Assistance button; sticky. */
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Desktop */}
      <div className="hidden h-[var(--header-h)] border-b border-line/70 bg-canvas/85 backdrop-blur-[8px] lg:block">
        <div className="container-site flex h-full items-center justify-between gap-6">
          <Wordmark />
          <nav aria-label="Primary">
            <NavLinks items={primaryNav} />
          </nav>
          <ButtonLink href={getAssistance.href} icon="none" size="sm" location="header">
            {getAssistance.label}
          </ButtonLink>
        </div>
      </div>

      {/* Mobile & tablet */}
      <div className="px-2.5 pt-2.5 lg:hidden">
        <div
          data-menu-scope
          className="relative mx-auto flex h-14 max-w-[720px] items-center justify-between rounded-[14px] border border-line bg-white/95 pl-4 pr-1.5 shadow-[0_8px_24px_-12px_rgb(19_33_29/0.18)]"
          // No backdrop-filter here: it would become the containing block of the fixed menu backdrop.
        >
          <Wordmark />
          <MobileMenu
            items={primaryNav}
            services={services.map((s) => ({ label: s.title, href: `/services/${s.slug}/` }))}
            cta={getAssistance}
          />
        </div>
      </div>
    </header>
  );
}
