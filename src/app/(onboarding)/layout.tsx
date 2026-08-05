/* ==========================================================
   OUTFLO — ONBOARDING LAYOUT
   File: src/app/(onboarding)/layout.tsx
   Scope: Own viewport participation for onboarding routes
   Last Updated:
   - date: 2026-08-04
   - note: keep onboarding stationary without changing Landing behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    CSSProperties,
    ReactNode,
} from "react";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingLayoutProps = {
    children: ReactNode;
};

/* ------------------------------
   Styles
-------------------------------- */
const LAYOUT_STYLE: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",

    width: "100%",
    minHeight: 0,

    overflow: "hidden",
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingLayout({
    children,
}: OnboardingLayoutProps) {
    return (
        <div style={LAYOUT_STYLE}>
            {children}
        </div>
    );
}