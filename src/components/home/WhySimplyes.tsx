import { ChatDemo } from "@/components/home/ChatDemo";

/**
 * §07 section 4 — Why SimplYes? Shown purely through the WhatsApp-style demo, which cycles
 * through one example conversation per service. The title stays for screen readers and the
 * #why-simplyes anchor.
 */
export function WhySimplyes() {
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section bg-white">
      <div className="container-site">
        <h2 id="why-title" className="sr-only">
          Why SimplYes — support that keeps things simple
        </h2>
        <div data-reveal>
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
