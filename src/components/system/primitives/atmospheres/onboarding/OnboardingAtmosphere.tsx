/* ==========================================================
   OUTFLO — ONBOARDING ATMOSPHERE
   File: src/components/system/primitives/atmospheres/onboarding/OnboardingAtmosphere.tsx
   Scope: Own the shared full-viewport atmosphere across onboarding
   Last Updated:
   - date: 2026-07-26
   - note: remove perimeter geometry and retain shared ambient depth
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import OnboardingAmbientAtmosphere from "./internal/OnboardingAmbientAtmosphere";

/* ------------------------------
   Styles
-------------------------------- */
const ATMOSPHERE_STYLE: CSSProperties = {
    position: "fixed",

    left: 0,
    right: 0,
    top: "calc(0px - env(safe-area-inset-top))",
    bottom: "calc(0px - env(safe-area-inset-bottom))",

    overflow: "hidden",
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
        >
            <OnboardingAmbientAtmosphere />
        </div>
    );
}