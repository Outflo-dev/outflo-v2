/* ==========================================================
   OUTFLO — ONBOARDING PRIMARY ACTION
   File: src/components/system/primitives/actions/onboarding/OnboardingPrimaryAction.tsx
   Scope: Render the canonical primary forward action across onboarding
   Last Updated:
   - date: 2026-07-25
   - note: close the shared action recipe and support native interaction states
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

import styles from "./OnboardingPrimaryAction.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPrimaryActionProps = {
    children: ReactNode;
} & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "style" | "className"
>;

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPrimaryAction({
    children,
    type = "button",
    ...buttonProps
}: OnboardingPrimaryActionProps) {
    return (
        <button
            {...buttonProps}
            type={type}
            className={styles.action}
        >
            {children}
        </button>
    );
}
