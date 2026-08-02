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
import textInvalid from "@/compositions/onboarding/internal/forms/fields/text/module/behavior/text.invalid.module.css";
import textPlaceholder from "@/compositions/onboarding/internal/forms/fields/text/module/style/text.placeholder.module.css";
import textInput from "@/compositions/onboarding/internal/forms/fields/text/module/style/text.input.module.css";
import textField from "@/compositions/onboarding/internal/forms/fields/text/module/construction/text.field.module.css";
import textLabel from "@/compositions/onboarding/internal/forms/fields/text/module/construction/text.label.module.css";
import textLabelStyle from "@/compositions/onboarding/internal/forms/fields/text/module/style/text.label.module.css";
import textControl from "@/compositions/onboarding/internal/forms/fields/text/module/construction/text.control.module.css";
import textInputConstruction from "@/compositions/onboarding/internal/forms/fields/text/module/construction/text.input.module.css";
import textSlotSpacing from "@/compositions/onboarding/internal/forms/fields/text/module/construction/text.slot-spacing.module.css";
import textSlot from "@/compositions/onboarding/internal/forms/fields/text/module/construction/text.slot.module.css";
import textSlotStyle from "@/compositions/onboarding/internal/forms/fields/text/module/style/text.slot.module.css";
import textSlotInteraction from "@/compositions/onboarding/internal/forms/fields/text/module/behavior/text.slot-interaction.module.css";

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
        <div
            className={[
                textField.field,
            ].join(" ")}
        >
            <label
                htmlFor={id}
                className={[
                    textLabel.label,
                    textLabelStyle.label,
                ].join(" ")}
            >
                {label}
            </label>

            <div
                className={[
                    textControl.control,
                ].join(" ")}
            >
                {leading ? (
                    <span
                        className={[
                            textSlot.leading,
                            textSlotSpacing.leading,
                            textSlotStyle.leading,
                            textSlotInteraction.leading,
                        ].join(" ")}
                    >
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
                        textInvalid.input,
                        textPlaceholder.input,
                        textInput.input,
                        textInputConstruction.input,
                        textSlotSpacing.input,
                    ].join(" ")}
                />

                {trailing ? (
                    <span
                        className={[
                            textSlot.trailing,
                            textSlotSpacing.trailing,
                            textSlotStyle.trailing,
                            textSlotInteraction.trailing,
                        ].join(" ")}
                    >
                        {trailing}
                    </span>
                ) : null}
            </div>
        </div>
    );
}