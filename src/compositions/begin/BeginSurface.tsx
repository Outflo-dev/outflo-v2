/* ==========================================================
   OUTFLO — FIRST BEGIN SURFACE
   Scope: Present Proofs, Outflōseconds, and Time access
   ========================================================== */

import Link from "next/link";
import BeginGuideMenu from "./BeginGuideMenu";
import styles from "./BeginSurface.module.css";

type BeginSurfaceProps = {
    proofCount: number | null;
    canonicalDuration: string | null;
};

export default function BeginSurface({
    proofCount,
    canonicalDuration,
}: BeginSurfaceProps) {
    const seconds =
        canonicalDuration === null
            ? "—"
            : canonicalDuration.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  " ",
              );

    return (
        <section className={styles.surface}>
            <Link
                href="/home/abstract-time"
                className={styles.timeAction}
                aria-label="Open Conversation"
            />

            <BeginGuideMenu />
            <div className={styles.stage}>
                <Link href="/home/proofs" className={styles.orbit} aria-label="View verified Proofs" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className={styles.orbitInner}>
                        <span className={styles.count}>
                            {proofCount ?? "—"}
                        </span>
                        <span className={styles.proofLabel}>
                            PROOFS
                        </span>
                    </div></Link>

                <div className={styles.seconds}>
                    <div className={styles.secondsLabel}>
                        OUTFLŌSECONDS
                    </div>
                    <div
                        className={styles.secondsValue}
                        aria-label={
                            canonicalDuration === null
                                ? "Time is loading"
                                : `${canonicalDuration} Outflōseconds`
                        }
                    >
                        {seconds}
                    </div>
                </div>
            </div>
        </section>
    );
}
