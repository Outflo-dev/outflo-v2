/* ==========================================================
   OUTFLO — ONBOARDING CARD
   File: src/components/system/primitives/cards/onboarding/OnboardingCard.tsx
   Scope: Own the shared foreground card construction used across onboarding
   Last Updated:
   - date: 2026-07-26
   - note: close the canonical card recipe consumed by the propagated onboarding page
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import styles from "./OnboardingCard.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingCardProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingCard({
    children,
}: OnboardingCardProps) {
    return (
        <div className={styles.card}>
            {children}
        </div>
    );
}
