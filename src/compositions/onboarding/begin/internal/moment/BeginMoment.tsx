/* ==========================================================
   OUTFLO — BEGIN MOMENT
   File: src/compositions/onboarding/begin/internal/moment/BeginMoment.tsx
   Scope: Render the selected Begin moment within Step 6 onboarding
   Last Updated:
   - date: 2026-08-08
   - note: resolve the static Begin hero with the selected moment and Time orbit mark
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import styles from "./BeginMoment.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function BeginMoment() {
    return (
        <div className={styles.frame}>
            <p className={styles.eyebrow}>
                Your Begin
            </p>

            <div className={styles.hero}>
                <div className={styles.moment}>
                    <p className={styles.date}>
                        April 26, 1988
                    </p>

                    <p className={styles.time}>
                        10:42 AM
                    </p>

                    <p className={styles.timezone}>
                        America/Los_Angeles
                    </p>
                </div>

                <div
                    className={styles.orbit}
                    aria-hidden="true"
                >
                    <div className={styles.orbitInner} />
                    <span className={styles.orbitDot} />
                </div>
            </div>
        </div>
    );
}
