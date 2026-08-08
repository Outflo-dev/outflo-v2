/* ==========================================================
   OUTFLO — BEGIN ELAPSED PREVIEW
   File: src/compositions/onboarding/begin/internal/preview/BeginElapsedPreview.tsx
   Scope: Render the static elapsed-time preview for Step 6 onboarding
   Last Updated:
   - date: 2026-08-08
   - note: establish the restrained infinity-led elapsed preview
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import styles from "./BeginElapsedPreview.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function BeginElapsedPreview() {
    return (
        <div className={styles.card}>
            <div
                className={styles.infinity}
                aria-hidden="true"
            >
                ∞
            </div>

            <div className={styles.content}>
                <p className={styles.eyebrow}>
                    Elapsed Preview
                </p>

                <p className={styles.primary}>
                    <span className={styles.value}>36</span>
                    <span className={styles.unit}>years</span>
                </p>

                <p className={styles.secondary}>
                    0 months • 17 days
                </p>
            </div>
        </div>
    );
}
