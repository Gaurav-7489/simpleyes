import { whyItems } from "@/content/home";
import { ScrollDepth } from "@/components/motion/ScrollDepth";

/** The benefits that matter most, printed on one sheet: why people bring their paperwork to SimplYes. */
const shown = ["Personalised assistance", "Clear guidance", "Human support", "Transparent scope", "For individuals and families"];

export function WhySimplyes() {
  const items = whyItems.filter((item) => shown.includes(item.title));
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section why">
      <div className="container-site why-grid">
        <div className="why-copy">
          <h2 id="why-title" className="type-h2 max-w-[13ch]">
            Why SimplYes
          </h2>
          <p className="type-intro mt-6 max-w-[22ch] text-ink">
            A real person explains your paperwork in plain language.
          </p>
          <p className="type-lead mt-5 max-w-[28rem]">Guidance shaped to your situation, and a clear line between what we do and what stays with the authorities.</p>
        </div>

        <div className="why-sheet-wrap" data-tilt>
          <ScrollDepth mode="settle">
          <div className="why-sheet paper">
            <span aria-hidden="true" className="why-sheet-tab" />
            <ul className="why-list">
              {items.map((item) => (
                <li key={item.title}>
                  <span aria-hidden="true" className="mark-box" data-on="" />
                  <span>
                    <span className="why-item-title">{item.title}</span>
                    <span className="why-item-body">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          </ScrollDepth>
        </div>
      </div>
    </section>
  );
}
