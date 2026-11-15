"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";

/**
 * Page scroll progress as a hairline, driven by Motion's shared scroll listener (hardware-accelerated
 * ScrollTimeline where supported). Also marks <html data-scrolled> once the page leaves the top, so the header
 * can firm up — an attribute flip only when the state changes, never a per-frame style write on <html>.
 */
export function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const root = document.documentElement;
    const past = y > 24;
    if (past !== root.hasAttribute("data-scrolled")) root.toggleAttribute("data-scrolled", past);
  });
  return <m.div aria-hidden="true" className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}
