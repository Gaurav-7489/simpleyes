import { primaryNav } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/**
 * Reference behaviour: fixed full-width translucent bar with a light blur on
 * desktop; a floating rounded card with a menu toggle below 1024px.
 */
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Desktop */}
      <div className="hidden h-[var(--header-h)] border-b border-black/[0.035] bg-[rgb(245_245_245/0.55)] backdrop-blur-[8px] lg:block">
        <div className="container-site flex h-full items-center justify-between gap-6">
          <Wordmark />
          <nav aria-label="Primary">
            <NavLinks items={primaryNav} />
          </nav>
          <WhatsAppButton icon="none">
            Chat on WhatsApp
          </WhatsAppButton>
        </div>
      </div>

      {/* Mobile & tablet */}
      <div className="px-2.5 pt-2.5 lg:hidden">
        <div
          data-menu-scope
          className="relative mx-auto flex h-14 max-w-[720px] items-center justify-between rounded-[14px] bg-white/90 pl-4 pr-1.5 shadow-[var(--shadow-frame),0_8px_24px_-12px_rgb(0_0_0/0.14)] ring-1 ring-black/[0.04]"
          // No backdrop-filter here: it would become the containing block of the fixed menu backdrop.
        >
          <Wordmark />
          <MobileMenu items={primaryNav} whatsappHref={whatsappHref()} />
        </div>
      </div>
    </header>
  );
}
