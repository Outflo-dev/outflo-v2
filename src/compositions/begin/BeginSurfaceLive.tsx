"use client";

/* ==========================================================
   OUTFLO — FIRST BEGIN LIVE COMPOSITION
   Scope: Connect live Machine relationship to Begin surface
   ========================================================== */

import {
    useLiveTimeRelationship,
} from "../time/internal/instrument/live/useLiveTimeRelationship";

import BeginSurface from "./BeginSurface";

type BeginSurfaceLiveProps = {
    beginInstant: string | null;
    proofCount: number | null;
};

export default function BeginSurfaceLive({
    beginInstant,
    proofCount,
}: BeginSurfaceLiveProps) {
    const live =
        useLiveTimeRelationship(beginInstant);

    return (
        <BeginSurface
            proofCount={proofCount}
            canonicalDuration={
                live?.canonicalDuration ?? null
            }
        />
    );
}
