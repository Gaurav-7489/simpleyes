"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import { disposeDocumentTextures, documentTexture, type ArtKind } from "./textures";

/**
 * The homepage hero composition in real 3D: a blank passport-style booklet open on the table, a closed one, a
 * card, a certificate, a checklist, an envelope and a tick — lit by a key light and a soft sky/ground fill
 * (no environment maps, no downloads, no third-party requests). Documents settle into place once (no overshoot), then the table leans gently toward
 * the pointer, with higher documents shifting further (depth) and the one under the pointer lifting. Rendering is
 * on demand only: no frames are drawn while nothing moves or the canvas is off screen.
 */

const SETTLE_MS = 850;
const STAGGER_MS = 85;
const DROP = 2.2;
const MAX_LEAN = 0.05;
/** Pointer parallax per unit of height: documents higher above the table shift further, so depth reads. */
const PARALLAX = 0.16;
/** How far a document rises while the pointer rests on it. */
const HOVER_LIFT = 0.16;

const PAPER = "#fbfdfb";
const COVER = "#0b5a47";
const LIME = "#a6dc5c";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Placement = { position: [number, number, number]; rotationY?: number; tilt?: [number, number] };

type PointerRef = { current: [number, number] };

/**
 * One object: it falls onto the table and settles once (no overshoot), then drifts with the pointer in
 * proportion to its height, and lifts gently while the pointer rests on it.
 */
function Settling({
  index,
  start,
  pointer,
  position,
  rotationY = 0,
  tilt = [0, 0],
  children,
}: Placement & { index: number; start: { current: number }; pointer: PointerRef; children: ReactNode }) {
  const ref = useRef<Group>(null);
  const hover = useRef(false);
  const lift = useRef(0);
  const shift = useRef<[number, number]>([0, 0]);
  const invalidate = useThree((s) => s.invalidate);
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const elapsed = performance.now() - start.current - index * STAGGER_MS;
    const t = Math.min(1, Math.max(0, elapsed / SETTLE_MS));
    const e = easeOut(t);
    const rest = 1 - e;
    const depth = (position[1] + 0.3) * PARALLAX;
    const [px, py] = pointer.current;
    const sx = shift.current;
    sx[0] = MathUtils.damp(sx[0], px * depth, 4, delta);
    sx[1] = MathUtils.damp(sx[1], py * depth, 4, delta);
    lift.current = MathUtils.damp(lift.current, hover.current && t === 1 ? HOVER_LIFT : 0, 8, delta);
    g.position.set(position[0] + sx[0], position[1] + rest * DROP + lift.current, position[2] + sx[1]);
    g.rotation.set(tilt[0] + rest * 0.45, rotationY + rest * 0.35, tilt[1] - rest * 0.25 - lift.current * 0.25);
    g.scale.setScalar(0.001 + e * 0.999);
    const moving =
      t < 1 ||
      Math.abs(sx[0] - px * depth) > 0.0005 ||
      Math.abs(sx[1] - py * depth) > 0.0005 ||
      Math.abs(lift.current - (hover.current ? HOVER_LIFT : 0)) > 0.0005;
    if (moving) invalidate();
  });
  return (
    <group
      ref={ref}
      position={position}
      scale={0.001}
      onPointerOver={(e) => {
        e.stopPropagation();
        hover.current = true;
        invalidate();
      }}
      onPointerOut={() => {
        hover.current = false;
        invalidate();
      }}
    >
      {children}
    </group>
  );
}

function Art({ kind, width, depth, y }: { kind: ArtKind; width: number; depth: number; y: number }) {
  const map = useMemo(() => documentTexture(kind), [kind]);
  return (
    <mesh position-y={y} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial map={map} transparent roughness={0.85} polygonOffset polygonOffsetFactor={-1} />
    </mesh>
  );
}

function Sheet({ kind, width = 1, depth = 1.414, opacity = 1 }: { kind: ArtKind; width?: number; depth?: number; opacity?: number }) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, 0.012, depth]} />
        <meshPhysicalMaterial color={PAPER} roughness={0.88} sheen={0.35} sheenColor="#ffffff" sheenRoughness={0.8} transparent={opacity < 1} opacity={opacity} />
      </mesh>
      <Art kind={kind} width={width} depth={depth} y={0.0065} />
    </group>
  );
}

function ClosedBooklet() {
  return (
    <group>
      <mesh position-y={-0.03} castShadow>
        <boxGeometry args={[0.84, 0.05, 1.22]} />
        <meshStandardMaterial color="#eef4f0" roughness={0.95} />
      </mesh>
      <RoundedBox args={[0.88, 0.09, 1.26]} radius={0.035} smoothness={3} castShadow receiveShadow>
        <meshPhysicalMaterial color={COVER} roughness={0.6} clearcoat={0.4} clearcoatRoughness={0.35} />
      </RoundedBox>
      <Art kind="cover" width={0.86} depth={1.22} y={0.047} />
    </group>
  );
}

function OpenBooklet() {
  // Pages lift slightly toward their outer edges, so the booklet reads as open.
  const lean = 0.06;
  return (
    <group>
      <RoundedBox args={[1.98, 0.04, 1.38]} radius={0.03} smoothness={3} castShadow receiveShadow position-y={-0.02}>
        <meshPhysicalMaterial color={COVER} roughness={0.62} clearcoat={0.35} clearcoatRoughness={0.4} />
      </RoundedBox>
      <group rotation-z={-lean}>
        <group position={[-0.47, 0.035, 0]}>
          <Sheet kind="page-left" width={0.94} depth={1.3} />
        </group>
      </group>
      <group rotation-z={lean}>
        <group position={[0.47, 0.035, 0]}>
          <Sheet kind="page-right" width={0.94} depth={1.3} />
        </group>
      </group>
    </group>
  );
}

