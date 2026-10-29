"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Site-wide motion layer (no markup, one rAF budget):
 *  - Lenis inertial smooth scroll (+ hash-anchor easing, paused while the mobile menu locks scroll)
 *  - `--scroll` CSS variable (0→1) driving the top progress bar and parallax
 *  - spring physics for `[data-magnetic]` (buttons pull toward the cursor) and
 *    `[data-tilt]` (cards tilt in 3D with a moving highlight)
 * Everything is transform-only, skipped for reduced motion, and pointer effects
 * are skipped on touch. Pure enhancement: the page is fully usable without it.
 */

type Body = {
  el: HTMLElement;
  kind: "magnetic" | "tilt";
  // spring state per channel: [value, velocity]
  a: [number, number];
  b: [number, number];
  c: [number, number];
  ta: number;
  tb: number;
  tc: number;
  visible: boolean;
};

const STIFFNESS = 220;
const DAMPING = 17;
const REST = 0.002;

function stepSpring(s: [number, number], target: number, dt: number) {
  const force = -STIFFNESS * (s[0] - target) - DAMPING * s[1];
  s[1] += force * dt;
  s[0] += s[1] * dt;
}

export function MotionLayer() {
  const pathname = usePathname();

  // Smooth scroll + progress: once per app lifetime.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const root = document.documentElement;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, anchors: { offset: -96 }, autoRaf: true });

    const onScroll = ({ progress }: { progress: number }) => {
      root.style.setProperty("--scroll", progress.toFixed(4));
    };
    lenis.on("scroll", onScroll);
    onScroll({ progress: lenis.progress });

    // The mobile menu locks scroll via `html { overflow: hidden }` — honour it.
    const lock = new MutationObserver(() => {
      if (root.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    lock.observe(root, { attributes: true, attributeFilter: ["style"] });

    return () => {
      lock.disconnect();
      lenis.destroy();
      root.style.removeProperty("--scroll");
    };
  }, []);

  // Route changes start at the top (Lenis owns the scroll position).
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  // Spring physics for magnetic buttons and tilting cards.
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const bodies: Body[] = [];
    const byEl = new Map<HTMLElement, Body>();
    const add = (el: HTMLElement, kind: Body["kind"]) => {
      if (byEl.has(el)) return;
      const body: Body = { el, kind, a: [0, 0], b: [0, 0], c: [0, 0], ta: 0, tb: 0, tc: 0, visible: false };
      byEl.set(el, body);
      bodies.push(body);
      io.observe(el);
    };

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const body = byEl.get(e.target as HTMLElement);
        if (body) body.visible = e.isIntersecting;
      }
    });

    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => add(el, "magnetic"));
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => add(el, "tilt"));

    let px = -9999;
    let py = -9999;
    let raf = 0;
    let running = false;
    let last = 0;

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

    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      let moving = false;

      // Read phase: layout rects (rest position = current rect minus our own offset).
      const rects = bodies.map((b) => (b.visible ? b.el.getBoundingClientRect() : null));

      bodies.forEach((b, i) => {
        const r = rects[i];
        if (!r) return;
        if (b.kind === "magnetic") {
          const cx = r.left + r.width / 2 - b.a[0];
          const cy = r.top + r.height / 2 - b.b[0];
          const dx = px - cx;
          const dy = py - cy;
          const reach = Math.max(r.width, r.height) * 0.9 + 28;
          const dist = Math.hypot(dx, dy);
          if (dist < reach) {
            const pull = 1 - dist / reach;
            b.ta = dx * 0.32 * pull + dx * 0.06;
            b.tb = dy * 0.32 * pull + dy * 0.06;
          } else {
            b.ta = 0;
            b.tb = 0;
          }
        } else {
          const inside = px >= r.left && px <= r.right && py >= r.top && py <= r.bottom;
          if (inside) {
            const nx = (px - r.left) / r.width - 0.5;
            const ny = (py - r.top) / r.height - 0.5;
            b.ta = -ny * 7; // rotateX
            b.tb = nx * 9; // rotateY
            b.tc = 1;
            b.el.style.setProperty("--gx", `${(nx + 0.5) * 100}%`);
            b.el.style.setProperty("--gy", `${(ny + 0.5) * 100}%`);
          } else {
            b.ta = 0;
            b.tb = 0;
            b.tc = 0;
          }
        }
      });

      // Write phase.
      for (const b of bodies) {
        if (!b.visible) continue;
        stepSpring(b.a, b.ta, dt);
        stepSpring(b.b, b.tb, dt);
        stepSpring(b.c, b.tc, dt);
        const settled =
          Math.abs(b.a[0] - b.ta) < REST * 10 &&
          Math.abs(b.b[0] - b.tb) < REST * 10 &&
          Math.abs(b.c[0] - b.tc) < REST &&
          Math.abs(b.a[1]) + Math.abs(b.b[1]) + Math.abs(b.c[1]) < 0.01;
        if (settled) {
          b.a = [b.ta, 0];
          b.b = [b.tb, 0];
          b.c = [b.tc, 0];
          if (b.ta === 0 && b.tb === 0 && b.tc === 0) {
            b.el.style.transform = "";
            b.el.style.willChange = "";
          }
          continue;
        }
        moving = true;
        b.el.style.willChange = "transform";
        if (b.kind === "magnetic") {
          b.el.style.transform = `translate3d(${b.a[0].toFixed(2)}px, ${b.b[0].toFixed(2)}px, 0)`;
        } else {
          b.el.style.setProperty("--lift", b.c[0].toFixed(3));
          b.el.style.transform = `perspective(1000px) rotateX(${b.a[0].toFixed(2)}deg) rotateY(${b.b[0].toFixed(2)}deg) translate3d(0, ${(-4 * b.c[0]).toFixed(2)}px, 0)`;
        }
      }

      // Keep running while the pointer is on screen or anything is still moving.
      if (moving || px > -9000) raf = requestAnimationFrame(tick);
      else running = false;
    }

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      for (const b of bodies) {
        b.el.style.transform = "";
        b.el.style.willChange = "";
      }
    };
  }, [pathname]);

  return <div aria-hidden="true" className="scroll-progress" />;
}
