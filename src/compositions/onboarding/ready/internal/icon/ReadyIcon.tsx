/* ==========================================================
   OUTFLO — READY ICON
   File: src/compositions/onboarding/ready/internal/icon/ReadyIcon.tsx
   Scope: Render the canonical Time concept icon for onboarding completion
   Last Updated:
   - date: 2026-08-08
   - note: establish the final Time signal for Step 7 onboarding
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import TimeConceptIcon from "@/components/system/primitives/icons/concepts/TimeConceptIcon";

import styles from "./ReadyIcon.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function ReadyIcon() {
    return (
        <div className={styles.frame}>
            <TimeConceptIcon size={64} />
        </div>
    );
}
