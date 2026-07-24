/* ==========================================================
   OUTFLO — LANDING ORB ATMOSPHERE
   File: src/app/(landing)/atmosphere/LandingOrbAtmosphere.tsx
   Scope: Render the cropped atmospheric rings at the viewport perimeter
   Last Updated:
   - date: 2026-07-22
   - note: resolve the atmosphere against the full viewport and bring each ring slightly inward
   ========================================================== */

import type { CSSProperties } from "react";

/* ------------------------------
   Canvas
-------------------------------- */
const ATMOSPHERE_STYLE: CSSProperties = {
    position: "fixed",
    inset: 0,

    width: "100vw",
    height: "100dvh",

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

    left: "clamp(-165px, -33vw, -115px)",
    top: "clamp(-205px, -40vw, -145px)",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.38,
};

const MIDDLE_LEFT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(160px, 40vw, 220px)",

    left: "clamp(-125px, -27vw, -90px)",
    top: "26dvh",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.12,
};

const RIGHT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(200px, 52vw, 280px)",

    right: "clamp(-120px, -24vw, -90px)",
    top: "4dvh",

    borderColor: "var(--color-accent-secondary)",
    opacity: 0.38,
};

const BOTTOM_RIGHT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(190px, 48vw, 260px)",

    right: "clamp(-150px, -30vw, -105px)",
    bottom: "clamp(-105px, -18vw, -60px)",

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