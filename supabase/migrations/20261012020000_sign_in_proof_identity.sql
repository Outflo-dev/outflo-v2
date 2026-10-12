-- OUTFLŌ — SIGN IN PROOF IDENTITY
-- Preserve distinct Sign In executions without altering Creation.
-- Existing Machine observations remain valid.

alter table public.machine_time_observations
    add column sign_in_execution_id uuid;

alter table public.machine_time_observations
    add constraint machine_time_observations_sign_in_execution_unique
    unique (sign_in_execution_id);

alter table public.machine_time_observations
    add constraint machine_time_observations_execution_identity_exclusive
    check (
        creation_execution_id is null
        or sign_in_execution_id is null
    );

-- New 18-argument observation boundary.
-- The existing 17-argument function remains unchanged.
-- NULL preserves non-Sign-In observation behavior.

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
    p_sign_in_execution_id uuid
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


    if p_creation_execution_id is not null
       and p_sign_in_execution_id is not null then
        raise exception
            'Creation and Sign In identities are exclusive.';
    end if;

    if p_sign_in_execution_id is not null
       and not exists (
           select 1
           from public.profiles
           where user_id = p_user_id
             and outflo_begin_instant is not null
       ) then
        raise exception
            'Existing Outflō Begin is required.';
    end if;

    insert into public.machine_time_observations (
        user_id,
        creation_execution_id,
        sign_in_execution_id,
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
    text, text, text, text, text, jsonb, uuid, uuid
) from public, anon, authenticated;

grant execute on function public.record_machine_time_observation(
    uuid, bigint, text, bigint, text, bigint,
    bigint, bigint, bigint, bigint,
    text, text, text, text, text, jsonb, uuid, uuid
) to service_role;
