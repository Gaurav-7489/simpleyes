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
    <span className="relative inline-grid place-items-center">
      {accent && <Ping />}
      <span className={accent ? "orb" : "orb-soft"} style={{ width: size, height: size }}>
        {children}
      </span>
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

function Line({ className, pulse = false, delay = 0 }: { className?: string; pulse?: boolean; delay?: number }) {
  return (
    <span className={`relative block h-px bg-gradient-to-r from-black/5 via-black/15 to-black/5 ${className ?? ""}`}>
      {pulse && <span className="art-pulse" style={{ animationDelay: `${delay}ms` }} />}
    </span>
  );
}

/** Soft expanding ring behind an orb. */
function Ping({ delay = 0 }: { delay?: number }) {
  return <span aria-hidden="true" className="art-ping" style={{ animationDelay: `${delay}ms` }} />;
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
            <Line className="w-full" pulse />
          </span>
          <SoftOrb accent>
            <Lightbulb className="size-5" {...iconProps} />
          </SoftOrb>
        </div>
      );
    case "documents":
      return (
        <div className="flex h-full items-center justify-center gap-3 px-3 sm:gap-8 sm:px-6">
          <SoftOrb size={68}>
            <FileCheck2 className="size-6" {...iconProps} />
          </SoftOrb>
          <div className="flex flex-col items-start gap-3">
            {["Checklist", "Copies", "Forms"].map((label, i) => (
              <span key={label} className="flex items-center gap-3">
                <Line className="w-4 sm:w-14" pulse delay={i * 700} />
                <Pill accent={i === 0}>
                  {label}
                  <span className="art-tick rounded-full bg-black/5 px-1.5 text-[10px]" style={{ animationDelay: `${i * 1400}ms` }}>
                    <span className="art-tick-a">…</span>
                    <span className="art-tick-b">✓</span>
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
            <span className="art-float inline-flex">
              <Pill>Your situation</Pill>
            </span>
            <span className="art-float inline-flex pl-6" style={{ animationDelay: "-2.2s" }}>
              <Pill accent>Your next step</Pill>
            </span>
          </div>
        </div>
      );
    case "germany":
      return (
        <div className="relative grid h-full place-items-center">
          <span className="art-orbit absolute size-40 rounded-full border border-dashed border-black/10">
            {[0, 90, 180, 270].map((deg) => (
              <span
                key={deg}
                className="absolute left-1/2 top-1/2 size-3 -ml-1.5 -mt-1.5 rounded-full bg-[#f9faf9] shadow-[0_0_0_4px_rgb(255_255_255/0.6),0_6px_12px_-4px_rgb(0_0_0/0.2)]"
                style={{ transform: `rotate(${deg}deg) translateY(-80px)` }}
              />
            ))}
          </span>
          <span className="absolute size-24 rounded-full border border-black/[0.06]" />
          <SoftOrb size={60} accent>
            <MapPin className="size-6" {...iconProps} />
          </SoftOrb>
        </div>
      );
    case "chat":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
          <span className="art-chat-a self-start rounded-2xl rounded-bl-md bg-[#f9faf9] px-4 py-2.5 text-xs text-ink-2 shadow-[0_8px_18px_-8px_rgb(0_0_0/0.2)]">
            Hello Simplyes, I need help…
          </span>
          <span className="art-typing self-end rounded-full bg-black/[0.06] px-3 py-2">
            <i /> <i /> <i />
          </span>
          <span className="art-chat-b flex items-center gap-2 self-end rounded-2xl rounded-br-md bg-accent-600 px-4 py-2.5 text-xs text-white shadow-[0_8px_18px_-8px_rgb(62_106_0/0.5)]">
            <MessageCircle className="size-3.5" {...iconProps} />
            Happy to help!
          </span>
        </div>
      );
    case "independent":
      return (
        <div className="flex h-full items-center justify-center gap-2 px-2 sm:gap-6 sm:px-4">
          <Pill>
            <MessagesSquare className="size-3.5" {...iconProps} />
            Guidance
          </Pill>
          <Line className="hidden w-10 sm:block" pulse />
          <SoftOrb size={64} accent>
            <Scale className="size-6" {...iconProps} />
          </SoftOrb>
          <Line className="hidden w-10 sm:block" pulse delay={1100} />
          <Pill>
            <Landmark className="size-3.5" {...iconProps} />
            Decisions
          </Pill>
        </div>
      );
  }
}
