"use client";

import { useLayoutEffect, useRef, useState, type ChangeEvent, type InputHTMLAttributes, type KeyboardEvent } from "react";
import {
  caretAfterAmountChars,
  countAmountChars,
  finishMoney,
  formatMoney,
  moneyToNumber,
  normalizeMoney,
  type MoneyCurrency,
} from "@/lib/money";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "type" | "inputMode"> & {
  /** Starting amount (a number, not a formatted string). */
  defaultAmount?: number | null;
  /** Called with the plain number (or null when empty) every time the amount changes. */
  onAmountChange?: (amount: number | null) => void;
  currency?: MoneyCurrency;
  /** Decimal places the visitor may type (0 for whole amounts only). */
  decimals?: number;
};

const isSeparator = (ch: string | undefined) => ch !== undefined && !((ch >= "0" && ch <= "9") || ch === ".");

/**
 * Amount field that formats as you type: "300" shows as "€300", "1234567" as "€1,234,567" (₹12,34,567 for INR).
 * The caret stays after the same digit while commas come and go, Backspace skips over a comma instead of getting
 * stuck on it, and on blur a started decimal is completed ("€12.5" → "€12.50"). With a `name`, the plain number
 * (e.g. "1234.5") is what a surrounding <form> submits, never the formatted text.
 */
export function MoneyInput({
  defaultAmount = null,
  onAmountChange,
  currency = "EUR",
  decimals = 2,
  name,
  className,
  onBlur,
  onKeyDown,
  placeholder,
  ...rest
}: Props) {
  const [amount, setAmount] = useState(() =>
    defaultAmount == null ? "" : finishMoney(normalizeMoney(String(defaultAmount), decimals), decimals),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const caret = useRef<number | null>(null);
  const display = formatMoney(amount, currency);

  // Put the caret back after React writes the re-formatted value (every render: a rejected key leaves the text as is).
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (el && caret.current !== null && document.activeElement === el) el.setSelectionRange(caret.current, caret.current);
    caret.current = null;
  });

  const [, rerender] = useState(0);
  const commit = (next: string) => {
    if (next === amount) rerender((n) => n + 1);
    setAmount(next);
    onAmountChange?.(moneyToNumber(next));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const next = normalizeMoney(raw, decimals);
    // Normalising the text before the caret the same way (leading zeros, extra dots) says where the caret belongs.
    const before = countAmountChars(normalizeMoney(raw.slice(0, e.target.selectionStart ?? raw.length), decimals));
    caret.current = caretAfterAmountChars(formatMoney(next, currency), Math.min(before, countAmountChars(next)));
    commit(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    const el = e.currentTarget;
    const { selectionStart: start, selectionEnd: end, value } = el;
    if (start === null || start !== end) return;
    // Step over a comma (or the symbol) so Backspace/Delete remove a digit rather than doing nothing.
    if (e.key === "Backspace" && isSeparator(value[start - 1])) {
      let i = start - 1;
      while (i > 0 && isSeparator(value[i - 1])) i--;
      el.setSelectionRange(i, i);
    } else if (e.key === "Delete" && isSeparator(value[start])) {
      let i = start + 1;
      while (i < value.length && isSeparator(value[i])) i++;
      el.setSelectionRange(i, i);
    }
  };

  return (
    <>
      <input
        {...rest}
        ref={inputRef}
        type="text"
        inputMode={decimals > 0 ? "decimal" : "numeric"}
        autoComplete="off"
        value={display}
        placeholder={placeholder ?? formatMoney("0", currency)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={(e) => {
          const finished = finishMoney(amount, decimals);
          if (finished !== amount) commit(finished);
          onBlur?.(e);
        }}
        className={["field money-input", className ?? ""].filter(Boolean).join(" ")}
      />
      {name && <input type="hidden" name={name} value={amount} />}
    </>
  );
}
