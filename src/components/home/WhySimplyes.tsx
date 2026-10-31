import { Check, FileText, Mail, MessageCircle, UserRound } from "lucide-react";
import { whyItems } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const item = (icon: (typeof whyItems)[number]["icon"]) => whyItems.find((w) => w.icon === icon)!;

function TileText({ icon, light = false }: { icon: (typeof whyItems)[number]["icon"]; light?: boolean }) {
  const w = item(icon);
  return (
    <div className="relative">
      <h3 className={`type-card-title ${light ? "text-white" : ""}`}>{w.title}</h3>
      <p className={`mt-1.5 text-[0.9375rem] leading-relaxed ${light ? "text-white/85" : "text-ink-2"}`}>{w.body}</p>
    </div>
  );
}

/**
 * §07 section 4 — Why SimplYes? Benefits only, as a bento of varied tiles with small,
 * calm animated scenes (CSS only, transform/opacity, off for reduced motion).
 */
export function WhySimplyes() {
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section bg-white">
      <div className="container-site">
        <SectionHeading
          id="why-title"
          index="03"
          badge="Why SimplYes"
          align="left"
          title="Support that keeps things simple"
          lead="Clear, honest help with documentation — for one person or a whole household."
        />
        <ul className="bento mt-10 lg:mt-14">
          {/* Human support — large dark tile with a live chat scene */}
          <li className="bento-tile bento-a bento-dark" data-reveal>
            <div aria-hidden="true" className="chat-scene">
              <span className="chat-bubble chat-in">Hello, my name is spelt differently on two documents…</span>
              <span className="chat-typing">
                <i /> <i /> <i />
              </span>
              <span className="chat-bubble chat-out">
                <MessageCircle className="size-3.5" strokeWidth={1.75} />
                Let&apos;s look at it together — here&apos;s what usually applies.
              </span>
              <span className="chat-bubble chat-in chat-in-2">That&apos;s much clearer — thank you!</span>
            </div>
            <TileText icon="human" light />
          </li>

          {/* Clear guidance — jargon rewritten into plain language */}
          <li className="bento-tile bento-b" data-reveal>
            <div aria-hidden="true" className="plain-scene">
              <span className="plain-jargon">“Supporting documentation substantiating nomenclature variance”</span>
              <span className="plain-clear">“A short note explaining why your name differs”</span>
            </div>
            <TileText icon="guidance" />
          </li>

          {/* Organised preparation — ticking checklist */}
          <li className="bento-tile bento-c" data-reveal>
            <ul aria-hidden="true" className="tick-scene">
              {["Requirements", "Documents", "Next step"].map((label, i) => (
                <li key={label} style={{ animationDelay: `${i * 0.9}s` }}>
                  <span className="tick-box">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <TileText icon="organised" />
          </li>

          {/* Personalised assistance */}
          <li className="bento-tile bento-d bento-mint" data-reveal>
            <span aria-hidden="true" className="orbit-scene">
              <span className="orbit-core">
                <UserRound className="size-5" strokeWidth={1.75} />
              </span>
              <span className="orbit-ring">
                <i />
                <i />
                <i />
              </span>
            </span>
            <TileText icon="personal" />
          </li>

          {/* Convenient communication — channels light up in turn */}
          <li className="bento-tile bento-e" data-reveal>
            <span aria-hidden="true" className="channel-scene">
              <span>
                <FileText className="size-4" strokeWidth={1.75} /> Form
              </span>
              <span>
                <MessageCircle className="size-4" strokeWidth={1.75} /> WhatsApp
              </span>
              <span>
                <Mail className="size-4" strokeWidth={1.75} /> Email
              </span>
            </span>
            <TileText icon="communication" />
          </li>

          {/* Transparent scope */}
          <li className="bento-tile bento-f" data-reveal>
            <span aria-hidden="true" className="scope-scene">
              <span className="scope-us">We prepare</span>
              <span className="scope-line" />
              <span className="scope-them">Authorities decide</span>
            </span>
            <TileText icon="transparent" />
          </li>

          {/* Individuals and families + closing CTA */}
          <li className="bento-tile bento-g bento-mint" data-reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span aria-hidden="true" className="family-scene">
                  {[0, 1, 2, 3].map((n) => (
                    <span key={n} style={{ animationDelay: `${n * 0.15}s` }}>
                      <Icon name={n === 0 ? "personal" : "family"} className="size-4" />
                    </span>
                  ))}
                </span>
                <TileText icon="family" />
              </div>
              <ButtonLink href="/contact/" size="sm" location="why">
                Get Assistance
              </ButtonLink>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
