/* ==========================================================
   OUTFLO — GUIDE NAME FORM
   File: src/compositions/onboarding/guide-name/internal/form/GuideNameForm.tsx
   Scope: Own the Guide Name display-name field
   Last Updated:
   - date: 2026-08-08
   - note: establish the single display-name field for Step 3 onboarding
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import OnboardingTextInputField from "@/compositions/onboarding/internal/forms/fields/text/OnboardingTextInputField";

import styles from "./GuideNameForm.module.css";

/* ------------------------------
   Constants
-------------------------------- */
export const GUIDE_NAME_FORM_ID =
    "guide-name-form";

/* ------------------------------
   Component
-------------------------------- */
export default function GuideNameForm() {
    return (
        <form
            id={GUIDE_NAME_FORM_ID}
            className={styles.form}
        >
            <OnboardingTextInputField
                id="guide-name-display-name"
                name="displayName"
                label="Display name"
                type="text"
                autoComplete="name"
                placeholder="enter"
            />
        </form>
    );
}