import { MessageCircleQuestion } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppButton } from "@/components/ui/Button";
import { questions } from "@/content/home";

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Duplicated once so the -50% marquee loop is seamless; the copy is hidden from assistive tech.
  return (
    <div className="qrow" data-dir={reverse ? "reverse" : undefined}>
      {[...items, ...items].map((q, i) => (
        <span key={`${q}-${i}`} className="qpill" aria-hidden={i >= items.length ? "true" : undefined}>
          <MessageCircleQuestion aria-hidden="true" className="size-4 text-accent-700" strokeWidth={1.75} />
          {q}
        </span>
      ))}
    </div>
  );
}

/** Between Services and Process: the questions customers typically start with. CSS-only motion. */
export function QuestionWall() {
  return (
    <section aria-labelledby="questions-title" className="section overflow-hidden bg-canvas-alt">
      <div className="container-site flex flex-col items-center gap-5 text-center" data-reveal>
        <Badge>Sound familiar?</Badge>
        <h2 id="questions-title" className="type-h2 max-w-[20ch]">
          Questions we help you <span className="text-ink-3">answer</span>
        </h2>
        <p className="type-lead max-w-[46ch]">
          Indian paperwork raises the same worries again and again. Bring yours — we&apos;ll explain what applies and
          what to prepare.
        </p>
      </div>
      <div className="qwall mt-12" data-reveal>
        <Row items={questions.rowA} />
        <Row items={questions.rowB} reverse />
      </div>
      <div className="mt-12 flex justify-center" data-reveal>
        <WhatsAppButton>Ask Your Question</WhatsAppButton>
      </div>
    </section>
  );
}
