#!/usr/bin/env node
/**
 * One-time bootstrap helper: replaces "latest" ranges in package.json with
 * caret ranges of the versions actually installed, so the project has
 * reproducible, current-stable dependencies plus a lockfile.
 */
import { readFileSync, writeFileSync } from "node:fs";

const pkgPath = new URL("../package.json", import.meta.url);
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
let changed = 0;

for (const field of ["dependencies", "devDependencies"]) {
  for (const [name, range] of Object.entries(pkg[field] ?? {})) {
    if (range !== "latest") continue;
    const installed = JSON.parse(readFileSync(new URL(`../node_modules/${name}/package.json`, import.meta.url), "utf8"));
    pkg[field][name] = `^${installed.version}`;
    changed++;
  }
}

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log(`Pinned ${changed} dependencies.`);
