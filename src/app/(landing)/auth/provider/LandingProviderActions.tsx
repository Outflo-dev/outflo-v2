/* ==========================================================
   OUTFLO — LANDING PROVIDER ACTIONS
   File: src/app/(landing)/auth/provider/LandingProviderActions.tsx
   Scope: Compose the landing authentication provider actions
   Last Updated:
   - date: 2026-07-22
   - note: establish provider ordering and local group spacing
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import LandingAppleAction from "./LandingAppleAction";
import LandingGoogleAction from "./LandingGoogleAction";

/* ------------------------------
   Styles
-------------------------------- */
const PROVIDER_ACTIONS_STYLE: CSSProperties = {
    display: "flex",
    flexDirection: "column",

    width: "100%",

    gap: "0.75rem",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingProviderActions() {
    return (
        <div style={PROVIDER_ACTIONS_STYLE}>
            <LandingAppleAction />
            <LandingGoogleAction />
        </div>
    );
}