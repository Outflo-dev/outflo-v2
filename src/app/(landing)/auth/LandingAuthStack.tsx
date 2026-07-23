/* ==========================================================
   OUTFLO — LANDING AUTH STACK
   File: src/app/(landing)/auth/LandingAuthStack.tsx
   Scope: Compose the ordered landing authentication doorway
   Last Updated:
   - date: 2026-07-22
   - note: assemble provider, email, and sign-in actions without absorbing their local ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import LandingAuthDivider from "./divider/LandingAuthDivider";
import LandingEmailAction from "./email/LandingEmailAction";
import LandingProviderActions from "./provider/LandingProviderActions";
import LandingSignInPrompt from "./signin/LandingSignInPrompt";

/* ------------------------------
   Styles
-------------------------------- */
const AUTH_STACK_STYLE: CSSProperties = {
    position: "relative",
    zIndex: 1,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "100%",
    maxWidth: "19.5rem",

    marginTop: "clamp(2rem, 4.4dvh, 2.8rem)",

    gap: "0.9rem",
};

const EMAIL_GROUP_STYLE: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "100%",

    gap: "0.85rem",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingAuthStack() {
    return (
        <div style={AUTH_STACK_STYLE}>
            <LandingProviderActions />

            <LandingAuthDivider />

            <div style={EMAIL_GROUP_STYLE}>
                <LandingEmailAction />
                <LandingSignInPrompt />
            </div>
        </div>
    );
}