import { FileCheck2, FileText, Landmark, Lightbulb, Mail, MessageCircle, Scale, ScrollText, Sparkles, UserRound, Users } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/style";

/** A thin connector line with a travelling pulse (Agencee "insight" lines). */
function Wire({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <span className={`wire ${className ?? ""}`}>
      <span className="wire-pulse" style={{ animationDelay: `${delay}ms` }} />
    </span>
  );
}

function Tile({
  title,
  body,
  children,
  wide = false,
  index,
}: {
  title: string;
  body: string;
  children: ReactNode;
  wide?: boolean;
  index: number;
}) {
  return (
    <li className={`benefit soft-frame ${wide ? "benefit-wide" : ""}`} data-reveal style={revealDelay((index % 2) * 140)}>
      <div aria-hidden="true" className="benefit-art">
        {children}
      </div>
      <div>
        <h3 className="type-card-title">{title}</h3>
        <p className="type-body mt-1.5">{body}</p>
      </div>
    </li>
  );
}

/**
 * Agencee "Benefits" bento: rows alternate narrow/wide; each tile has a calm,
 * animated composition of glossy orbs joined by lines with travelling pulses.
 */
export function WhySimplyes() {
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section">
      <div className="container-site">
        <SectionHeading
          id="why-title"
          icon={<Sparkles className="size-3.5" strokeWidth={2} />}
          badge="Why SimplYes"
          title="Support that keeps things simple"
          lead="Clear, honest help — for one person or a whole household."
        />
        <ul className="benefits mt-12 lg:mt-16">
          <Tile index={0} title="Clear guidance" body="Requirements explained in plain language, without jargon.">
            <span className="flex items-center">
              <span className="orb-soft-glass size-14">
                <ScrollText className="size-5" strokeWidth={1.6} />
              </span>
              <Wire className="w-20 sm:w-28" />
              <span className="orb-glass size-14">
                <Lightbulb className="size-5" strokeWidth={1.6} />
              </span>
            </span>
          </Tile>

          <Tile index={1} wide title="Organised preparation" body="A structured checklist for your case, checked before you submit.">
            <span className="flex items-center gap-4 sm:gap-8">
              <span className="orb-glass size-16">
                <FileCheck2 className="size-6" strokeWidth={1.6} />
              </span>
              <span className="flex flex-col gap-3">
                {["Checklist", "Documents", "Next step"].map((label, i) => (
                  <span key={label} className="flex items-center">
                    <Wire className="w-6 sm:w-16" delay={i * 700} />
                    <span className={`insight ${i === 0 ? "insight-on" : ""}`} style={{ animationDelay: `${i * 1.4}s` }}>
                      {label}
                      <span className="insight-tag">Step {i + 1}</span>
                    </span>
                  </span>
                ))}
              </span>
            </span>
          </Tile>

          <Tile index={2} wide title="Human support" body="A real person helps you, from the first question to your next step.">
            <span className="flex items-center gap-5">
              <span className="orb-glass orb-ping size-[72px]">
                <UserRound className="size-7" strokeWidth={1.6} />
              </span>
              <span className="flex flex-col gap-3">
                <span className="bubble bubble-in">I&apos;m not sure which form I need…</span>
                <span className="bubble bubble-out">Let&apos;s work it out together.</span>
              </span>
            </span>
          </Tile>

          <Tile index={3} title="For families" body="Several family members, one coordinated plan.">
            <span className="orbit">
              <span className="orb-glass size-14">
                <Users className="size-5" strokeWidth={1.6} />
              </span>
              <span className="orbit-track">
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>
          </Tile>

          <Tile index={4} title="Convenient contact" body="Start through the form, WhatsApp or email.">
            <span className="flex items-center gap-3">
              {[FileText, MessageCircle, Mail].map((ChannelIcon, i) => (
                <span key={i} className="channel-orb" style={{ animationDelay: `${i * 1.6}s` }}>
                  <ChannelIcon className="size-5" strokeWidth={1.6} />
                </span>
              ))}
            </span>
          </Tile>

          <Tile index={5} wide title="Transparent independence" body="We're a private service — official decisions stay with the authorities.">
            <span className="flex items-center gap-2 sm:gap-5">
              <span className="insight">We prepare</span>
              <Wire className="hidden w-12 sm:block" />
              <span className="orb-glass size-16">
                <Scale className="size-6" strokeWidth={1.6} />
              </span>
              <Wire className="hidden w-12 sm:block" delay={1100} />
              <span className="insight">
                <Landmark className="size-3.5" strokeWidth={1.75} />
                They decide
              </span>
            </span>
          </Tile>
        </ul>
      </div>
    </section>
  );
}
