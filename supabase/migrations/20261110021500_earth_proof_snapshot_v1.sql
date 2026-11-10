-- OUTFLO EARTH — PROOF SNAPSHOT V1
--
-- Owner: Earth Proof persistence.
-- Original scientific evidence remains in Earth source/admission.
-- Machine owns all canonical mathematics.
-- Proof owns verification.
--
-- One immutable record per event, collection, verifier,
-- and evidence-manifest fingerprint.

create table public.earth_proof_snapshots_v1 (
  proof_id uuid primary key default gen_random_uuid(),

  event_id text not null
    references public.earth_events(event_id)
    on delete restrict,

  collection_id uuid not null,

  verifier_version text not null
    default 'verifyProtectedTemporalIntervalV1'
    check (
      verifier_version = 'verifyProtectedTemporalIntervalV1'
    ),

  manifest_sha256 text not null
    check (manifest_sha256 ~ '^[0-9a-f]{64}$'),

  source_manifest jsonb not null
    check (jsonb_typeof(source_manifest) = 'object'),

  intervals jsonb not null
    check (jsonb_typeof(intervals) = 'array'),

  verdict text not null
    check (verdict in ('verified', 'failed')),

  recorded_at timestamptz not null default now(),

  unique (
    event_id,
    collection_id,
    verifier_version,
    manifest_sha256
  )
);

alter table public.earth_proof_snapshots_v1
  enable row level security;

revoke all on public.earth_proof_snapshots_v1
  from public, anon, authenticated, service_role;

grant select on public.earth_proof_snapshots_v1
  to service_role;

-- Trusted recording boundary.
-- Direct client writes are not permitted.

create function public.record_earth_proof_snapshot_v1(
  p_event_id text,
  p_collection_id uuid,
  p_manifest_sha256 text,
  p_source_manifest jsonb,
  p_intervals jsonb,
  p_verdict text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_interval jsonb;
  v_check jsonb;
  v_interval_failed boolean;
  v_all_verified boolean := true;
begin
  if not exists (
    select 1
    from public.earth_events e
    where e.event_id = p_event_id
  ) then
    raise exception 'Earth event not admitted.';
  end if;

  if not exists (
    select 1
    from public.earth_source_receipts r
    where r.event_id = p_event_id
      and r.collection_id = p_collection_id
  ) then
    raise exception 'Earth evidence collection not found.';
  end if;

  if p_manifest_sha256 is null
    or p_manifest_sha256 !~ '^[0-9a-f]{64}$'
    or jsonb_typeof(p_source_manifest) is distinct from 'object'
    or p_source_manifest->>'eventId' is distinct from p_event_id
    or p_source_manifest->>'collectionId'
      is distinct from p_collection_id::text
    or jsonb_typeof(p_intervals) is distinct from 'array'
    or p_verdict not in ('verified', 'failed')
    or p_verdict is null
  then
    raise exception 'Invalid Earth Proof snapshot.';
  end if;

  if jsonb_array_length(p_intervals) = 0 then
    raise exception 'Earth Proof contains no intervals.';
  end if;

  for v_interval in
    select value
    from jsonb_array_elements(p_intervals) as item(value)
  loop
    if jsonb_typeof(
      v_interval->'verification'->'checks'
    ) is distinct from 'array' then
      raise exception 'Invalid Earth verification checks.';
    end if;

    if jsonb_array_length(
      v_interval->'verification'->'checks'
    ) <> 9 then
      raise exception 'Expected nine primitive checks.';
    end if;

    v_interval_failed := false;

    for v_check in
      select value
      from jsonb_array_elements(
        v_interval->'verification'->'checks'
      ) as item(value)
    loop
      if nullif(v_check->>'check', '') is null
        or coalesce(v_check->>'result', '')
          not in ('pass', 'fail')
      then
        raise exception 'Malformed Earth verification check.';
      end if;

      if v_check->>'result' = 'fail' then
        v_interval_failed := true;
      end if;
    end loop;

    if (
      v_interval_failed and
      v_interval->'verification'->>'verdict' is distinct from 'failed'
    ) or (
      not v_interval_failed and
      v_interval->'verification'->>'verdict' is distinct from 'verified'
    ) then
      raise exception 'Earth interval verdict contradicts checks.';
    end if;

    if v_interval_failed then
      v_all_verified := false;
    end if;
  end loop;

  if (
      v_all_verified and p_verdict is distinct from 'verified'
    ) or (
      not v_all_verified and p_verdict is distinct from 'failed'
    ) then
    raise exception 'Earth Proof verdict contradicts intervals.';
  end if;

  insert into public.earth_proof_snapshots_v1 (
    event_id,
    collection_id,
    manifest_sha256,
    source_manifest,
    intervals,
    verdict
  )
  values (
    p_event_id,
    p_collection_id,
    p_manifest_sha256,
    p_source_manifest,
    p_intervals,
    p_verdict
  )
  on conflict (
    event_id,
    collection_id,
    verifier_version,
    manifest_sha256
  )
  do nothing
  returning proof_id into v_id;

  if v_id is null then
    select proof_id into v_id
    from public.earth_proof_snapshots_v1
    where event_id = p_event_id
      and collection_id = p_collection_id
      and verifier_version =
        'verifyProtectedTemporalIntervalV1'
      and manifest_sha256 = p_manifest_sha256
      and source_manifest = p_source_manifest
      and intervals = p_intervals
      and verdict = p_verdict;

    if v_id is null then
      raise exception 'Conflicting immutable Earth Proof.';
    end if;
  end if;

  return v_id;
end;
$$;

revoke all on function
  public.record_earth_proof_snapshot_v1(
    text, uuid, text, jsonb, jsonb, text
  )
from public, anon, authenticated;

grant execute on function
  public.record_earth_proof_snapshot_v1(
    text, uuid, text, jsonb, jsonb, text
  )
to service_role;
