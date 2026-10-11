/* ==========================================================
   OUTFLŌ — DEVELOPMENT MACHINE TIME VERIFICATION
   File: src/app/api/dev/machine-time-proof/verify/route.ts
   Scope: Inspect one persisted observation through Proof
   Last Updated:
   - Outflō Time: 847937961822553110002352219277
   - note: establish development-only persisted verification
   ========================================================== */

import { NextRequest, NextResponse } from "next/server";

import { readMachineTimeObservationById } from "@/runtime/clock/persistence/readMachineTimeObservationById";
import { decodeMachineTimeEvidenceV1 } from "@/proof/time/decodeMachineTimeEvidenceV1";
import { verifyMachineTimeObservationV1 } from "@/proof/time/verifyMachineTimeObservationV1";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  const observationId =
    request.nextUrl.searchParams.get("observationId");

  if (
    !observationId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(observationId)
  ) {
    return NextResponse.json(
      { error: "Valid observation UUID required." },
      { status: 400 },
    );
  }

  try {
    const row =
      await readMachineTimeObservationById(observationId);

    if (!row) {
      return NextResponse.json(
        { error: "Observation not found." },
        { status: 404 },
      );
    }

    const evidence = decodeMachineTimeEvidenceV1(row);

    if (evidence.status !== "supported") {
      return NextResponse.json({
        observationId,
        status: evidence.status,
        ...(evidence.status === "incomplete"
          ? { missing: evidence.missing }
          : {}),
      });
    }

    return NextResponse.json({
      observationId: evidence.observationId,
      status: "checked",
      verification:
        verifyMachineTimeObservationV1(evidence.observed),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Verification failed.",
      },
      { status: 500 },
    );
  }
}
