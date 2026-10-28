#!/usr/bin/env node
/**
 * Minimal dependency-free static server for the `out/` export, used by
 * Playwright and Lighthouse. Mirrors static-host behaviour: `/path/` serves
 * `/path/index.html`, unknown paths get `404.html` with status 404, gzip on.
 *
 * Usage: node scripts/serve-static.mjs [dir=out] [port=4173]
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createGzip } from "node:zlib";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? process.env.PORT ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
};

const compressible = new Set([".html", ".js", ".css", ".json", ".svg", ".xml", ".txt", ".webmanifest"]);

function resolveFile(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, safe);
  if (!file.startsWith(root)) return null;
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (existsSync(file) && statSync(file).isFile()) return file;
  if (!extname(file) && existsSync(`${file}.html`)) return `${file}.html`;
  return null;
}

createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  // Trailing-slash redirect, like most static hosts with trailingSlash: true.
  if (!extname(url.pathname) && !url.pathname.endsWith("/")) {
    const dir = join(root, url.pathname);
    if (existsSync(join(dir, "index.html"))) {
      res.writeHead(308, { Location: `${url.pathname}/${url.search}` });
      res.end();
      return;
    }
  }

  let file = resolveFile(url.pathname);
  let status = 200;
  if (!file) {
    file = join(root, "404.html");
    status = 404;
  }

  const ext = extname(file);
  const headers = {
    "Content-Type": types[ext] ?? "application/octet-stream",
    "Cache-Control": url.pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache",
    "X-Content-Type-Options": "nosniff",
  };
  const gzip = compressible.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  if (gzip) headers["Content-Encoding"] = "gzip";
  res.writeHead(status, headers);
  const stream = createReadStream(file);
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
