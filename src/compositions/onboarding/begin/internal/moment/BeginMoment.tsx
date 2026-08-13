/* ==========================================================
   OUTFLO — BEGIN MOMENT
   File: src/compositions/onboarding/begin/internal/moment/BeginMoment.tsx
   Scope: Render the Time orbit mark for the Begin experience
   Last Updated:
   - date: 2026-08-12
   - note: reduce Begin moment presentation to the canonical orbit mark
   ========================================================== */

import styles from "./BeginMoment.module.css";

export default function BeginMoment() {
    return (
        <div
            className={styles.orbit}
            aria-hidden="true"
        >
            <div className={styles.orbitInner} />
            <span className={styles.orbitDot} />
        </div>
    );
}
