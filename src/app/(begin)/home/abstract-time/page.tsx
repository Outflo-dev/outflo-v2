import Link from "next/link";

import BackNavigationAction from
  "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OutfloMark from
  "@/components/system/primitives/marks/outflo/OutfloMark";

import styles from
  "@/compositions/conversation/ConversationSurface.module.css";

export default function AbstractTimeEntrancePage() {
  return (
    <section className={styles.surface}>
      <header className={styles.header}>
        <BackNavigationAction
          href="/home"
          label="Back to Home"
        />
      </header>

      <div className={styles.content}>
        <div className={styles.entrance}>
          <OutfloMark size={110} title="Outflō" />

          <h1 className={styles.title}>
            Chat in Abstract Time.
          </h1>


        </div>
      </div>

      <Link
        href="/home/conversation"
        className={styles.composer}
        aria-label="Enter Chat in Abstract Time"
        style={{ textDecoration: "none" }}
      >
        <span
          className={styles.input}
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "999px",
            border: "2px solid transparent",
            background: "linear-gradient(var(--color-surface-primary), var(--color-surface-primary)) padding-box, linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary)) border-box",
            color: "var(--color-text-secondary)",
          }}
        >
          Ask Outflō…
        </span>

        <span
          className={styles.send}
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.75rem",
            height: "2.75rem",
            padding: 0,
            borderRadius: "999px",
            border: "2px solid transparent",
            background: "linear-gradient(var(--color-surface-primary), var(--color-surface-primary)) padding-box, linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary)) border-box",
          }}
        >
          ↑
        </span>
      </Link>
    </section>
  );
}
