/* ==========================================================
   OUTFLO — BACK NAVIGATION ACTION
   File: src/components/system/primitives/actions/navigation/BackNavigationAction.tsx
   Scope: Own the canonical backward-navigation action boundary
   Last Updated:
   - date: 2026-09-29
   - note: render canonical arrow-only backward navigation
   ========================================================== */

import Link from "next/link";

import ArrowIcon from "@/components/system/primitives/icons/navigation/ArrowIcon";

import styles from "./BackNavigationAction.module.css";

type BackNavigationActionProps = {
    href: string;
    label?: string;
};

export default function BackNavigationAction({
    href,
    label = "Go back",
}: BackNavigationActionProps) {
    return (
        <Link
            href={href}
            aria-label={label}
            className={styles.action}
        >
            <ArrowIcon
                direction="left"
                size={24}
            />
        </Link>
    );
}
