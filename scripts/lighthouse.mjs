#!/usr/bin/env node
/**
 * Runs Lighthouse (mobile + desktop) against the local static server and
 * writes a compact summary to qa/lighthouse-summary.json + Markdown.
 * Requires: server on BASE (default http://localhost:4173), CHROME_PATH set.
 * Lab results only — real-user Core Web Vitals must be measured in the field.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const base = process.env.BASE ?? "http://localhost:4173";
const pages = ["/", "/services/", "/services/document-guidance/", "/faqs/", "/contact/"];
const presets = ["mobile", "desktop"];
mkdirSync("qa/lighthouse", { recursive: true });

const rows = [];
for (const preset of presets) {
  for (const page of pages) {
    const slug = page === "/" ? "home" : page.replace(/\//g, "-").replace(/^-|-$/g, "");
    const out = `qa/lighthouse/${preset}-${slug}.json`;
    const args = [
      "--yes",
      "lighthouse@latest",
      `${base}${page}`,
      "--quiet",
      "--output=json",
      `--output-path=${out}`,
      "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
      "--only-categories=performance,accessibility,best-practices,seo",
    ];
    if (preset === "desktop") args.push("--preset=desktop");
    execFileSync("npx", args, { stdio: "inherit" });
    const lhr = JSON.parse(readFileSync(out, "utf8"));
    const score = (k) => Math.round((lhr.categories[k]?.score ?? 0) * 100);
    const audit = (k) => lhr.audits[k]?.displayValue ?? "n/a";
    rows.push({
      preset,
      page,
      performance: score("performance"),
      accessibility: score("accessibility"),
      bestPractices: score("best-practices"),
      seo: score("seo"),
      lcp: audit("largest-contentful-paint"),
      cls: audit("cumulative-layout-shift"),
      tbt: audit("total-blocking-time"),
      fcp: audit("first-contentful-paint"),
      si: audit("speed-index"),
      jsTransfer: audit("total-byte-weight"),
    });
  }
}

writeFileSync("qa/lighthouse-summary.json", `${JSON.stringify(rows, null, 2)}\n`);
const md = [
  "| Preset | Page | Perf | A11y | BP | SEO | LCP | CLS | TBT | FCP | SI | Weight |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|",
  ...rows.map(
    (r) =>
      `| ${r.preset} | ${r.page} | ${r.performance} | ${r.accessibility} | ${r.bestPractices} | ${r.seo} | ${r.lcp} | ${r.cls} | ${r.tbt} | ${r.fcp} | ${r.si} | ${r.jsTransfer} |`,
  ),
].join("\n");
writeFileSync("qa/lighthouse-summary.md", `${md}\n`);
console.log(md);
