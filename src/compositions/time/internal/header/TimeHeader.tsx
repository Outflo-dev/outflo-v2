/* ==========================================================
   OUTFLO — TIME HEADER
   File: src/compositions/time/internal/header/TimeHeader.tsx
   Scope: Compose Outflō identity and TIME designation
   Last Updated:
   - date: 2026-10-09
   - note: establish isolated TIME header presentation
   ========================================================== */

import OutfloWordmark from "@/components/system/primitives/marks/outflo/OutfloWordmark";

import styles from "./TimeHeader.module.css";

export default function TimeHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.wordmark}>
                <OutfloWordmark />
            </div>

            <span className={styles.designation}>
                TIME
            </span>
        </header>
    );
}
