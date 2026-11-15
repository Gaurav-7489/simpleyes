"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";

/**
 * Scroll-linked depth, transform only, on Motion's shared scroll listener; nothing for reduced motion.
 *  - "drift": a hero visual sinks slightly and recedes as it leaves the screen.
 *  - "settle": a surface lowers from a steeper angle to rest as it scrolls into view (needs a perspective parent).
 */
export function ScrollDepth({ mode, children, className }: { mode: "drift" | "settle"; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === "drift" ? ["start start", "end start"] : ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], mode === "drift" ? [0, 70] : [36, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], mode === "drift" ? [1, 0.95] : [0.97, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], mode === "drift" ? [0, 0] : [14, 0]);
  return (
    <m.div ref={ref} className={className} style={reduced ? undefined : { y, scale, rotateX, transformOrigin: "50% 70%", transformStyle: mode === "settle" ? "preserve-3d" : undefined }}>
      {children}
    </m.div>
  );
}
