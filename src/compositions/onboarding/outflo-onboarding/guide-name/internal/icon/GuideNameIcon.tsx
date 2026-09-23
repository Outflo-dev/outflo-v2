/* ==========================================================
   OUTFLO — GUIDE NAME ICON
   File: src/compositions/onboarding/outflo-onboarding/guide-name/internal/icon/GuideNameIcon.tsx
   Scope: Place the Guide Name concept icon within Guide Name
   Last Updated:
   - date: 2026-08-08
   - note: own Guide Name icon scale and landing independently from shared onboarding
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    GuideNameConceptIcon,
} from "@/components/onboarding/OnboardingComponentsIndex";

import {
    GUIDE_NAME_ICON_SIZE_PX,
} from "@/compositions/onboarding/outflo-onboarding/guide-name/internal/icon/module/construction/icon.size";

import styles from "@/compositions/onboarding/outflo-onboarding/guide-name/internal/icon/module/construction/icon.frame.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function GuideNameIcon() {
    return (
        <div className={styles.frame}>
            <GuideNameConceptIcon
                size={GUIDE_NAME_ICON_SIZE_PX}
                title="Guide"
            />
        </div>
    );
}
