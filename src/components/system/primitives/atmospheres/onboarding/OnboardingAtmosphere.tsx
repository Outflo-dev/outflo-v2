/* ==========================================================
   OUTFLO — ONBOARDING ATMOSPHERE
   File: src/components/system/primitives/atmospheres/onboarding/OnboardingAtmosphere.tsx
   Scope: Own the shared full-viewport atmosphere across onboarding
   Last Updated:
   - date: 2026-07-27
   - note: paint shared ambient depth directly on the fixed viewport canvas
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Styles
-------------------------------- */
const ATMOSPHERE_STYLE: CSSProperties = {
    position: "fixed",

    left: 0,
    right: 0,
    top: "calc(0px - env(safe-area-inset-top))",
    bottom: "calc(0px - env(safe-area-inset-bottom))",

    background: `
        radial-gradient(
            circle at 50% 12%,
            color-mix(
                in srgb,
                var(--color-accent-secondary) 11%,
                transparent
            ) 0%,
            transparent 34%
        ),
        radial-gradient(
            ellipse at 50% 48%,
            color-mix(
                in srgb,
                var(--color-accent-primary) 6%,
                transparent
            ) 0%,
            transparent 50%
        ),
        radial-gradient(
            circle at 50% 100%,
            color-mix(
                in srgb,
                var(--color-accent-secondary) 5%,
                transparent
            ) 0%,
            transparent 42%
        )
    `,

    pointerEvents: "none",
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingAtmosphere() {
    return (
        <div
            aria-hidden="true"
            style={ATMOSPHERE_STYLE}
        />
    );
}