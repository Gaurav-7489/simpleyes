import type { ReactNode } from "react";
import {
  FileCheck2,
  Landmark,
  Lightbulb,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Scale,
  ScrollText,
  UserRound,
} from "lucide-react";
import type { BenefitArt as BenefitArtKind } from "@/content/home";

/** Decorative neumorphic compositions for the "Why Simplyes" bento (reference: Benefits). */

function SoftOrb({ size = 56, children, accent = false }: { size?: number; children: ReactNode; accent?: boolean }) {
  return (
    <span className={accent ? "orb" : "orb-soft"} style={{ width: size, height: size }}>
      {children}
    </span>
  );
}

function Pill({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium shadow-[0_0_0_4px_rgb(255_255_255/0.6),0_8px_18px_-8px_rgb(0_0_0/0.2)] ${
        accent ? "bg-accent-600 text-white" : "bg-[#f9faf9] text-ink-2"
      }`}
    >
      {children}
    </span>
  );
}

function Line({ className }: { className?: string }) {
  return <span className={`block h-px bg-gradient-to-r from-black/5 via-black/15 to-black/5 ${className ?? ""}`} />;
}

const iconProps = { "aria-hidden": true, strokeWidth: 1.6 } as const;

export function BenefitArt({ kind }: { kind: BenefitArtKind }) {
  switch (kind) {
    case "clarity":
      return (
        <div className="flex h-full items-center justify-center gap-0 px-6">
          <SoftOrb>
            <ScrollText className="size-5" {...iconProps} />
          </SoftOrb>
          <span className="relative mx-3 w-20 sm:w-24">
            <Line />
            <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500 shadow-[0_0_8px_2px_rgb(111_154_60/0.5)]" />
          </span>
          <SoftOrb accent>
            <Lightbulb className="size-5" {...iconProps} />
          </SoftOrb>
        </div>
      );
    case "documents":
      return (
        <div className="flex h-full items-center justify-center gap-4 px-6 sm:gap-8">
          <SoftOrb size={68}>
            <FileCheck2 className="size-6" {...iconProps} />
          </SoftOrb>
          <div className="flex flex-col items-start gap-3">
            {["Checklist", "Copies", "Forms"].map((label, i) => (
              <span key={label} className="flex items-center gap-3">
                <Line className="w-6 sm:w-14" />
                <Pill accent={i === 0}>
                  {label}
                  <span className={`rounded-full px-1.5 text-[10px] ${i === 0 ? "bg-white/20" : "bg-black/5"}`}>
                    {i === 0 ? "✓" : "…"}
                  </span>
                </Pill>
              </span>
            ))}
          </div>
        </div>
      );
    case "personal":
      return (
        <div className="flex h-full items-center justify-center gap-5 px-6">
          <SoftOrb size={72} accent>
            <UserRound className="size-7" {...iconProps} />
          </SoftOrb>
          <div className="flex flex-col gap-3">
            <Pill>Your situation</Pill>
            <span className="pl-6">
              <Pill accent>Your next step</Pill>
            </span>
          </div>
        </div>
      );
    case "germany":
      return (
        <div className="relative grid h-full place-items-center">
          <span className="absolute size-40 rounded-full border border-dashed border-black/10" />
          <span className="absolute size-24 rounded-full border border-black/[0.06]" />
          <SoftOrb size={60} accent>
            <MapPin className="size-6" {...iconProps} />
          </SoftOrb>
          {[
            "left-[18%] top-[22%]",
            "right-[20%] top-[18%]",
            "left-[24%] bottom-[16%]",
            "right-[16%] bottom-[24%]",
          ].map((pos) => (
            <span
              key={pos}
              className={`absolute ${pos} size-3 rounded-full bg-[#f9faf9] shadow-[0_0_0_4px_rgb(255_255_255/0.6),0_6px_12px_-4px_rgb(0_0_0/0.2)]`}
            />
          ))}
        </div>
      );
    case "chat":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
          <span className="self-start rounded-2xl rounded-bl-md bg-[#f9faf9] px-4 py-2.5 text-xs text-ink-2 shadow-[0_8px_18px_-8px_rgb(0_0_0/0.2)]">
            Hello Simplyes, I need help…
          </span>
          <span className="flex items-center gap-2 self-end rounded-2xl rounded-br-md bg-accent-600 px-4 py-2.5 text-xs text-white shadow-[0_8px_18px_-8px_rgb(62_106_0/0.5)]">
            <MessageCircle className="size-3.5" {...iconProps} />
            Happy to help!
          </span>
        </div>
      );
    case "independent":
      return (
        <div className="flex h-full items-center justify-center gap-3 px-4 sm:gap-6">
          <Pill>
            <MessagesSquare className="size-3.5" {...iconProps} />
            Guidance
          </Pill>
          <Line className="w-4 sm:w-10" />
          <SoftOrb size={64} accent>
            <Scale className="size-6" {...iconProps} />
          </SoftOrb>
          <Line className="w-4 sm:w-10" />
          <Pill>
            <Landmark className="size-3.5" {...iconProps} />
            Decisions
          </Pill>
        </div>
      );
  }
}
