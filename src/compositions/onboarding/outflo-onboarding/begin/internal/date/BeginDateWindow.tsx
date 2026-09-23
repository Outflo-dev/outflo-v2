"use client";

/* ==========================================================
   OUTFLO — BEGIN DATE WINDOW
   File: src/compositions/onboarding/outflo-onboarding/begin/internal/date/BeginDateWindow.tsx
   Scope: Own Guide Begin civil-date entry
   Last Updated:
   - date: 2026-08-19
   - note: connect the native locale-aware date control to volatile Guide Begin date ownership
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useVolatileOnboardingState,
} from "@/runtime/onboarding/state/volatile/VolatileOnboardingState";

import styles from "./BeginDateWindow.module.css";

/* ------------------------------
   Component
-------------------------------- */

export default function BeginDateWindow() {
    const {
        guideBeginDate,
        setGuideBeginDate,
    } = useVolatileOnboardingState();

    return (
        <div className={styles.window}>
            <label
                className={styles.label}
                htmlFor="guide-begin-date"
            >
                Choose a date
            </label>

            <input
                id="guide-begin-date"
                name="guideBeginDate"
                className={styles.input}
                type="date"
                value={guideBeginDate ?? ""}
                onChange={(event) => {
                    setGuideBeginDate(
                        event.target.value || null,
                    );
                }}
            />
        </div>
    );
}
