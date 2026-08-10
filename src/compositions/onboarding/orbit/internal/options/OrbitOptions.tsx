/* ==========================================================
   OUTFLO — ORBIT OPTIONS
   File: src/compositions/onboarding/orbit/internal/options/OrbitOptions.tsx
   Scope: Render and select the Guide-owned Time Orbit basis
   Last Updated:
   - date: 2026-08-09
   - note: establish Stars, Seasons, and Mother Earth as the three Time Orbit choices
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import styles from "./OrbitOptions.module.css";

/* ------------------------------
   Types
-------------------------------- */
export type OrbitBasis =
    | "sidereal"
    | "tropical"
    | "anomalistic";

type OrbitOptionsProps = {
    value: OrbitBasis | null;
    onChange: (value: OrbitBasis) => void;
};

/* ------------------------------
   Records
-------------------------------- */
const options = [
    {
        value: "sidereal",
        label: "Stars",
        detail: "Sidereal",
    },
    {
        value: "tropical",
        label: "Seasons",
        detail: "Tropical",
    },
    {
        value: "anomalistic",
        label: "Mother Earth",
        detail: "Anomalistic",
    },
] as const satisfies ReadonlyArray<{
    value: OrbitBasis;
    label: string;
    detail: string;
}>;

/* ------------------------------
   Component
-------------------------------- */
export default function OrbitOptions({
    value,
    onChange,
}: OrbitOptionsProps) {
    return (
        <div
            className={styles.stack}
            role="radiogroup"
            aria-label="Choose your Orbit"
        >
            {options.map((option) => {
                const isSelected =
                    value === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className={[
                            styles.option,
                            isSelected
                                ? styles.selected
                                : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        onClick={() => {
                            onChange(option.value);
                        }}
                    >
                        <span className={styles.label}>
                            {option.label}
                        </span>

                        <span className={styles.detail}>
                            {option.detail}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
