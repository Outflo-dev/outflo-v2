"use client";

/* ==========================================================
   OUTFLO — TIME INSTRUMENT
   File: src/compositions/time/internal/instrument/TimeInstrument.tsx
   Scope: Compose one live relationship through TIME presentation
   Last Updated:
   - date: 2026-10-09
   - note: separate observation from orb, identity, canonical readout, and entry
   ========================================================== */

import TimeOrb from "./orb/TimeOrb";

import {
    useLiveTimeRelationship,
} from "./live/useLiveTimeRelationship";

import TimeBeginIdentity from "../identity/TimeBeginIdentity";
import TimeCanonicalReadout from "../canonical/TimeCanonicalReadout";
import TimeEnterAction from "../enter/TimeEnterAction";

import styles from "./TimeInstrument.module.css";

type TimeInstrumentProps = {
    beginInstant: string | null;
};

export default function TimeInstrument({
    beginInstant,
}: TimeInstrumentProps) {
    const live =
        useLiveTimeRelationship(beginInstant);

    return (
        <div className={styles.frame}>
            <TimeOrb
                systemTime={live?.systemTime ?? null}
                position={live?.position ?? null}
            />

            <TimeBeginIdentity />

            <TimeCanonicalReadout
                canonicalDuration={
                    live?.canonicalDuration ?? null
                }
            />

            <TimeEnterAction />
        </div>
    );
}
