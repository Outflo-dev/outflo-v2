/*
 * OUTFLŌ — VERIFY CONVERSATION PROOF 4
 *
 * Independently examine persisted conversation evidence.
 * Machine owns temporal resolution and duration arithmetic.
 *
 * Pure verification. No database access or writes.
 * An open conversation is a snapshot, not a completed span.
 */

import { createHash } from "node:crypto";
import { machine } from "../../machine";

type Conversation = {
  conversation_id: string;
  guide_id: string;
  status: string;
  created_at: string;
  completed_at: string | null;
};

type Turn = {
  turn_id: string;
  conversation_id: string;
  turn_ordinal: number;
  created_at: string;
};

type Message = {
  message_id: string;
  turn_id: string;
  author: string;
  recorded_at: string;
};

type Association = {
  association_id: string;
  turn_id: string;
  execution_id: string;
  attempt_ordinal: number;
  associated_at: string;
};

type Execution = {
  execution_id: string;
  user_id: string | null;
  request_observed_at: string;
  response_observed_at: string;
  request_monotonic_ms: number;
  response_monotonic_ms: number;
  elapsed_ms: number;
  request_body: string;
  response_body: string | null;
  request_sha256: string;
  response_sha256: string | null;
};

export type ConversationProof4Evidence = {
  conversation: Conversation;
  turns: readonly Turn[];
  messages: readonly Message[];
  associations: readonly Association[];
  executions: readonly Execution[];
};

function milliseconds(value: string): bigint {
  const parsed = Date.parse(value);
  if (!Number.isSafeInteger(parsed)) {
    throw new Error("Invalid temporal evidence.");
  }
  return BigInt(parsed);
}

function instant(value: string) {
  return machine.clock.resolveUnixMillisecondObservation128(
    milliseconds(value),
  );
}

function duration(first: string, second: string): string {
  return machine.clock.serializeTemporalDuration128(
    machine.clock.measureTemporalDurationBetweenInstants(
      instant(first),
      instant(second),
    ),
  );
}

function hash(value: string): string {
  return createHash("sha256")
    .update(value, "utf8")
    .digest("hex");
}

