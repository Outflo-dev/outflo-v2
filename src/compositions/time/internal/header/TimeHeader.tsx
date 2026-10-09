/* ==========================================================
   OUTFLO — TIME HEADER
   File: src/compositions/time/internal/header/TimeHeader.tsx
   Scope: Present the local Outflō TIME product identity
   ========================================================== */

import styles from "./TimeHeader.module.css";

export default function TimeHeader() {
    return (
        <header className={styles.header}>
            <span className={styles.wordmark}>
                Outflō
            </span>

            <span className={styles.designation}>
                TIME
            </span>
        </header>
    );
}
