/*
 OUTFLO — MACHINE TIME EMISSIONS V1
 Read-only composition of existing canonical records.
 No historical observations are modified.
*/

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
