/* ==========================================================
   OUTFLO — LANDING SIGN-IN PROMPT
   File: src/app/(landing)/auth/signin/LandingSignInPrompt.tsx
   Scope: Render the existing-account sign-in doorway
   Last Updated:
   - date: 2026-07-22
   - note: replace the text prompt with the complete outlined sign-in action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import LandingAuthAction from "@/components/system/primitives/actions/auth/LandingAuthAction";
import UserIcon from "@/components/system/primitives/icons/identity/UserIcon";
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

/* ------------------------------
   Component
-------------------------------- */
export default function LandingSignInPrompt() {
    return (
        <LandingAuthAction
            tone="outline"
            leading={<UserIcon />}
            trailing={<ChevronRightIcon />}
            aria-label="Sign in"
        >
            Sign in
        </LandingAuthAction>
    );
}