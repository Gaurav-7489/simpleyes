"use client";

import { ArrowUp } from "lucide-react";
import { useScroll } from "motion/react";
import * as m from "motion/react-m";

/** Circular back-to-top with a ring that fills with scroll progress (Motion's shared scroll listener). */
export function BackToTop() {
  const { scrollYProgress } = useScroll();
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
      <svg className="progress-ring" viewBox="0 0 56 56" aria-hidden="true">
        <circle className="track" cx="28" cy="28" r="26" />
        <m.circle className="bar" cx="28" cy="28" r="26" style={{ pathLength: scrollYProgress }} />
      </svg>
      <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.75} />
    </button>
  );
}
