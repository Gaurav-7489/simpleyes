"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutGrid, Menu, MessageSquareText } from "lucide-react";
import { useHydrated } from "@/lib/useHydrated";

/** Event the header's MobileMenu listens for, so both buttons drive the same accessible menu. */
export const OPEN_MENU_EVENT = "simplyes:open-menu";

const tabs = [
  { label: "Home", href: "/", icon: House, match: (p: string) => p === "/" },
  { label: "Services", href: "/services/", icon: LayoutGrid, match: (p: string) => p.startsWith("/services/") },
  { label: "Enquiry", href: "/contact/", icon: MessageSquareText, match: (p: string) => p.startsWith("/contact/") },
];

/**
 * Bottom tab bar on phones and tablets (owners' mockup, Nov 2026). Real links, the current page marked with
 * aria-current, ≥ 48px targets, safe-area aware. Hidden from 1024px, where the header nav takes over.
 */
export function MobileTabBar() {
  const pathname = usePathname() ?? "/";
  const hydrated = useHydrated();
  return (
    <nav aria-label="Quick" className="tabbar lg:hidden">
      <ul className="grid grid-cols-4">
        {tabs.map(({ label, href, icon: TabIcon, match }) => {
          const active = match(pathname);
          return (
            <li key={href}>
              <Link href={href} aria-current={active ? "page" : undefined} className="tabbar-item" data-cta-location="tabbar">
                <TabIcon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                {label}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            disabled={!hydrated}
            aria-label="Show menu"
            onClick={() => window.dispatchEvent(new Event(OPEN_MENU_EVENT))}
            className="tabbar-item w-full"
          >
            <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
            Menu
          </button>
        </li>
      </ul>
    </nav>
  );
}
