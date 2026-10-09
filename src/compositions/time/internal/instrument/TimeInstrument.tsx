"use client";

/* ==========================================================
   OUTFLO — TIME INSTRUMENT
   File: src/compositions/time/internal/instrument/TimeInstrument.tsx
   Scope: Project canonical Guide Begin through the live Time entrance
   Last Updated:
   - date: 2026-10-08
   - note: compose stacked Outflōseconds and Begin entrance action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useEffect,
    useState,
} from "react";

import Link from "next/link";

import ArrowIcon from "@/components/system/primitives/icons/navigation/ArrowIcon";

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
            ? null
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

    const digits =
        value === null
            ? []
            : Array.from(value);

    return (
        <div className={styles.frame}>
            <div className={styles.instrument}>
                <div className={styles.ring} />

                <div className={styles.readout}>
                    {value === null ? (
                        <span className={styles.value}>
                            —
                        </span>
                    ) : (
                        <div
                            className={styles.digitGrid}
                            role="text"
                            aria-label={`${value} Outflōseconds ${caption.toLowerCase()}`}
                        >
                            {digits.map((digit, index) => (
                                <span
                                    key={index}
                                    className={
                                        index >= digits.length - 6
                                            ? `${styles.digit} ${styles.digitActive}`
                                            : styles.digit
                                    }
                                    aria-hidden="true"
                                >
                                    {digit}
                                </span>
                            ))}
                        </div>
                    )}

                    <span className={styles.unit}>
                        Outflōseconds
                    </span>
                </div>
            </div>

            <span className={styles.caption}>
                {caption}
            </span>

            <Link
                href="/coming-soon"
                className={styles.enter}
                aria-label="Enter Begin"
            >
                <span className={styles.enterCircle}>
                    <ArrowIcon
                        direction="right"
                        size={20}
                    />
                </span>

                <span className={styles.enterLabel}>
                    Enter
                </span>
            </Link>
        </div>
    );
}
