/* ==========================================================
   OUTFLO — ONBOARDING RING ATMOSPHERE
   File: src/components/system/primitives/atmospheres/onboarding/internal/OnboardingRingAtmosphere.tsx
   Scope: Render the shared cropped perimeter rings inside onboarding
   Last Updated:
   - date: 2026-07-25
   - note: place continuous edge-bound geometry inside the safe viewport
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Placement Canvas
-------------------------------- */
const PLACEMENT_STYLE: CSSProperties = {
    position: "absolute",

    left: 0,
    right: 0,
    top: "env(safe-area-inset-top)",
    bottom: "env(safe-area-inset-bottom)",

    overflow: "visible",
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

    width: "clamp(260px, 72vw, 360px)",

    left: "clamp(-210px, -43vw, -145px)",
    top: "clamp(-190px, -37vw, -130px)",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.3,
};

const UPPER_RIGHT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(190px, 50vw, 270px)",

    right: "clamp(-145px, -29vw, -95px)",
    top: "clamp(70px, 11dvh, 120px)",

    borderColor: "var(--color-accent-secondary)",
    opacity: 0.24,
};

const BOTTOM_LEFT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(230px, 62vw, 320px)",

    left: "clamp(-190px, -39vw, -130px)",
    bottom: "clamp(-190px, -35vw, -120px)",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.14,
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingRingAtmosphere() {
    return (
        <div style={PLACEMENT_STYLE}>
            <div style={TOP_LEFT_RING_STYLE} />
            <div style={UPPER_RIGHT_RING_STYLE} />
            <div style={BOTTOM_LEFT_RING_STYLE} />
        </div>
    );
}
