/* ==========================================================
   OUTFLO — TERMS TIME INSTRUMENT
   File: src/compositions/legal/terms/internal/time/TermsTimeInstrument.tsx
   Scope: Present the canonical Outflō Time Instant of the current Terms document
   ========================================================== */

import TemporalReadout from "@/components/system/primitives/display/time/TemporalReadout";

import styles from "./TermsTimeInstrument.module.css";

type TermsTimeInstrumentProps = {
    instant: string;
};

export default function TermsTimeInstrument({
    instant,
}: TermsTimeInstrumentProps) {
    return (
        <div className={styles.instrument}>
            <span className={styles.label}>
                Outflō Time
            </span>

            <TemporalReadout value={instant} />

            <span className={styles.unit}>
                Outflōseconds
            </span>
        </div>
    );
}
