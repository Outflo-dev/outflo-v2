import { signOutAuthenticatedGuide } from "@/runtime/onboarding/access/sign-out/signOutAuthenticatedGuide";
import styles from "./BeginGuideMenu.module.css";

export default function BeginGuideMenu() {
    return (
        <details className={styles.menu}>
            <summary
                className={styles.trigger}
                aria-label="Open Guide menu"
            >
                <span className={styles.lines} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </span>
            </summary>

            <div className={styles.panel}>
                <form action={signOutAuthenticatedGuide}>
                    <button type="submit" className={styles.signOut}>
                        Sign Out
                    </button>
                </form>
            </div>
        </details>
    );
}
