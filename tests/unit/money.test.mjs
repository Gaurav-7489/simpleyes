import { test } from "node:test";
import assert from "node:assert/strict";
import {
  caretAfterAmountChars,
  countAmountChars,
  finishMoney,
  formatMoney,
  moneyToNumber,
  normalizeMoney,
} from "../../src/lib/money.ts";

const typed = (raw, currency) => formatMoney(normalizeMoney(raw), currency);

test("typing a plain number adds the currency symbol and thousands commas", () => {
  assert.equal(typed("300"), "€300");
  assert.equal(typed("3000"), "€3,000");
  assert.equal(typed("1234567"), "€1,234,567");
  assert.equal(typed(""), "");
});

test("decimals are kept as typed, capped at two places", () => {
  assert.equal(typed("1234."), "€1,234.");
  assert.equal(typed("1234.5"), "€1,234.5");
  assert.equal(typed("1234.567"), "€1,234.56");
  assert.equal(typed(".5"), "€0.5");
});

test("re-typing over a formatted value, pasting and junk characters all normalise", () => {
  assert.equal(typed("€1,2345"), "€12,345");
  assert.equal(typed(" € 2 500,- "), "€2,500");
  assert.equal(typed("0007"), "€7");
  assert.equal(typed("1.2.3"), "€1.23");
  assert.equal(typed("abc"), "");
});

test("rupees use Indian lakh grouping", () => {
  assert.equal(typed("1234567", "INR"), "₹12,34,567");
  assert.equal(typed("300", "INR"), "₹300");
});

test("blur completes the decimals; the numeric value is exact", () => {
  assert.equal(finishMoney("12.5"), "12.50");
  assert.equal(finishMoney("12."), "12");
  assert.equal(finishMoney("12"), "12");
  assert.equal(moneyToNumber("1234.50"), 1234.5);
  assert.equal(moneyToNumber(""), null);
});

test("the caret stays after the same digit when commas are inserted", () => {
  // Visitor typed the 4th digit at the end: "€1234" → "€1,234", caret after the 4th digit = end.
  const formatted = typed("1234");
  assert.equal(caretAfterAmountChars(formatted, countAmountChars("€1234")), formatted.length);
  // Caret after "€1" (one digit) stays right after the "1".
  assert.equal(caretAfterAmountChars(formatted, 1), 2);
  // No digits before the caret: right after the symbol.
  assert.equal(caretAfterAmountChars(formatted, 0), 1);
});
