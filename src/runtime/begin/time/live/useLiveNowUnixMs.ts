"use client";

/* ==========================================================
   OUTFLO — LIVE NOW UNIX MS
   File: src/runtime/begin/time/live/useLiveNowUnixMs.ts
   Scope: Own live browser-observed Now for Begin presentation
   Last Updated:
   - date: 2026-08-19
   - note: establish ephemeral live Now without admitting browser time as canonical history
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    useEffect,
    useState,
} from "react";

/* ------------------------------
   Hook
-------------------------------- */

export function useLiveNowUnixMs() {
    const [
        nowUnixMs,
        setNowUnixMs,
    ] = useState<number | null>(null);

    useEffect(() => {
        const observeNow = () => {
            setNowUnixMs(Date.now());
        };

        observeNow();

        const intervalId =
            window.setInterval(
                observeNow,
                1000,
            );

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    return nowUnixMs;
}
