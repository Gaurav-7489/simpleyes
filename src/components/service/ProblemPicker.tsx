"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { selectionWhatsappMessage, whatsappHrefForMessage } from "@/lib/whatsapp";
import { OTHER_ISSUE, OTHER_NOTE_KEY, readStored, SELECTION_PREFIX, writeStored } from "@/lib/enquiry-keys";
import { useHydrated } from "@/lib/useHydrated";

type Props = {
  slug: string;
  title: string;
  issues: { id: string; label: string }[];
  /** Corporate Services opens the corporate variant of the form. */
  corporate?: boolean;
};

const OTHER = OTHER_ISSUE;
const NOTE_MAX = 600;
const selectionKey = (slug: string) => `${SELECTION_PREFIX}${slug}`;

/**
 * "What do you need help with?" — the visitor picks one approved problem (or "Something else") and continues to
 * the contact form with service + problem already filled in. Only stable ids travel in the URL; an optional note
 * for "Something else" goes through sessionStorage, never the URL. The choice survives Back navigation.
 */
export function ProblemPicker({ slug, title, issues, corporate = false }: Props) {
  const hydrated = useHydrated();
  const uid = useId();
  const [selected, setSelected] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = readStored<{ issue?: string; note?: string }>(selectionKey(slug));
    const valid = saved?.issue === OTHER || issues.some((i) => i.id === saved?.issue);
    if (saved && valid) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore after hydration (sessionStorage is client-only)
      setSelected(saved.issue ?? "");
      setNote(typeof saved.note === "string" ? saved.note.slice(0, NOTE_MAX) : "");
    }
  }, [slug, issues]);

  const remember = (issue: string, text: string) => writeStored(selectionKey(slug), { issue, note: text });

  const choose = (issue: string) => {
    setSelected(issue);
    remember(issue, note);
  };

  const params = new URLSearchParams({ service: slug });
  if (selected) params.set("issue", selected);
  if (corporate) params.set("context", "corporate");
  const contactHref = `/contact/?${params.toString()}#enquiry`;
  const label = selected === OTHER ? undefined : issues.find((i) => i.id === selected)?.label;
  const waHref = whatsappHrefForMessage(selectionWhatsappMessage(title, label));

  const handOver = () => {
    if (selected !== OTHER) return;
    const text = note.trim();
    if (text) writeStored(OTHER_NOTE_KEY, { service: slug, note: text });
    else {
      try {
        window.sessionStorage.removeItem(OTHER_NOTE_KEY);
      } catch {
        /* storage unavailable: the visitor can type it on the form */
      }
    }
  };

  const options = [...issues, { id: OTHER, label: "Something else" }];

  return (
    <div className="problem-picker">
      <fieldset>
        <legend className="sr-only">What do you need help with? Choose one.</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {options.map((option) => {
            const checked = selected === option.id;
            return (
              <label key={option.id} className="problem-option" data-checked={checked}>
                <input
                  type="radio"
                  name={`${uid}-issue`}
                  value={option.id}
                  checked={checked}
                  disabled={!hydrated}
                  onChange={() => choose(option.id)}
                  className="sr-only"
                />
                <span className="problem-check" aria-hidden="true">
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {selected === OTHER && (
        <div className="mt-3">
          <label htmlFor={`${uid}-note`} className="field-label">
            Need something else? Describe it briefly <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <textarea
            id={`${uid}-note`}
            value={note}
            maxLength={NOTE_MAX}
            onChange={(e) => {
              setNote(e.target.value);
              remember(OTHER, e.target.value);
            }}
            placeholder="For example: I need a document for my child's school."
            className="field min-h-24"
          />
          <p className="mt-1.5 text-sm text-ink-3">Please don&apos;t include passport or ID numbers. You can add more on the next page.</p>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link href={contactHref} onClick={handOver} data-cta-location="problem-picker" className="btn btn-dark">
          <span className="btn-face">
            Continue to Contact
            <ArrowRight aria-hidden="true" className="btn-icon size-4" strokeWidth={1.75} />
          </span>
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="whatsapp"
          data-cta-location="problem-picker"
          data-topic={slug}
          className="btn btn-light"
        >
          <span className="btn-face">
            <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Ask on WhatsApp
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </span>
        </a>
      </div>
      <p className="mt-3 text-sm text-ink-3" aria-live="polite">
        {selected ? (
          <>
            Selected: <strong className="font-medium text-ink">{selected === OTHER ? "Something else" : label}</strong> — it will be filled
            in for you.
          </>
        ) : (
          "Choose one, or continue without choosing."
        )}
      </p>
    </div>
  );
}
