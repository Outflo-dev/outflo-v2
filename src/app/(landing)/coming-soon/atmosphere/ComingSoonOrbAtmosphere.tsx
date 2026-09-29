/* ==========================================================
   OUTFLO — COMING SOON ORB ATMOSPHERE
   File: src/app/(landing)/coming-soon/atmosphere/ComingSoonOrbAtmosphere.tsx
   Scope: Render the cropped atmospheric rings for the shared Coming Soon surface
   Last Updated:
   - date: 2026-09-29
   - note: preserve Landing ring language with Coming Soon-owned placement
   ========================================================== */

import type {
    CSSProperties,
} from "react";

/* ------------------------------
   Canvas
-------------------------------- */

const ATMOSPHERE_STYLE: CSSProperties = {
    position: "fixed",

    left: 0,
    right: 0,
    top: "calc(0px - env(safe-area-inset-top))",
    bottom: "calc(0px - env(safe-area-inset-bottom))",

    background: "transparent",

    overflow: "hidden",
    pointerEvents: "none",
};

/* ------------------------------
   Placement Canvas
-------------------------------- */

const ATMOSPHERE_PLACEMENT_STYLE: CSSProperties = {
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

    width: "clamp(250px, 66vw, 340px)",

    left: "clamp(-165px, -33vw, -115px)",
    top: "calc(clamp(-205px, -40vw, -145px) + 24px)",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.38,
};

const RIGHT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(200px, 52vw, 280px)",

    right: "clamp(-120px, -24vw, -90px)",
    top: "calc(4dvh + 20px)",

    borderColor: "var(--color-accent-secondary)",
    opacity: 0.38,
};

const BOTTOM_LEFT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(200px, 52vw, 280px)",

    left: "clamp(-135px, -27vw, -95px)",
    bottom: "clamp(1rem, 6dvh, 5rem)",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.20,
};

const BOTTOM_RIGHT_RING_STYLE: CSSProperties = {
    ...RING_STYLE,

    width: "clamp(190px, 48vw, 260px)",

    right: "clamp(-150px, -30vw, -105px)",
    bottom: "calc(clamp(-105px, -18vw, -60px) - 18px)",

    borderColor: "var(--color-accent-primary)",
    opacity: 0.20,
};

/* ------------------------------
   Component
-------------------------------- */

export default function ComingSoonOrbAtmosphere() {
    return (
        <div
            aria-hidden="true"
            style={ATMOSPHERE_STYLE}
        >
            <div style={ATMOSPHERE_PLACEMENT_STYLE}>
                <div style={TOP_LEFT_RING_STYLE} />
                <div style={RIGHT_RING_STYLE} />
                <div style={BOTTOM_LEFT_RING_STYLE} />
                <div style={BOTTOM_RIGHT_RING_STYLE} />
            </div>
        </div>
    );
}
