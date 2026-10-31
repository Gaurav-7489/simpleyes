"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { NavItem } from "@/content/site";
import { services } from "@/content/services";
import { IconTile } from "@/components/ui/Icon";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

const linkClass = (active: boolean) =>
  `relative inline-flex min-h-11 items-center gap-1 rounded-[10px] px-3 py-2 text-[0.9375rem] transition-colors duration-200 hover:text-ink ${
    active ? "font-medium text-ink" : "text-ink-2"
  }`;

/**
 * Services dropdown (§14): a disclosure button with aria-expanded/aria-controls.
 * Keyboard: Enter/Space toggles, Esc closes and returns focus, Tab moves through
 * the eight service links. Opens on hover for mouse users too.
 */
function ServicesMenu({ active }: { active: boolean }) {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const panelId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpenPath(null);
    };
    const onFocus = (e: FocusEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpenPath(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  const hover = (value: boolean) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenPath(value ? pathname : null), value ? 60 : 160);
  };

  return (
    <div ref={wrapRef} className="relative" onPointerEnter={() => hover(true)} onPointerLeave={() => hover(false)}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenPath(open ? null : pathname)}
        className={linkClass(active)}
      >
        Services
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
        {active && <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-700" />}
      </button>
      <div
        id={panelId}
        data-open={open}
        className="nav-panel absolute left-1/2 top-[calc(100%+12px)] w-[min(680px,90vw)] -translate-x-1/2 rounded-[16px] border border-line bg-white p-3 shadow-[0_24px_48px_-24px_rgb(19_33_29/0.35)]"
      >
        <ul className="grid grid-cols-2 gap-1">
          {services.map((service) => {
            const href = `/services/${service.slug}/`;
            const current = pathname === href;
            return (
              <li key={service.slug}>
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpenPath(null)}
                  className={`flex items-center gap-3 rounded-[12px] p-2.5 transition-colors hover:bg-accent-50 ${current ? "bg-accent-50" : ""}`}
                >
                  <IconTile name={service.icon} size="sm" />
                  <span className="flex flex-col">
                    <span className="text-[0.9375rem] font-medium text-ink">{service.title}</span>
                    <span className="text-[0.8125rem] leading-snug text-ink-3">{service.mainlyFor}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/services/"
          onClick={() => setOpenPath(null)}
          className="mt-2 flex min-h-11 items-center justify-between rounded-[12px] bg-canvas-alt px-4 text-sm font-medium text-accent-700 hover:bg-accent-50"
        >
          View all services
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}

/** Desktop primary navigation with active state (aria-current) and the Services dropdown. */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname() ?? "/";
  return (
    <ul className="flex items-center gap-0.5">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        if (item.href === "/services/") {
          return (
            <li key={item.href}>
              <ServicesMenu active={active} />
            </li>
          );
        }
        return (
          <li key={item.href}>
            <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
              {item.label}
              {active && <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-700" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
