/* ==========================================================
   OUTFLO — OBSERVE RUNTIME MACHINE TIME TEST
   File: src/runtime/clock/interval/observeRuntimeMachineTime.test.ts
   Scope: Prove runtime captures temporal boundaries around one operation
   Last Updated:
   - date: 2026-10-07
   - note: prove observation order, value preservation, and protected Machine-Time composition
   ========================================================== */

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  observePlatformTemporalNow,
} from "../observation/observePlatformTemporalNow";

import type {
  PlatformTemporalObservation,
} from "../observation/PlatformTemporalObservation";

import {
  observeRuntimeMachineTime,
} from "./observeRuntimeMachineTime";

vi.mock(
  "../observation/observePlatformTemporalNow",
  () => ({
    observePlatformTemporalNow:
      vi.fn(),
  }),
);

const mockedObservePlatformTemporalNow =
  vi.mocked(
    observePlatformTemporalNow,
  );

beforeEach(() => {
  mockedObservePlatformTemporalNow
    .mockReset();
});

describe("observeRuntimeMachineTime", () => {
  it("captures one observation before and one after the operation", async () => {
    const firstObservation:
      PlatformTemporalObservation = {
        wallUnixMilliseconds:
          1_791_377_197_352n,
        monotonicMilliseconds:
          137_770_233.6555,
      };

    const secondObservation:
      PlatformTemporalObservation = {
        wallUnixMilliseconds:
          1_791_377_197_956n,
        monotonicMilliseconds:
          137_770_838.1388,
      };

    mockedObservePlatformTemporalNow
      .mockReturnValueOnce(
        firstObservation,
      )
      .mockReturnValueOnce(
        secondObservation,
      );

    const result =
      await observeRuntimeMachineTime(
        async () => {
          expect(
            mockedObservePlatformTemporalNow,
          ).toHaveBeenCalledTimes(1);

          return "operation-complete";
        },
      );

    expect(
      mockedObservePlatformTemporalNow,
    ).toHaveBeenCalledTimes(2);

    expect(result.value).toBe(
      "operation-complete",
    );

    expect(
      result.machineTime.firstObservation,
    ).toBe(firstObservation);

    expect(
      result.machineTime.secondObservation,
    ).toBe(secondObservation);

    expect(
      result.machineTime.rawSpanMilliseconds,
    ).toBe(604n);

    expect(
      result.machineTime.protectedSpanMilliseconds,
    ).toBe(602n);

    expect(
      result.machineTime.duration,
    ).toBeGreaterThan(0n);
  });
});
