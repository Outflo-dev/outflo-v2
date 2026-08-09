/* ==========================================================
   OUTFLO — TIME COMPOSITION
   File: src/compositions/time/TimeComposition.tsx
   Scope: Compose the first visible Time product surface
   Last Updated:
   - date: 2026-08-09
   - note: establish the first browser-proven Time instrument surface
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";

import TimeInstrument from "@/compositions/time/internal/instrument/TimeInstrument";

import styles from "@/compositions/time/internal/layout/TimeLayout.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function TimeComposition() {
    return (
        <main className={styles.surface}>
            <BackNavigationAction
                href="/ready"
                label="Back to Ready"
            />

            <TimeInstrument />
        </main>
    );
}
