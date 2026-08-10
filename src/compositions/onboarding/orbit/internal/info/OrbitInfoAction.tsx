"use client";

/* ==========================================================
   OUTFLO — ORBIT INFO ACTION
   File: src/compositions/onboarding/orbit/internal/info/OrbitInfoAction.tsx
   Scope: Explain the three Time Orbit bases without burdening the primary choice surface
   Last Updated:
   - date: 2026-08-09
   - note: establish a local expandable Orbit explainer
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
    useState,
} from "react";

import styles from "./OrbitInfoAction.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function OrbitInfoAction() {
    const [
        isOpen,
        setIsOpen,
    ] = useState(false);

    return (
        <div className={styles.frame}>
            <button
                type="button"
                className={styles.action}
                aria-expanded={isOpen}
                aria-controls="orbit-info"
                onClick={() => {
                    setIsOpen((current) => !current);
                }}
            >
                <span
                    className={styles.icon}
                    aria-hidden="true"
                >
                    i
                </span>

                <span className={styles.label}>
                    About Orbit
                </span>
            </button>

            {isOpen && (
                <div
                    id="orbit-info"
                    className={styles.explainer}
                >
                    <p className={styles.copy}>
                        Earth&apos;s year can be resolved
                        through different astronomical cycles.
                        Outflō lets you choose the one that
                        shapes your Time Orbit.
                    </p>

                    <p className={styles.support}>
                        You can change your Orbit later.
                    </p>
                </div>
            )}
        </div>
    );
}
