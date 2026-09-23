/* ==========================================================
   OUTFLO — OUTFLO ONBOARDING LAYOUT
   File: src/app/(onboarding)/(outflo-onboarding)/layout.tsx
   Scope: Apply volatile Outflō onboarding state across active onboarding routes
   Last Updated:
   - date: 2026-08-19
   - note: establish narrow runtime participation for Guide Name and Begin
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import type {
    ReactNode,
} from "react";

import {
    VolatileOnboardingStateProvider,
} from "@/runtime/onboarding/state/volatile/VolatileOnboardingState";

/* ------------------------------
   Types
-------------------------------- */

type OutfloOnboardingLayoutProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */

export default function OutfloOnboardingLayout({
    children,
}: OutfloOnboardingLayoutProps) {
    return (
        <VolatileOnboardingStateProvider>
            {children}
        </VolatileOnboardingStateProvider>
    );
}
