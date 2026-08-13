/* ==========================================================
   OUTFLO — BEGIN OPTIONS
   File: src/compositions/onboarding/begin/internal/options/BeginOptions.tsx
   Scope: Render the two visible Guide Begin choices
   Last Updated:
   - date: 2026-08-12
   - note: reduce Begin to Now and Another date
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

import styles from "./BeginOptions.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function BeginOptions() {
    return (
        <div className={styles.stack}>
            <div className={styles.row}>
                <span className={styles.label}>
                    Now
                </span>

                <span className={styles.chevron}>
                    <ChevronRightIcon size={16} />
                </span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>
                    Another date
                </span>

                <span className={styles.chevron}>
                    <ChevronRightIcon size={16} />
                </span>
            </div>
        </div>
    );
}
