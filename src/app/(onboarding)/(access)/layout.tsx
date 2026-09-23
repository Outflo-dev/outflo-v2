/* ==========================================================
   OUTFLO — ACCESS LAYOUT
   File: src/app/(onboarding)/(access)/layout.tsx
   Scope: Apply volatile Access state across Access routes
   Last Updated:
   - date: 2026-08-18
   - note: establish narrow runtime participation for Create Account, Verify Email, and Sign In
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import type {
    ReactNode,
} from "react";

import {
    VolatileAccessStateProvider,
} from "@/runtime/onboarding/access/state/volatile/VolatileAccessState";

/* ------------------------------
   Types
-------------------------------- */

type AccessLayoutProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */

export default function AccessLayout({
    children,
}: AccessLayoutProps) {
    return (
        <VolatileAccessStateProvider>
            {children}
        </VolatileAccessStateProvider>
    );
}
