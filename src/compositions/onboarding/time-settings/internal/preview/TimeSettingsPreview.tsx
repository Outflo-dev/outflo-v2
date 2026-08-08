/* ==========================================================
   OUTFLO — TIME SETTINGS PREVIEW
   File: src/compositions/onboarding/time-settings/internal/preview/TimeSettingsPreview.tsx
   Scope: Render the static Time presentation preview
   Last Updated:
   - date: 2026-08-08
   - note: establish the Step 5 preview before settings behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import styles from "./TimeSettingsPreview.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function TimeSettingsPreview() {
    return (
        <div className={styles.card}>
            <p className={styles.label}>
                Preview
            </p>

            <div className={styles.time}>
                5:12
                <span className={styles.meridiem}>
                    PM
                </span>
            </div>

            <p className={styles.date}>
                Saturday, August 8
            </p>

            <p className={styles.zone}>
                America/New_York
            </p>
        </div>
    );
}
