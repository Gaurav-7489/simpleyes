import { Check } from "lucide-react";
import { whyItems } from "@/content/home";

/** Why SimplYes: the promise, beside the four reasons on a slightly tilted sheet. */
export function WhySimplyes() {
  return (
    <section id="why-simplyes" aria-labelledby="why-title" className="section why2">
      <div className="container-site why2-grid">
        <div>
          <p className="eyebrow">Why SimplYes</p>
          <h2 id="why-title" className="why2-title mt-4">
            Right the first time, with a clear line between what we do and what stays with the authorities.
          </h2>
          <p className="mt-6 max-w-[30rem] text-[0.9375rem] leading-relaxed text-ink-2">
            We know the forms, the photo rules and the documents each mission asks for. You get one person on WhatsApp
            who prepares everything with you.
          </p>
        </div>
        <ul className="why2-sheet" data-tilt>
          {whyItems.map((item) => (
            <li key={item.title} className="included-item">
              <span className="tick" aria-hidden="true">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span>
                <span className="included-title">{item.title}</span>
                <span className="included-body">{item.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
