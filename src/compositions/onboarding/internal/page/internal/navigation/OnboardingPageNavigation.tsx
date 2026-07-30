/* ==========================================================
   OUTFLO — ONBOARDING PAGE NAVIGATION
   File: src/compositions/onboarding/internal/page/internal/navigation/OnboardingPageNavigation.tsx
   Scope: Compose navigation within the onboarding page surface
   Last Updated:
   - date: 2026-07-29
   - note: combine explicit attachment, layer, and frame owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import attachmentStyles from "./module/style/navigation.attachment.module.css";
import frameStyles from "./module/style/navigation.frame.module.css";
import layerStyles from "./module/style/navigation.layer.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageNavigationProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageNavigation({
    children,
}: OnboardingPageNavigationProps) {
    return (
        <div
            className={`
                ${attachmentStyles.attachment}
                ${layerStyles.layer}
                ${frameStyles.frame}
            `}
        >
            {children}
        </div>
    );
}