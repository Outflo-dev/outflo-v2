"use client";

/* ==========================================================
   OUTFLO — BEGIN OPTIONS
   File: src/compositions/onboarding/outflo-onboarding/begin/internal/options/BeginOptions.tsx
   Scope: Own Guide Begin choice interaction and visible completion indicators
   Last Updated:
   - date: 2026-08-19
   - note: reveal Another date in place and reflect completed Guide Begin choices
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import CalendarConceptIcon from "@/components/system/primitives/icons/concepts/CalendarConceptIcon";
import TimeConceptIcon from "@/components/system/primitives/icons/concepts/TimeConceptIcon";
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";
import CheckIcon from "@/components/system/primitives/icons/state/CheckIcon";

import BeginDateWindow from "@/compositions/onboarding/outflo-onboarding/begin/internal/date/BeginDateWindow";

import {
    useVolatileOnboardingState,
} from "@/runtime/onboarding/state/volatile/VolatileOnboardingState";

import interactionStyles from "./BeginOptionsInteraction.module.css";
import styles from "./BeginOptions.module.css";

/* ------------------------------
   Component
-------------------------------- */

export default function BeginOptions() {
    const {
        guideBeginSelection,
        guideBeginDate,
        setGuideBeginSelection,
    } = useVolatileOnboardingState();

    const isNowActive =
        guideBeginSelection === "now";

    const isAnotherDateActive =
        guideBeginSelection === "another-date";

    const isAnotherDateComplete =
        isAnotherDateActive &&
        guideBeginDate !== null;

    return (
        <div className={styles.stack}>
            <button
                type="button"
                className={[
                    styles.row,
                    interactionStyles.option,
                ].join(" ")}
                aria-pressed={isNowActive}
                onClick={() => {
                    setGuideBeginSelection("now");
                }}
            >
                <span className={styles.icon}>
                    <TimeConceptIcon
                        size={44}
                        gradient
                    />
                </span>

                <span className={styles.copy}>
                    <span className={styles.label}>
                        Now
                    </span>

                    <span className={styles.support}>
                        Begin when you enter Time.
                    </span>
                </span>

                <span
                    className={[
                        styles.chevron,
                        isNowActive
                            ? interactionStyles.positive
                            : interactionStyles.neutral,
                    ].join(" ")}
                >
                    {isNowActive ? (
                        <CheckIcon size={18} />
                    ) : (
                        <ChevronRightIcon size={16} />
                    )}
                </span>
            </button>

            <button
                type="button"
                className={[
                    styles.row,
                    interactionStyles.option,
                ].join(" ")}
                aria-pressed={isAnotherDateActive}
                onClick={() => {
                    setGuideBeginSelection(
                        "another-date",
                    );
                }}
            >
                <span className={styles.icon}>
                    <CalendarConceptIcon
                        size={44}
                        gradient
                    />
                </span>

                <span className={styles.copy}>
                    <span className={styles.label}>
                        Another date
                    </span>

                    <span className={styles.support}>
                        Choose a date and time.
                    </span>
                </span>

                <span
                    className={[
                        styles.chevron,
                        isAnotherDateComplete
                            ? interactionStyles.positive
                            : interactionStyles.neutral,
                    ].join(" ")}
                >
                    {isAnotherDateComplete ? (
                        <CheckIcon size={18} />
                    ) : (
                        <ChevronRightIcon size={16} />
                    )}
                </span>
            </button>

            {isAnotherDateActive ? (
                <BeginDateWindow />
            ) : null}
        </div>
    );
}
