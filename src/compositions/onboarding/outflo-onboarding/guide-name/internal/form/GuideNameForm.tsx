"use client";

/* ==========================================================
   OUTFLO — GUIDE NAME FORM
   File: src/compositions/onboarding/outflo-onboarding/guide-name/internal/form/GuideNameForm.tsx
   Scope: Own the Guide Name username field and local form submission boundary
   Last Updated:
   - date: 2026-08-19
   - note: expose successful Guide Name submission without owning route transition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import type {
    FormEvent,
} from "react";

import { OnboardingTextInputField } from "@/components/onboarding/OnboardingComponentsIndex";

import {
    AtIcon,
} from "@/components/onboarding/OnboardingComponentsIndex";

import {
    useVolatileOnboardingState,
} from "@/runtime/onboarding/state/volatile/VolatileOnboardingState";

import styles from "./GuideNameForm.module.css";

/* ------------------------------
   Constants
-------------------------------- */

export const GUIDE_NAME_FORM_ID =
    "guide-name-form";

/* ------------------------------
   Types
-------------------------------- */

type GuideNameFormProps = {
    onSubmit: () => void;
};

/* ------------------------------
   Component
-------------------------------- */

export default function GuideNameForm({
    onSubmit,
}: GuideNameFormProps) {
    const {
        username,
        setUsername,
    } = useVolatileOnboardingState();

    function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        onSubmit();
    }

    return (
        <form
            id={GUIDE_NAME_FORM_ID}
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <OnboardingTextInputField
                id="guide-name-username"
                name="username"
                label="Guide Name"
                type="text"
                autoComplete="username"
                placeholder="choose your Guide Name"
                leading={<AtIcon />}
                value={username ?? ""}
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
                required
            />
        </form>
    );
}
