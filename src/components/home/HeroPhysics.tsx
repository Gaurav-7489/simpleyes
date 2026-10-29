"use client";

import { useEffect, useRef } from "react";
import { Camera, CalendarCheck, FileText, ClipboardList, Lightbulb, UserRound } from "lucide-react";

/**
 * Decorative physics playground inside the hero (aria-hidden, xl screens only).
 * Chips drift on a gentle sine, spring back to a home position, are repelled by
 * the cursor, collide softly with each other and can be grabbed and thrown with
 * inertia. The hero orb follows the cursor with lag and parallaxes on scroll.
 * One rAF loop, transform-only, paused when off screen or the tab is hidden.
 */

const chips = [
  { label: "Documents", icon: FileText, x: 0.1, y: 0.3 },
  { label: "Photo & signature", icon: Camera, x: 0.06, y: 0.63 },
  { label: "Appointments", icon: CalendarCheck, x: 0.18, y: 0.74 },
  { label: "Forms", icon: ClipboardList, x: 0.9, y: 0.27 },
  { label: "Clarity", icon: Lightbulb, x: 0.94, y: 0.6 },
  { label: "Personal help", icon: UserRound, x: 0.82, y: 0.74 },
] as const;

type P = {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number;
  hy: number;
  phase: number;
  drag: boolean;
  grabX: number;
  grabY: number;
};

const RADIUS = 58;

export function HeroPhysics() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.parentElement;
    if (!root || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wide = window.matchMedia("(min-width: 1280px)");
    if (!wide.matches) return;

    const orb = hero.querySelector<HTMLElement>(".hero-orb");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-chip]"));
    let w = 0;
    let h = 0;
    let top = 0;

    const parts: P[] = els.map((el, i) => ({
      el,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      hx: 0,
      hy: 0,
      phase: i * 1.7,
      drag: false,
      grabX: 0,
      grabY: 0,
    }));

    const layout = () => {
      const r = hero.getBoundingClientRect();
      w = r.width;
      h = r.height;
      top = r.top;
      parts.forEach((p, i) => {
        const ohx = p.hx;
        const ohy = p.hy;
        const home = chips[i];
        if (!home) return;
        p.hx = home.x * w;
        p.hy = home.y * h;
        if (!ohx && !ohy) {
          p.x = p.hx;
          p.y = p.hy;
        } else {
          p.x += p.hx - ohx;
          p.y += p.hy - ohy;
        }
      });
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(hero);

    // Pointer in hero-local coordinates (and a lagged copy for the orb).
    let mx = -9999;
    let my = -9999;
    let ox = 0;
    let oy = 0;
    let ovx = 0;
    let ovy = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX - hero.getBoundingClientRect().left;
      my = e.clientY - hero.getBoundingClientRect().top;
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
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);

    const releases: Array<() => void> = [];
    parts.forEach((p) => {
      let lastX = 0;
      let lastY = 0;
      let lastT = 0;
      const down = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
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
      const move = (e: PointerEvent) => {
        if (!p.drag) return;
        const now = performance.now();
        const dt = Math.max((now - lastT) / 1000, 1 / 240);
        // Smoothed throw velocity.
        p.vx = p.vx * 0.6 + ((p.x - lastX) / dt) * 0.4;
        p.vy = p.vy * 0.6 + ((p.y - lastY) / dt) * 0.4;
        lastX = p.x;
        lastY = p.y;
        lastT = now;
        void e;
      };
      const up = () => {
        p.drag = false;
        delete p.el.dataset.grab;
        const cap = 1800;
        p.vx = Math.max(-cap, Math.min(cap, p.vx));
        p.vy = Math.max(-cap, Math.min(cap, p.vy));
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
    });

    let raf = 0;
    let last = 0;
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const t = now / 1000;

      for (const p of parts) {
        if (p.drag) continue;
        // Home drifts on a slow Lissajous so the cluster always feels alive.
        const tx = p.hx + Math.sin(t * 0.7 + p.phase) * 10;
        const ty = p.hy + Math.cos(t * 0.55 + p.phase * 1.3) * 12;
        let ax = (tx - p.x) * 16;
        let ay = (ty - p.y) * 16;
        // Cursor repulsion.
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy);
        if (d < 190 && d > 0.5) {
          const f = ((190 - d) / 190) ** 2 * 5200;
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }
        p.vx += ax * dt;
        p.vy += ay * dt;
        const damp = Math.exp(-4.2 * dt);
        p.vx *= damp;
        p.vy *= damp;
      }

      // Soft circle collisions (also against the one being dragged).
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
              const j2 = -rel * 0.85;
              if (!a.drag) {
                a.vx -= nx * j2;
                a.vy -= ny * j2;
              }
              if (!b.drag) {
                b.vx += nx * j2;
                b.vy += ny * j2;
              }
            }
          }
        }
      }

      for (const p of parts) {
        if (!p.drag) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        }
        // Walls: bounce inside the hero.
        const m = 100;
        if (p.x < m) {
          p.x = m;
          p.vx = Math.abs(p.vx) * 0.6;
        } else if (p.x > w - m) {
          p.x = w - m;
          p.vx = -Math.abs(p.vx) * 0.6;
        }
        if (p.y < 90) {
          p.y = 90;
          p.vy = Math.abs(p.vy) * 0.6;
        } else if (p.y > h - 150) {
          p.y = h - 150;
          p.vy = -Math.abs(p.vy) * 0.6;
        }
        const speed = Math.hypot(p.vx, p.vy);
        const tilt = Math.max(-14, Math.min(14, p.vx * 0.02));
        const scale = p.drag ? 1.08 : 1 + Math.min(speed / 4000, 0.05);
        p.el.style.transform = `translate3d(${(p.x - p.hx).toFixed(1)}px, ${(p.y - p.hy).toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }

      // Orb: damped spring toward a fraction of the cursor offset + scroll parallax.
      if (orb) {
        const cx = mx > -9000 ? (mx - w / 2) * 0.05 : 0;
        const cy = mx > -9000 ? (my - h / 2) * 0.05 : 0;
        ovx += (-(ox - cx) * 40 - ovx * 9) * dt;
        ovy += (-(oy - cy) * 40 - ovy * 9) * dt;
        ox += ovx * dt;
        oy += ovy * dt;
        const sy = Math.max(0, -top) * 0.18;
        const scale = 1 + Math.min(Math.max(0, -top) / 3200, 0.18);
        orb.style.transform = `translate3d(calc(-50% + ${ox.toFixed(2)}px), calc(-50% + ${(oy + sy).toFixed(2)}px), 0) scale(${scale.toFixed(3)})`;
      }
    };

    const loop = (now: number) => {
      top = hero.getBoundingClientRect().top;
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
    io.observe(hero);
    const onVis = () => (document.hidden ? halt() : run());
    document.addEventListener("visibilitychange", onVis);
    run();

    return () => {
      halt();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      releases.forEach((r) => r());
      if (orb) orb.style.transform = "";
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden xl:block">
      {chips.map(({ label, icon: Icon, x, y }, i) => (
        <div
          key={label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
        >
          <div data-chip className="physics-chip pointer-events-auto" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="orb-soft size-8">
              <Icon className="size-4" strokeWidth={1.75} />
            </span>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
