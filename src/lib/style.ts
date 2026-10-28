import type { CSSProperties } from "react";

/** Stagger helper for reveal / hero-intro animations. */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
