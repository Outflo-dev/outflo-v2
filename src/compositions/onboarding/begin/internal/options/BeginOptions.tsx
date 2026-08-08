/* ==========================================================
   OUTFLO — BEGIN OPTIONS
   File: src/compositions/onboarding/begin/internal/options/BeginOptions.tsx
   Scope: Render the static Begin date, time, and timezone controls
   Last Updated:
   - date: 2026-08-08
   - note: establish Step 6 selector rows before interaction behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

import styles from "./BeginOptions.module.css";

/* ------------------------------
   Records
-------------------------------- */
const options = [
    {
        label: "Date",
        value: "April 26, 1988",
    },
    {
        label: "Time",
        value: "10:42 AM",
    },
    {
        label: "Timezone",
        value: "America/Los_Angeles",
    },
] as const;

/* ------------------------------
   Component
-------------------------------- */
export default function BeginOptions() {
    return (
        <div className={styles.frame}>
            {options.map((option) => (
                <div
                    key={option.label}
                    className={styles.row}
                >
                    <span className={styles.label}>
                        {option.label}
                    </span>

                    <span className={styles.value}>
                        {option.value}
                    </span>

                    <span className={styles.chevron}>
                        <ChevronRightIcon size={16} />
                    </span>
                </div>
            ))}
        </div>
    );
}
