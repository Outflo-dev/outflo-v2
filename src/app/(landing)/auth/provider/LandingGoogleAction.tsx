/* ==========================================================
   OUTFLO — LANDING GOOGLE ACTION
   File: src/app/(landing)/auth/provider/LandingGoogleAction.tsx
   Scope: Render the Google authentication action on the landing surface
   Last Updated:
   - date: 2026-07-22
   - note: add the enlarged Google identity and shared directional indicator
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
const GOOGLE_MARK_STYLE: CSSProperties = {
    display: "block",

    width: "1.4rem",
    height: "1.4rem",

    transform: "translate(-0.15rem, -0.04rem)",
};

/* ------------------------------
   Google Mark
-------------------------------- */
function GoogleMark() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            style={GOOGLE_MARK_STYLE}
        >
            <path
                fill="#4285f4"
                d="M21.6 12.227c0-.709-.064-1.391-.182-2.045H12v3.873h5.382a4.6 4.6 0 0 1-1.996 3.018v2.509h3.232c1.891-1.741 2.982-4.309 2.982-7.355Z"
            />

            <path
                fill="#34a853"
                d="M12 22c2.7 0 4.964-.895 6.618-2.418l-3.232-2.509c-.895.6-2.041.954-3.386.954-2.605 0-4.809-1.759-5.6-4.127H3.059v2.591A9.997 9.997 0 0 0 12 22Z"
            />

            <path
                fill="#fbbc05"
                d="M6.4 13.9A6.014 6.014 0 0 1 6.082 12c0-.659.114-1.3.318-1.9V7.509H3.059A9.997 9.997 0 0 0 2 12c0 1.614.386 3.141 1.059 4.491L6.4 13.9Z"
            />

            <path
                fill="#ea4335"
                d="M12 5.973c1.468 0 2.786.505 3.823 1.495l2.868-2.868C16.959 2.986 14.695 2 12 2a9.997 9.997 0 0 0-8.941 5.509L6.4 10.1c.791-2.368 2.995-4.127 5.6-4.127Z"
            />
        </svg>
    );
}

/* ------------------------------
   Component
-------------------------------- */
export default function LandingGoogleAction() {
    return (
        <LandingAuthAction
            leading={<GoogleMark />}
            trailing={<ChevronRightIcon />}
            aria-label="Continue with Google"
        >
            Continue with Google
        </LandingAuthAction>
    );
}