/* ==========================================================
   OUTFLO — LANDING EMAIL ACTION
   File: src/app/(landing)/auth/email/LandingEmailAction.tsx
   Scope: Render the email account-creation action on the landing surface
   Last Updated:
   - date: 2026-07-22
   - note: add the shared mail identity, brand gradient, and directional indicator
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import LandingAuthAction from "@/components/system/primitives/actions/auth/LandingAuthAction";
import MailIcon from "@/components/system/primitives/icons/communication/MailIcon";
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

/* ------------------------------
   Component
-------------------------------- */
export default function LandingEmailAction() {
    return (
        <LandingAuthAction
            tone="gradient"
            leading={<MailIcon />}
            trailing={<ChevronRightIcon />}
            aria-label="Create account with email"
        >
            Create account with email
        </LandingAuthAction>
    );
}