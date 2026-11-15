import type { ServiceSceneKey } from "./scenes";

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
}: {
  scene: ServiceSceneKey;
  /** Describe the image when it carries meaning; pass "" when it only repeats a nearby title. */
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
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
        width={1120}
        height={1030}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="block h-auto w-full"
      />
    </picture>
  );
}
