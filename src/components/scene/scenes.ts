import type { ObjectProps } from "./objects";

/**
 * Compositions for the Living Document System. Coordinates: x/y = centre on the table (% of the stage),
 * w = width (cqw), z = height above the table (cqw), rz = rotation on the table, rx/ry = tilt (deg).
 * Lower z first: later items sit visually on top.
 */
export type SceneItem = ObjectProps & { x: number; y: number; w: number; z: number; rz?: number; rx?: number; ry?: number };

export type Camera = { rx?: number; rz?: number; scale?: number };

export type Composition = { items: SceneItem[]; camera?: Camera };

export const serviceSceneKeys = [
  "passport",
  "oci",
  "attestation",
  "affidavit",
  "visa",
  "family",
  "student",
  "corporate",
] as const;

export type ServiceSceneKey = (typeof serviceSceneKeys)[number];

export type SceneKey =
  | ServiceSceneKey
  | "hero"
  | "step-1"
  | "step-2"
  | "step-3"
  | "step-4"
  | "step-5"
  | "pricing"
  | "about"
  | "contact"
  | "thanks"
  | "lost"
  | "legal";

export const compositions: Record<SceneKey, Composition> = {
  /* The whole system, settled: every service's document in one calm arrangement. */
  hero: {
    camera: { rx: 50, rz: -26, scale: 0.98 },
    items: [
      { kind: "folder", tone: "mint", x: 26, y: 66, w: 34, z: 0, rz: -8 },
      { kind: "sheet", variant: "certificate", tone: "landscape", x: 74, y: 72, w: 30, z: 3, rz: 10 },
      { kind: "spread", x: 52, y: 42, w: 42, z: 8, rz: -4 },
      { kind: "booklet", x: 20, y: 30, w: 16, z: 14, rz: -18 },
      { kind: "card", x: 82, y: 30, w: 24, z: 17, rz: 12 },
      { kind: "vellum", variant: "checklist", checked: 3, x: 48, y: 76, w: 20, z: 22, rz: -8 },
      { kind: "check", x: 62, y: 16, w: 7, z: 28 },
    ],
  },

  /* Passport: an open, blank passport-style booklet, a closed one, and its pages. */
  passport: {
    items: [
      { kind: "sheet", variant: "form", x: 30, y: 62, w: 30, z: 0, rz: -14 },
      { kind: "spread", x: 54, y: 48, w: 52, z: 6, rz: -4 },
      { kind: "booklet", x: 78, y: 30, w: 20, z: 14, rz: 14 },
      { kind: "check", x: 30, y: 26, w: 8, z: 20 },
    ],
  },

  /* OCI: an unofficial card over its supporting papers. */
  oci: {
    items: [
      { kind: "sheet", variant: "lines", x: 34, y: 56, w: 32, z: 0, rz: -12 },
      { kind: "sheet", variant: "form", x: 62, y: 62, w: 30, z: 3, rz: 9 },
      { kind: "card", x: 52, y: 38, w: 50, z: 11, rz: -6 },
      { kind: "tag", x: 22, y: 26, w: 18, z: 18, rz: -10 },
    ],
  },

  /* Attestation & legalisation: stacked certificate sheets and a dimensional stamp (no seal artwork). */
  attestation: {
    items: [
      { kind: "sheet", variant: "certificate", tone: "landscape", x: 46, y: 60, w: 50, z: 0, rz: -10 },
      { kind: "sheet", variant: "certificate", tone: "landscape", x: 50, y: 54, w: 50, z: 5, rz: -3 },
      { kind: "sheet", variant: "certificate", tone: "landscape", imprint: true, x: 54, y: 48, w: 50, z: 10, rz: 5 },
      { kind: "stamp", x: 80, y: 24, w: 16, z: 14 },
    ],
  },

  /* Affidavits & declarations: a folded declaration, a signed page and a pen. */
  affidavit: {
    items: [
      { kind: "sheet", variant: "lines", x: 32, y: 58, w: 32, z: 0, rz: -16 },
      { kind: "sheet", variant: "declaration", x: 56, y: 50, w: 38, z: 6, rz: 4 },
      { kind: "sheet", variant: "notes", tone: "mint", x: 26, y: 30, w: 22, z: 14, rz: -8, rx: 22 },
      { kind: "pen", x: 72, y: 74, w: 36, z: 16, rz: -28 },
    ],
  },

  /* Visa & documentation support: an organised folder, a checklist and a travel booklet. */
  visa: {
    items: [
      { kind: "folder", x: 44, y: 58, w: 50, z: 0, rz: -6 },
      { kind: "vellum", variant: "checklist", checked: 4, x: 70, y: 42, w: 28, z: 12, rz: 10 },
      { kind: "booklet", x: 24, y: 30, w: 17, z: 16, rz: -18 },
      { kind: "tag", x: 72, y: 82, w: 18, z: 6, rz: 14 },
    ],
  },

  /* Family documentation: a coordinated group of documents that belong together. */
  family: {
    items: [
      { kind: "sheet", variant: "form", x: 30, y: 52, w: 30, z: 0, rz: -16 },
      { kind: "sheet", variant: "form", x: 52, y: 48, w: 30, z: 4, rz: -2 },
      { kind: "sheet", variant: "form", x: 74, y: 52, w: 30, z: 8, rz: 12 },
      { kind: "card", x: 52, y: 80, w: 30, z: 12, rz: -4 },
      { kind: "check", x: 52, y: 18, w: 8, z: 20 },
    ],
  },

  /* Student services: an academic certificate, a rolled diploma and study notes. */
  student: {
    items: [
      { kind: "sheet", variant: "certificate", x: 44, y: 52, w: 36, z: 0, rz: -8 },
      { kind: "sheet", variant: "notes", tone: "note", x: 74, y: 34, w: 22, z: 6, rz: 12 },
      { kind: "scroll", x: 56, y: 76, w: 44, z: 10, rz: -14 },
      { kind: "sheet", variant: "lines", x: 22, y: 30, w: 20, z: 14, rz: -18 },
    ],
  },

  /* Corporate services: several employee cases coordinated as one system. */
  corporate: {
    camera: { rx: 54, rz: -30 },
    items: [
      { kind: "folder", tone: "mint", x: 22, y: 60, w: 30, z: 0, rz: -2 },
      { kind: "folder", x: 50, y: 52, w: 30, z: 4, rz: -2 },
      { kind: "folder", tone: "mint", x: 78, y: 44, w: 30, z: 8, rz: -2 },
      { kind: "vellum", variant: "checklist", checked: 5, x: 52, y: 20, w: 26, z: 20, rz: -2 },
    ],
  },

  /* How It Works — one document travelling through the five stages. */
  "step-1": {
    items: [
      { kind: "sheet", variant: "notes", tone: "note", x: 34, y: 40, w: 26, z: 4, rz: -10 },
      { kind: "envelope", x: 56, y: 60, w: 46, z: 10, rz: 6 },
    ],
  },
  "step-2": {
    items: [
      { kind: "sheet", variant: "lines", x: 46, y: 54, w: 40, z: 0, rz: -6 },
      { kind: "vellum", variant: "lines", x: 56, y: 46, w: 36, z: 10, rz: 4 },
      { kind: "tag", x: 24, y: 28, w: 18, z: 16, rz: -12 },
    ],
  },
  "step-3": {
    items: [
      { kind: "folder", tone: "mint", x: 48, y: 58, w: 50, z: 0, rz: -4 },
      { kind: "sheet", variant: "form", x: 70, y: 36, w: 26, z: 12, rz: 12 },
      { kind: "sheet", variant: "lines", x: 28, y: 32, w: 24, z: 16, rz: -14 },
    ],
  },
  "step-4": {
    items: [
      { kind: "sheet", variant: "checklist", checked: 5, imprint: true, x: 46, y: 54, w: 40, z: 0, rz: -6 },
      { kind: "stamp", x: 76, y: 28, w: 16, z: 12 },
      { kind: "pen", x: 28, y: 80, w: 30, z: 6, rz: 24 },
    ],
  },
  "step-5": {
    items: [
      { kind: "envelope", x: 46, y: 58, w: 46, z: 4, rz: -6 },
      { kind: "check", x: 70, y: 26, w: 12, z: 18 },
    ],
  },

  /* Pricing — four kinds of cost as four layers; the SimplYes fee is the top sheet. */
  pricing: {
    camera: { rx: 54, rz: -32 },
    items: [
      { kind: "sheet", variant: "lines", tone: "mint", x: 50, y: 64, w: 54, z: 0, rz: 0 },
      { kind: "vellum", variant: "lines", x: 50, y: 57, w: 54, z: 9, rz: 0 },
      { kind: "vellum", variant: "lines", x: 50, y: 50, w: 54, z: 18, rz: 0 },
      { kind: "sheet", variant: "checklist", checked: 2, x: 50, y: 43, w: 54, z: 27, rz: 0 },
    ],
  },

  about: {
    items: [
      { kind: "sheet", variant: "lines", x: 40, y: 56, w: 38, z: 0, rz: -8 },
      { kind: "vellum", variant: "checklist", checked: 4, x: 60, y: 46, w: 34, z: 10, rz: 6 },
      { kind: "check", x: 30, y: 24, w: 9, z: 18 },
    ],
  },

  contact: {
    items: [
      { kind: "sheet", variant: "lines", x: 36, y: 44, w: 28, z: 0, rz: -12 },
      { kind: "envelope", x: 58, y: 58, w: 44, z: 8, rz: 6 },
    ],
  },

  thanks: {
    items: [
      { kind: "envelope", x: 50, y: 56, w: 50, z: 6, rz: -6 },
      { kind: "check", x: 72, y: 24, w: 12, z: 20 },
    ],
  },

  /* 404 — a single blank sheet, out of place. */
  lost: {
    items: [
      { kind: "sheet", variant: "blank", x: 50, y: 52, w: 40, z: 8, rz: 16, rx: 10 },
      { kind: "pen", x: 30, y: 82, w: 30, z: 2, rz: -20 },
    ],
  },

  legal: {
    items: [
      { kind: "sheet", variant: "lines", x: 40, y: 56, w: 40, z: 0, rz: -6 },
      { kind: "sheet", variant: "declaration", x: 58, y: 46, w: 40, z: 8, rz: 6 },
    ],
  },
};
