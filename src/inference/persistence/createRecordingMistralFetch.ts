/* ==========================================================
   OUTFLO — MISTRAL EXECUTION CAPTURE
   Scope: Capture one HTTP execution and persist its evidence
   ========================================================== */

import { createHash, randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { persistInferenceEmission } from "./persistInferenceEmission";

const hash = (text: string): string =>
  createHash("sha256").update(text, "utf8").digest("hex");

const bytes = (text: string): number =>
  Buffer.byteLength(text, "utf8");

function record(value: unknown): Record<string, unknown> {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

const numberOrNull = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value)
    ? value
    : null;

const stringOrNull = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

export type RecordingMistralFetchOptions = Readonly<{
  // Supplied exclusively by the authenticated server runtime.
  authenticatedGuideId?: string;
  // Reports the exact persisted execution, including HTTP failures.
  onPersistedExecution?: (executionId: string) => void;
}>;

export function createRecordingMistralFetch(
  db: SupabaseClient,
  sessionId: string,
  turnOrdinal: number,
  options?: RecordingMistralFetchOptions,
): typeof fetch {
  return async (input, init) => {
    if (typeof init?.body !== "string") {
      throw new TypeError("Expected serialized inference request.");
    }

    const executionId = randomUUID();
    const requestBody = init.body;
    const request = record(JSON.parse(requestBody));

    const requestObservedAt = new Date().toISOString();
    const started = performance.now();

    let response: Response | null = null;
    let responseBody: string | null = null;
    let transportError: unknown;

    try {
      response = await fetch(input, init);
      responseBody = await response.clone().text();
    } catch (error) {
      transportError = error;
    }

    const finished = performance.now();
    const responseObservedAt = new Date().toISOString();

    let parsed: unknown = null;

    if (responseBody !== null) {
      try {
        parsed = JSON.parse(responseBody);
      } catch {
        // Preserve original response text regardless.
      }
    }

    const body = record(parsed);
    const usage = record(body.usage);
    const details = record(usage.prompt_tokens_details);

    const choices = Array.isArray(body.choices)
      ? body.choices
      : [];

    await persistInferenceEmission(db, {
      execution_id: executionId,
      session_id: sessionId,
      turn_ordinal: turnOrdinal,
      user_id: options?.authenticatedGuideId ?? null,
      provider: "mistral",

      requested_model: stringOrNull(request.model),
      returned_model: stringOrNull(body.model),
      provider_response_id: stringOrNull(body.id),
      provider_created_unix_seconds:
        numberOrNull(body.created),

      request_observed_at: requestObservedAt,
      response_observed_at: responseObservedAt,
      request_monotonic_ms: started,
      response_monotonic_ms: finished,
      elapsed_ms: finished - started,

      request_body: requestBody,
      response_body: responseBody,

      request_utf8_bytes: bytes(requestBody),
      response_utf8_bytes:
        responseBody === null ? null : bytes(responseBody),

      request_sha256: hash(requestBody),
      response_sha256:
        responseBody === null ? null : hash(responseBody),

      http_status: response?.status ?? null,
      response_headers: response
        ? {
            content_type: response.headers.get("content-type"),
            request_id: response.headers.get("x-request-id"),
          }
        : null,

      outcome: transportError !== undefined
        ? "transport_error"
        : response?.ok
          ? "http_success"
          : "http_error",

      error_message: transportError === undefined
        ? null
        : transportError instanceof Error
          ? transportError.message
          : String(transportError),

      usage: body.usage ?? null,
      input_tokens: numberOrNull(usage.prompt_tokens),
      output_tokens: numberOrNull(usage.completion_tokens),
      total_tokens: numberOrNull(usage.total_tokens),
      cached_input_tokens:
        numberOrNull(details.cached_tokens),
      service_tier: stringOrNull(usage.service_tier),

      finish_reasons: choices.map(
        (choice) => record(choice).finish_reason ?? null,
      ),

      runtime_provenance: {
        runtime: "node",
        node_version: process.version,
        platform: process.platform,
        architecture: process.arch,
        capture_version: "v1",
      },
    });

    // Only disclose an execution identity after persistence and readback.
    options?.onPersistedExecution?.(executionId);

    if (transportError !== undefined) {
      throw transportError;
    }

    return response!;
  };
}
