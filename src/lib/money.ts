/**
 * Money typing helpers for <MoneyInput>: the visitor types digits ("300", "1234.5") and sees "€300", "€1,234.5".
 * No imports, so the unit tests can load this file directly with `node --test` (Node strips the types).
 */

export type MoneyCurrency = "EUR" | "INR";

/** EUR is grouped in thousands (€1,234,567); INR in lakhs and crores (₹12,34,567). */
export const MONEY_CURRENCIES: Record<MoneyCurrency, { symbol: string; locale: string }> = {
  EUR: { symbol: "€", locale: "en-IE" },
  INR: { symbol: "₹", locale: "en-IN" },
};

/** 12 integer digits: below one trillion, well inside Number's exact range. */
const MAX_INT_DIGITS = 12;

const isAmountChar = (ch: string) => (ch >= "0" && ch <= "9") || ch === ".";

/**
 * Reduce whatever was typed or pasted to a plain amount string: digits plus at most one ".", leading zeros removed,
 * at most `decimals` decimal places. Currency symbols, spaces and thousands commas are dropped.
 */
export function normalizeMoney(raw: string, decimals = 2): string {
  let cleaned = "";
  let seenDot = false;
  for (const ch of String(raw)) {
    if (ch >= "0" && ch <= "9") cleaned += ch;
    else if (ch === "." && !seenDot && decimals > 0) {
      seenDot = true;
      cleaned += ".";
    }
  }
  if (!cleaned) return "";
  const [intPart = "", dec] = cleaned.split(".");
  let int = intPart.replace(/^0+(?=\d)/, "").slice(0, MAX_INT_DIGITS);
  if (dec !== undefined) {
    if (!int) int = "0";
    return `${int}.${dec.slice(0, decimals)}`;
  }
  return int;
}

/**
 * Format a normalized amount for display while typing: symbol + grouped whole part, decimals kept exactly as typed
 * (so "12." shows as "€12." and the visitor can keep typing).
 */
export function formatMoney(normalized: string, currency: MoneyCurrency = "EUR"): string {
  if (!normalized) return "";
  const { symbol, locale } = MONEY_CURRENCIES[currency] ?? MONEY_CURRENCIES.EUR;
  const [int = "0", dec] = normalized.split(".");
  const grouped = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Number(int || "0"));
  return `${symbol}${grouped}${dec !== undefined ? `.${dec}` : ""}`;
}

/** On blur, a started decimal part is completed: "12.5" → "12.50", "12." → "12". */
export function finishMoney(normalized: string, decimals = 2): string {
  if (!normalized.includes(".")) return normalized;
  const [int = "0", dec = ""] = normalized.split(".");
  return dec ? `${int}.${dec.padEnd(decimals, "0")}` : int;
}

export function moneyToNumber(normalized: string): number | null {
  if (!normalized) return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

/** Amount characters (digits and ".") in a string; used to keep the caret in place after re-formatting. */
export function countAmountChars(text: string): number {
  let n = 0;
  for (const ch of text) if (isAmountChar(ch)) n++;
  return n;
}

/** Caret index in `formatted` right after its `count`-th amount character (never before the symbol). */
export function caretAfterAmountChars(formatted: string, count: number): number {
  if (count <= 0) {
    const first = [...formatted].findIndex(isAmountChar);
    return first === -1 ? formatted.length : first;
  }
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (isAmountChar(formatted[i]!)) {
      seen++;
      if (seen === count) return i + 1;
    }
  }
  return formatted.length;
}
