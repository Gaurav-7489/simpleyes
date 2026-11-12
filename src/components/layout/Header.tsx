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
      <div className="hidden h-[var(--header-h)] items-center lg:flex">
        <div className="container-site">
          <div className="header-bar flex h-16 items-center justify-between gap-6 pl-6 pr-2.5">
            <Wordmark idSuffix="desktop" />
            <nav aria-label="Primary">
              <NavLinks items={primaryNav} />
            </nav>
            <ButtonLink href={getAssistance.href} icon="up-right" size="sm" location="header">
              {getAssistance.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Mobile & tablet */}
      <div className="px-2.5 pt-2.5 lg:hidden">
        <div
          data-menu-scope
          className="header-bar relative mx-auto flex h-14 max-w-[720px] items-center justify-between pl-4 pr-1.5"
          // No backdrop-filter here: it would become the containing block of the fixed menu backdrop.
        >
          <Wordmark idSuffix="mobile" />
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
