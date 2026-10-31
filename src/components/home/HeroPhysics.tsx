"use client";

import { useEffect, useRef } from "react";

/**
 * Gentle physics for the hero illustration panel (desktop, pointer devices).
 * The chips are server-rendered inside the panel; this only animates them:
 * they drift on a slow sine, spring back home, keep clear of the central card,
 * are nudged away by the cursor, collide softly and can be dragged and thrown.
 * One rAF loop, transform-only, paused off screen / in hidden tabs.
 */

type P = {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number;
  hy: number;
  hw: number;
  hh: number;
  phase: number;
  drag: boolean;
  grabX: number;
  grabY: number;
};

const RADIUS = 44;

export function HeroPhysics() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const panel = markerRef.current?.parentElement;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const orb = panel.querySelector<HTMLElement>(".hero-orb");
    const core = panel.querySelector<HTMLElement>("[data-core]");
    const els = Array.from(panel.querySelectorAll<HTMLElement>("[data-chip]"));
    panel.dataset.physics = "";
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let cr = 0;

    const parts: P[] = els.map((el, i) => ({
      el,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      hx: 0,
      hy: 0,
      hw: 0,
      hh: 0,
      phase: i * 1.3,
      drag: false,
      grabX: 0,
      grabY: 0,
    }));

    const layout = () => {
      w = panel.clientWidth;
      h = panel.clientHeight;
      if (core) {
        cx = core.offsetLeft + core.offsetWidth / 2;
        cy = core.offsetTop + core.offsetHeight / 2;
        cr = Math.max(core.offsetWidth, core.offsetHeight) / 2 + 24;
      }
      for (const p of parts) {
        const anchor = p.el.parentElement as HTMLElement;
        const ohx = p.hx;
        const ohy = p.hy;
        p.hx = anchor.offsetLeft;
        p.hy = anchor.offsetTop;
        p.hw = p.el.offsetWidth / 2;
        p.hh = p.el.offsetHeight / 2;
        if (!ohx && !ohy) {
          p.x = p.hx;
          p.y = p.hy;
        } else {
          p.x += p.hx - ohx;
          p.y += p.hy - ohy;
        }
      }
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(panel);

    let mx = -9999;
    let my = -9999;
    let ox = 0;
    let oy = 0;
    let ovx = 0;
    let ovy = 0;

    const onMove = (e: PointerEvent) => {
      const r = panel.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      for (const p of parts) {
        if (p.drag) {
          p.x = mx - p.grabX;
          p.y = my - p.grabY;
        }
      }
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    panel.addEventListener("pointermove", onMove, { passive: true });
    panel.addEventListener("pointerleave", onLeave);

    const releases: Array<() => void> = [];
    for (const p of parts) {
      let lastX = 0;
      let lastY = 0;
      let lastT = 0;
      const down = (e: PointerEvent) => {
        const r = panel.getBoundingClientRect();
        p.drag = true;
        p.grabX = e.clientX - r.left - p.x;
        p.grabY = e.clientY - r.top - p.y;
        p.vx = p.vy = 0;
        lastX = p.x;
        lastY = p.y;
        lastT = performance.now();
        p.el.setPointerCapture(e.pointerId);
        p.el.dataset.grab = "true";
      };
      const move = () => {
        if (!p.drag) return;
        const now = performance.now();
        const dt = Math.max((now - lastT) / 1000, 1 / 240);
        p.vx = p.vx * 0.6 + ((p.x - lastX) / dt) * 0.4;
        p.vy = p.vy * 0.6 + ((p.y - lastY) / dt) * 0.4;
        lastX = p.x;
        lastY = p.y;
        lastT = now;
      };
      const up = () => {
        p.drag = false;
        delete p.el.dataset.grab;
        p.vx = Math.max(-1400, Math.min(1400, p.vx));
        p.vy = Math.max(-1400, Math.min(1400, p.vy));
      };
      p.el.addEventListener("pointerdown", down);
      p.el.addEventListener("pointermove", move);
      p.el.addEventListener("pointerup", up);
      p.el.addEventListener("pointercancel", up);
      releases.push(() => {
        p.el.removeEventListener("pointerdown", down);
        p.el.removeEventListener("pointermove", move);
        p.el.removeEventListener("pointerup", up);
        p.el.removeEventListener("pointercancel", up);
      });
    }

    let raf = 0;
    let last = 0;
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const t = now / 1000;

      for (const p of parts) {
        if (p.drag) continue;
        const tx = p.hx + Math.sin(t * 0.6 + p.phase) * 6;
        const ty = p.hy + Math.cos(t * 0.5 + p.phase * 1.3) * 8;
        let ax = (tx - p.x) * 14;
        let ay = (ty - p.y) * 14;
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy);
        if (d < 140 && d > 0.5) {
          const f = ((140 - d) / 140) ** 2 * 3600;
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }
        p.vx += ax * dt;
        p.vy += ay * dt;
        const damp = Math.exp(-4.5 * dt);
        p.vx *= damp;
        p.vy *= damp;
      }

      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          if (!a || !b) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.001;
          const min = RADIUS * 2;
          if (d < min) {
            const nx = dx / d;
            const ny = dy / d;
            const push = (min - d) / 2;
            if (!a.drag) {
              a.x -= nx * push;
              a.y -= ny * push;
            }
            if (!b.drag) {
              b.x += nx * push;
              b.y += ny * push;
            }
            const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (rel < 0) {
              const imp = -rel * 0.8;
              if (!a.drag) {
                a.vx -= nx * imp;
                a.vy -= ny * imp;
              }
              if (!b.drag) {
                b.vx += nx * imp;
                b.vy += ny * imp;
              }
            }
          }
        }
      }

      for (const p of parts) {
        if (!p.drag) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          // Keep clear of the central card.
          if (cr) {
            const dx = p.x - cx;
            const dy = p.y - cy;
            const d = Math.hypot(dx, dy) || 0.001;
            if (d < cr) {
              p.x = cx + (dx / d) * cr;
              p.y = cy + (dy / d) * cr;
              const vn = p.vx * (dx / d) + p.vy * (dy / d);
              if (vn < 0) {
                p.vx -= 1.6 * vn * (dx / d);
                p.vy -= 1.6 * vn * (dy / d);
              }
            }
          }
        }
        if (p.x < p.hw) {
          p.x = p.hw;
          p.vx = Math.abs(p.vx) * 0.6;
        } else if (p.x > w - p.hw) {
          p.x = w - p.hw;
          p.vx = -Math.abs(p.vx) * 0.6;
        }
        if (p.y < p.hh) {
          p.y = p.hh;
          p.vy = Math.abs(p.vy) * 0.6;
        } else if (p.y > h - p.hh) {
          p.y = h - p.hh;
          p.vy = -Math.abs(p.vy) * 0.6;
        }
        const tilt = Math.max(-10, Math.min(10, p.vx * 0.015));
        const scale = p.drag ? 1.06 : 1;
        p.el.style.transform = `translate3d(${(p.x - p.hx).toFixed(1)}px, ${(p.y - p.hy).toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg) scale(${scale})`;
      }

      if (orb) {
        const tx = mx > -9000 ? (mx - w / 2) * 0.06 : 0;
        const ty = mx > -9000 ? (my - h / 2) * 0.06 : 0;
        ovx += (-(ox - tx) * 40 - ovx * 9) * dt;
        ovy += (-(oy - ty) * 40 - ovy * 9) * dt;
        ox += ovx * dt;
        oy += ovy * dt;
        orb.style.transform = `translate3d(calc(-50% + ${ox.toFixed(2)}px), calc(-50% + ${oy.toFixed(2)}px), 0)`;
      }
    };

    const loop = (now: number) => {
      tick(now);
      raf = requestAnimationFrame(loop);
    };
    const run = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const halt = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      visible = entry.isIntersecting;
      if (visible) run();
      else halt();
    });
    io.observe(panel);
    const onVis = () => (document.hidden ? halt() : run());
    document.addEventListener("visibilitychange", onVis);
    run();

    return () => {
      halt();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerleave", onLeave);
      releases.forEach((r) => r());
      for (const p of parts) p.el.style.transform = "";
      if (orb) orb.style.transform = "";
      delete panel.dataset.physics;
    };
  }, []);

  return <span ref={markerRef} hidden />;
}
