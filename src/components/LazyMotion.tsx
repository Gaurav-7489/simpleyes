"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MotionLayer = dynamic(() => import("@/components/MotionLayer").then((m) => m.MotionLayer), { ssr: false });

/**
 * Loads the motion layer (scroll progress + springs) only after first paint, when the main
 * thread is idle, so it never competes with LCP / hydration.
 */
export function LazyMotion() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => (window as Window & { cancelIdleCallback?: (n: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);
  return ready ? <MotionLayer /> : null;
}
