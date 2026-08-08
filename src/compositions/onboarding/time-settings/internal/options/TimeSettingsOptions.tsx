/* ==========================================================
   OUTFLO — TIME SETTINGS OPTIONS
   File: src/compositions/onboarding/time-settings/internal/options/TimeSettingsOptions.tsx
   Scope: Render the static Time presentation choices
   Last Updated:
   - date: 2026-08-08
   - note: establish the closed Step 5 settings rows before selector behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

import styles from "./TimeSettingsOptions.module.css";

/* ------------------------------
   Records
-------------------------------- */
const options = [
    {
        label: "Time zone",
        value: "America/New_York",
    },
    {
        label: "Time format",
        value: "12-hour",
    },
    {
        label: "Date format",
        value: "MM/DD/YYYY",
    },
    {
        label: "Week starts",
        value: "Sunday",
    },
] as const;

/* ------------------------------
   Component
-------------------------------- */
export default function TimeSettingsOptions() {
    return (
        <div className={styles.stack}>
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
