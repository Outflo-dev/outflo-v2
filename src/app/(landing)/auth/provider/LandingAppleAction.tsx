/* ==========================================================
   OUTFLO — LANDING APPLE ACTION
   File: src/app/(landing)/auth/provider/LandingAppleAction.tsx
   Scope: Render the Apple authentication action on the landing surface
   Last Updated:
   - date: 2026-07-22
   - note: add the enlarged Apple identity and shared directional indicator
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import LandingAuthAction from "@/components/system/primitives/actions/auth/LandingAuthAction";
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

/* ------------------------------
   Styles
-------------------------------- */
const APPLE_MARK_STYLE: CSSProperties = {
    display: "block",

    width: "1.5rem",
    height: "1.5rem",
    transform: "translate(-0.08rem, -0.08rem)",
};

/* ------------------------------
   Apple Mark
-------------------------------- */
function AppleMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            style={APPLE_MARK_STYLE}
        >
            <path
                fill="currentColor"
                d="M16.365 1.43c0 1.14-.415 2.207-1.105 3.01-.74.865-1.94 1.53-3.01 1.445-.135-1.1.395-2.27 1.075-2.99.75-.81 2.03-1.39 3.04-1.465ZM20.08 17.16c-.48 1.1-.71 1.59-1.33 2.56-.865 1.33-2.085 2.99-3.6 3-1.345.015-1.69-.88-3.515-.87-1.825.01-2.205.89-3.55.875-1.515-.015-2.67-1.51-3.535-2.84-2.42-3.72-2.675-8.09-1.18-10.41 1.065-1.65 2.745-2.615 4.325-2.615 1.61 0 2.625.885 3.955.885 1.29 0 2.075-.89 3.94-.89 1.41 0 2.905.77 3.97 2.1-3.49 1.915-2.925 6.9.52 8.205Z"
            />
        </svg>
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function LandingAppleAction() {
    return (
        <LandingAuthAction
            leading={<AppleMark />}
            trailing={<ChevronRightIcon />}
            aria-label="Continue with Apple"
        >
            Continue with Apple
        </LandingAuthAction>
    );
}