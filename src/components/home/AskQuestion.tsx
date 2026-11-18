"use client";

import { useId, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappHrefForMessage } from "@/lib/whatsapp";

const PREFIX = "Ask Simplyes: ";

/**
 * "Type your question for Simple" → opens WhatsApp with the question filled in, for the visitor to send themselves.
 * Nothing is sent or stored by the website. (Not a <form>: the only enquiry form lives on /contact/.)
 */
export function AskQuestion() {
  const [question, setQuestion] = useState("");
  const id = useId();
  const href = whatsappHrefForMessage(`${PREFIX}${question.trim() || "I have a question for your next episode."}`);
  return (
    <div className="mt-4 flex flex-col gap-3">
      <label htmlFor={id} className="sr-only">
        Your question for Simple
      </label>
      <input
        id={id}
        type="text"
        maxLength={300}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question for Simple…"
        autoComplete="off"
        className="ask-input"
      />
      <a href={href} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-cta-location="ask-simplyes" data-topic="ask-simplyes" className="btn btn-on-dark w-full">
        <span className="btn-face w-full">
          <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Ask on WhatsApp
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </a>
    </div>
  );
}
