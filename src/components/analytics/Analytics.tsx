"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CONSENT_OPEN_EVENT, consentSnapshot, subscribeConsent, track, writeConsent } from "@/lib/analytics";

/**
 * GA4 behind an explicit consent banner (§18). Nothing loads until the visitor
 * accepts; declining stores the choice and loads nothing. Consent Mode is set
 * with analytics only — ad storage, user data and personalisation stay denied.
 * Rendered only when NEXT_PUBLIC_GA_ID is configured.
 */
export function Analytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  // "ssr" on the server and during hydration, so the banner never flashes into static HTML.
  const choice = useSyncExternalStore(subscribeConsent, consentSnapshot, () => "ssr" as const);
  const [reopened, setReopened] = useState(false);
  const bannerOpen = choice === null || reopened;
  const loaded = useRef(false);

  const load = useCallback(() => {
    if (loaded.current) return;
    loaded.current = true;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }, [measurementId]);

  useEffect(() => {
    if (choice === "granted") load();
  }, [choice, load]);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  // Page views on every client-side navigation (no query strings — they may carry form context only).
  useEffect(() => {
    if (choice !== "granted") return;
    window.gtag?.("event", "page_view", { page_path: pathname, page_location: window.location.origin + pathname });
  }, [choice, pathname]);

  // Delegated CTA / WhatsApp / email click tracking — labels and placements only, never personal data.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("a, button");
      if (!el) return;
      const page = window.location.pathname;
      const location = el.closest<HTMLElement>("[data-cta-location]")?.dataset.ctaLocation ?? el.closest("header, footer, main")?.tagName.toLowerCase() ?? "page";
      const href = el.getAttribute("href") ?? "";
      if (el.dataset.cta === "whatsapp" || href.startsWith("https://wa.me/")) {
        track("whatsapp_click", { page, placement: el.hasAttribute("data-floating-wa") ? "floating" : location });
      } else if (href.startsWith("mailto:")) {
        track("email_click", { page, placement: location });
      } else if (el.classList.contains("btn")) {
        track("cta_click", { cta_label: (el.textContent ?? "").trim().slice(0, 60), page, location });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (bannerOpen) root.dataset.consentOpen = "";
    else delete root.dataset.consentOpen;
  }, [bannerOpen]);

  const decide = (value: "granted" | "denied") => {
    writeConsent(value);
    setReopened(false);
    if (value === "denied" && loaded.current) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
  };

  if (!bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-[70] mx-auto max-w-[560px] rounded-[16px] border border-line bg-white p-5 shadow-[0_24px_48px_-20px_rgb(19_33_29/0.45)]"
    >
      <h2 id="consent-title" className="font-display text-lg font-medium text-ink">
        Analytics cookies
      </h2>
      <p id="consent-text" className="mt-2 text-sm leading-relaxed text-ink-2">
        With your permission we use Google Analytics to understand how the site is used, for example which pages are
        visited. No advertising cookies, and no personal details from forms are ever sent. See our{" "}
        <Link href="/privacy/" className="text-accent-700 underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={() => decide("granted")} className="btn btn-dark btn-sm">
          <span className="btn-face w-full">Accept analytics</span>
        </button>
        <button type="button" onClick={() => decide("denied")} className="btn btn-light btn-sm">
          <span className="btn-face w-full">Decline</span>
        </button>
      </div>
    </div>
  );
}

/** Footer link to reopen the consent choice. */
export function ConsentSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
