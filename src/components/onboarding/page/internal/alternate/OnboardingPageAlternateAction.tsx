/* ==========================================================
   OUTFLO — ONBOARDING PAGE ALTERNATE ACTION
   File: src/components/onboarding/page/internal/alternate/OnboardingPageAlternateAction.tsx
   Scope: Render the canonical alternate action within an onboarding page
   Last Updated:
   - date: 2026-08-05
   - note: stack the alternate action directly beneath its supporting prompt
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import controlStyles from "./module/construction/alternate.action.control.module.css";
import stackStyles from "./module/construction/alternate.action.stack.module.css";

import focusStyles from "./module/style/alternate.action.focus.module.css";
import paintStyles from "./module/style/alternate.action.paint.module.css";
import typeStyles from "./module/style/alternate.action.type.module.css";
import frameStyles from "./module/style/alternate.frame.module.css";
import promptStyles from "./module/style/alternate.prompt.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageAlternateActionProps = {
    prompt: string;
    actionLabel: string;
    onAction: () => void;
    disabled?: boolean;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageAlternateAction({
    prompt,
    actionLabel,
    onAction,
    disabled = false,
}: OnboardingPageAlternateActionProps) {
    return (
        <div className={frameStyles.frame}>
            <div className={stackStyles.stack}>
                <p className={promptStyles.prompt}>
                    {prompt}
                </p>

                <button
                    type="button"
                    className={`
                        ${controlStyles.control}
                        ${paintStyles.paint}
                        ${typeStyles.type}
                        ${focusStyles.focus}
                    `}
                    disabled={disabled}
                    onClick={onAction}
                >
                    {actionLabel}
                </button>
            </div>
        </div>
    );
}