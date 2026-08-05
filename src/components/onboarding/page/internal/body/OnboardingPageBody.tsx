/* ==========================================================
   OUTFLO — ONBOARDING PAGE BODY
   File: src/components/onboarding/page/internal/body/OnboardingPageBody.tsx
   Scope: Compose the page-specific main content within the onboarding page
   Last Updated:
   - date: 2026-07-29
   - note: consume the explicit body-frame owner beneath the shared onboarding composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import frameStyles from "./module/style/body.frame.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageBodyProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageBody({
    children,
}: OnboardingPageBodyProps) {
    return (
        <div className={frameStyles.frame}>
            {children}
        </div>
    );
}