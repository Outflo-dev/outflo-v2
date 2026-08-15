/* ==========================================================
   OUTFLO — BEGIN OPTIONS
   File: src/compositions/onboarding/begin/internal/options/BeginOptions.tsx
   Scope: Render the two visible Guide Begin choices
   Last Updated:
   - date: 2026-08-15
   - note: add canonical Time and calendar icon language to Begin choices
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import CalendarConceptIcon from "@/components/system/primitives/icons/concepts/CalendarConceptIcon";
import TimeConceptIcon from "@/components/system/primitives/icons/concepts/TimeConceptIcon";
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

import styles from "./BeginOptions.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function BeginOptions() {
    return (
        <div className={styles.stack}>
            <div className={styles.row}>
                <span className={styles.icon}>
                    <TimeConceptIcon size={44} gradient />
                </span>

                <span className={styles.copy}>
                    <span className={styles.label}>
                        Now
                    </span>

                    <span className={styles.support}>
                        Start at this moment.
                    </span>
                </span>

                <span className={styles.chevron}>
                    <ChevronRightIcon size={16} />
                </span>
            </div>

            <div className={styles.row}>
                <span className={styles.icon}>
                    <CalendarConceptIcon size={44} gradient />
                </span>

                <span className={styles.copy}>
                    <span className={styles.label}>
                        Another date
                    </span>

                    <span className={styles.support}>
                        Choose a date and time.
                    </span>
                </span>

                <span className={styles.chevron}>
                    <ChevronRightIcon size={16} />
                </span>
            </div>
        </div>
    );
}
