/* ==========================================================
   OUTFLO — TIME COMPOSITION
   File: src/compositions/time/TimeComposition.tsx
   Scope: Compose the immutable Outflō Begin TIME entrance
   Last Updated:
   - date: 2026-10-09
   - note: separate product identity from temporal stage
   ========================================================== */

import TimeHeader from "@/compositions/time/internal/header/TimeHeader";

import TimeInstrument from "@/compositions/time/internal/instrument/TimeInstrument";

import styles from "@/compositions/time/internal/layout/TimeLayout.module.css";

type TimeCompositionProps = {
    beginInstant: string | null;
};

export default function TimeComposition({
    beginInstant,
}: TimeCompositionProps) {
    return (
        <main className={styles.surface}>
            <div className={styles.header}>
                <TimeHeader />
            </div>

            <div className={styles.stage}>
                <TimeInstrument
                    beginInstant={beginInstant}
                />
            </div>
        </main>
    );
}
