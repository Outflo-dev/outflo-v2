/* ==========================================================
   OUTFLO — MAKE YOURS OPTIONS
   File: src/compositions/onboarding/make-yours/internal/options/MakeYoursOptions.tsx
   Scope: Compose the static Language and Theme selection rows
   Last Updated:
   - date: 2026-08-08
   - note: establish the closed Step 4 selector state before menu behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    ArrowIcon,
} from "@/compositions/onboarding/internal/icons";

import MakeYoursLanguageIcon from "@/compositions/onboarding/make-yours/internal/icons/MakeYoursLanguageIcon";
import MakeYoursThemeIcon from "@/compositions/onboarding/make-yours/internal/icons/MakeYoursThemeIcon";

import styles from "./MakeYoursOptions.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function MakeYoursOptions() {
    return (
        <div className={styles.stack}>
            <div className={styles.row}>
                <span className={styles.icon}>
                    <MakeYoursLanguageIcon />
                </span>

                <span className={styles.label}>
                    Language
                </span>

                <span className={styles.value}>
                    English
                </span>

                <ArrowIcon
                    direction="right"
                    size={16}
                />
            </div>

            <div className={styles.row}>
                <span className={styles.icon}>
                    <MakeYoursThemeIcon />
                </span>

                <span className={styles.label}>
                    Theme
                </span>

                <span className={styles.value}>
                    Dark
                </span>

                <ArrowIcon
                    direction="right"
                    size={16}
                />
            </div>
        </div>
    );
}
