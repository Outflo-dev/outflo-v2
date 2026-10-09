/* ==========================================================
   OUTFLO — TIME CANONICAL READOUT
   File: src/compositions/time/internal/canonical/TimeCanonicalReadout.tsx
   Scope: Present complete canonical Outflōseconds
   Last Updated:
   - date: 2026-10-09
   - note: compose canonical band above winding duration
   ========================================================== */

import styles from "./TimeCanonicalReadout.module.css";

type TimeCanonicalReadoutProps = {
    canonicalDuration: string | null;
};

export default function TimeCanonicalReadout({
    canonicalDuration,
}: TimeCanonicalReadoutProps) {
    const groups =
        canonicalDuration === null
            ? ["—"]
            : canonicalDuration
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  .split(" ");

    return (
        <section
            className={styles.canonical}
            aria-label="Canonical Outflōseconds"
        >
            <div className={styles.heading}>
                <span className={styles.unit}>
                    OUTFLŌSECONDS
                </span>
            </div>

            <div
                className={styles.value}
                role="text"
                aria-label={
                    canonicalDuration === null
                        ? "Time is loading"
                        : `${canonicalDuration} Outflōseconds`
                }
            >
                {groups.map((group, index) => (
                    <span
                        className={styles.group}
                        key={index}
                        aria-hidden="true"
                    >
                        {group}
                    </span>
                ))}
            </div>
        </section>
    );
}
