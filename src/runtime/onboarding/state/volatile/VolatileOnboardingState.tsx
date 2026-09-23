"use client";

/* ==========================================================
   OUTFLO — VOLATILE ONBOARDING STATE
   File: src/runtime/onboarding/state/volatile/VolatileOnboardingState.tsx
   Scope: Own volatile Outflō onboarding state before Enter Time
   Last Updated:
   - date: 2026-08-19
   - note: own Guide Name and Guide Begin selection before Enter Time
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

import type {
    ReactNode,
} from "react";

/* ------------------------------
   Types
-------------------------------- */

export type GuideBeginSelection =
    | "now"
    | "another-date";

type VolatileOnboardingState = {
    username: string | null;

    guideBeginSelection:
        GuideBeginSelection;

    guideBeginDate: string | null;

    setUsername: (
        username: string | null,
    ) => void;

    setGuideBeginSelection: (
        selection: GuideBeginSelection,
    ) => void;

    setGuideBeginDate: (
        date: string | null,
    ) => void;
};

type VolatileOnboardingStateProviderProps = {
    children: ReactNode;
};

/* ------------------------------
   Context
-------------------------------- */

const VolatileOnboardingStateContext =
    createContext<VolatileOnboardingState | null>(
        null,
    );

/* ------------------------------
   Provider
-------------------------------- */

export function VolatileOnboardingStateProvider({
    children,
}: VolatileOnboardingStateProviderProps) {
    const [
        username,
        setUsername,
    ] = useState<string | null>(null);

    const [
        guideBeginSelection,
        setGuideBeginSelection,
    ] = useState<GuideBeginSelection>(
        "now",
    );

    const [
        guideBeginDate,
        setGuideBeginDate,
    ] = useState<string | null>(null);

    const value = useMemo(
        () => ({
            username,
            guideBeginSelection,
            guideBeginDate,
            setUsername,
            setGuideBeginSelection,
            setGuideBeginDate,
        }),
        [
            username,
            guideBeginSelection,
            guideBeginDate,
        ],
    );

    return (
        <VolatileOnboardingStateContext.Provider
            value={value}
        >
            {children}
        </VolatileOnboardingStateContext.Provider>
    );
}

/* ------------------------------
   Consumer
-------------------------------- */

export function useVolatileOnboardingState() {
    const state = useContext(
        VolatileOnboardingStateContext,
    );

    if (state === null) {
        throw new Error(
            "useVolatileOnboardingState must be used within VolatileOnboardingStateProvider.",
        );
    }

    return state;
}
