/* ==========================================================
   OUTFLO — LANDING ORB ATMOSPHERE
   File: src/app/(landing)/atmosphere/LandingOrbAtmosphere.tsx
   Scope: Render the cropped atmospheric rings at the viewport perimeter
   Last Updated:
   - date: 2026-07-21
   - note: resolve four persistent rings from the viewport edges without entering the content column
   ========================================================== */

import type { CSSProperties } from "react";

/* ------------------------------
   Canvas
-------------------------------- */
const ATMOSPHERE_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,

    background: "transparent",

    overflow: "hidden",
    pointerEvents: "none",
};

/* ------------------------------
   Shared Ring
-------------------------------- */
const RING_STYLE: CSSProperties = {
    position: "absolute",

    aspectRatio: "1",

    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "50%",

    background: "transparent",

    pointerEvents: "none",
};

/* ------------------------------
   Placement
-------------------------------- */
const TOP_LEFT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(250px, 66vw, 340px)",

    left: "clamp(-185px, -37vw, -130px)",
    top: "clamp(-205px, -40vw, -145px)",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.38,
};

const MIDDLE_LEFT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(160px, 40vw, 220px)",

    left: "clamp(-145px, -31vw, -105px)",
    top: "26dvh",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.12,
};

const RIGHT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(180px, 46vw, 250px)",

    right: "clamp(-140px, -28vw, -105px)",
    top: "4dvh",

    borderColor: "var(--color-accent-secondary)",
    opacity: 0.38,
};

const BOTTOM_RIGHT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(190px, 48vw, 260px)",

    right: "clamp(-170px, -34vw, -120px)",
    bottom: "clamp(-125px, -22vw, -75px)",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.20,
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingOrbAtmosphere() {
    return (
        <div
            aria-hidden="true"
            style={ATMOSPHERE_STYLE}
        >
            <div style={TOP_LEFT_RING_STYLE} />
            <div style={MIDDLE_LEFT_RING_STYLE} />
            <div style={RIGHT_RING_STYLE} />
            <div style={BOTTOM_RIGHT_RING_STYLE} />
        </div>
    );
}