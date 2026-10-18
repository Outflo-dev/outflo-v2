"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

import BackNavigationAction from
  "@/components/system/primitives/actions/navigation/BackNavigationAction";
import OutfloMark from
  "@/components/system/primitives/marks/outflo/OutfloMark";

import styles from "./ConversationSurface.module.css";

type Message = {
  messageId: string;
  author: "guide" | "outflo";
  content: string;
};

type Turn = {
  turnId: string;
  turnOrdinal: number;
  messages: Message[];
};

type Conversation = {
  conversationId: string;
  status: "open" | "completed";
  turns: Turn[];
};

const API = "/api/conversations";

async function requestJson<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.error ?? `Conversation request failed (${response.status}).`,
    );
  }

  return response.json() as Promise<T>;
}

function describeError(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Conversation temporarily unavailable.";
}

export default function ConversationSurface() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [runningTurnId, setRunningTurnId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const locked = useRef(false);
  const scrollArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    async function enter() {
      try {
        const active = await requestJson<{ conversationId: string }>(
          API,
          { method: "POST" },
        );

        const history = await requestJson<Conversation>(
          `${API}/${active.conversationId}`,
        );

        if (mounted) setConversation(history);
      } catch (failure) {
        if (mounted) setError(describeError(failure));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void enter();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const area = scrollArea.current;
    if (area) area.scrollTop = area.scrollHeight;
  }, [conversation, runningTurnId]);

  async function refresh(conversationId: string) {
    const history = await requestJson<Conversation>(
      `${API}/${conversationId}`,
    );
    setConversation(history);
  }

  async function completeTurn(conversationId: string, turnId: string) {
    setRunningTurnId(turnId);
    let failure: unknown = null;

    try {
      const response = await fetch(
        `${API}/${conversationId}/turns/${turnId}/complete`,
        { method: "POST", cache: "no-store" },
      );

      if (!response.ok && response.status !== 409) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Outflō response unavailable.");
      }
    } catch (error) {
      failure = error;
    }

    try {
      await refresh(conversationId);
    } catch (error) {
      if (!failure) failure = error;
    } finally {
      setRunningTurnId(null);
    }

    if (failure) throw failure;
  }

  const turns = conversation?.turns ?? [];

  const hasUnansweredTurn = turns.some(
    (turn) =>
      turn.messages.some((message) => message.author === "guide") &&
      !turn.messages.some((message) => message.author === "outflo"),
  );

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = draft.trim();

    if (
      !conversation ||
      conversation.status !== "open" ||
      !content ||
      hasUnansweredTurn ||
      locked.current
    ) return;

    locked.current = true;
    setBusy(true);
    setError(null);

    const conversationId = conversation.conversationId;

    try {
      const admitted = await requestJson<{ turnId: string }>(
        `${API}/${conversationId}/turns`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        },
      );

      setDraft("");

      // Admission is persisted before inference begins.
      try {
        await refresh(conversationId);
      } catch {
        // Continue the admitted turn regardless of display-read failure.
      }

      await completeTurn(conversationId, admitted.turnId);
    } catch (failure) {
      setError(describeError(failure));

      try {
        await refresh(conversationId);
      } catch {
        // The persisted record remains the source of truth.
      }
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  async function retryTurn(turnId: string) {
    if (!conversation || locked.current) return;

    locked.current = true;
    setBusy(true);
    setError(null);

    try {
      await completeTurn(conversation.conversationId, turnId);
    } catch (failure) {
      setError(describeError(failure));
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <section className={styles.surface}>
      <header className={styles.header}>
        <BackNavigationAction href="/home" label="Back to Begin" />
      </header>

      <div ref={scrollArea} className={styles.content}>
        {loading ? (
          <p className={styles.notice}>Entering Conversation…</p>
        ) : conversation && turns.length === 0 ? (
          <div className={styles.entrance}>
            <OutfloMark size={110} title="Outflō" />
            <h1 className={styles.title}>
              Converse in Abstract Time.
            </h1>
          </div>
        ) : (
          <div className={styles.thread}>
            {turns.map((turn) => {
              const hasGuide = turn.messages.some(
                (message) => message.author === "guide",
              );
              const hasReply = turn.messages.some(
                (message) => message.author === "outflo",
              );
              const unanswered = hasGuide && !hasReply;
              const responding = runningTurnId === turn.turnId;

              return (
                <div key={turn.turnId} className={styles.turn}>
                  {turn.messages.map((message) => (
                    <div
                      key={message.messageId}
                      className={
                        message.author === "guide"
                          ? styles.guideMessage
                          : styles.outfloMessage
                      }
                    >
                      {message.content}
                    </div>
                  ))}

                  {unanswered && responding ? (
                    <div className={styles.pending} role="status">
                      <span className={styles.pendingMark}>
                        <OutfloMark
                          size={30}
                          title="Outflō responding"
                        />
                      </span>
                    </div>
                  ) : null}

                  {unanswered && !responding ? (
                    <button
                      type="button"
                      className={styles.retry}
                      disabled={busy}
                      onClick={() => void retryTurn(turn.turnId)}
                    >
                      Continue response
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error ? (
        <p
          className={`${styles.notice} ${styles.error}`}
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <form className={styles.composer} onSubmit={send}>
        <textarea
          className={styles.input}
          aria-label="Message Outflō"
          placeholder="Message Outflō…"
          rows={2}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={
            !conversation ||
            conversation.status !== "open" ||
            busy ||
            hasUnansweredTurn
          }
        />

        <button
          className={styles.send}
          type="submit"
          disabled={
            !conversation ||
            conversation.status !== "open" ||
            busy ||
            hasUnansweredTurn ||
            !draft.trim()
          }
        >
          Send
        </button>
      </form>
    </section>
  );
}
