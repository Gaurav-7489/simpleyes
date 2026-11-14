import { Check, MessageCircle } from "lucide-react";

/**
 * §07 section 4 — Why SimplYes? Shown purely through the WhatsApp-style conversation demo
 * (CSS only, transform/opacity, static for reduced motion). The section title is kept for
 * screen readers and the #why-simplyes anchor; the bubbles stay readable to assistive tech.
 */
export function WhySimplyes() {
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section bg-white">
      <div className="container-site">
        <div className="why-demo" data-reveal>
          <h2 id="why-title" className="sr-only">
            Why SimplYes — support that keeps things simple
          </h2>
          <div aria-hidden="true" className="why-demo-bar">
            <span className="why-demo-avatar">
              <Check className="size-5" strokeWidth={3} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[1.0625rem] font-medium text-white">SimplYes</span>
              <span className="text-[0.8125rem] text-white/65">Documentation assistance</span>
            </span>
          </div>
          <div role="group" aria-label="Example WhatsApp conversation" className="chat-scene">
            <span className="chat-bubble chat-in">Hello, my name is spelt differently on two documents…</span>
            <span aria-hidden="true" className="chat-typing">
              <i /> <i /> <i />
            </span>
            <span className="chat-bubble chat-out">
              <MessageCircle aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
              Let&apos;s look at it together — here&apos;s what usually applies.
            </span>
            <span className="chat-bubble chat-in chat-in-2">That&apos;s much clearer — thank you!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
