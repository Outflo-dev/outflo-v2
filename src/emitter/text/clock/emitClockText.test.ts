import {
  describe,
  expect,
  it,
} from "vitest";

import {
  TEMPORAL_INSTANT_128_MIN,
  TEMPORAL_INSTANT_128_MAX,
} from "../../../machine/clock/instant/temporalInstant128.constants";

import {
  SI_SECONDS_PER_OUTFLOSECOND_NUMERATOR,
  SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR,
} from "../../../machine/clock/unit/temporalUnit.constants";

import {
  emitClockText,
} from "./emitClockText";

describe("emitClockText", () => {
  it("preserves exact Clock values beside emitted text", () => {
    const emission =
      emitClockText();

    expect(
      emission.exact.minimumInstantOutfloseconds,
    ).toBe(
      TEMPORAL_INSTANT_128_MIN.toString(10),
    );

    expect(
      emission.exact.maximumInstantOutfloseconds,
    ).toBe(
      TEMPORAL_INSTANT_128_MAX.toString(10),
    );

    expect(
      emission.exact.siSecondsPerOutflosecondNumerator,
    ).toBe(
      SI_SECONDS_PER_OUTFLOSECOND_NUMERATOR.toString(
        10,
      ),
    );

    expect(
      emission.exact.siSecondsPerOutflosecondDenominator,
    ).toBe(
      SI_SECONDS_PER_OUTFLOSECOND_DENOMINATOR.toString(
        10,
      ),
    );

    expect(
      emission.text,
    ).toContain(
      `current_instant_outfloseconds=${emission.exact.currentInstantOutfloseconds}`,
    );
  });

  it("emits a live canonical current Instant", () => {
    const emission =
      emitClockText();

    const currentInstant =
      BigInt(
        emission.exact
          .currentInstantOutfloseconds,
      );

    expect(
      currentInstant >=
        TEMPORAL_INSTANT_128_MIN,
    ).toBe(true);

    expect(
      currentInstant <=
        TEMPORAL_INSTANT_128_MAX,
    ).toBe(true);
  });
});
