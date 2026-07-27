/* ==========================================================
   OUTFLO — TEXT INPUT FIELD
   File: src/components/system/primitives/fields/text/TextInputField.tsx
   Scope: Own the canonical labeled single-line text-input construction
   Last Updated:
   - date: 2026-07-25
   - note: close the shared field recipe and support native interaction states
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    InputHTMLAttributes,
} from "react";

import styles from "./TextInputField.module.css";

/* ------------------------------
   Types
-------------------------------- */
type TextInputFieldProps = {
    id: string;
    label: string;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "style" | "className"
>;

/* ------------------------------
   Component
-------------------------------- */
export default function TextInputField({
    id,
    label,
    type = "text",
    ...inputProps
}: TextInputFieldProps) {
    return (
        <div className={styles.field}>
            <label
                htmlFor={id}
                className={styles.label}
            >
                {label}
            </label>

            <input
                {...inputProps}
                id={id}
                type={type}
                className={styles.input}
            />
        </div>
    );
}