export function verifyConversationProof4(
  evidence: ConversationProof4Evidence,
) {
  const { conversation, turns, messages, associations, executions } =
    evidence;

  const checks: { name: string; passed: boolean }[] = [];

  function verify(name: string, assertion: () => boolean) {
    let passed = false;
    try {
      passed = assertion();
    } catch {
      passed = false;
    }
    checks.push({ name, passed });
  }

  const orderedTurns = [...turns].sort(
    (a, b) => a.turn_ordinal - b.turn_ordinal,
  );

  const turnIds = new Set(turns.map(t => t.turn_id));
  const executionIds = new Set(executions.map(e => e.execution_id));

  verify("conversation-lifecycle", () =>
    conversation.status === "open"
      ? conversation.completed_at === null
      : conversation.status === "completed" &&
        conversation.completed_at !== null
  );

  verify("unique-turn-identities", () =>
    turnIds.size === turns.length
  );

  verify("unique-message-identities", () =>
    new Set(messages.map(m => m.message_id)).size === messages.length
  );

  verify("unique-association-identities", () =>
    new Set(associations.map(a => a.association_id)).size ===
    associations.length
  );

  verify("unique-execution-identities", () =>
    executionIds.size === executions.length
  );

  for (const [index, turn] of orderedTurns.entries()) {
    const ownMessages = messages.filter(m => m.turn_id === turn.turn_id);
    const ownAttempts = associations
      .filter(a => a.turn_id === turn.turn_id)
      .sort((a, b) => a.attempt_ordinal - b.attempt_ordinal);

    const guide = ownMessages.filter(m => m.author === "guide");
    const replies = ownMessages.filter(m => m.author === "outflo");

    verify(`turn-${index + 1}-identity`, () =>
      turn.conversation_id === conversation.conversation_id &&
      turn.turn_ordinal === index + 1
    );

    verify(`turn-${index + 1}-chronology`, () =>
      milliseconds(turn.created_at) >=
      milliseconds(conversation.created_at)
    );

    verify(`turn-${index + 1}-messages`, () =>
      guide.length === 1 &&
      replies.length <= 1 &&
      ownMessages.length === guide.length + replies.length
    );

    verify(`turn-${index + 1}-attempts`, () =>
      ownAttempts.every((a, i) => a.attempt_ordinal === i + 1)
    );

    verify(`turn-${index + 1}-reply-order`, () =>
      replies.length === 0 ||
      (
        ownAttempts.length > 0 &&
        milliseconds(replies[0].recorded_at) >=
        milliseconds(guide[0].recorded_at)
      )
    );
  }

  verify("all-messages-owned", () =>
    messages.every(m => turnIds.has(m.turn_id))
  );

  verify("all-associations-owned", () =>
    associations.every(a => turnIds.has(a.turn_id))
  );

  verify("all-executions-linked", () =>
    associations.length === executions.length &&
    associations.every(a => executionIds.has(a.execution_id)) &&
    new Set(associations.map(a => a.execution_id)).size ===
      associations.length
  );

  const executionResults = executions.map(e => {
    const prefix = `execution-${e.execution_id}`;

    verify(`${prefix}-guide`, () =>
      e.user_id === conversation.guide_id
    );

    verify(`${prefix}-request-hash`, () =>
      hash(e.request_body) === e.request_sha256
    );

    verify(`${prefix}-response-hash`, () =>
      e.response_body === null
        ? e.response_sha256 === null
        : hash(e.response_body) === e.response_sha256
    );

    verify(`${prefix}-wall-order`, () =>
      milliseconds(e.response_observed_at) >=
      milliseconds(e.request_observed_at)
    );

    verify(`${prefix}-monotonic`, () =>
      Number.isFinite(e.elapsed_ms) &&
      Math.abs(
        e.response_monotonic_ms -
        e.request_monotonic_ms -
        e.elapsed_ms
      ) < 0.01
    );

    let wallDuration: string | null = null;

    try {
      if (
        milliseconds(e.response_observed_at) >=
        milliseconds(e.request_observed_at)
      ) {
        wallDuration = duration(
          e.request_observed_at,
          e.response_observed_at,
        );
      }
    } catch {
      // Invalid temporal evidence is reported as a failed check.
    }

    verify(`${prefix}-machine-duration`, () =>
      wallDuration !== null
    );

    return {
      executionId: e.execution_id,
      wallDurationOutfloSeconds: wallDuration,
    };
  });

  const eventTimes = [
    conversation.created_at,
    ...turns.map(t => t.created_at),
    ...messages.map(m => m.recorded_at),
    ...associations.map(a => a.associated_at),
    ...executions.flatMap(e => [
      e.request_observed_at,
      e.response_observed_at,
    ]),
    ...(conversation.completed_at
      ? [conversation.completed_at]
      : []),
  ];

  let latestEvent: string | null = null;
  let recordedSpan: string | null = null;

  try {
    latestEvent = eventTimes.reduce((a, b) =>
      milliseconds(a) >= milliseconds(b) ? a : b
    );

    if (
      milliseconds(latestEvent) >=
      milliseconds(conversation.created_at)
    ) {
      recordedSpan = duration(
        conversation.created_at,
        latestEvent,
      );
    }
  } catch {
    // Invalid temporal evidence fails verification.
  }

  verify("conversation-machine-span", () =>
    latestEvent !== null && recordedSpan !== null
  );

  if (conversation.status === "completed") {
    verify("conversation-completion-boundary", () =>
      conversation.completed_at !== null &&
      latestEvent === conversation.completed_at
    );
  }

  const failed = checks
    .filter(c => !c.passed)
    .map(c => c.name);

  return {
    kind: "outflo-conversation-proof4-verification-v1",
    verdict: failed.length === 0 ? "checks-passed" : "failed",
    proofPersisted: false,
    conversationId: conversation.conversation_id,
    conversationStatus: conversation.status,
    spanIsFinal: conversation.status === "completed",
    counts: {
      turns: turns.length,
      messages: messages.length,
      inferenceExecutions: executions.length,
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
    },
    latestEvent,
    recordedSpanOutfloSeconds: recordedSpan,
    temporalResolution: "Unix milliseconds",
    checks,
    failedChecks: failed,
    executionResults,
  };
}
