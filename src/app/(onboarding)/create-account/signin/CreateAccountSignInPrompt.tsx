/* ==========================================================
   OUTFLO — CREATE ACCOUNT SIGN-IN PROMPT
   File: src/app/(onboarding)/create-account/signin/CreateAccountSignInPrompt.tsx
   Scope: Render the local returning-Guide action beneath Create Account
   Last Updated:
   - date: 2026-07-26
   - note: separate local secondary meaning from propagated page geometry
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import styles from "./CreateAccountSignInPrompt.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function CreateAccountSignInPrompt() {
    return (
        <p className={styles.prompt}>
            Already have an account?{" "}

            <button
                type="button"
                className={styles.action}
            >
                Sign in
            </button>
        </p>
    );
}
