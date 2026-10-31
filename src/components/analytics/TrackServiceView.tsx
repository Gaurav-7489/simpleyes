"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires `view_service` once per service-page load (§18). */
export function TrackServiceView({ name }: { name: string }) {
  useEffect(() => {
    // Wait a tick so a consent given earlier has loaded gtag.
    const t = setTimeout(() => track("view_service", { service_name: name }), 400);
    return () => clearTimeout(t);
  }, [name]);
  return null;
}
