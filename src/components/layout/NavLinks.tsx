"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/site";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

/** Desktop primary navigation with active-state (aria-current). */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname() ?? "/";
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative inline-flex min-h-[38px] items-center rounded-[10px] px-4 py-2 text-sm leading-[1.6] transition-colors duration-300 hover:text-ink ${
                active ? "text-ink" : "text-ink-2"
              }`}
            >
              {item.label}
              {active && (
                <span aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-px rounded-full bg-ink/60" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
