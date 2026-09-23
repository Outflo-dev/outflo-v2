import type { CSSProperties } from "react";

import LandingAuthAction from "@/components/system/primitives/actions/auth/LandingAuthAction";
import GoogleIcon from "@/components/system/primitives/icons/identity/GoogleIcon";
import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

const GOOGLE_MARK_STYLE: CSSProperties = {
    display: "block",
    width: "1.4rem",
    height: "1.4rem",
    transform: "translate(-0.15rem, -0.04rem)",
};

export default function LandingGoogleAction() {
    return (
        <LandingAuthAction
            href="/more-ways-to-enter"
            leading={
                <span style={GOOGLE_MARK_STYLE}>
                    <GoogleIcon />
                </span>
            }
            trailing={<ChevronRightIcon />}
            ariaLabel="Continue with Google"
        >
            Continue with Google
        </LandingAuthAction>
    );
}
