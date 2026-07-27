/* ==========================================================
   OUTFLO — ONBOARDING PAGE ICON
   File: src/components/system/primitives/onboarding/page/internal/OnboardingPageIcon.tsx
   Scope: Own the canonical icon zone inside the propagated onboarding page
   Last Updated:
   - date: 2026-07-26
   - note: establish stable icon alignment and theme-bound presentation
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import styles from "./OnboardingPageIcon.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageIconProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageIcon({
    children,
}: OnboardingPageIconProps) {
    return (
        <div className={styles.icon}>
            {children}
        </div>
    );
}
