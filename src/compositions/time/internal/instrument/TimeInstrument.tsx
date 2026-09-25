"use client";

/* ==========================================================
   OUTFLO — TIME INSTRUMENT
   File: src/compositions/time/internal/instrument/TimeInstrument.tsx
   Scope: Project one canonical Guide Begin against live observed Now
   Last Updated:
   - date: 2026-09-25
   - note: wire persisted Guide Begin directly to the canonical Outflō Clock
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useEffect,
    useState,
} from "react";

import {
    parseTemporalInstant128,
} from "@/machine/clock/serialization/parseTemporalInstant128";

import {
    serializeTemporalDuration128,
} from "@/machine/clock/serialization/serializeTemporalDuration128";

import {
    resolveBeginTemporalRelationship,
} from "@/runtime/begin/relationship/resolveBeginTemporalRelationship";

import {
    readCurrentTemporalInstant128,
} from "@/runtime/clock/now/readCurrentTemporalInstant128";

import type {
    TemporalInstant128,
} from "@/machine/clock/instant/TemporalInstant128";

import styles from "./TimeInstrument.module.css";

/* ------------------------------
   Types
-------------------------------- */

type TimeInstrumentProps = {
    beginInstant?: string | null;
};

/* ------------------------------
   Component
-------------------------------- */

export default function TimeInstrument({
    beginInstant,
}: TimeInstrumentProps) {
    const [observedInstant, setObservedInstant] =
        useState<TemporalInstant128 | null>(null);

    useEffect(() => {
        const observe = () => {
            setObservedInstant(
                readCurrentTemporalInstant128(),
            );
        };

        observe();

        const interval =
            window.setInterval(observe, 50);

        return () => {
            window.clearInterval(interval);
        };
    }, []);

    const parsedBeginInstant =
        beginInstant
            ? parseTemporalInstant128(beginInstant)
            : null;

    const relationship =
        parsedBeginInstant !== null &&
        observedInstant !== null
            ? resolveBeginTemporalRelationship({
                  beginInstant: parsedBeginInstant,
                  observedInstant,
              })
            : null;

    const value =
        relationship === null
            ? "—"
            : serializeTemporalDuration128(
                  relationship.distance,
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
                        {value}
                    </span>

                    <span className={styles.unit}>
                        Nanoseconds
                    </span>
                </div>
            </div>

            <span className={styles.caption}>
                {caption}
            </span>
        </div>
    );
}
