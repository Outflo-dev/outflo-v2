import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createClockGround,
} from "./createClockGround";

describe("createClockGround", () => {
  it("exposes emitted Machine Clock truth as inference ground", () => {
    const ground =
      createClockGround();

    expect(ground.sourceId).toBe(
      "outflo:machine:clock:v1",
    );

    expect(ground.content).toContain(
      "OUTFLŌ_MACHINE_CLOCK",
    );

    expect(ground.content).toMatch(
      /^current_instant_outfloseconds=-?\d+$/m,
    );
  });
});
