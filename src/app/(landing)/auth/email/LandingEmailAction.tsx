/* ==========================================================
   OUTFLO — LANDING EMAIL ACTION
   File: src/app/(landing)/auth/email/LandingEmailAction.tsx
   Scope: Render the email account-creation action on the landing surface
   Last Updated:
   - date: 2026-07-23
   - note: apply landing-specific optical alignment to the mail identity
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { CSSProperties } from "react";

import LandingAuthAction from "@/components/system/primitives/actions/auth/LandingAuthAction";
import MailIcon from "@/components/system/primitives/icons/communication/MailIcon";
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

/* ------------------------------
   Styles
-------------------------------- */
const MAIL_MARK_STYLE: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    transform: "translateX(-0.13rem)",
};

/* ------------------------------
   Component
-------------------------------- */
export default function LandingEmailAction() {
    return (
        <LandingAuthAction
            tone="gradient"
            leading={
                <span style={MAIL_MARK_STYLE}>
                    <MailIcon />
                </span>
            }
            trailing={<ChevronRightIcon />}
            aria-label="Create account with email"
        >
            Create account with email
        </LandingAuthAction>
    );
}