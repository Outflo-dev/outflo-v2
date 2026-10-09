/* ==========================================================
   OUTFLO — TIME BEGIN IDENTITY
   File: src/compositions/time/internal/identity/TimeBeginIdentity.tsx
   Scope: Present the immutable Outflō Begin identity
   Last Updated:
   - date: 2026-10-09
   - note: establish truthful identity beneath TIME instrument
   ========================================================== */

import styles from "./TimeBeginIdentity.module.css";

export default function TimeBeginIdentity() {
    return (
        <section
            className={styles.identity}
            aria-label="Outflō Begin identity"
        >
            <h2 className={styles.title}>
                Outflō Begin
            </h2>

            <span className={styles.reference}>
                YOUR ENTRANCE INTO TIME
            </span>
        </section>
    );
}
