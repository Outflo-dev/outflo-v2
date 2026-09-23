import type { CSSProperties } from "react";

import LandingAuthAction from "@/components/system/primitives/actions/auth/LandingAuthAction";
import AppleIcon from "@/components/system/primitives/icons/identity/AppleIcon";
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

const APPLE_MARK_STYLE: CSSProperties = {
    display: "block",
    width: "1.5rem",
    height: "1.5rem",
    transform: "translate(-0.08rem, -0.08rem)",
};

export default function LandingAppleAction() {
    return (
        <LandingAuthAction
            href="/more-ways-to-enter"
            leading={
                <span style={APPLE_MARK_STYLE}>
                    <AppleIcon />
                </span>
            }
            trailing={<ChevronRightIcon />}
            ariaLabel="Continue with Apple"
        >
            Continue with Apple
        </LandingAuthAction>
    );
}
