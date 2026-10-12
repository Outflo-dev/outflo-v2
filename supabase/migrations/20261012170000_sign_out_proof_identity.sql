-- OUTFLO — SIGN OUT PROOF IDENTITY

alter table public.machine_time_observations
    add column sign_out_execution_id uuid;

alter table public.machine_time_observations
    add constraint machine_time_observations_sign_out_execution_unique
    unique (sign_out_execution_id);

alter table public.machine_time_observations
    drop constraint machine_time_observations_execution_identity_exclusive;

alter table public.machine_time_observations
    add constraint machine_time_observations_execution_identity_exclusive
    check (
        num_nonnulls(
            creation_execution_id,
            sign_in_execution_id,
            sign_out_execution_id
        ) <= 1
    );
create function public.record_machine_time_observation(
    p_user_id uuid,
    p_first_wall_unix_milliseconds bigint,
    p_first_monotonic_milliseconds text,
    p_second_wall_unix_milliseconds bigint,
    p_second_monotonic_milliseconds text,
    p_raw_span_milliseconds bigint,
    p_observation_precision_milliseconds bigint,
    p_protected_first_unix_milliseconds bigint,
    p_protected_second_unix_milliseconds bigint,
    p_protected_span_milliseconds bigint,
    p_first_instant text,
    p_second_instant text,
    p_duration text,
    p_observation_method text,
    p_clock_definition text,
    p_provenance_snapshot jsonb,
    p_creation_execution_id uuid,
    p_sign_in_execution_id uuid,
    p_sign_out_execution_id uuid
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $function$
declare
    v_observation_id uuid;
begin
    if p_user_id is null then
        raise exception
            'Authentication identity is required.';
    end if;

    if not exists (
        select
        from auth.users
        where id = p_user_id
    ) then
        raise exception
            'Authentication identity does not exist.';
    end if;

    if p_first_wall_unix_milliseconds is null
       or p_first_monotonic_milliseconds is null
       or p_second_wall_unix_milliseconds is null
       or p_second_monotonic_milliseconds is null
       or p_raw_span_milliseconds is null
       or p_observation_precision_milliseconds is null
       or p_protected_first_unix_milliseconds is null
       or p_protected_second_unix_milliseconds is null
       or p_protected_span_milliseconds is null
       or p_first_instant is null
       or p_second_instant is null
       or p_duration is null
       or p_observation_method is null
       or p_clock_definition is null
       or p_provenance_snapshot is null
    then
        raise exception
            'Complete Machine-Time observation record is required.';
    end if;

    if p_creation_execution_id is not null then
        if not exists (
            select 1
            from public.profiles
            where user_id = p_user_id
              and creation_execution_id = p_creation_execution_id
              and outflo_begin_instant = p_first_instant
        ) then
            raise exception 'Creation observation does not match committed Outflō creation.';
        end if;
    end if;



    if (p_sign_in_execution_id is not null or p_sign_out_execution_id is not null)
       and not exists (
           select 1
           from public.profiles
           where user_id = p_user_id
             and outflo_begin_instant is not null
       ) then
        raise exception
            'Existing Outflō Begin is required.';
    end if;

    if num_nonnulls(p_creation_execution_id, p_sign_in_execution_id, p_sign_out_execution_id) > 1 then
        raise exception 'Execution identities are exclusive.';
    end if;

    insert into public.machine_time_observations (
        user_id,
        creation_execution_id,
        sign_in_execution_id,
        sign_out_execution_id,
        first_wall_unix_milliseconds,
        first_monotonic_milliseconds,
        second_wall_unix_milliseconds,
        second_monotonic_milliseconds,
        raw_span_milliseconds,
        observation_precision_milliseconds,
        protected_first_unix_milliseconds,
        protected_second_unix_milliseconds,
        protected_span_milliseconds,
        first_instant,
        second_instant,
        duration,
        observation_method,
        clock_definition,
        provenance_snapshot
    )
    values (
        p_user_id,
        p_creation_execution_id,
        p_sign_in_execution_id,
        p_sign_out_execution_id,
        p_first_wall_unix_milliseconds,
        p_first_monotonic_milliseconds,
        p_second_wall_unix_milliseconds,
        p_second_monotonic_milliseconds,
        p_raw_span_milliseconds,
        p_observation_precision_milliseconds,
        p_protected_first_unix_milliseconds,
        p_protected_second_unix_milliseconds,
        p_protected_span_milliseconds,
        p_first_instant,
        p_second_instant,
        p_duration,
        p_observation_method,
        p_clock_definition,
        p_provenance_snapshot
    )
    returning observation_id
    into v_observation_id;

    return v_observation_id;
end;
$function$;

revoke all on function public.record_machine_time_observation(
    uuid, bigint, text, bigint, text, bigint,
    bigint, bigint, bigint, bigint,
    text, text, text, text, text, jsonb, uuid, uuid, uuid
) from public, anon, authenticated;

grant execute on function public.record_machine_time_observation(
    uuid, bigint, text, bigint, text, bigint,
    bigint, bigint, bigint, bigint,
    text, text, text, text, text, jsonb, uuid, uuid, uuid
) to service_role;

-- Rebuild dependent emission views.
drop view public.machine_time_verified_emissions_v1;
drop view public.machine_time_emissions_v1;

create or replace view public.machine_time_emissions_v1
with (security_invoker = true)
as

with evidence as (
    select
        o.*,

        (
            o.second_wall_unix_milliseconds
            - o.first_wall_unix_milliseconds
            = o.raw_span_milliseconds
        ) as raw_span_ok,

        (
            o.first_wall_unix_milliseconds
            + o.observation_precision_milliseconds
            = o.protected_first_unix_milliseconds
        ) as protected_first_ok,

        (
            o.second_wall_unix_milliseconds
            - o.observation_precision_milliseconds
            = o.protected_second_unix_milliseconds
        ) as protected_second_ok,

        (
            o.protected_second_unix_milliseconds
            - o.protected_first_unix_milliseconds
            = o.protected_span_milliseconds
        ) as protected_span_ok,

        (
            o.second_instant::numeric
            - o.first_instant::numeric
            = o.duration::numeric
        ) as duration_ok

    from public.machine_time_observations o
)

select
    -- ALL ORIGINAL OBSERVATION COLUMNS
    e.*,

    -- WHAT HAPPENED
    case
        when e.creation_execution_id is not null
            then 'CREATION'
        when e.sign_in_execution_id is not null
            then 'SIGN IN'
            when e.sign_out_execution_id is not null then 'SIGN OUT'
        else 'UNATTRIBUTED'
    end as emission_subject,

    -- PERMANENT OUTFLO BEGIN
    p.outflo_begin_instant,
    p.creation_execution_id as profile_creation_execution_id,

    case
        when e.creation_execution_id is null then null
        else e.creation_execution_id = p.creation_execution_id
    end as creation_identity_matches,

    case
        when e.creation_execution_id is null then null
        else e.first_instant = p.outflo_begin_instant
    end as creation_begin_matches_entrance,

    case
        when p.outflo_begin_instant ~ '^-?[0-9]+$'
         and length(trim(leading '-' from p.outflo_begin_instant)) >= 28
        then (
            e.first_instant::numeric
            - p.outflo_begin_instant::numeric
        )::text
        else null
    end as since_outflo_begin_outfloseconds,

    -- ALL GUIDE BEGINS
    b.guide_begin_count,
    b.first_guide_begin_id,
    b.first_guide_begin_title,
    b.first_guide_begin_instant,
    b.all_guide_begins,

    case
        when b.first_guide_begin_instant ~ '^-?[0-9]+$'
         and length(trim(leading '-' from b.first_guide_begin_instant)) >= 28
        then (
            e.first_instant::numeric
            - b.first_guide_begin_instant::numeric
        )::text
        else null
    end as since_first_guide_begin_outfloseconds,

    -- HUMAN READABLE OBSERVATION TIMES
    to_timestamp(
        e.first_wall_unix_milliseconds::double precision / 1000
    ) at time zone 'America/New_York'
        as first_observed_miami_time,

    to_timestamp(
        e.second_wall_unix_milliseconds::double precision / 1000
    ) at time zone 'America/New_York'
        as second_observed_miami_time,

    -- INSPECTABLE SQL VERIFICATION
    case
        when e.raw_span_ok
         and e.protected_first_ok
         and e.protected_second_ok
         and e.protected_span_ok
         and e.duration_ok
        then '5/5 SQL ARITHMETIC CHECKS PASS'
        else 'INCOMPLETE OR FAILED SQL CHECKS'
    end as sql_inspection_status,

    -- MACHINE PROOF VERIFICATION IS A DISTINCT OWNER
    'NOT EXECUTED IN SQL VIEW'::text
        as full_machine_proof_status,

    -- COMPOSED EMISSION
    concat(
        case
            when e.creation_execution_id is not null then 'CREATION'
            when e.sign_in_execution_id is not null then 'SIGN IN'
            when e.sign_out_execution_id is not null then 'SIGN OUT'
            else 'UNATTRIBUTED'
        end,
        ' | Observation: ', e.observation_id,
        ' | First: ', e.first_instant,
        ' | Second: ', e.second_instant,
        ' | Duration: ', e.duration, ' Outflōseconds',
        ' | Outflō Begin: ', coalesce(p.outflo_begin_instant, 'UNKNOWN')
    ) as emission_text

from evidence e

left join public.profiles p
    on p.user_id = e.user_id

left join lateral (
    select
        count(*)::integer as guide_begin_count,

        (
            array_agg(
                g.begin_id
                order by g.begin_instant::numeric, g.begin_id
            )
        )[1] as first_guide_begin_id,

        (
            array_agg(
                g.title
                order by g.begin_instant::numeric, g.begin_id
            )
        )[1] as first_guide_begin_title,

        (
            array_agg(
                g.begin_instant
                order by g.begin_instant::numeric, g.begin_id
            )
        )[1] as first_guide_begin_instant,

        coalesce(
            jsonb_agg(
                jsonb_build_object(
                    'begin_id', g.begin_id,
                    'title', g.title,
                    'begin_instant', g.begin_instant,
                    'since_begin_outfloseconds',
                    case
                        when g.begin_instant ~ '^-?[0-9]+$'
                         and length(trim(leading '-' from g.begin_instant)) >= 28
                        then (
                            e.first_instant::numeric
                            - g.begin_instant::numeric
                        )::text
                        else null
                    end
                )
                order by g.begin_instant::numeric, g.begin_id
            ) filter (where g.begin_id is not null),
            '[]'::jsonb
        ) as all_guide_begins

    from public.guide_begins g
    where g.user_id = e.user_id
) b on true;

revoke all
on public.machine_time_emissions_v1
from public, anon;

grant select
on public.machine_time_emissions_v1
to authenticated;

comment on view public.machine_time_emissions_v1 is
'Live inspection of recorded Machine Time, execution identities, Outflo Begin, Guide Begins, provenance and derived arithmetic. Full Machine verification remains separately owned.';
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
