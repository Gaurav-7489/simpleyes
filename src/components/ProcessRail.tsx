"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import * as m from "motion/react-m";

type Step = { title: string; body: string };

/**
 * A five-step sequence whose connecting line fills as the steps scroll through the viewport — progress you can
 * see, on Motion's shared scroll listener (transform only). Horizontal from 1024px, vertical below.
 */
export function ProcessRail({ steps, className = "" }: { steps: readonly Step[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  return (
    <div ref={ref} className={`process-rail-wrap ${className}`}>
      <span aria-hidden="true" className="process-rail-track">
        <m.span className="process-rail-fill process-rail-fill-x" style={{ scaleX: scrollYProgress }} />
        <m.span className="process-rail-fill process-rail-fill-y" style={{ scaleY: scrollYProgress }} />
      </span>
      <ol className="process-rail">
      {steps.map((step, i) => (
        <li key={step.title} className="process-rail-item">
          <span className="process-rail-num" aria-hidden="true">
            {i + 1}
          </span>
          <h3 className="process-rail-title">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className="process-rail-body">{step.body}</p>
        </li>
      ))}
      </ol>
    </div>
  );
}
