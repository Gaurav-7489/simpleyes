"use client";

import { ArrowUp } from "lucide-react";

/** Circular back-to-top with a ring that fills with scroll progress (`--scroll`, set by MotionLayer). */
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
      <svg className="ring" viewBox="0 0 56 56" aria-hidden="true">
        <circle className="track" cx="28" cy="28" r="26" />
        <circle className="bar" cx="28" cy="28" r="26" />
      </svg>
      <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.75} />
    </button>
  );
}
