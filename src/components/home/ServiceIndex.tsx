"use client";

import Link from "next/link";
import { useState } from "react";
import { DocumentStage } from "@/components/scene/DocumentStage";
import { serviceSceneKeys, type ServiceSceneKey } from "@/components/scene/scenes";

export type ServiceIndexItem = { slug: string; title: string; summary: string; mainlyFor: string; scene: ServiceSceneKey };

/**
 * The eight services as an editorial index. Every row is an ordinary crawlable link (title first, so its
 * accessible name starts with the service name). On desktop, hovering or focusing a row lifts that service's
 * document composition onto the stage beside the list; on smaller screens each row shows its own composition.
 */
export function ServiceIndex({ items, headingLevel = "h3" }: { items: ServiceIndexItem[]; headingLevel?: "h2" | "h3" }) {
  const [active, setActive] = useState<ServiceSceneKey>(items[0]?.scene ?? "passport");
  const Heading = headingLevel;

  return (
    <div className="svc-index">
      <ul className="service-tiles svc-list">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/services/${item.slug}/`}
              className="svc-row"
              data-active={active === item.scene}
              data-cta-location="services-grid"
              onPointerEnter={() => setActive(item.scene)}
              onFocus={() => setActive(item.scene)}
            >
              <Heading className="svc-row-title">{item.title}</Heading>
              <span className="svc-row-summary">{item.summary}</span>
              <span className="svc-row-for">Mainly for {item.mainlyFor}</span>
              <span className="svc-row-thumb" aria-hidden="true">
                <DocumentStage scene={item.scene} ratio="1 / 0.78" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="svc-stage" aria-hidden="true">
        <div className="svc-stage-inner">
          <DocumentStage scene={serviceSceneKeys} active={active} tilt ratio="1 / 0.92" />
        </div>
      </div>
    </div>
  );
}
