/* ==========================================================
   OUTFLO — TIME COMPOSITION
   File: src/compositions/time/TimeComposition.tsx
   Scope: Compose the first visible canonical Begin surface
   Last Updated:
   - date: 2026-09-25
   - note: project persisted canonical Guide Begin through the live Time instrument
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import TimeInstrument from "@/compositions/time/internal/instrument/TimeInstrument";

import styles from "@/compositions/time/internal/layout/TimeLayout.module.css";

/* ------------------------------
   Types
-------------------------------- */

type TimeCompositionProps = {
    beginInstant: string | null;
};

/* ------------------------------
   Component
-------------------------------- */

export default function TimeComposition({
    beginInstant,
}: TimeCompositionProps) {
    return (
        <main className={styles.surface}>
            <TimeInstrument
                beginInstant={beginInstant}
            />
        </main>
    );
}
