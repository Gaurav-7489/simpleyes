import type { ReactNode } from "react";
import { Badge } from "./Badge";

type Props = {
  badge?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  id?: string;
  as?: "h1" | "h2";
  /** Optional section number shown before the label. */
  index?: string;
};

/** Section header: small label → display heading → short lead. */
export function SectionHeading({ badge, title, lead, align = "center", id, as: Tag = "h2", index }: Props) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start text-left"}`} data-reveal>
      {badge && <Badge index={index}>{badge}</Badge>}
      <Tag id={id} className={`type-h2 ${centered ? "max-w-[20ch]" : "max-w-[18ch]"}`}>
        {title}
      </Tag>
      {lead && <p className={`type-lead ${centered ? "max-w-[48ch]" : "max-w-[44ch]"}`}>{lead}</p>}
    </div>
  );
}
