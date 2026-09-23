/* ==========================================================
   OUTFLO — TIME COMPOSITION
   File: src/compositions/time/TimeComposition.tsx
   Scope: Compose the first visible Begin Home surface
   Last Updated:
   - date: 2026-08-19
   - note: project the persisted Guide Begin through the live Begin instrument
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";

import TimeInstrument from "@/compositions/time/internal/instrument/TimeInstrument";

import styles from "@/compositions/time/internal/layout/TimeLayout.module.css";

/* ------------------------------
   Types
-------------------------------- */

type TimeCompositionProps = {
    beginUnixMs: number | null;
};

/* ------------------------------
   Component
-------------------------------- */

export default function TimeComposition({
    beginUnixMs,
}: TimeCompositionProps) {
    return (
        <main className={styles.surface}>
            <BackNavigationAction
                href="/begin"
                label="Back to Begin"
            />

            <TimeInstrument
                beginUnixMs={beginUnixMs}
            />
        </main>
    );
}
