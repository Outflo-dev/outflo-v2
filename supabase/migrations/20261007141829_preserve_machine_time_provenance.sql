/* ==========================================================
   OUTFLO — PRESERVE MACHINE TIME PROVENANCE
   Scope: Preserve the observing server environment with each Machine-Time observation
   Last Updated:
   - date: 2026-10-07
   - note: add one immutable provenance snapshot without rewriting historical observations
   ========================================================== */

alter table public.machine_time_observations
    add column provenance_snapshot jsonb;

comment on column public.machine_time_observations.provenance_snapshot is
'Raw provenance snapshot of the runtime environment that produced the temporal observation. Historical rows predating provenance capture remain null.';

drop function if exists public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    text,
    text,
    text,
    text,
    text
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
    p_provenance_snapshot jsonb
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

    insert into public.machine_time_observations (
        user_id,
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
    uuid,
    bigint,
    text,
    bigint,
    text,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    text,
    text,
    text,
    text,
    text,
    jsonb
) from public;

revoke all on function public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    text,
    text,
    text,
    text,
    text,
    jsonb
) from anon;

revoke all on function public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    text,
    text,
    text,
    text,
    text,
    jsonb
) from authenticated;

grant execute on function public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    text,
    text,
    text,
    text,
    text,
    jsonb
) to service_role;

comment on function public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    text,
    text,
    text,
    text,
    text,
    jsonb
) is
'Persists one complete Machine-Time observation, derivation, canonical result, and observing-environment provenance snapshot.';
