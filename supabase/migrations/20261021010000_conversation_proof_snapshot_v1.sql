-- OUTFLO — CONVERSATION PROOF SNAPSHOT V1
-- One immutable verification record per evidence fingerprint.
-- Source records remain in their existing owners.
-- Open conversations produce snapshots, not completed spans.

create table public.conversation_proof_snapshots_v1 (
    proof_id uuid primary key default gen_random_uuid(),

    conversation_id uuid not null
        references public.conversations(conversation_id)
        on delete restrict,

    verifier_version text not null
        default 'verifyConversationProof4V1',

    source_sha256 text not null
        check (source_sha256 ~ '^[0-9a-f]{64}$'),

    source_manifest jsonb not null
        check (jsonb_typeof(source_manifest) = 'object'),

    snapshot_cutoff_at timestamptz not null,

    status_at_cutoff text not null
        check (status_at_cutoff in ('open', 'completed')),

    recorded_span_outflo_seconds text not null
        check (recorded_span_outflo_seconds ~ '^[0-9]+$'),

    checks jsonb not null
        check (jsonb_typeof(checks) = 'array'),

    verdict text not null
        check (verdict in ('verified', 'failed')),

    verified_at timestamptz not null default now(),

    unique (conversation_id, verifier_version, source_sha256)
);

alter table public.conversation_proof_snapshots_v1
    enable row level security;

revoke all on public.conversation_proof_snapshots_v1
    from public, anon, authenticated, service_role;

grant select on public.conversation_proof_snapshots_v1
    to authenticated, service_role;

create policy "Guides read their own Conversation Proofs"
on public.conversation_proof_snapshots_v1
for select to authenticated
using (
    exists (
        select 1
        from public.conversations c
        where c.conversation_id =
            conversation_proof_snapshots_v1.conversation_id
          and c.guide_id = (select auth.uid())
    )
);

-- Trusted immutable recording boundary.

create function public.record_conversation_proof_snapshot_v1(
    p_conversation_id uuid,
    p_guide_id uuid,
    p_source_sha256 text,
    p_source_manifest jsonb,
    p_snapshot_cutoff_at timestamptz,
    p_status_at_cutoff text,
    p_recorded_span_outflo_seconds text,
    p_checks jsonb,
    p_verdict text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_conversation record;
    v_id uuid;
begin
    select guide_id, status, created_at
    into v_conversation
    from public.conversations
    where conversation_id = p_conversation_id;

    if not found
       or v_conversation.guide_id is distinct from p_guide_id
    then
        raise exception 'Guide conversation not found.';
    end if;

    if p_status_at_cutoff is distinct from v_conversation.status
       or p_snapshot_cutoff_at < v_conversation.created_at
    then
        raise exception 'Invalid conversation snapshot boundary.';
    end if;

    if p_source_sha256 is null
       or p_source_sha256 !~ '^[0-9a-f]{64}$'
       or jsonb_typeof(p_source_manifest) is distinct from 'object'
       or p_snapshot_cutoff_at is null
       or p_recorded_span_outflo_seconds is null
       or p_recorded_span_outflo_seconds !~ '^[0-9]+$'
       or jsonb_typeof(p_checks) is distinct from 'array'
       or jsonb_array_length(p_checks) = 0
       or p_verdict not in ('verified', 'failed')
       or p_verdict is null
    then
        raise exception 'Invalid Conversation Proof evidence.';
    end if;

    if exists (
        select 1 from jsonb_array_elements(p_checks) as c(value)
        where jsonb_typeof(c.value->'passed') is distinct from 'boolean'
           or nullif(c.value->>'name', '') is null
    ) then
        raise exception 'Invalid verification checks.';
    end if;

    if (
        p_verdict = 'verified'
        and exists (
            select 1 from jsonb_array_elements(p_checks) as c(value)
            where c.value->>'passed' <> 'true'
        )
    ) or (
        p_verdict = 'failed'
        and not exists (
            select 1 from jsonb_array_elements(p_checks) as c(value)
            where c.value->>'passed' = 'false'
        )
    ) then
        raise exception 'Verification verdict contradicts checks.';
    end if;

    insert into public.conversation_proof_snapshots_v1 (
        conversation_id,
        source_sha256,
        source_manifest,
        snapshot_cutoff_at,
        status_at_cutoff,
        recorded_span_outflo_seconds,
        checks,
        verdict
    )
    values (
        p_conversation_id,
        p_source_sha256,
        p_source_manifest,
        p_snapshot_cutoff_at,
        p_status_at_cutoff,
        p_recorded_span_outflo_seconds,
        p_checks,
        p_verdict
    )
    on conflict (conversation_id, verifier_version, source_sha256)
    do nothing
    returning proof_id into v_id;

    if v_id is null then
        select proof_id into v_id
        from public.conversation_proof_snapshots_v1
        where conversation_id = p_conversation_id
          and verifier_version = 'verifyConversationProof4V1'
          and source_sha256 = p_source_sha256
          and source_manifest = p_source_manifest
          and snapshot_cutoff_at = p_snapshot_cutoff_at
          and status_at_cutoff = p_status_at_cutoff
          and recorded_span_outflo_seconds =
              p_recorded_span_outflo_seconds
          and checks = p_checks
          and verdict = p_verdict;

        if v_id is null then
            raise exception 'Conflicting immutable Conversation Proof.';
        end if;
    end if;

    return v_id;
end;
$$;

revoke all on function
public.record_conversation_proof_snapshot_v1(
    uuid, uuid, text, jsonb, timestamptz,
    text, text, jsonb, text
) from public, anon, authenticated;

grant execute on function
public.record_conversation_proof_snapshot_v1(
    uuid, uuid, text, jsonb, timestamptz,
    text, text, jsonb, text
) to service_role;
