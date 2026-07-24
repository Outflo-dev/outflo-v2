/* ==========================================================
   OUTFLO — LANDING SIGN-IN PROMPT
   File: src/app/(landing)/auth/signin/LandingSignInPrompt.tsx
   Scope: Render the existing-account sign-in doorway
   Last Updated:
   - date: 2026-07-23
   - note: align the sign-in identity optically with the other landing actions
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import LandingAuthAction from "@/components/system/primitives/actions/auth/LandingAuthAction";
import UserIcon from "@/components/system/primitives/icons/identity/UserIcon";
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

/* ------------------------------
   Styles
-------------------------------- */
const USER_MARK_STYLE: CSSProperties = {
    display: "inline-flex",

    transform: "translateX(-0.16rem)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingSignInPrompt() {
    return (
        <LandingAuthAction
            tone="outline"
            leading={
                <span style={USER_MARK_STYLE}>
                    <UserIcon />
                </span>
            }
            trailing={<ChevronRightIcon />}
            aria-label="Sign in"
        >
            Sign in
        </LandingAuthAction>
    );
}