/* ==========================================================
   OUTFLO — VERIFY EMAIL ICON
   File: src/compositions/onboarding/verify-email/internal/icon/VerifyEmailIcon.tsx
   Scope: Place the Email Verification concept icon within Verify Email
   Last Updated:
   - date: 2026-08-03
   - note: own Verify Email icon scale and landing independently from Create Account
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    EmailVerificationConceptIcon,
} from "@/compositions/onboarding/internal/icons";

import {
    VERIFY_EMAIL_ICON_SIZE_PX,
} from "./module/construction/icon.size";

import styles from "./VerifyEmailIcon.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function VerifyEmailIcon() {
    return (
        <div className={styles.frame}>
            <EmailVerificationConceptIcon
                size={VERIFY_EMAIL_ICON_SIZE_PX}
                title="Email verification"
            />
        </div>
    );
}
