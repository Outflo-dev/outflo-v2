/*
 * OUTFLŌ — PROOF 4 / CONVERSATION LEDGER INSPECTION
 *
 * Read one persisted conversation and its associated evidence.
 * Resolve recorded timestamps through the existing Machine.
 * Inspect identities, ordering, durations, and SHA-256 integrity.
 *
 * READ ONLY. NOT A COMPOSED PROOF VERDICT.
 */

import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { machine } from "../../machine";
import { verifyConversationProof4 } from "./verifyConversationProof4";

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

function milliseconds(timestamp: string): bigint {
  const value = Date.parse(timestamp);
  if (!Number.isSafeInteger(value)) {
    throw new Error(`Unsupported timestamp: ${timestamp}`);
  }
  return BigInt(value);
}

function instant(timestamp: string) {
  return machine.clock.resolveUnixMillisecondObservation128(
    milliseconds(timestamp),
  );
}

function coordinate(timestamp: string) {
  return machine.clock.serializeTemporalInstant128(instant(timestamp));
}

function duration(start: string, end: string) {
  return machine.clock.serializeTemporalDuration128(
    machine.clock.measureTemporalDurationBetweenInstants(
      instant(start),
      instant(end),
    ),
  );
}

function sha256(value: string) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

async function main() {
  const conversationId = process.argv[2];
  if (!conversationId || !UUID.test(conversationId)) {
    throw new Error("Valid conversation UUID required.");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Database configuration missing.");

  const db = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: conversation, error: ce } = await db
    .from("conversations")
    .select("conversation_id,guide_id,status,created_at,completed_at")
    .eq("conversation_id", conversationId)
    .single();
  if (ce || !conversation) throw ce ?? new Error("Conversation missing.");

  const { data: turns, error: te } = await db
    .from("conversation_turns")
    .select("turn_id,conversation_id,turn_ordinal,created_at")
    .eq("conversation_id", conversationId)
    .order("turn_ordinal");
  if (te) throw te;
  if (!turns?.length) throw new Error("Conversation has no turns.");

  const turnIds = turns.map(t => t.turn_id);

  const [mr, ar] = await Promise.all([
    db.from("conversation_messages")
      .select("message_id,turn_id,author,content,recorded_at")
      .in("turn_id", turnIds),
    db.from("conversation_inference_executions")
      .select("association_id,turn_id,execution_id,attempt_ordinal,associated_at")
      .in("turn_id", turnIds),
  ]);
  if (mr.error) throw mr.error;
  if (ar.error) throw ar.error;

  const messages = mr.data ?? [];
  const links = ar.data ?? [];
  const executionIds = links.map(a => a.execution_id);

  const er = executionIds.length
    ? await db.from("inference_execution_emissions")
        .select("execution_id,user_id,request_observed_at,response_observed_at,request_monotonic_ms,response_monotonic_ms,elapsed_ms,request_body,response_body,request_sha256,response_sha256,http_status,outcome")
        .in("execution_id", executionIds)
    : { data: [], error: null };

  if (er.error) throw er.error;
  const executions = (er.data ?? []).sort(
    (a, b) => a.execution_id.localeCompare(b.execution_id),
  );
  const executionById = new Map(
    executions.map(e => [e.execution_id, e] as const),
  );

  const findings: string[] = [];

  const turnReports = turns.map((turn, index) => {
    const ownMessages = messages.filter(m => m.turn_id === turn.turn_id);
    const guide = ownMessages.find(m => m.author === "guide");
    const reply = ownMessages.find(m => m.author === "outflo");
    const attempts = links
      .filter(a => a.turn_id === turn.turn_id)
      .sort((a, b) => a.attempt_ordinal - b.attempt_ordinal);

    if (turn.turn_ordinal !== index + 1) {
      findings.push(`Turn ordering: ${turn.turn_id}`);
    }
    if (ownMessages.filter(m => m.author === "guide").length !== 1 ||
        ownMessages.filter(m => m.author === "outflo").length > 1) {
      findings.push(`Message cardinality: ${turn.turn_id}`);
    }
    if (attempts.some((a, i) => a.attempt_ordinal !== i + 1)) {
      findings.push(`Attempt ordering: ${turn.turn_id}`);
    }
    if (guide && reply && milliseconds(reply.recorded_at) <
        milliseconds(guide.recorded_at)) {
      findings.push(`Message chronology: ${turn.turn_id}`);
    }

    return {
      turnId: turn.turn_id,
      ordinal: turn.turn_ordinal,
      createdAt: turn.created_at,
      createdInstant: coordinate(turn.created_at),
      guideMessage: guide
        ? { id: guide.message_id, recordedAt: guide.recorded_at,
            instant: coordinate(guide.recorded_at) }
        : null,
      outflowMessage: reply
        ? { id: reply.message_id, recordedAt: reply.recorded_at,
            instant: coordinate(reply.recorded_at) }
        : null,
      messageSpanOutfloSeconds: guide && reply
        ? duration(guide.recorded_at, reply.recorded_at)
        : null,
      attempts: attempts.map(a => ({
        ordinal: a.attempt_ordinal,
        executionId: a.execution_id,
      })),
    };
  });

  const executionReports = links.map(link => {
    const e = executionById.get(link.execution_id);
    if (!e) {
      findings.push(`Missing execution: ${link.execution_id}`);
      return { executionId: link.execution_id, missing: true };
    }

    const checks = {
      guideMatches: e.user_id === conversation.guide_id,
      requestHashMatches: sha256(e.request_body) === e.request_sha256,
      responseHashMatches: e.response_body === null
        ? e.response_sha256 === null
        : sha256(e.response_body) === e.response_sha256,
      wallOrdered: milliseconds(e.response_observed_at) >=
        milliseconds(e.request_observed_at),
      monotonicConsistent: Math.abs(
        e.response_monotonic_ms -
        e.request_monotonic_ms -
        e.elapsed_ms
      ) < 0.01,
    };

    if (Object.values(checks).some(value => !value)) {
      findings.push(`Execution check: ${e.execution_id}`);
    }

    return {
      turnId: link.turn_id,
      executionId: e.execution_id,
      attemptOrdinal: link.attempt_ordinal,
      outcome: e.outcome,
      httpStatus: e.http_status,
      requestObservedAt: e.request_observed_at,
      responseObservedAt: e.response_observed_at,
      requestInstant: coordinate(e.request_observed_at),
      responseInstant: coordinate(e.response_observed_at),
      wallSpanOutfloSeconds: checks.wallOrdered
        ? duration(e.request_observed_at, e.response_observed_at)
        : null,
      monotonicElapsedMilliseconds: e.elapsed_ms,
      checks,
    };
  });

  const events = [
    { kind: "conversation-created", at: conversation.created_at },
    ...turns.map(t => ({ kind: "turn-created", at: t.created_at })),
    ...messages.map(m => ({ kind: "message-recorded", at: m.recorded_at })),
    ...links.map(a => ({ kind: "execution-associated", at: a.associated_at })),
    ...executions.flatMap(e => [
      { kind: "inference-request", at: e.request_observed_at },
      { kind: "inference-response", at: e.response_observed_at },
    ]),
  ];

  if (conversation.completed_at) {
    events.push({
      kind: "conversation-completed",
      at: conversation.completed_at,
    });
  }

  const latest = events.reduce((a, b) =>
    milliseconds(b.at) > milliseconds(a.at) ? b : a
  );

  const verification = verifyConversationProof4({
    conversation,
    turns,
    messages,
    associations: links,
    executions,
  });


  // Corrupt only an in-memory copy of one persisted request.
  const alteredExecutions = executions.map((execution, index) =>
    index === 0
      ? { ...execution, request_body: execution.request_body + "ALTERED" }
      : execution
  );

  const corruptionProbe = verifyConversationProof4({
    conversation,
    turns,
    messages,
    associations: links,
    executions: alteredExecutions,
  });


  // Deterministic source manifest; no raw message or inference bodies.
  const sourceManifest = {
    version: "conversation-proof4-source-v1",
    conversation: {
      id: conversation.conversation_id,
      guideId: conversation.guide_id,
      status: conversation.status,
      createdAt: conversation.created_at,
      completedAt: conversation.completed_at,
    },
    turns: [...turns]
      .sort((a, b) => a.turn_ordinal - b.turn_ordinal)
      .map(t => ({
        id: t.turn_id,
        ordinal: t.turn_ordinal,
        createdAt: t.created_at,
      })),
    messages: [...messages]
      .sort((a, b) => a.message_id.localeCompare(b.message_id))
      .map(m => ({
        id: m.message_id,
        turnId: m.turn_id,
        author: m.author,
        recordedAt: m.recorded_at,
        contentSha256: sha256(m.content),
      })),
    associations: [...links]
      .sort((a, b) => a.association_id.localeCompare(b.association_id))
      .map(a => ({
        id: a.association_id,
        turnId: a.turn_id,
        executionId: a.execution_id,
        attemptOrdinal: a.attempt_ordinal,
        associatedAt: a.associated_at,
      })),
    executions: [...executions]
      .sort((a, b) => a.execution_id.localeCompare(b.execution_id))
      .map(e => ({
        id: e.execution_id,
        userId: e.user_id,
        requestAt: e.request_observed_at,
        responseAt: e.response_observed_at,
        requestMonotonicMs: e.request_monotonic_ms,
        responseMonotonicMs: e.response_monotonic_ms,
        elapsedMs: e.elapsed_ms,
        requestSha256: e.request_sha256,
        responseSha256: e.response_sha256,
        outcome: e.outcome,
        httpStatus: e.http_status,
      })),
  };

  const canonicalize = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(canonicalize);
    if (value !== null && typeof value === "object") {
      return Object.fromEntries(
        Object.keys(value).sort().map(key => [
          key,
          canonicalize((value as Record<string, unknown>)[key]),
        ]),
      );
    }
    return value;
  };

  const sourceSha256 = sha256(
    JSON.stringify(canonicalize(sourceManifest)),
  );

  const report = {
    kind: "outflo-conversation-temporal-inspection-v1",
    verdict: "DIAGNOSTIC_ONLY",
    verification,
    sourceSha256,
    sourceManifest,
    corruptionTest: {
      rejected: corruptionProbe.verdict === "failed",
      failedChecks: corruptionProbe.failedChecks,
    },
    conversationId,
    status: conversation.status,
    method: "Persisted timestamps resolved at Unix-millisecond input resolution through the Machine.",
    provenance: "Database audit timestamps are not direct Machine observations. Monotonic measurements remain separately recorded.",
    counts: {
      turns: turns.length,
      messages: messages.length,
      inferenceAssociations: links.length,
      inferenceExecutions: executions.length,
      unansweredTurns: turnReports.filter(t => !t.outflowMessage).length,
    },
    conversation: {
      createdAt: conversation.created_at,
      createdInstant: coordinate(conversation.created_at),
      completedAt: conversation.completed_at,
      latestRecordedEvent: latest,
      latestRecordedInstant: coordinate(latest.at),
      recordedSpanOutfloSeconds: duration(
        conversation.created_at,
        latest.at,
      ),
      spanIsFinal: conversation.status === "completed",
    },
    findings,
    turns: turnReports,
    executions: executionReports,
  };

  console.log(JSON.stringify(report, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
