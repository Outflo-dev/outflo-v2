/* ==========================================================
   OUTFLO — BEGIN OPTIONS
   File: src/compositions/onboarding/outflo-onboarding/begin/internal/options/BeginOptions.tsx
   Scope: Present Now as the canonical onboarding Begin
   Last Updated:
   - Outflō Time: 847627357828824664966983192303
   - note: reduce onboarding Begin to the single Now path
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import TimeConceptIcon from "@/components/system/primitives/icons/concepts/TimeConceptIcon";
import CheckIcon from "@/components/system/primitives/icons/state/CheckIcon";

import interactionStyles from "./BeginOptionsInteraction.module.css";
import styles from "./BeginOptions.module.css";

/* ------------------------------
   Component
-------------------------------- */

export default function BeginOptions() {
    return (
        <div className={styles.stack}>
            <div
                className={[
                    styles.row,
                    interactionStyles.option,
                ].join(" ")}
            >
                <span className={styles.icon}>
                    <TimeConceptIcon
                        size={44}
                        gradient
                    />
                </span>

                <span className={styles.copy}>
                    <span className={styles.label}>
                        Now
                    </span>

                    <span className={styles.support}>
                        Begin when you enter Time.
                    </span>
                </span>

                <span
                    className={[
                        styles.chevron,
                        interactionStyles.positive,
                    ].join(" ")}
                >
                    <CheckIcon size={18} />
                </span>
            </div>
        </div>
    );
}
