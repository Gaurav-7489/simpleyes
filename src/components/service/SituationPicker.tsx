"use client";

import { useId, useState, type ReactNode } from "react";
import {
  Baby,
  BookOpen,
  Briefcase,
  CalendarCheck,
  CalendarClock,
  CircleCheck,
  CircleHelp,
  FilePen,
  FilePlus2,
  FileText,
  FolderOpen,
  GraduationCap,
  HeartHandshake,
  House,
  ImageOff,
  Languages,
  ListChecks,
  Plane,
  RefreshCw,
  SpellCheck,
  Stamp,
  TriangleAlert,
  UserCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { VisualIcon } from "@/content/services";

const icons: Record<VisualIcon, LucideIcon> = {
  calendar: CalendarClock,
  alert: TriangleAlert,
  edit: FilePen,
  new: UserPlus,
  first: FilePlus2,
  refresh: RefreshCw,
  group: Users,
  upload: ImageOff,
  stamp: Stamp,
  translate: Languages,
  question: CircleHelp,
  spelling: SpellCheck,
  declaration: FileText,
  proxy: UserCheck,
  folder: FolderOpen,
  checklist: ListChecks,
  appointment: CalendarCheck,
  baby: Baby,
  spouse: HeartHandshake,
  degree: GraduationCap,
  study: BookOpen,
  relocate: Plane,
  onboard: Briefcase,
  home: House,
};

type Tile = { icon: VisualIcon; label: string; answer: string };

/**
 * "Which one is you?" — pick a situation tile to see, in one sentence, how SimplYes helps.
 * The first tile is selected on the server, so the answer is readable without JavaScript.
 */
export function SituationPicker({ tiles, actions }: { tiles: Tile[]; actions: ReactNode }) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const current = tiles[active] ?? tiles[0]!;

  return (
    <div>
      <ul className={`mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-10 ${tiles.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {tiles.map((t, i) => {
          const Icon = icons[t.icon];
          const selected = i === active;
          return (
            <li key={t.label} className={tiles.length === 3 && i === 2 ? "col-span-2 lg:col-span-1" : undefined}>
              <button
                type="button"
                className="visual-tile"
                aria-pressed={selected}
                aria-controls={panelId}
                onClick={() => setActive(i)}
              >
                <span className="visual-icon">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </span>
                <span className="font-display text-[clamp(1rem,0.92rem+0.4vw,1.25rem)] font-medium leading-snug text-ink">
                  {t.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div id={panelId} aria-live="polite" className="visual-answer mt-4 sm:mt-5">
        <p key={active} className="visual-answer-text">
          <CircleCheck aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-accent-700" strokeWidth={1.75} />
          <span>
            <span className="block text-sm font-medium text-accent-700">{current.label}</span>
            <span className="mt-1 block font-display text-[clamp(1.0625rem,0.95rem+0.5vw,1.375rem)] leading-snug text-ink">
              {current.answer}
            </span>
          </span>
        </p>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">{actions}</div>
      </div>
    </div>
  );
}
