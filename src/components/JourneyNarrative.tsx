"use client";

import { useEffect, useRef, useState } from "react";
import { DocumentStage } from "@/components/scene/DocumentStage";
import { SceneImage } from "@/components/scene/SceneImage";
import type { SceneKey } from "@/components/scene/scenes";

type Step = { title: string; body: string; who: string };

const stageKeys = ["step-1", "step-2", "step-3", "step-4", "step-5"] as const satisfies readonly SceneKey[];

/**
 * The five steps as a narrative: on wide screens a sticky stage follows the step nearest the middle of the
 * viewport (native scrolling, an IntersectionObserver — never scroll-jacking). The steps are an ordinary
 * ordered list; the stage is decoration and the page reads the same without it.
 */
export function JourneyNarrative({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-step]") ?? []);
    if (!("IntersectionObserver" in window) || items.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="journey">
      <div className="journey-stage" aria-hidden="true">
        <div className="journey-stage-inner">
          <DocumentStage scene={stageKeys} active={stageKeys[active]} tilt ratio="1 / 0.86" />
          <p className="journey-stage-caption">
            <span>{active + 1}</span> of 5
          </p>
        </div>
      </div>
      <ol ref={listRef} className="journey-list">
        {steps.map((step, i) => (
          <li key={step.title} data-step={i} className="journey-step" data-active={i === active}>
            <span className="journey-num" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h3 className="journey-title">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="journey-body">{step.body}</p>
              <p className="journey-who">
                <span className="sr-only">Who acts: </span>
                {step.who}
              </p>
              {/* Phones and tablets: each step shows its own still (the sticky stage is wide-screen only). */}
              <SceneImage scene={stageKeys[i]!} alt="" sizes="(min-width: 1024px) 1px, 70vw" width={1120} height={963} className="journey-step-image" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
