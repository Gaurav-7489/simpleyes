"use client";

import { ArrowUp } from "lucide-react";

/** Quiet back-to-top control in the footer. Instant jump for reduced-motion users. */
export function BackToTop() {
  return (
    <button
      type="button"
      className="to-top"
      aria-label="Back to top"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      <ArrowUp aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
    </button>
  );
}
