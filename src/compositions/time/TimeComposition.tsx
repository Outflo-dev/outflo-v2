/* ==========================================================
   OUTFLO — TIME COMPOSITION
   File: src/compositions/time/TimeComposition.tsx
   Scope: Compose the immutable Outflō Begin TIME entrance
   Last Updated:
   - date: 2026-10-09
   - note: assemble header and live temporal instrument
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
            <TimeHeader />

            <TimeInstrument
                beginInstant={beginInstant}
            />
        </main>
    );
}
