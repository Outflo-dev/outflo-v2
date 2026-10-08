import {
  NextResponse,
} from "next/server";

import {
  observeTimeEntryMachineTime,
} from "@/runtime/time/entry/observeTimeEntryMachineTime";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, {
      status: 404,
    });
  }

  const result =
    await observeTimeEntryMachineTime();

  if (!result.persistence.success) {
    return NextResponse.json(
      {
        success: false,
        error: result.persistence.error,
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    success: true,
    observationId:
      result.persistence.observationId,
    guideBegin:
      result.value,
  });
}
