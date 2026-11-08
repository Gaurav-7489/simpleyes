import { contactNav, getAssistance, primaryNav } from "@/content/site";
import { services } from "@/content/services";
import { whatsappHref } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/** Fixed header: wordmark · one quiet nav group · Get Assistance. Compact bar + menu below 1024px. */
export function Header() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-canvas/90 backdrop-blur-[10px]">
      {/* Desktop */}
      <div className="container-site hidden h-[var(--header-h)] items-center justify-between gap-6 lg:flex">
        <Wordmark />
        <nav aria-label="Primary">
          <NavLinks items={primaryNav} />
        </nav>
        <ButtonLink href={getAssistance.href} size="sm" location="header">
          {getAssistance.label}
        </ButtonLink>
      </div>

      {/* Mobile & tablet */}
      <div data-menu-scope className="container-site relative flex h-16 items-center justify-between lg:hidden">
        <Wordmark />
        <MobileMenu
          items={[...primaryNav, contactNav]}
          services={services.map((s) => ({ label: s.title, href: `/services/${s.slug}/` }))}
          cta={getAssistance}
          whatsappHref={whatsappHref()}
        />
      </div>
    </header>
  );
}
