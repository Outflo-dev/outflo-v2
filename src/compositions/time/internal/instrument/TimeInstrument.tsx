"use client";

/* ==========================================================
   OUTFLO — TIME INSTRUMENT
   File: src/compositions/time/internal/instrument/TimeInstrument.tsx
   Scope: Project one Begin against live observed Now
   Last Updated:
   - date: 2026-08-19
   - note: replace the static Time scaffold with the first live Begin projection
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useLiveNowUnixMs,
} from "@/runtime/begin/time/live/useLiveNowUnixMs";

import {
    resolveBeginTemporalRelationship,
} from "@/runtime/begin/time/relationship/resolveBeginTemporalRelationship";

import styles from "./TimeInstrument.module.css";

/* ------------------------------
   Types
-------------------------------- */

type TimeInstrumentProps = {
    beginUnixMs?: number | null;
};

/* ------------------------------
   Component
-------------------------------- */

export default function TimeInstrument({
    beginUnixMs,
}: TimeInstrumentProps) {
    const nowUnixMs =
        useLiveNowUnixMs();

    const relationship =
        beginUnixMs !== null &&
        beginUnixMs !== undefined &&
        nowUnixMs !== null
            ? resolveBeginTemporalRelationship({
                  beginUnixMs,
                  nowUnixMs,
              })
            : null;

    const seconds =
        relationship === null
            ? null
            : Math.floor(
                  relationship.distanceMs / 1000,
              );

    const caption =
        relationship === null
            ? "Begin"
            : relationship.position === "before"
              ? "Until Begin"
              : relationship.position === "after"
                ? "Since Begin"
                : "Begin";

    return (
        <div className={styles.frame}>
            <div className={styles.instrument}>
                <div className={styles.ring} />

                <div className={styles.readout}>
                    <span className={styles.value}>
                        {seconds ?? "—"}
                    </span>

                    <span className={styles.unit}>
                        Seconds
                    </span>
                </div>
            </div>

            <span className={styles.caption}>
                {caption}
            </span>
        </div>
    );
}
