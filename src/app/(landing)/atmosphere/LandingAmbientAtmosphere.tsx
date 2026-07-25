/* ==========================================================
   OUTFLO — LANDING AMBIENT ATMOSPHERE
   File: src/app/(landing)/atmosphere/LandingAmbientAtmosphere.tsx
   Scope: Render the quiet atmospheric paint beneath the landing content
   Last Updated:
   - date: 2026-07-24
   - note: introduce subtle central atmospheric depth behind the landing surface
   ========================================================== */

import type { CSSProperties } from "react";

/* ------------------------------
   Atmosphere
-------------------------------- */
const AMBIENT_STYLE: CSSProperties = {
    position: "fixed",

    left: 0,
    right: 0,
    top: "calc(0px - env(safe-area-inset-top))",
    bottom: "calc(0px - env(safe-area-inset-bottom))",

    background: `
        radial-gradient(
            circle at 50% 18%,
            color-mix(
                in srgb,
                var(--color-accent-secondary) 7%,
                transparent
            ) 0%,
            transparent 36%
        ),
        radial-gradient(
            ellipse at 50% 58%,
            color-mix(
                in srgb,
                var(--color-accent-primary) 4%,
                transparent
            ) 0%,
            transparent 52%
        )
    `,

    pointerEvents: "none",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingAmbientAtmosphere() {
    return (
        <div
            aria-hidden="true"
            style={AMBIENT_STYLE}
        />
    );
}