"use client";

/* ==========================================================
   OUTFLO — VOLATILE ACCESS STATE
   File: src/runtime/onboarding/access/state/volatile/VolatileAccessState.tsx
   Scope: Own volatile Access state across Access route transitions
   Last Updated:
   - date: 2026-08-18
   - note: establish verification email ownership for Create Account and Verify Email
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

type VolatileAccessState = {
    verificationEmail: string | null;

    setVerificationEmail: (
        email: string | null,
    ) => void;
};

type VolatileAccessStateProviderProps = {
    children: ReactNode;
};

/* ------------------------------
   Context
-------------------------------- */

const VolatileAccessStateContext =
    createContext<VolatileAccessState | null>(
        null,
    );

/* ------------------------------
   Provider
-------------------------------- */

export function VolatileAccessStateProvider({
    children,
}: VolatileAccessStateProviderProps) {
    const [
        verificationEmail,
        setVerificationEmail,
    ] = useState<string | null>(null);

    const value = useMemo(
        () => ({
            verificationEmail,
            setVerificationEmail,
        }),
        [
            verificationEmail,
        ],
    );

    return (
        <VolatileAccessStateContext.Provider
            value={value}
        >
            {children}
        </VolatileAccessStateContext.Provider>
    );
}

/* ------------------------------
   Consumer
-------------------------------- */

export function useVolatileAccessState() {
    const state = useContext(
        VolatileAccessStateContext,
    );

    if (state === null) {
        throw new Error(
            "useVolatileAccessState must be used within VolatileAccessStateProvider.",
        );
    }

    return state;
}
