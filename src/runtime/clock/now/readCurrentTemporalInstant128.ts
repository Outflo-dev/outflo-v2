/* ==========================================================
   OUTFLO — READ CURRENT TEMPORAL INSTANT 128
   File: src/runtime/clock/now/readCurrentTemporalInstant128.ts
   Scope: Own observation of current Unix milliseconds and resolve them onto the Outflō Clock
   Last Updated:
   - note: establish the runtime boundary from host Unix-millisecond observation to canonical Clock coordinates
   ========================================================== */

import type { TemporalInstant128 } from "../../../machine/clock/instant/TemporalInstant128";
import { resolveUnixMillisecondsToTemporalInstant128 } from "../../../machine/resolution/unix/resolveUnixMillisecondsToTemporalInstant128";
import { CURRENT_TAI_MINUS_UTC_NANOSECONDS } from "../../../machine/resolution/utc/currentTaiMinusUtc.constants";

export function readCurrentTemporalInstant128(): TemporalInstant128 {
  const unixMilliseconds = BigInt(Date.now());

  return resolveUnixMillisecondsToTemporalInstant128(
    unixMilliseconds,
    CURRENT_TAI_MINUS_UTC_NANOSECONDS,
  );
}
