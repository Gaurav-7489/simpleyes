"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { LEAD_FLAG } from "@/components/contact/EnquiryForm";

/** Fires the `generate_lead` conversion once per accepted enquiry (flag set by the form after the endpoint accepts). */
export function ThankYouTracker() {
  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = window.sessionStorage.getItem(LEAD_FLAG);
      window.sessionStorage.removeItem(LEAD_FLAG);
    } catch {
      return;
    }
    if (!raw) return;
    const data = JSON.parse(raw) as { service?: string; preferred_contact?: string };
    const t = setTimeout(() => track("generate_lead", { service: data.service, preferred_contact: data.preferred_contact }), 400);
    return () => clearTimeout(t);
  }, []);
  return null;
}
