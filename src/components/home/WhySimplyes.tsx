import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealDelay } from "@/lib/style";

/**
 * Why SimplYes — four visual tiles, very few words: a person replies, jargon turns
 * into plain language, the checklist ticks itself, and the boundary with the
 * authorities is shown, not explained. CSS-only scenes, off for reduced motion.
 */
export function WhySimplyes() {
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section bg-white">
      <div className="container-site">
        <SectionHeading id="why-title" index="03" badge="Why SimplYes" title="Clear help, from a real person" />
        <ul className="bento bento-4 mt-10 lg:mt-14">
          <li className="bento-tile bento-dark bento-tall" data-reveal>
            <div aria-hidden="true" className="chat-scene">
              <span className="chat-bubble chat-in">My name is spelt differently on two documents…</span>
              <span className="chat-typing">
                <i /> <i /> <i />
              </span>
              <span className="chat-bubble chat-out">
                <MessageCircle className="size-3.5" strokeWidth={1.75} />
                Let&apos;s look at it together.
              </span>
              <span className="chat-bubble chat-in chat-in-2">That&apos;s much clearer — thank you!</span>
            </div>
            <h3 className="type-card-title text-white">Human support, start to finish</h3>
          </li>

          <li className="bento-tile" data-reveal style={revealDelay(120)}>
            <div aria-hidden="true" className="plain-scene">
              <span className="plain-jargon">“Substantiation of nomenclature variance”</span>
              <span className="plain-clear">“A note on why your name differs”</span>
            </div>
            <h3 className="type-card-title">Plain language, no jargon</h3>
          </li>

          <li className="bento-tile bento-mint" data-reveal style={revealDelay(240)}>
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
            <h3 className="type-card-title">Organised preparation</h3>
          </li>

          <li className="bento-tile bento-wide-2" data-reveal style={revealDelay(120)}>
            <span aria-hidden="true" className="scope-scene">
              <span className="scope-us">We help you prepare</span>
              <span className="scope-line" />
              <span className="scope-them">Authorities decide</span>
            </span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="type-card-title">Independent — not an embassy or consulate</h3>
              <Link href="/disclaimer/" className="link-tertiary shrink-0 text-sm">
                Our disclaimer
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
