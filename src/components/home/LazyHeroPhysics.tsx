"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroPhysics = dynamic(() => import("@/components/home/HeroPhysics").then((m) => m.HeroPhysics), { ssr: false });

/** Fetches the physics chunk only on desktop pointer devices, after the hero has painted. */
export function LazyHeroPhysics() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return;
    const t = setTimeout(() => setOn(true), 600);
    return () => clearTimeout(t);
  }, []);
  return on ? <HeroPhysics /> : <span hidden />;
}
