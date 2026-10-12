"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { observeAndRecordRuntimeMachineTime } from "@/runtime/clock/persistence/observeAndRecordRuntimeMachineTime";

export async function signOutAuthenticatedGuide(): Promise<void> {
    const supabase = await createClient();

    const { data: { user }, error: identityError } =
        await supabase.auth.getUser();

    // No verified identity: permit exit without claiming a Proof.
    if (identityError || !user) {
        const { error } = await supabase.auth.signOut({
            scope: "local",
        });

        if (error) throw new Error(error.message);
        redirect("/");
    }

    const signOutExecutionId = randomUUID();
    let completed = false;

    try {
        const observation = await observeAndRecordRuntimeMachineTime(
            async () => {
                const { error } = await supabase.auth.signOut({
                    scope: "local",
                });

                if (error) throw new Error(error.message);

                completed = true;
                return true;
            },
            undefined,
            undefined,
            signOutExecutionId,
            user.id,
        );

        if (
            !observation.persistence.success ||
            observation.proofVerification.status !== "recorded" ||
            observation.proofVerification.verdict !== "verified"
        ) {
            console.error(
                "Sign Out Machine Proof unavailable:",
                observation.persistence,
                observation.proofVerification,
            );
        }
    } catch (error) {
        if (!completed) throw error;

        console.error(
            "Completed Sign Out could not record Machine Proof:",
            error,
        );
    }

    redirect("/");
}
