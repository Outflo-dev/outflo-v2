/* ==========================================================
   OUTFLO — LANDING ORB ATMOSPHERE
   File: src/app/(landing)/atmosphere/LandingOrbAtmosphere.tsx
   Scope: Render the cropped atmospheric orbs behind the landing surface
   Last Updated:
   - date: 2026-07-21
   - note: consume the complete canonical Orb paint contract
   ========================================================== */

import type { CSSProperties } from "react";

/* ------------------------------
   Shared Structure
-------------------------------- */
const ORB_STYLE: CSSProperties = {
    position: "absolute",

    border: "var(--orb-border)",
    borderRadius: "50%",

    background: "var(--orb-background)",
    boxShadow: "var(--orb-shadow)",

    pointerEvents: "none",
};

/* ------------------------------
   Placement
-------------------------------- */
const LEFT_ORB_STYLE: CSSProperties = {
    ...ORB_STYLE,

    width: "clamp(220px, 72vw, 340px)",
    aspectRatio: "1",

    left: "clamp(-230px, -42vw, -145px)",
    top: "31%",
};

const RIGHT_ORB_STYLE: CSSProperties = {
    ...ORB_STYLE,

    width: "clamp(280px, 88vw, 430px)",
    aspectRatio: "1",

    right: "clamp(-320px, -58vw, -205px)",
    top: "43%",
};

const BOTTOM_ORB_STYLE: CSSProperties = {
    ...ORB_STYLE,

    width: "clamp(280px, 90vw, 440px)",
    aspectRatio: "1",

    left: "clamp(-300px, -54vw, -190px)",
    bottom: "-19%",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingOrbAtmosphere() {
    return (
        <div aria-hidden="true">
            <div style={LEFT_ORB_STYLE} />
            <div style={RIGHT_ORB_STYLE} />
            <div style={BOTTOM_ORB_STYLE} />
        </div>
    );
}