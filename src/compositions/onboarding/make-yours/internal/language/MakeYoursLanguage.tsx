/* ==========================================================
   OUTFLO — MAKE YOURS LANGUAGE
   File: src/compositions/onboarding/make-yours/internal/language/MakeYoursLanguage.tsx
   Scope: Render the closed Language selection row within Make Outflō Yours
   Last Updated:
   - date: 2026-08-08
   - note: establish the static Language surface before selector behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    ArrowIcon,
} from "@/compositions/onboarding/internal/icons";

import MakeYoursLanguageIcon from "@/compositions/onboarding/make-yours/internal/icons/MakeYoursLanguageIcon";

import styles from "@/compositions/onboarding/make-yours/internal/language/module/construction/language.frame.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function MakeYoursLanguage() {
    return (
        <div className={styles.frame}>
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
    );
}
