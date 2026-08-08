/* ==========================================================
   OUTFLO — VERIFY EMAIL EXPIRY
   File: src/compositions/onboarding/verify-email/internal/expiry/VerifyEmailExpiry.tsx
   Scope: Render the local verification-code expiry message
   Last Updated:
   - date: 2026-08-07
   - note: separate the remaining duration for explicit expiry emphasis
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import textStyles from "./module/style/expiry.text.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function VerifyEmailExpiry() {
    return (
        <p className={textStyles.text}>
            Code expires in{" "}
            <span>09:45</span>
        </p>
    );
}