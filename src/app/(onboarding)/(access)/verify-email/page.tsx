/* ==========================================================
   OUTFLO — VERIFY EMAIL PAGE
   File: src/app/(onboarding)/(access)/verify-email/page.tsx
   Scope: Expose the Verify Email Access composition
   Last Updated:
   - date: 2026-08-19
   - note: align Verify Email route ownership with the Access route family
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    VerifyEmailComposition,
} from "@/compositions/onboarding/access/verify-email/VerifyEmailCompositionIndex";

/* ------------------------------
   Page
-------------------------------- */

export default function VerifyEmailPage() {
    return <VerifyEmailComposition />;
}
