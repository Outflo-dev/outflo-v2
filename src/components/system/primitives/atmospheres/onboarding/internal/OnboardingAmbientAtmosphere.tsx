/* ==========================================================
   OUTFLO — ONBOARDING AMBIENT ATMOSPHERE
   File: src/components/system/primitives/atmospheres/onboarding/internal/OnboardingAmbientAtmosphere.tsx
   Scope: Render the shared ambient depth inside the onboarding atmosphere
   Last Updated:
   - date: 2026-07-25
   - note: establish persistent theme-bound depth across onboarding
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

/* ------------------------------
   Styles
-------------------------------- */
const AMBIENT_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,

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
export default function OnboardingAmbientAtmosphere() {
    return (
        <div
            aria-hidden="true"
            style={AMBIENT_STYLE}
        />
    );
}
