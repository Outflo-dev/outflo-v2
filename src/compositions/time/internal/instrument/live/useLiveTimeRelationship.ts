"use client";

/* ==========================================================
   OUTFLO — USE LIVE TIME RELATIONSHIP
   File: src/compositions/time/internal/instrument/live/useLiveTimeRelationship.ts
   Scope: Coordinate one observed Begin relationship for TIME
   Last Updated:
   - date: 2026-10-09
   - note: expose SYSTEM Time and canonical duration from one relationship
   ========================================================== */

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    machine,
} from "@/machine";

import {
    parseTemporalInstant128,
} from "@/machine/clock/serialization/parseTemporalInstant128";

import type {
    TemporalInstant128,
} from "@/machine/clock/instant/TemporalInstant128";

import {
    resolveBeginTemporalRelationship,
} from "@/runtime/begin/relationship/resolveBeginTemporalRelationship";

import {
    readCurrentTemporalInstant128,
} from "@/runtime/clock/now/readCurrentTemporalInstant128";

export function useLiveTimeRelationship(
    beginInstant: string | null,
) {
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

    const parsedBeginInstant = useMemo(
        () =>
            beginInstant === null
                ? null
                : parseTemporalInstant128(beginInstant),
        [beginInstant],
    );

    return useMemo(() => {
        if (
            parsedBeginInstant === null ||
            observedInstant === null
        ) {
            return null;
        }

        const relationship =
            resolveBeginTemporalRelationship({
                beginInstant: parsedBeginInstant,
                observedInstant,
            });

        const systemTime =
            machine.clock.resolveTemporalDurationToSystemTimeV1(
                relationship.distance,
            );

        const canonicalDuration =
            machine.clock.serializeTemporalDuration128(
                relationship.distance,
            );

        return {
            position: relationship.position,
            systemTime,
            canonicalDuration,
        };
    }, [
        parsedBeginInstant,
        observedInstant,
    ]);
}
