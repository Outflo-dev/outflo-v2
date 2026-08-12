/* ==========================================================
   OUTFLO — ONBOARDING PAGE PROGRESS BAND
   File: src/components/onboarding/page/internal/progress-band/OnboardingPageProgressBand.tsx
   Scope: Attach onboarding progress to the canonical bottom band
   Last Updated:
   - date: 2026-08-12
   - note: separate stable bottom-band participation from progress positioning
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import styles from "./module/style/progress-band.frame.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageProgressBandProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageProgressBand({
    children,
}: OnboardingPageProgressBandProps) {
    return (
        <div className={styles.frame}>
            <div className={styles.position}>
                {children}
            </div>
        </div>
    );
}
