/* ==========================================================
   OUTFLO — TIME HEADER
   File: src/compositions/time/internal/header/TimeHeader.tsx
   Scope: Present the TIME-specific Outflō header
   ========================================================== */

import styles from "./TimeHeader.module.css";

export default function TimeHeader() {
    return (
        <header className={styles.header}>
            <span className={styles.wordmark}>
                OUTFLŌ
            </span>

            <span className={styles.designation}>
                TIME
            </span>
        </header>
    );
}
