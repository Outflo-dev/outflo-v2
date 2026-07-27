/* ==========================================================
   OUTFLO — TEXT INPUT FIELD
   File: src/components/system/primitives/fields/text/TextInputField.tsx
   Scope: Own the canonical labeled single-line text-input construction
   Last Updated:
   - date: 2026-07-26
   - note: support canonical leading identity and trailing control slots
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    InputHTMLAttributes,
    ReactNode,
} from "react";

import styles from "./TextInputField.module.css";

/* ------------------------------
   Types
-------------------------------- */
type TextInputFieldProps = {
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
export default function TextInputField({
    id,
    label,
    leading,
    trailing,
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