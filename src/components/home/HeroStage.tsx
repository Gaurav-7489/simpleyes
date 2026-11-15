"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { DocumentStage } from "@/components/scene/DocumentStage";

const HeroCanvas = dynamic(() => import("@/components/scene/webgl/HeroCanvas"), { ssr: false });

/**
 * Whether this visitor gets the WebGL hero: tablet/desktop width, no reduced-motion or data-saver request, and
 * a hardware-accelerated WebGL context (software renderers report a "major performance caveat" and are
 * declined). Everyone else keeps the CSS 3D scene, which is always rendered first and never removed from flow.
 * `?webgl=force` skips the hardware check, for QA in headless browsers.
 */
function canUseWebGL(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 768px)").matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  const force = new URLSearchParams(window.location.search).get("webgl") === "force";
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: !force });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** Any failure inside the 3D scene leaves the CSS scene in place. */
class CanvasBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"css" | "loading" | "webgl">("css");

  // Load the 3D scene only once the page is idle, so it never competes with first paint or hydration.
  useEffect(() => {
    if (!canUseWebGL()) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const begin = () => setMode("loading");
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(begin, { timeout: 2500 });
      return () => (window as Window & { cancelIdleCallback?: (n: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(begin, 1200);
    return () => clearTimeout(t);
  }, []);

  // A gentle, scroll-linked drift as the hero leaves the screen (transform only; off for reduced motion).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <m.div ref={ref} className="hero-stage" data-mode={mode} style={reduced ? undefined : { y, scale }}>
      <div className="hero-stage-css">
        <DocumentStage scene="hero" intro tilt ratio="1 / 0.86" />
      </div>
      {mode !== "css" && (
        <CanvasBoundary onError={() => setMode("css")}>
          <HeroCanvas onReady={() => setMode("webgl")} onError={() => setMode("css")} />
        </CanvasBoundary>
      )}
    </m.div>
  );
}
