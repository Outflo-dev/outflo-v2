import {
  NextResponse,
} from "next/server";

import {
  recordGuideBeginReadMachineTime,
} from "@/runtime/clock/proof/recordGuideBeginReadMachineTime";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, {
      status: 404,
    });
  }

  const result =
    await recordGuideBeginReadMachineTime();

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
