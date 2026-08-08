/* ==========================================================
   OUTFLO — MAKE YOURS PREVIEW
   File: src/compositions/onboarding/make-yours/internal/preview/MakeYoursPreview.tsx
   Scope: Render the static Step 4 appearance preview
   Last Updated:
   - date: 2026-08-08
   - note: establish the preview card before language and theme behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import styles from "./MakeYoursPreview.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function MakeYoursPreview() {
    return (
        <div className={styles.card}>
            <p className={styles.label}>
                Preview
            </p>

            <div className={styles.orbit}>
                <div className={styles.orbitInner} />
                <span className={styles.orbitDot} />
            </div>

            <p className={styles.tagline}>
                Your life,{" "}
                <span>in time.</span>
            </p>

            <div
                className={styles.dots}
                aria-hidden="true"
            >
                <span className={styles.activeDot} />
                <span />
                <span />
                <span />
            </div>
        </div>
    );
}
