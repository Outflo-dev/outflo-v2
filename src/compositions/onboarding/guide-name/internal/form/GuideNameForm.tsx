/* ==========================================================
   OUTFLO — GUIDE NAME FORM
   File: src/compositions/onboarding/guide-name/internal/form/GuideNameForm.tsx
   Scope: Own the Guide Name username field
   Last Updated:
   - date: 2026-08-12
   - note: resolve Guide Name as the required Outflō username choice
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import OnboardingTextInputField from "@/compositions/onboarding/internal/forms/fields/text/OnboardingTextInputField";

import {
    AtIcon,
} from "@/compositions/onboarding/internal/icons";

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
                id="guide-name-username"
                name="username"
                label="Guide Name"
                type="text"
                autoComplete="username"
                placeholder="choose your Guide Name"
                leading={<AtIcon />}
                required
            />
        </form>
    );
}
