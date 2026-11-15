import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const config = JSON.parse(readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"));

test("the default vercel.app host redirects permanently to the canonical domain", () => {
  const rule = config.redirects.find((r) => r.has?.some((h) => h.type === "host"));
  assert.ok(rule, "missing simpleyes.vercel.app redirect");
  const host = new RegExp(`^${rule.has[0].value}$`);
  assert.ok(host.test("simpleyes.vercel.app"));
  assert.ok(!host.test("simplyes.de") && !host.test("simpleyes-git-main-x.vercel.app"));
  assert.equal(rule.source, "/(.*)");
  assert.equal(rule.destination, "https://simplyes.de/$1");
  assert.equal(rule.permanent, true);
  assert.equal(config.redirects[0], rule, "host redirect must come before path redirects");
});

test("every other *.vercel.app host is noindex; the canonical domain is not affected", () => {
  const rule = config.headers.find((r) => r.has?.some((h) => h.type === "host"));
  assert.ok(rule, "missing host-scoped X-Robots-Tag rule");
  const host = new RegExp(`^${rule.has[0].value}$`);
  assert.ok(host.test("simpleyes-gaurav-7489s-projects.vercel.app"));
  assert.ok(host.test("simpleyes-git-main-gaurav-7489s-projects.vercel.app"));
  assert.ok(!host.test("simplyes.de"));
  assert.ok(!host.test("www.simplyes.de"));
  assert.deepEqual(rule.headers, [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]);
  // No unconditional X-Robots-Tag anywhere.
  for (const r of config.headers.filter((r) => !r.has)) assert.ok(!r.headers.some((h) => h.key === "X-Robots-Tag"));
});
