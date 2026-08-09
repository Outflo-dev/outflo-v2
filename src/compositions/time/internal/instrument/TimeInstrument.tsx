/* ==========================================================
   OUTFLO — TIME INSTRUMENT
   File: src/compositions/time/internal/instrument/TimeInstrument.tsx
   Scope: Render the primary elapsed-Time instrument
   Last Updated:
   - date: 2026-08-09
   - note: establish the first static product instrument with exact circular geometry
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import styles from "./TimeInstrument.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function TimeInstrument() {
    return (
        <div className={styles.frame}>
            <div className={styles.instrument}>
                <div className={styles.ring} />

                <div className={styles.readout}>
                    <span className={styles.value}>
                        38
                    </span>

                    <span className={styles.unit}>
                        Years
                    </span>

                    <span className={styles.detail}>
                        3 months
                        <span className={styles.separator}>
                            •
                        </span>
                        13 days
                    </span>
                </div>
            </div>

            <span className={styles.caption}>
                Since Begin
            </span>
        </div>
    );
}
