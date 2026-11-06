import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateOwnerSettings, launchProblems, contactActivationProblems } from "../../scripts/owner-settings.mjs";

const baseline = JSON.parse(readFileSync(new URL("../../src/content/owner-settings.json", import.meta.url), "utf8"));
const copy = () => structuredClone(baseline);

test("an honest pending-owner build is valid and cannot pass launch readiness", () => {
  assert.doesNotThrow(() => validateOwnerSettings(copy()));
  assert.ok(launchProblems(copy()).includes("legal.reviewed (owner/adviser approval)"));
});
test("a review toggle cannot publish incomplete legal or policy details", () => {
  const s = copy(); s.legal.reviewed = true;
  assert.throws(() => validateOwnerSettings(s), /missing fields/);
});
test("misspelled owner fields and string approval flags fail before build", () => {
  const s = copy(); s.privacy.mailBoxProvider = "Wrong key";
  assert.throws(() => validateOwnerSettings(s), /Unknown owner-settings field/);
  const t = copy(); t.legal.reviewed = "false";
  assert.throws(() => validateOwnerSettings(t), /true or false/);
});
test("unapproved placeholders cannot replace missing business facts", () => {
  for (const text of ["", "to be provided", "[confirm name]", "TODO business name"]) {
    const s = copy(); s.legal.legalName = text;
    assert.throws(() => validateOwnerSettings(s), /approved text/);
  }
});
test("delivery cannot be confirmed without an actual test date", () => {
  const s = copy(); s.launch.enquiryDeliveryConfirmed = true;
  assert.throws(() => validateOwnerSettings(s), /actual inbox test date/);
  s.launch.deliveryVerifiedAt = "2026-02-30";
  assert.throws(() => validateOwnerSettings(s), /real YYYY-MM-DD/);
});
test("complete recorded owner inputs can pass the content check without invented defaults", () => {
  // Synthetic unit-test values only; the real owner file and its approvals are never modified.
  const s = copy();
  for (const [group, values] of Object.entries(s)) {
    for (const [key, value] of Object.entries(values)) {
      if (value === null && !["vatId", "register"].includes(key)) values[key] = key === "deliveryVerifiedAt" ? "2026-11-06" : "Synthetic test input";
      if (typeof value === "boolean") values[key] = true;
    }
    s[group] = values;
  }
  assert.deepEqual(launchProblems(s), []);
});

test("a login/error page or disconnected form cannot pass live activation checks", () => {
  assert.ok(contactActivationProblems(401, "Sign in").length);
  assert.ok(contactActivationProblems(200, "<html>Sign in</html>").length);
  assert.ok(contactActivationProblems(200, '<form id="enquiry">The online form is being connected</form>').length);
  assert.deepEqual(contactActivationProblems(200, '<form id="enquiry"><button>Send Enquiry</button></form>'), []);
});
