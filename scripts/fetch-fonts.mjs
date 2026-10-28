#!/usr/bin/env node
/**
 * Fetches the Satoshi variable font at build time (runs as `prebuild`/`predev`).
 *
 * Why not commit it? Satoshi is free for commercial use and self-hosting under the
 * ITF Free Font License (Indian Type Foundry / Fontshare), but the licence forbids
 * redistributing the font files through public repositories. So the file is
 * downloaded directly from Fontshare by whoever builds the site (the site operator,
 * who thereby accepts the licence) and only served from the site itself.
 *
 * No dependencies: downloads the official zip and extracts the one file with zlib.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateRawSync } from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(root, "src/app/fonts");
const target = join(dest, "Satoshi-Variable.woff2");
const SOURCE = "https://api.fontshare.com/v2/fonts/download/satoshi";

if (existsSync(target)) {
  console.log("[fonts] Satoshi present.");
  process.exit(0);
}

/** Minimal ZIP reader: walks the central directory and inflates matching entries. */
function extract(zip, predicate) {
  const out = new Map();
  let eocd = zip.length - 22;
  while (eocd >= 0 && zip.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error("Invalid zip: end of central directory not found");
  const entries = zip.readUInt16LE(eocd + 10);
  let p = zip.readUInt32LE(eocd + 16);
  for (let i = 0; i < entries; i++) {
    if (zip.readUInt32LE(p) !== 0x02014b50) throw new Error("Invalid zip: bad central directory");
    const method = zip.readUInt16LE(p + 10);
    const compSize = zip.readUInt32LE(p + 20);
    const nameLen = zip.readUInt16LE(p + 28);
    const extraLen = zip.readUInt16LE(p + 30);
    const commentLen = zip.readUInt16LE(p + 32);
    const localOffset = zip.readUInt32LE(p + 42);
    const name = zip.toString("utf8", p + 46, p + 46 + nameLen);
    if (predicate(name)) {
      const lNameLen = zip.readUInt16LE(localOffset + 26);
      const lExtraLen = zip.readUInt16LE(localOffset + 28);
      const start = localOffset + 30 + lNameLen + lExtraLen;
      const data = zip.subarray(start, start + compSize);
      out.set(name, method === 0 ? Buffer.from(data) : inflateRawSync(data));
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  return out;
}

async function main() {
  console.log(`[fonts] Downloading Satoshi from Fontshare (ITF Free Font License)…`);
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(SOURCE, { redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const zip = Buffer.from(await res.arrayBuffer());
      const files = extract(zip, (n) => /Satoshi-Variable\.woff2$/.test(n) || /(licen[cs]e|FFL)[^/]*\.txt$/i.test(n));
      const font = [...files].find(([n]) => n.endsWith("Satoshi-Variable.woff2"));
      if (!font) throw new Error("Satoshi-Variable.woff2 not found in download");
      mkdirSync(dest, { recursive: true });
      writeFileSync(target, font[1]);
      const licence = [...files].find(([n]) => n.endsWith(".txt"));
      if (licence) writeFileSync(join(dest, "Satoshi-LICENSE.txt"), licence[1]);
      console.log(`[fonts] Saved ${font[1].length} bytes → src/app/fonts/Satoshi-Variable.woff2`);
      return;
    } catch (error) {
      lastError = error;
      console.warn(`[fonts] attempt ${attempt} failed: ${error.message}`);
      await new Promise((r) => setTimeout(r, attempt * 1500));
    }
  }
  console.error(
    `[fonts] Could not download Satoshi (${lastError?.message}). Download it from https://www.fontshare.com/fonts/satoshi ` +
      "and place Satoshi-Variable.woff2 in src/app/fonts/.",
  );
  process.exit(1);
}

await main();
