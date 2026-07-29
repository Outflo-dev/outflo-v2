/* ==========================================================
   OUTFLO — ONBOARDING PAGE ACTION
   File: src/components/system/primitives/onboarding/page/internal/action/OnboardingPageAction.tsx
   Scope: Compose the primary action within the onboarding page
   Last Updated:
   - date: 2026-07-29
   - note: consume the explicit action-frame owner beneath the shared onboarding composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import frameStyles from "./module/style/action.frame.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageActionProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageAction({
    children,
}: OnboardingPageActionProps) {
    return (
        <div className={frameStyles.frame}>
            {children}
        </div>
    );
}