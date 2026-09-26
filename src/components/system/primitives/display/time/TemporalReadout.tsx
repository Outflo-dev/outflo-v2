/* ==========================================================
   OUTFLO — TEMPORAL READOUT
   File: src/components/system/primitives/display/time/TemporalReadout.tsx
   Scope: Render a canonical fixed-posture temporal value
   ========================================================== */

import styles from "./TemporalReadout.module.css";

type TemporalReadoutProps = {
    value: string;
    minimumDigits?: number;
};

export default function TemporalReadout({
    value,
    minimumDigits = 19,
}: TemporalReadoutProps) {
    const formattedValue =
        value.padStart(minimumDigits, "0");

    return (
        <span className={styles.value}>
            {formattedValue}
        </span>
    );
}
