#!/usr/bin/env node
/**
 * Renders the eight service compositions and the five How It Works stages to still images (public/images/scenes/), so lists and
 * galleries can show light <img> elements instead of live 3D markup. The source of truth stays the CSS scene
 * system (src/components/scene/); re-run this after changing a composition.
 *
 * Requires a built site served locally:  npm run build && npm run preview   (then, in another shell)
 *   node scripts/render-scenes.mjs        # BASE defaults to http://localhost:4173
 *
 * Output per scene: {key}-{560,840,1120}.{avif,webp} (transparent background).
 */
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const base = process.env.BASE ?? "http://localhost:4173";
/** Where each set of compositions lives as a live, switchable stage on the built site. */
const sources = [
  { path: "/#services", stage: ".svc-stage .stage", keys: ["passport", "oci", "attestation", "affidavit", "visa", "family", "student", "corporate"] },
  { path: "/how-it-works/", stage: ".journey-stage .stage", keys: ["step-1", "step-2", "step-3", "step-4", "step-5"] },
];
const out = "public/images/scenes";
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, reducedMotion: "reduce" });

for (const source of sources) {
  await page.goto(`${base}${source.path}`, { waitUntil: "networkidle" });
  // Transparent backdrop: only the documents and their shadows are captured.
  await page.addStyleTag({
    content: `html, body, main, section, .svc-stage-inner, .journey-stage-inner { background: transparent !important; box-shadow: none !important; }
              header, .tabbar, .scroll-progress, [data-floating-wa], .journey-stage-caption { display: none !important; }`,
  });
  const stage = page.locator(source.stage);
  await stage.scrollIntoViewIfNeeded();
  for (const key of source.keys) {
    await page.evaluate(
      ({ k, sel }) => {
        document.querySelectorAll(`${sel} .scene`).forEach((s) => s.setAttribute("data-active", String(s.getAttribute("data-scene") === k)));
      },
      { k: key, sel: source.stage },
    );
    await page.waitForTimeout(150);
    const png = await stage.screenshot({ omitBackground: true, animations: "disabled" });
    for (const width of [560, 840, 1120]) {
      const img = sharp(png).resize({ width });
      await img.clone().avif({ quality: 55, effort: 6 }).toFile(`${out}/${key}-${width}.avif`);
      await img.clone().webp({ quality: 80, alphaQuality: 90, effort: 6 }).toFile(`${out}/${key}-${width}.webp`);
    }
    const meta = await sharp(png).metadata();
    console.log(`${key}: ${meta.width}×${meta.height}`);
  }
}

await browser.close();
