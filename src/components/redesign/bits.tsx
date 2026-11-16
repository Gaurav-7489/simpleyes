import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { missionPath, missions } from "@/content/missions";
import { guidePath, type Guide } from "@/content/guides";

/** Lime dash + green label above a section heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className ?? ""}`}>{children}</p>;
}

/** The small rounded check square used in every list of the redesign. */
export function CheckBox({ tone = "green" }: { tone?: "green" | "rust" | "lime" }) {
  return (
    <span className="check-box" data-tone={tone} aria-hidden="true">
      <Check className="size-3" strokeWidth={3} />
    </span>
  );
}

/** Title + description rows with a check box. */
export function CheckRows({
  items,
  className,
}: {
  items: { title: string; body?: string; urgent?: boolean }[];
  className?: string;
}) {
  return (
    <ul className={`check-rows ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item.title}>
          <CheckBox tone={item.urgent ? "rust" : "green"} />
          <span>
            <span className="check-rows-title">{item.title}</span>
            {item.body && <span className="check-rows-body">{item.body}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** "We help with applications at:" row of mission chips, each linking to its mission page. */
export function MissionChips({ label = "We help with applications at:" }: { label?: string }) {
  return (
    <div className="mission-chips">
      <p>{label}</p>
      <ul>
        {missions.map((mission) => (
          <li key={mission.slug}>
            <Link href={missionPath(mission)} className="chip">
              {mission.chip}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Keeps "e-OCI" on one line without changing the text (a normal hyphen, for search and copy-paste). */
export function withNowrap(text: string): ReactNode {
  const parts = text.split("e-OCI");
  return parts.flatMap((part, i) =>
    i === 0 ? [part] : [<span key={i} className="nowrap">e-OCI</span>, part],
  );
}

/** Guide card with a coloured top band. */
export function GuideCard({ guide, headingLevel = 3 }: { guide: Guide; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={guidePath(guide)} className="guide-card" data-tone={guide.tone}>
      <span className="guide-card-band" aria-hidden="true" />
      <div className="guide-card-body">
        <p className="guide-card-meta" data-emergency={guide.kind === "Emergency" ? "" : undefined}>
          {guide.kind} · {guide.time}
        </p>
        <Heading className="guide-card-title">{withNowrap(guide.title)}</Heading>
      </div>
    </Link>
  );
}
