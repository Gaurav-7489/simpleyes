"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pointer tilt for 3D surfaces (one rAF budget, reads before writes, no scroll listener of its own — scroll
 * progress lives in <ScrollProgress>, on Motion's shared listener):
 *  - `[data-tilt]` surfaces (3D document stages, the Why sheet) lean gently toward the pointer: spring
 *    physics write `--tilt-x` / `--tilt-y` (degrees) on the transformed element itself (registered as
 *    non-inheriting in scene.css, so only that element restyles), with will-change only while it moves.
 * Skipped for reduced motion; pointer effects only with a fine, hovering pointer. Pure enhancement.
 */

type Body = {
  el: HTMLElement;
  /** The element whose transform reads the tilt variables. */
  target: HTMLElement;
  /** Whether will-change is currently set on the target. */
  layered: boolean;
  /** Whether the last written values are the resting ones (no further writes needed). */
  rested: boolean;
  x: [number, number];
  y: [number, number];
  tx: number;
  ty: number;
  visible: boolean;
  rect: DOMRect | null;
};

const STIFFNESS = 120;
const DAMPING = 18;
/** Maximum lean, in degrees. Calm: never more than a few degrees. */
const MAX_X = 5;
const MAX_Y = 6;

function stepSpring(s: [number, number], target: number, dt: number) {
  const force = -STIFFNESS * (s[0] - target) - DAMPING * s[1];
  s[1] += force * dt;
  s[0] += s[1] * dt;
}

export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const bodies: Body[] = [];
    const byEl = new Map<HTMLElement, Body>();
    let dirty = true;
    let lastScroll = window.scrollY;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const body = byEl.get(e.target as HTMLElement);
        if (body) body.visible = e.isIntersecting;
      }
      dirty = true;
    });
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      const target = el.querySelector<HTMLElement>(".stage-world, .why-sheet") ?? el;
      const body: Body = { el, target, layered: false, rested: true, x: [0, 0], y: [0, 0], tx: 0, ty: 0, visible: false, rect: null };
      byEl.set(el, body);
      bodies.push(body);
      io.observe(el);
    });
    if (bodies.length === 0) return () => io.disconnect();

    let px = -9999;
    let py = -9999;
    let running = false;
    let last = 0;

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    let raf = 0;

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      // Read phase: cached rects go stale when the page scrolls or resizes.
      if (window.scrollY !== lastScroll) {
        lastScroll = window.scrollY;
        dirty = true;
      }
      if (dirty) {
        for (const b of bodies) b.rect = b.visible ? b.el.getBoundingClientRect() : null;
        dirty = false;
      }
      let moving = false;
      for (const b of bodies) {
        const r = b.rect;
        if (!r) continue;
        // Lean relative to the pointer's position over the surface, easing off with distance outside it.
        const nx = (px - (r.left + r.width / 2)) / (r.width * 0.75);
        const ny = (py - (r.top + r.height / 2)) / (r.height * 0.75);
        const near = px > -9000 && Math.abs(nx) < 1.6 && Math.abs(ny) < 1.6;
        b.tx = near ? Math.max(-1, Math.min(1, ny)) * -MAX_X : 0;
        b.ty = near ? Math.max(-1, Math.min(1, nx)) * MAX_Y : 0;
        stepSpring(b.x, b.tx, dt);
        stepSpring(b.y, b.ty, dt);
        const settled = Math.abs(b.x[0] - b.tx) < 0.01 && Math.abs(b.y[0] - b.ty) < 0.01 && Math.abs(b.x[1]) + Math.abs(b.y[1]) < 0.02;
        if (settled) {
          if (b.rested) continue;
          b.x[0] = b.tx;
          b.x[1] = 0;
          b.y[0] = b.ty;
          b.y[1] = 0;
          b.rested = true;
          if (b.layered) {
            b.target.style.willChange = "";
            b.layered = false;
          }
        } else {
          moving = true;
          b.rested = false;
          if (!b.layered) {
            b.target.style.willChange = "transform";
            b.layered = true;
          }
        }
        b.target.style.setProperty("--tilt-x", `${b.x[0].toFixed(3)}deg`);
        b.target.style.setProperty("--tilt-y", `${b.y[0].toFixed(3)}deg`);
      }
      if (moving || px > -9000) raf = requestAnimationFrame(tick);
      else running = false;
    }

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      start();
    };
    const onLeave = () => {
      px = -9999;
      py = -9999;
      start();
    };
    const markDirty = () => {
      dirty = true;
    };

    window.addEventListener("resize", markDirty);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", markDirty);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      for (const b of bodies) {
        b.target.style.removeProperty("--tilt-x");
        b.target.style.removeProperty("--tilt-y");
        b.target.style.willChange = "";
      }
    };
  }, [pathname]);

  return null;
}
