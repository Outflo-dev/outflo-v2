/* ==========================================================
   OUTFLO — BACK NAVIGATION ACTION
   File: src/components/system/primitives/actions/navigation/BackNavigationAction.tsx
   Scope: Own the canonical backward-navigation action boundary
   Last Updated:
   - date: 2026-07-27
   - note: consume the shared directional arrow primitive
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";

import ArrowIcon from "@/components/system/primitives/icons/navigation/ArrowIcon";

import styles from "./BackNavigationAction.module.css";

/* ------------------------------
   Types
-------------------------------- */
type BackNavigationActionProps = {
    href: string;
    label?: string;
};

/* ------------------------------
   Component
-------------------------------- */
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
                size={22}
            />
        </Link>
    );
}