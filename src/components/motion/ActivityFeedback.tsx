"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** How long a button shows "opening…" after it opens WhatsApp, email or another site in a new tab. */
const EXTERNAL_BUSY_MS = 1400;
/** Safety net: a navigation that never finishes (offline, cancelled) still clears its busy state. */
const NAV_TIMEOUT_MS = 10_000;

type Phase = "idle" | "loading" | "done";

/** The link or button a click belongs to, if it is one of ours. */
function pressable(target: EventTarget | null) {
  return target instanceof Element ? target.closest<HTMLElement>(".btn, .faq-chip, .tabbar-item, .vg-play") : null;
}

/** An internal page link the App Router will handle (not a new tab, download, hash jump or modified click). */
function internalNavigation(event: MouseEvent): HTMLAnchorElement | null {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
  if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return null;
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  const here = window.location;
  if (url.pathname === here.pathname && url.search === here.search) return null;
  return link;
}

/**
 * Makes the site feel alive while something is happening:
 * - a loading bar across the top from the click on an internal link until the new page is shown;
 * - the clicked button keeps a "working" state (moving stripe, pulsing icon) until then;
 * - buttons that open WhatsApp, email or a new tab say so for a moment, since the page itself does not change;
 * - a soft ripple from the press point on every button.
 * All of it is CSS driven by attributes (data-busy, data-ripple), so React's own DOM is never touched.
 */
export function ActivityFeedback() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const busyLink = useRef<HTMLElement | null>(null);
  const timers = useRef<number[]>([]);

  // A new path means the navigation landed: finish the bar and release the button.
  useEffect(() => {
    busyLink.current?.removeAttribute("data-busy");
    busyLink.current = null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the route change is the external event being reflected
    setPhase((p) => (p === "loading" ? "done" : p));
  }, [pathname]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = window.setTimeout(() => setPhase("idle"), 450);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPointerDown = (event: PointerEvent) => {
      const el = pressable(event.target);
      if (!el || reduced.matches || el.matches(":disabled, [aria-disabled='true']")) return;
      const box = el.getBoundingClientRect();
      el.style.setProperty("--ripple-x", `${event.clientX - box.left}px`);
      el.style.setProperty("--ripple-y", `${event.clientY - box.top}px`);
      el.style.setProperty("--ripple-size", `${Math.max(box.width, box.height) * 2.2}px`);
      // Restart the animation even on rapid repeat presses.
      el.removeAttribute("data-ripple");
      void el.offsetWidth;
      el.setAttribute("data-ripple", "");
      later(() => el.removeAttribute("data-ripple"), 650);
    };

    const onClick = (event: MouseEvent) => {
      const link = internalNavigation(event);
      if (link) {
        setPhase("loading");
        const el = pressable(link);
        if (el) {
          busyLink.current?.removeAttribute("data-busy");
          el.setAttribute("data-busy", "navigating");
          busyLink.current = el;
          later(() => el.removeAttribute("data-busy"), NAV_TIMEOUT_MS);
        }
        later(() => setPhase((p) => (p === "loading" ? "idle" : p)), NAV_TIMEOUT_MS);
        return;
      }
      // WhatsApp, email and other new-tab links: this page stays put, so confirm the action on the button itself.
      const el = pressable(event.target);
      const anchor = el?.closest<HTMLAnchorElement>("a[href]");
      if (!el || !anchor) return;
      const opensElsewhere = anchor.target === "_blank" || /^(mailto|tel):/.test(anchor.getAttribute("href") ?? "");
      if (!opensElsewhere) return;
      el.setAttribute("data-busy", "opening");
      later(() => el.removeAttribute("data-busy"), EXTERNAL_BUSY_MS);
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    // Capture phase: Next.js <Link> cancels the click (to route client-side) before it would bubble up here.
    document.addEventListener("click", onClick, true);
    const pending = timers.current;
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onClick, true);
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return <div aria-hidden="true" className="route-progress" data-phase={phase} />;
}