function Card() {
  return (
    <group>
      <RoundedBox args={[1.42, 0.03, 0.9]} radius={0.012} smoothness={2} castShadow receiveShadow>
        <meshPhysicalMaterial color={PAPER} roughness={0.35} clearcoat={0.8} clearcoatRoughness={0.15} />
      </RoundedBox>
      <Art kind="card" width={1.4} depth={0.88} y={0.016} />
    </group>
  );
}

function Envelope() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.55, 0.03, 1]} />
        <meshStandardMaterial color="#f4f8f5" roughness={0.9} />
      </mesh>
      <Art kind="envelope" width={1.55} depth={1} y={0.016} />
    </group>
  );
}

function Tick() {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.06, 40]} />
        <meshPhysicalMaterial color={LIME} roughness={0.4} clearcoat={0.6} clearcoatRoughness={0.2} />
      </mesh>
      <Art kind="check" width={0.34} depth={0.34} y={0.031} />
    </group>
  );
}

/** Leans the whole table toward the pointer, damped; asks for frames only while it is still moving. */
function Table({ pointer, children }: { pointer: { current: [number, number] }; children: ReactNode }) {
  const ref = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const [px, py] = pointer.current;
    const tx = py * MAX_LEAN;
    const tz = -px * MAX_LEAN;
    g.rotation.x = MathUtils.damp(g.rotation.x, tx, 5, delta);
    g.rotation.z = MathUtils.damp(g.rotation.z, tz, 5, delta);
    if (Math.abs(g.rotation.x - tx) > 0.0005 || Math.abs(g.rotation.z - tz) > 0.0005) invalidate();
  });
  return <group ref={ref}>{children}</group>;
}

function Composition({ start, pointer }: { start: { current: number }; pointer: { current: [number, number] } }) {
  const items: (Placement & { node: ReactNode })[] = [
    { position: [1.55, 0.02, 1.25], rotationY: -0.2, node: <Sheet kind="certificate" width={1.414} depth={1} /> },
    { position: [-1.85, 0.02, 1.05], rotationY: 0.3, node: <Envelope /> },
    { position: [0, 0.06, 0], rotationY: 0.06, node: <OpenBooklet /> },
    { position: [-1.75, 0.3, -0.85], rotationY: 0.32, tilt: [0.05, -0.04], node: <ClosedBooklet /> },
    { position: [1.85, 0.42, -0.75], rotationY: -0.24, tilt: [0.04, 0.05], node: <Card /> },
    { position: [-0.55, 0.62, 1.75], rotationY: 0.22, tilt: [-0.05, 0], node: <Sheet kind="checklist" width={0.82} depth={1.15} opacity={0.94} /> },
    { position: [0.9, 1.05, -1.25], node: <Tick /> },
  ];
  return (
    <Table pointer={pointer}>
      {items.map(({ node, ...placement }, i) => (
        <Settling key={i} index={i} start={start} pointer={pointer} {...placement}>
          {node}
        </Settling>
      ))}
      {/* Long, soft key-light shadows for height, plus contact shadows where documents meet the table. */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.02} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <shadowMaterial transparent opacity={0.12} />
      </mesh>
      <ContactShadows position={[0, -0.015, 0.2]} scale={[11, 8]} resolution={512} blur={2.6} far={1.2} opacity={0.38} color="#0d2e26" />
    </Table>
  );
}

/** Keeps the whole composition in frame as the canvas changes shape (tablet portrait through wide desktop). */
function CameraFit() {
  const { camera, size, invalidate } = useThree();
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const fit = Math.min(1.45, Math.max(1, 1.2 / aspect));
    camera.position.set(0, 7.4 * fit, 6.4 * fit);
    camera.lookAt(0, 0, 0.15);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size, invalidate]);
  return null;
}

/** Tells the parent once the first frame is on screen, so the CSS fallback can hand over without a flash. */
function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(onReady);
  });
  return null;
}

export default function HeroCanvas({ onReady, onError }: { onReady: () => void; onError: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  // Set when the renderer is created; until then every object waits above the table (elapsed < 0).
  const start = useRef(Number.POSITIVE_INFINITY);
  const pointer = useRef<[number, number]>([0, 0]);
  const visible = useRef(true);
  const invalidateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      visible.current = Boolean(entry?.isIntersecting);
    });
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      if (!visible.current) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      pointer.current = [Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y))];
      invalidateRef.current?.();
    };
    const onLeave = () => {
      pointer.current = [0, 0];
      invalidateRef.current?.();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      disposeDocumentTextures();
    };
  }, []);

  return (
    <div ref={wrap} className="hero-canvas" aria-hidden="true">
      <Canvas
        frameloop="demand"
        flat
        dpr={[1, 1.5]}
        shadows="percentage"
        camera={{ position: [0, 7.4, 6.4], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={({ camera, gl, invalidate }) => {
          camera.lookAt(0, 0, 0.15);
          invalidateRef.current = invalidate;
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            onError();
          });
          start.current = performance.now();
        }}
      >
        <ambientLight intensity={1.05} />
        <directionalLight
          position={[3.5, 8, 2.5]}
          intensity={1.15}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-radius={6}
          shadow-bias={-0.0004}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        {/* Soft sky/ground fill instead of an environment map: no HDR loaders, no downloads. */}
        <hemisphereLight args={["#ffffff", "#e2f4e6", 0.7]} />
        <CameraFit />
        <Composition start={start} pointer={pointer} />
        <FirstFrame onReady={onReady} />
      </Canvas>
    </div>
  );
}
