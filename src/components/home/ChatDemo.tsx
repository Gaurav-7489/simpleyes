"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MessageCircle, Pause, Play } from "lucide-react";

type Conversation = { topic: string; ask: string; reply: string; thanks: string };

/** One short example per service. Plain guidance only — no promises about outcomes or timelines. */
const conversations: Conversation[] = [
  {
    topic: "Passport",
    ask: "My passport expires in three months. What do I need to renew it?",
    reply: "We'll confirm your renewal route and prepare a checklist for your case.",
    thanks: "Perfect, that makes it easy!",
  },
  {
    topic: "OCI",
    ask: "I just got a new passport. Do I need to update my OCI card?",
    reply: "It depends on your age and situation — we'll explain what applies and help you prepare.",
    thanks: "Great, thank you!",
  },
  {
    topic: "Name mismatch",
    ask: "My name is spelt differently on two documents…",
    reply: "Let's look at it together — here's what usually applies.",
    thanks: "That's much clearer — thank you!",
  },
  {
    topic: "Attestation",
    ask: "My employer needs my degree certificate attested. Where do I start?",
    reply: "We'll explain the attestation steps and help you organise the documents.",
    thanks: "That's a relief, thanks!",
  },
  {
    topic: "Visa support",
    ask: "My parents want to visit from India. Which documents should they prepare?",
    reply: "We'll walk you through the usual requirements and put together a checklist.",
    thanks: "Super helpful, thank you!",
  },
  {
    topic: "Family",
    ask: "Our baby was born in Germany. What's needed for the first passport?",
    reply: "Congratulations! We'll guide you through the documents usually involved, step by step.",
    thanks: "Thank you so much!",
  },
  {
    topic: "Students",
    ask: "I'm a student in Munich and my passport is expiring soon. Can you help?",
    reply: "Yes — we'll explain your route and help you prepare everything in order.",
    thanks: "Amazing, thanks!",
  },
  {
    topic: "Corporate",
    ask: "We're relocating five employees from India. Can you support their paperwork?",
    reply: "Yes — we coordinate documentation assistance for teams. Let's discuss what they need.",
    thanks: "Perfect, let's set it up.",
  },
];

/** ms each step stays before the next: question → typing → reply → thanks (hold). */
const STEP_MS = [1200, 1400, 1600, 3600];
const LEAVE_MS = 400;

/**
 * WhatsApp-style demo that cycles through example conversations, one per service.
 * Server-renders the first conversation complete (works without JavaScript), pauses while
 * off-screen or on request (WCAG 2.2.2), and skips the motion for reduced-motion users.
 */
export function ChatDemo() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(3);
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [onScreen, setOnScreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => setOnScreen(entries.some((e) => e.isIntersecting)), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !onScreen) return;
    if (leaving) {
      const t = window.setTimeout(() => {
        setIndex((i) => (i + 1) % conversations.length);
        setStep(reducedRef.current ? 3 : 0);
        setLeaving(false);
      }, LEAVE_MS);
      return () => window.clearTimeout(t);
    }
    const hold = reducedRef.current ? 7000 : STEP_MS[step];
    const t = window.setTimeout(() => (step < 3 ? setStep(step + 1) : setLeaving(true)), hold);
    return () => window.clearTimeout(t);
  }, [playing, onScreen, step, leaving]);

  const c = conversations[index] ?? conversations[0]!;
  const show = (n: number) => (step >= n ? " is-in" : "");

  return (
    <div ref={rootRef} className="why-demo">
      <div className="why-demo-bar">
        <span aria-hidden="true" className="why-demo-avatar">
          <Check className="size-5" strokeWidth={3} />
        </span>
        <span aria-hidden="true" className="flex min-w-0 flex-col leading-tight">
          <span className="font-display text-[1.0625rem] font-medium text-white">SimplYes</span>
          <span className="text-[0.8125rem] text-white/65">Documentation assistance</span>
        </span>
        <span aria-hidden="true" className={`why-demo-topic${leaving ? " is-leaving" : ""}`}>
          {c.topic}
        </span>
        <button
          type="button"
          className="why-demo-toggle"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause example conversations" : "Play example conversations"}
        >
          {playing ? (
            <Pause aria-hidden="true" className="size-4" strokeWidth={2} />
          ) : (
            <Play aria-hidden="true" className="size-4" strokeWidth={2} />
          )}
        </button>
      </div>

      <p className="sr-only">
        Example WhatsApp conversations: people ask SimplYes about passports, OCI, name mismatches, attestation, visa
        support, family documents, student and corporate needs, and get clear next steps.
      </p>

      <div aria-hidden="true" className={`chat-scene${leaving ? " is-leaving" : ""}`}>
        <span className={`chat-bubble chat-in${show(0)}`}>{c.ask}</span>
        {step === 1 ? (
          <span className="chat-typing is-in">
            <i /> <i /> <i />
          </span>
        ) : (
          <span className={`chat-bubble chat-out${show(2)}`}>
            <MessageCircle className="size-4 shrink-0" strokeWidth={1.75} />
            {c.reply}
          </span>
        )}
        <span className={`chat-bubble chat-in${show(3)}`}>{c.thanks}</span>
      </div>
    </div>
  );
}
