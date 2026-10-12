/*
 OUTFLO — MACHINE TIME PROOF VERIFICATIONS V1

 The Machine verifies. The database records its verdict.
 One immutable result per observation per verifier version.
*/

create table public.machine_time_proof_verifications_v1 (
    verification_id uuid primary key default gen_random_uuid(),

    observation_id uuid not null
        references public.machine_time_observations(observation_id)
        on delete cascade,

    verifier_version text not null
        default 'verifyMachineTimeObservationV1',

    verdict text not null check (
        verdict in (
            'verified',
            'failed',
            'incomplete',
            'unsupported-version',
            'invalid-evidence'
        )
    ),

    checks jsonb not null default '[]'::jsonb,
    missing_fields jsonb not null default '[]'::jsonb,

    verified_at timestamptz not null default now(),

    constraint machine_proof_verification_unique
        unique (observation_id, verifier_version),

    constraint machine_proof_checks_are_arrays
        check (
            jsonb_typeof(checks) = 'array'
            and jsonb_typeof(missing_fields) = 'array'
        )
);

alter table public.machine_time_proof_verifications_v1
    enable row level security;

revoke all on public.machine_time_proof_verifications_v1
    from public, anon, authenticated, service_role;

grant select on public.machine_time_proof_verifications_v1
    to authenticated, service_role;

create policy "Guides read their own Machine Proof verification"
on public.machine_time_proof_verifications_v1
for select to authenticated
using (
    exists (
        select 1
        from public.machine_time_observations o
        where o.observation_id =
            machine_time_proof_verifications_v1.observation_id
          and o.user_id = (select auth.uid())
    )
);

/* Trusted recording boundary. No direct ledger writes. */

create function public.record_machine_time_proof_verification_v1(
    p_observation_id uuid,
    p_verdict text,
    p_checks jsonb,
    p_missing_fields jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $function$
declare
    v_id uuid;
    v_expected text[] := array[
        'raw-span',
        'protected-entrance',
        'protected-completion',
        'protected-span',
        'first-canonical-instant',
        'second-canonical-instant',
        'canonical-duration'
    ];
begin
    if p_observation_id is null or not exists (
        select 1 from public.machine_time_observations
        where observation_id = p_observation_id
    ) then
        raise exception 'Existing observation required.';
    end if;

    if p_verdict not in (
        'verified', 'failed', 'incomplete',
        'unsupported-version', 'invalid-evidence'
    ) or p_verdict is null then
        raise exception 'Unsupported verification verdict.';
    end if;

    if p_checks is null
       or p_missing_fields is null
       or jsonb_typeof(p_checks) is distinct from 'array'
       or jsonb_typeof(p_missing_fields) is distinct from 'array'
    then
        raise exception 'Verification evidence must be arrays.';
    end if;

    if p_verdict in ('verified', 'failed') then
        if jsonb_array_length(p_checks) <> 7
           or (
               select count(distinct c.value->>'check')
               from jsonb_array_elements(p_checks) as c(value)
               where c.value->>'check' = any(v_expected)
           ) <> 7
           or exists (
               select 1
               from jsonb_array_elements(p_checks) as c(value)
               where c.value->>'result' is distinct from 'pass'
                 and c.value->>'result' is distinct from 'fail'
           )
        then
            raise exception 'Complete seven-check Machine verdict required.';
        end if;

        if (
            select count(*)
            from jsonb_array_elements(p_checks) as c(value)
            where c.value->>'result' = 'fail'
        ) = 0 and p_verdict = 'failed' then
            raise exception 'Failed verdict requires a failed check.';
        end if;

        if (
            select count(*)
            from jsonb_array_elements(p_checks) as c(value)
            where c.value->>'result' = 'fail'
        ) > 0 and p_verdict = 'verified' then
            raise exception 'Verified verdict cannot contain failed checks.';
        end if;
    elsif jsonb_array_length(p_checks) <> 0 then
        raise exception 'Unverified evidence cannot claim executed checks.';
    end if;

    insert into public.machine_time_proof_verifications_v1 (
        observation_id,
        verifier_version,
        verdict,
        checks,
        missing_fields
    )
    values (
        p_observation_id,
        'verifyMachineTimeObservationV1',
        p_verdict,
        p_checks,
        p_missing_fields
    )
    on conflict (observation_id, verifier_version)
    do nothing
    returning verification_id into v_id;

    if v_id is null then
        select verification_id into v_id
        from public.machine_time_proof_verifications_v1
        where observation_id = p_observation_id
          and verifier_version = 'verifyMachineTimeObservationV1'
          and verdict = p_verdict
          and checks = p_checks
          and missing_fields = p_missing_fields;

        if v_id is null then
            raise exception 'Conflicting immutable verification record.';
        end if;
    end if;

    return v_id;
end;
$function$;

revoke all on function
public.record_machine_time_proof_verification_v1(
    uuid, text, jsonb, jsonb
) from public, anon, authenticated;

grant execute on function
public.record_machine_time_proof_verification_v1(
    uuid, text, jsonb, jsonb
) to service_role;

/* Inspection: original emissions plus actual Machine verdicts. */

create view public.machine_time_verified_emissions_v1
with (security_invoker = true)
as
select
    e.*,

    v.verification_id as proof_verification_id,
    v.verifier_version as machine_verifier_version,
    coalesce(v.verdict, 'not-yet-verified')
        as machine_proof_verdict,

    v.verified_at as machine_proof_verified_at,
    v.checks as machine_proof_checks,
    v.missing_fields as machine_proof_missing_fields,

    c.results->>'raw-span'
        as proof_raw_span,
    c.results->>'protected-entrance'
        as proof_protected_entrance,
    c.results->>'protected-completion'
        as proof_protected_completion,
    c.results->>'protected-span'
        as proof_protected_span,
    c.results->>'first-canonical-instant'
        as proof_first_canonical_instant,
    c.results->>'second-canonical-instant'
        as proof_second_canonical_instant,
    c.results->>'canonical-duration'
        as proof_canonical_duration,

    case when v.verification_id is null then null
         else jsonb_array_length(v.checks)
    end as machine_proof_total_checks

from public.machine_time_emissions_v1 e

left join public.machine_time_proof_verifications_v1 v
    on v.observation_id = e.observation_id
   and v.verifier_version = 'verifyMachineTimeObservationV1'

left join lateral (
    select jsonb_object_agg(
        item.value->>'check',
        item.value->>'result'
    ) as results
    from jsonb_array_elements(
        coalesce(v.checks, '[]'::jsonb)
    ) as item(value)
) c on true;

revoke all on public.machine_time_verified_emissions_v1
    from public, anon;

grant select on public.machine_time_verified_emissions_v1
    to authenticated, service_role;
