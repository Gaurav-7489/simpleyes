import { getAssistance, primaryNav } from "@/content/site";
import { services } from "@/content/services";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { UrgentBar } from "./UrgentBar";

/**
 * Urgent strip, then the sticky header: wordmark, primary navigation with the Services dropdown and the
 * Get Assistance button (redesign, Nov 2026). The full navigation shows from 1280px; below that a menu.
 */
export function Header() {
  return (
    <>
      <UrgentBar />
      <header className="site-header">
        {/* Desktop */}
        <div className="hidden h-[var(--header-h)] items-center xl:flex">
          <div className="container-site">
            <div className="header-bar header-bar-glass flex h-[60px] items-center justify-between gap-6 pl-6 pr-2.5">
              <Wordmark />
              <nav aria-label="Primary">
                <NavLinks items={primaryNav} />
              </nav>
              <ButtonLink href={getAssistance.href} size="sm" location="header">
                {getAssistance.label}
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Mobile & tablet */}
        <div className="px-2.5 pt-2.5 xl:hidden">
          <div
            data-menu-scope
            className="header-bar relative mx-auto flex h-14 max-w-[720px] items-center justify-between pl-4 pr-1.5"
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
    </>
  );
}
