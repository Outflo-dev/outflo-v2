/* ==========================================================
   OUTFLO — ONBOARDING PRIMARY ACTION
   File: src/components/system/primitives/actions/onboarding/OnboardingPrimaryAction.tsx
   Scope: Render the canonical primary forward action across onboarding
   Last Updated:
   - date: 2026-07-26
   - note: add an independent trailing action slot without disturbing centered label ownership
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
    trailing?: ReactNode;
} & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "style" | "className"
>;

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPrimaryAction({
    children,
    trailing,
    type = "button",
    ...buttonProps
}: OnboardingPrimaryActionProps) {
    return (
        <button
            {...buttonProps}
            type={type}
            className={styles.action}
        >
            <span className={styles.label}>
                {children}
            </span>

            {trailing !== undefined && (
                <span
                    className={styles.trailing}
                    aria-hidden="true"
                >
                    {trailing}
                </span>
            )}
        </button>
    );
}