/* ==========================================================
   OUTFLO — ONBOARDING TEXT INPUT FIELD
   File: src/compositions/onboarding/internal/forms/fields/text/OnboardingTextInputField.tsx
   Scope: Own the canonical labeled text-entry construction for onboarding
   Last Updated:
   - date: 2026-07-30
   - note: compose the shared onboarding control-surface box onto the native input
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    InputHTMLAttributes,
    ReactNode,
} from "react";

import surfaceBox from "@/compositions/onboarding/internal/controls/surface/module/construction/surface.box.module.css";
import surfaceFrame from "@/compositions/onboarding/internal/controls/surface/module/construction/surface.frame.module.css";
import surfaceDisabled from "@/compositions/onboarding/internal/controls/surface/module/behavior/surface.disabled.module.css";
import surfaceFocus from "@/compositions/onboarding/internal/controls/surface/module/behavior/surface.focus.module.css";
import surfacePaint from "@/compositions/onboarding/internal/controls/surface/module/style/surface.paint.module.css";

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
                    className={[
                        surfaceBox.surface,
                        surfaceFrame.surface,
                        surfaceDisabled.surface,
                        surfaceFocus.surface,
                        surfacePaint.surface,
                        styles.input,
                    ].join(" ")}
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