"use client";

/* ==========================================================
   OUTFLO — VERIFY EMAIL CODE INPUT
   File: src/compositions/onboarding/verify-email/internal/code/VerifyEmailCodeInput.tsx
   Scope: Own six-digit verification-code entry and focus movement
   Last Updated:
   - date: 2026-08-02
   - note: establish controlled digit entry, deletion, navigation, and paste behavior
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    ChangeEvent,
    ClipboardEvent,
    KeyboardEvent,
} from "react";

import {
    useRef,
} from "react";

import cellStyles from "./module/construction/code.cell.module.css";
import trackStyles from "./module/construction/code.track.module.css";

import focusStyles from "./module/behavior/code.focus.module.css";

import paintStyles from "./module/style/code.paint.module.css";

/* ------------------------------
   Constants
-------------------------------- */
const VERIFY_EMAIL_CODE_LENGTH = 6;

/* ------------------------------
   Types
-------------------------------- */
type VerifyEmailCodeInputProps = {
    value: string;
    onChange: (value: string) => void;
};

/* ------------------------------
   Helpers
-------------------------------- */
function normalizeCode(value: string) {
    return value
        .replace(/\D/g, "")
        .slice(0, VERIFY_EMAIL_CODE_LENGTH);
}

/* ------------------------------
   Component
-------------------------------- */
export default function VerifyEmailCodeInput({
    value,
    onChange,
}: VerifyEmailCodeInputProps) {
    const inputRefs =
        useRef<Array<HTMLInputElement | null>>([]);

    const digits = Array.from(
        {
            length: VERIFY_EMAIL_CODE_LENGTH,
        },
        (_, index) => value[index] ?? "",
    );

    function focusDigit(index: number) {
        const boundedIndex = Math.max(
            0,
            Math.min(
                index,
                VERIFY_EMAIL_CODE_LENGTH - 1,
            ),
        );

        inputRefs.current[boundedIndex]?.focus();
        inputRefs.current[boundedIndex]?.select();
    }

    function handleChange(
        index: number,
        event: ChangeEvent<HTMLInputElement>,
    ) {
        const nextDigit = normalizeCode(
            event.target.value,
        ).slice(-1);

        const nextDigits = [...digits];

        nextDigits[index] = nextDigit;

        const nextCode = nextDigits
            .join("")
            .slice(0, VERIFY_EMAIL_CODE_LENGTH);

        onChange(nextCode);

        if (
            nextDigit.length === 1 &&
            index < VERIFY_EMAIL_CODE_LENGTH - 1
        ) {
            focusDigit(index + 1);
        }
    }

    function handleKeyDown(
        index: number,
        event: KeyboardEvent<HTMLInputElement>,
    ) {
        if (
            event.key === "Backspace" &&
            digits[index] === "" &&
            index > 0
        ) {
            event.preventDefault();

            const nextDigits = [...digits];

            nextDigits[index - 1] = "";

            onChange(nextDigits.join(""));
            focusDigit(index - 1);

            return;
        }

        if (
            event.key === "ArrowLeft" &&
            index > 0
        ) {
            event.preventDefault();
            focusDigit(index - 1);

            return;
        }

        if (
            event.key === "ArrowRight" &&
            index < VERIFY_EMAIL_CODE_LENGTH - 1
        ) {
            event.preventDefault();
            focusDigit(index + 1);
        }
    }

    function handlePaste(
        event: ClipboardEvent<HTMLDivElement>,
    ) {
        event.preventDefault();

        const pastedCode = normalizeCode(
            event.clipboardData.getData("text"),
        );

        if (pastedCode.length === 0) {
            return;
        }

        onChange(pastedCode);

        focusDigit(
            Math.min(
                pastedCode.length,
                VERIFY_EMAIL_CODE_LENGTH,
            ) - 1,
        );
    }

    return (
        <div
            className={trackStyles.track}
            aria-label="Six-digit verification code"
            onPaste={handlePaste}
        >
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(element) => {
                        inputRefs.current[index] =
                            element;
                    }}
                    className={`
                        ${cellStyles.cell}
                        ${paintStyles.paint}
                        ${focusStyles.focus}
                    `}
                    id={`verify-email-code-${index + 1}`}
                    name={`verificationCodeDigit${index + 1}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    autoComplete={
                        index === 0
                            ? "one-time-code"
                            : "off"
                    }
                    aria-label={`Verification code digit ${index + 1}`}
                    onChange={(event) => {
                        handleChange(index, event);
                    }}
                    onKeyDown={(event) => {
                        handleKeyDown(index, event);
                    }}
                />
            ))}
        </div>
    );
}