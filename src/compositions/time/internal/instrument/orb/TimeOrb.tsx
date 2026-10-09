/* ==========================================================
   OUTFLO — TIME ORB
   File: src/compositions/time/internal/instrument/orb/TimeOrb.tsx
   Scope: Present resolved SYSTEM Time inside the TIME orb
   Last Updated:
   - date: 2026-10-09
   - note: establish isolated human-scale temporal instrument
   ========================================================== */

import type {
    SystemTimeV1Duration,
} from "@/machine/resolution/si/resolveTemporalDurationToSystemTimeV1";

import styles from "./TimeOrb.module.css";

type TimeOrbProps = {
    systemTime: SystemTimeV1Duration | null;
    position: "before" | "at" | "after" | null;
};

export default function TimeOrb({
    systemTime,
    position,
}: TimeOrbProps) {
    const primary =
        systemTime === null
            ? "—"
            : systemTime.years > 0n
              ? systemTime.years.toString()
              : systemTime.days.toString();

    const primaryUnit =
        systemTime !== null && systemTime.years > 0n
            ? "YEARS"
            : "DAYS";

    const caption =
        position === "before"
            ? "UNTIL YOUR BEGIN"
            : position === "after"
              ? "SINCE YOUR BEGIN"
              : "YOUR BEGIN";

    const details = [
        {
            label: "HOURS",
            value: systemTime?.hours,
        },
        {
            label: "MINUTES",
            value: systemTime?.minutes,
        },
        {
            label: "SECONDS",
            value: systemTime?.seconds,
        },
    ];

    return (
        <section
            className={styles.orb}
            aria-label="Elapsed Outflō Time"
        >
            <div
                className={styles.ring}
                aria-hidden="true"
            />

            <div
                className={styles.marker}
                aria-hidden="true"
            />

            <div className={styles.content}>
                <span className={styles.caption}>
                    {caption}
                </span>

                <div className={styles.primary}>
                    <span className={styles.primaryValue}>
                        {primary}
                    </span>

                    <span className={styles.primaryUnit}>
                        {primaryUnit}
                    </span>
                </div>

                <div className={styles.details}>
                    {details.map((detail) => (
                        <div
                            className={styles.detail}
                            key={detail.label}
                        >
                            <span className={styles.detailValue}>
                                {detail.value === undefined
                                    ? "—"
                                    : detail.value
                                          .toString()
                                          .padStart(2, "0")}
                            </span>

                            <span className={styles.detailLabel}>
                                {detail.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
