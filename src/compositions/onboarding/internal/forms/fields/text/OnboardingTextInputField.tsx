/* ==========================================================
   OUTFLO — ONBOARDING TEXT INPUT FIELD
   File: src/compositions/onboarding/internal/forms/fields/text/OnboardingTextInputField.tsx
   Scope: Own the canonical labeled text-entry construction for onboarding
   Last Updated:
   - date: 2026-07-29
   - note: move the completed text-input field beneath onboarding composition ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    InputHTMLAttributes,
    ReactNode,
} from "react";

import styles from "./OnboardingTextInputField.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingTextInputFieldProps = {
    id: string;
    label: string;
    leading?: ReactNode;
    trailing?: ReactNode;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "style" | "className"
>;

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingTextInputField({
    id,
    label,
    leading,
    trailing,
    type = "text",
    ...inputProps
}: OnboardingTextInputFieldProps) {
    return (
        <div className={styles.field}>
            <label
                htmlFor={id}
                className={styles.label}
            >
                {label}
            </label>

            <div className={styles.control}>
                {leading ? (
                    <span className={styles.leading}>
                        {leading}
                    </span>
                ) : null}

                <input
                    {...inputProps}
                    id={id}
                    type={type}
                    className={styles.input}
                />

                {trailing ? (
                    <span className={styles.trailing}>
                        {trailing}
                    </span>
                ) : null}
            </div>
        </div>
    );
}