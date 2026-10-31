import type { ReactNode } from "react";
import { Badge } from "./Badge";
import { revealDelay } from "@/lib/style";

type Props = {
  badge: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  id?: string;
  as?: "h1" | "h2";
  /** Section number shown in the label, e.g. "02". */
  index?: string;
  icon?: ReactNode;
};

/** Section header: editorial label → display heading → short lead. */
export function SectionHeading({ badge, title, lead, align = "center", id, as: Tag = "h2", index, icon }: Props) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start text-left"}`}>
      {/* Staggered, slow reveal: label → heading → lead. */}
      <div data-reveal>
        <Badge index={index} icon={icon}>
          {badge}
        </Badge>
      </div>
      <Tag id={id} data-reveal style={revealDelay(120)} className={`type-h2 ${centered ? "max-w-[18ch]" : "max-w-[16ch]"}`}>
        {title}
      </Tag>
      {lead && (
        <p data-reveal style={revealDelay(240)} className={`type-lead ${centered ? "max-w-[46ch]" : "max-w-[42ch]"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
