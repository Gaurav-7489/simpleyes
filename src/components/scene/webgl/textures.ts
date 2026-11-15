import { CanvasTexture, SRGBColorSpace } from "three";

/**
 * Procedural, original document artwork for the WebGL hero, drawn once on a 2D canvas: abstract text lines,
 * blank photo boxes and tick marks only — no emblems, seals, country names or personal data.
 */

const INK = "#13211d";
const GREEN = "#005c45";
const LIME = "#a6dc5c";
const LINE = "rgba(19,33,29,0.14)";

export type ArtKind = "form" | "certificate" | "checklist" | "page-left" | "page-right" | "card" | "cover" | "envelope" | "check";

const LINE_WIDTHS = [0.92, 0.78, 0.86, 0.64, 0.88, 0.72, 0.58, 0.81];

function bar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, h / 2);
  ctx.fill();
}

function lines(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, count: number, gap = 34, start = 0, color = LINE) {
  for (let i = 0; i < count; i++) bar(ctx, x, y + i * gap, w * LINE_WIDTHS[(i + start) % LINE_WIDTHS.length]!, 13, color);
}

function photo(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  g.addColorStop(0, "#e8f3ec");
  g.addColorStop(1, "#d6eadf");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 10);
  ctx.fill();
  ctx.fillStyle = "rgba(0,92,69,0.28)";
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h * 0.4, w * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h, w * 0.34, h * 0.28, 0, Math.PI, 0);
  ctx.fill();
}

function tick(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string, width: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(cx - size * 0.45, cy + size * 0.02);
  ctx.lineTo(cx - size * 0.12, cy + size * 0.33);
  ctx.lineTo(cx + size * 0.48, cy - size * 0.3);
  ctx.stroke();
}

function draw(kind: ArtKind, ctx: CanvasRenderingContext2D, w: number, h: number) {
  const pad = w * 0.11;
  switch (kind) {
    case "form":
      photo(ctx, pad, pad, w * 0.24, w * 0.3);
      bar(ctx, pad + w * 0.29, pad + 6, w * 0.42, 22, INK);
      lines(ctx, pad + w * 0.29, pad + 52, w * 0.5, 3);
      lines(ctx, pad, pad + w * 0.42, w - pad * 2, 7, 36, 3);
      break;
    case "certificate": {
      ctx.strokeStyle = "rgba(0,92,69,0.35)";
      ctx.lineWidth = 4;
      ctx.strokeRect(26, 26, w - 52, h - 52);
      ctx.strokeStyle = LIME;
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 40, w - 80, h - 80);
      bar(ctx, w * 0.25, h * 0.22, w * 0.5, 22, INK);
      bar(ctx, w * 0.33, h * 0.22 + 44, w * 0.34, 13, "rgba(0,92,69,0.55)");
      [0.7, 0.56, 0.64].forEach((f, i) => bar(ctx, (w - w * f) / 2, h * 0.5 + i * 34, w * f, 13, LINE));
      ctx.fillStyle = LIME;
      ctx.beginPath();
      ctx.arc(w * 0.78, h * 0.78, w * 0.08, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "checklist":
      bar(ctx, pad, pad, w * 0.42, 22, GREEN);
      for (let i = 0; i < 6; i++) {
        const y = pad + 64 + i * 58;
        ctx.fillStyle = i < 3 ? LIME : "rgba(0,0,0,0)";
        ctx.strokeStyle = "rgba(0,92,69,0.45)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(pad, y - 14, 30, 30, 7);
        if (i < 3) ctx.fill();
        else ctx.stroke();
        if (i < 3) tick(ctx, pad + 15, y + 1, 24, INK, 4.5);
        bar(ctx, pad + 48, y - 6, (w - pad * 2 - 48) * LINE_WIDTHS[(i + 2) % 8]!, 13, "rgba(0,92,69,0.3)");
      }
      break;
    case "page-left":
      bar(ctx, pad, pad, w * 0.36, 14, "rgba(0,92,69,0.55)");
      photo(ctx, pad, pad + 40, w * 0.28, w * 0.36);
      lines(ctx, pad + w * 0.33, pad + 48, w * 0.48, 4);
      lines(ctx, pad, pad + 40 + w * 0.42, w - pad * 2, 3, 34, 4);
      break;
    case "page-right":
      lines(ctx, pad, pad, w - pad * 2, 4, 34, 2);
      lines(ctx, pad, pad + 200, w - pad * 2, 4, 34, 5);
      break;
    case "card": {
      const g = ctx.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, GREEN);
      g.addColorStop(1, "#00905a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h * 0.22);
      photo(ctx, w * 0.07, h * 0.32, w * 0.2, h * 0.5);
      bar(ctx, w * 0.33, h * 0.36, w * 0.36, 20, INK);
      lines(ctx, w * 0.33, h * 0.36 + 40, w * 0.5, 3, 30, 1);
      ctx.fillStyle = LIME;
      ctx.beginPath();
      ctx.roundRect(w * 0.8, h * 0.68, w * 0.12, h * 0.16, 8);
      ctx.fill();
      break;
    }
    case "cover": {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(166,220,92,0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(w * 0.1, h * 0.07, w * 0.8, h * 0.86, 18);
      ctx.stroke();
      ctx.strokeStyle = "rgba(166,220,92,0.4)";
      ctx.lineWidth = 2;
      for (let r = 12; r < w * 0.22; r += 14) {
        ctx.beginPath();
        ctx.arc(w * 0.52, h * 0.42, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      bar(ctx, w * 0.3, h * 0.78, w * 0.4, 9, "rgba(166,220,92,0.6)");
      bar(ctx, w * 0.36, h * 0.78 + 22, w * 0.28, 9, "rgba(166,220,92,0.6)");
      break;
    }
    case "envelope":
      ctx.fillStyle = "rgba(13,46,38,0.06)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w / 2, h * 0.62);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(13,46,38,0.12)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = LIME;
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.62, w * 0.075, 0, Math.PI * 2);
      ctx.fill();
      tick(ctx, w / 2, h * 0.62, w * 0.07, INK, 5);
      break;
    case "check":
      ctx.clearRect(0, 0, w, h);
      tick(ctx, w / 2, h / 2, w * 0.5, INK, w * 0.08);
      break;
  }
}

const SIZES: Record<ArtKind, [number, number]> = {
  form: [512, 724],
  certificate: [724, 512],
  checklist: [512, 724],
  "page-left": [512, 700],
  "page-right": [512, 700],
  card: [640, 404],
  cover: [512, 724],
  envelope: [620, 400],
  check: [256, 256],
};

const transparent = new Set<ArtKind>(["cover", "check"]);
const cache = new Map<ArtKind, CanvasTexture>();

export function documentTexture(kind: ArtKind): CanvasTexture {
  const hit = cache.get(kind);
  if (hit) return hit;
  const [w, h] = SIZES[kind];
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  if (!transparent.has(kind)) {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#ffffff");
    g.addColorStop(1, "#eef4f0");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  draw(kind, ctx, w, h);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  cache.set(kind, texture);
  return texture;
}

/** Frees GPU memory when the hero unmounts (e.g. client-side navigation away from the homepage). */
export function disposeDocumentTextures() {
  cache.forEach((t) => t.dispose());
  cache.clear();
}
