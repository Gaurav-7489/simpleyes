import type { SceneKey } from "./scenes";

/** Compositions that have pre-rendered stills (scripts/render-scenes.mjs). */
export type StillKey = Extract<SceneKey, `step-${number}`> | Exclude<SceneKey, `step-${number}` | "hero" | "pricing" | "about" | "contact" | "thanks" | "lost" | "legal">;

/**
 * A pre-rendered still of a service composition (scripts/render-scenes.mjs): AVIF with a WebP fallback,
 * responsive, lazy and with fixed dimensions so it never shifts layout. Use where a scene is shown but not
 * interacted with; interactive and intro scenes stay live (<DocumentStage>).
 */
export function SceneImage({
  scene,
  alt,
  sizes,
  priority = false,
  className,
  width = 1120,
  height = 1030,
}: {
  scene: StillKey;
  /** Describe the image when it carries meaning; pass "" when it only repeats a nearby title. */
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Intrinsic size of the still (service stills are 1120×1030; step stills follow their stage's ratio). */
  width?: number;
  height?: number;
}) {
  const src = (w: number, ext: "avif" | "webp") => `/images/scenes/${scene}-${w}.${ext}`;
  const set = (ext: "avif" | "webp") => [560, 840, 1120].map((w) => `${src(w, ext)} ${w}w`).join(", ");
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={src(560, "webp")}
        srcSet={set("webp")}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="block h-auto w-full"
      />
    </picture>
  );
}
