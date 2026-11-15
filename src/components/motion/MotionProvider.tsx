"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./features").then((res) => res.default);

/**
 * Motion for the whole site: the slim `m` components (about 5 KB) with features lazy-loaded after first
 * render, and reduced-motion respected everywhere (transform and layout animations off when requested).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
