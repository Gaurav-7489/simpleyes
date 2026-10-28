import type { ReactNode } from "react";
import { Badge } from "./Badge";

type Props = {
  badge: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  id?: string;
  as?: "h1" | "h2";
};

/** Reference section header: label pill → large display heading → short lead. */
export function SectionHeading({ badge, title, lead, align = "center", id, as: Tag = "h2" }: Props) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start text-left"}`} data-reveal>
      <Badge>{badge}</Badge>
      <Tag id={id} className={`type-h2 ${centered ? "max-w-[18ch]" : "max-w-[16ch]"}`}>
        {title}
      </Tag>
      {lead && <p className={`type-lead ${centered ? "max-w-[46ch]" : "max-w-[42ch]"}`}>{lead}</p>}
    </div>
  );
}
