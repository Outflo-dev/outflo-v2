/* ==========================================================
   OUTFLO — BEGIN NOTE
   File: src/compositions/onboarding/begin/internal/note/BeginNote.tsx
   Scope: Render the Step 6 Begin anchor note
   Last Updated:
   - date: 2026-08-08
   - note: use the canonical Time concept icon for Begin anchor guidance
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import TimeConceptIcon from "@/components/system/primitives/icons/concepts/TimeConceptIcon";
import styles from "./BeginNote.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function BeginNote() {
    return (
        <div className={styles.frame}>
            <span
                className={styles.mark}
                aria-hidden="true"
            >
                <TimeConceptIcon size={32} />
            </span>

            <p className={styles.copy}>
                <span>Your Begin anchors Time.</span>
                <span>It becomes fixed when you enter.</span>
            </p>
        </div>
    );
}
