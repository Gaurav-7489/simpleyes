import type { CSSProperties } from "react";
import { DocumentObject } from "./objects";
import { compositions, type SceneKey } from "./scenes";

type Props = {
  /** One composition, or several stacked so a client parent can switch between them (`active`). */
  scene: SceneKey | readonly SceneKey[];
  /** With several scenes: the one shown. */
  active?: SceneKey;
  /** Play the one-time "documents settle" entrance (hero only). */
  intro?: boolean;
  /** Follow the pointer with a subtle tilt on desktop (MotionLayer). */
  tilt?: boolean;
  /** When set, the stage is announced as an image with this description; otherwise it is decorative. */
  label?: string;
  /** CSS aspect-ratio of the stage box, e.g. "1 / 0.9". */
  ratio?: string;
  className?: string;
};

const cssVars = (vars: Record<string, string | number | undefined>) =>
  Object.fromEntries(Object.entries(vars).filter(([, v]) => v !== undefined)) as CSSProperties;

/**
 * A CSS 3D stage showing one or more document compositions (see scenes.ts). Pure markup: it renders on the
 * server, needs no JavaScript, and never carries content or controls — only decoration.
 */
export function DocumentStage({ scene, active, intro = false, tilt = false, label, ratio, className }: Props) {
  const keys: readonly SceneKey[] = Array.isArray(scene) ? scene : [scene as SceneKey];
  const multi = keys.length > 1;
  const shown = active ?? keys[0]!;
  const camera = compositions[shown]?.camera ?? {};

  return (
    <div
      className={`stage${multi ? " stage-set" : ""}${className ? ` ${className}` : ""}`}
      data-intro={intro ? "" : undefined}
      data-tilt={tilt ? "" : undefined}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      style={cssVars({
        "--stage-ratio": ratio,
        "--cam-rx": camera.rx !== undefined ? `${camera.rx}deg` : undefined,
        "--cam-rz": camera.rz !== undefined ? `${camera.rz}deg` : undefined,
        "--cam-scale": camera.scale,
      })}
    >
      <div className="stage-camera">
        <div className="stage-world">
          <div className="stage-floor" />
          {keys.map((key) => (
            <div key={key} className="scene" data-scene={key} data-active={multi ? key === shown : undefined}>
              {compositions[key].items.map(({ x, y, w, z, rz, rx, ry, ...object }, i) => (
                <div
                  key={i}
                  className="obj"
                  data-round={object.kind === "check" || object.kind === "stamp" ? "" : undefined}
                  style={cssVars({ "--x": x, "--y": y, "--w": w, "--z": z, "--rz": rz, "--rx": rx, "--ry": ry, "--i": i })}
                >
                  <div className="obj-shadow" />
                  <div className="obj-body">
                    <DocumentObject {...object} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
