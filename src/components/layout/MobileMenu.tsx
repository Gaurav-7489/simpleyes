"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/content/site";

type Props = { items: NavItem[]; services: NavItem[]; cta: NavItem };

/**
 * Accessible disclosure-style mobile menu:
 * - toggle exposes aria-expanded / aria-controls
 * - Escape closes and returns focus to the toggle
 * - focus is kept inside the menu while open, page scroll is locked
 * - closes on navigation and when the viewport reaches desktop width
 */
export function MobileMenu({ items, services, cta }: Props) {
  const pathname = usePathname();
  // The menu is "open for a given path": navigating anywhere closes it without an effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath !== null && openPath === pathname;
  const setOpen = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) =>
      setOpenPath((prevPath) => {
        const prev = prevPath !== null && prevPath === pathname;
        const next = typeof value === "function" ? value(prev) : value;
        return next ? pathname : null;
      }),
    [pathname],
  );
  const panelId = useId();
  const servicesId = useId();
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(
    (restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) toggleRef.current?.focus();
    },
    [setOpen],
  );

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    root.dataset.menuOpen = "";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      const container = toggleRef.current?.closest<HTMLElement>("[data-menu-scope]");
      if (!container) return;
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((el) => el.offsetParent !== null);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = previousOverflow;
      delete root.dataset.menuOpen;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-black/5"
      >
        <span aria-hidden="true" className="relative block h-3.5 w-5">
          <span
            className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-[1.5px] w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => close(false)}
        className={`fixed inset-0 -z-10 bg-canvas/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        id={panelId}
        data-open={open}
        className="mobile-panel absolute inset-x-0 top-[calc(100%+8px)] origin-top rounded-[14px] bg-white/95 p-3 shadow-[var(--shadow-frame),0_20px_40px_-16px_rgb(0_0_0/0.18)] ring-1 ring-black/5"
        // When closed the panel is visibility:hidden, so its links are not focusable.
      >
        <nav aria-label="Mobile" className="max-h-[calc(100dvh-140px)] overflow-y-auto overscroll-contain">
          <ul className="flex flex-col">
            {items.map((item) =>
              item.href === "/services/" ? (
                <li key={item.href}>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls={servicesId}
                    onClick={() => setServicesOpen((v) => !v)}
                    className="flex min-h-12 w-full items-center justify-between rounded-[10px] px-3 font-display text-lg text-ink transition-colors hover:bg-black/[0.04]"
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-5 text-ink-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                      strokeWidth={1.75}
                    />
                  </button>
                  <ul id={servicesId} hidden={!servicesOpen} className="mb-2 ml-3 border-l border-line pl-2">
                    {[{ label: "All services", href: "/services/" }, ...services].map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          onClick={() => close(false)}
                          className="flex min-h-11 items-center rounded-[10px] px-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-black/[0.04] hover:text-ink"
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => close(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex min-h-12 items-center rounded-[10px] px-3 font-display text-lg text-ink transition-colors hover:bg-black/[0.04]"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <Link href={cta.href} onClick={() => close(false)} data-cta-location="mobile-menu" className="btn btn-dark mt-3 w-full">
          <span className="btn-face w-full justify-center">{cta.label}</span>
        </Link>
      </div>
    </>
  );
}
