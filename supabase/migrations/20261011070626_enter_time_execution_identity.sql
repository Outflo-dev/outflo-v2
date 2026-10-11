/* ==========================================================
   OUTFLŌ — ENTER TIME EXECUTION IDENTITY
   File: supabase/migrations/20261011070626_enter_time_execution_identity.sql
   Scope: Preserve the causal identity of Outflō creation
          and its observed Machine Time evidence
   Last Updated:
   - Outflō Time: 847940160048489677527467434263
   - note: preserve existing RPC signatures during staged activation
   - Outflō Time: 847937961822553110002352219277
   - note: establish durable creation-to-observation ownership
   ========================================================== */

-- Creation owns its execution identity.
alter table public.profiles
    add column creation_execution_id uuid;

alter table public.profiles
    add constraint profiles_creation_execution_id_unique
    unique (creation_execution_id);

-- Enforce same-Guide references from observation.
alter table public.profiles
    add constraint profiles_user_creation_execution_id_unique
    unique (user_id, creation_execution_id);

-- Historical and unrelated observations remain unlinked.
alter table public.machine_time_observations
    add column creation_execution_id uuid;

-- At most one observation may claim each creation.
alter table public.machine_time_observations
    add constraint machine_time_observations_creation_execution_id_unique
    unique (creation_execution_id);

-- Linked evidence must belong to the originating Guide.
alter table public.machine_time_observations
    add constraint machine_time_observations_creation_execution_owner_fkey
    foreign key (user_id, creation_execution_id)
    references public.profiles (user_id, creation_execution_id);

-- TRUSTED EXECUTION RPCS

-- Replace old creation boundary with required execution identity.

create function public.enter_time(
    p_user_id uuid,
    p_guide_begin_instant text,
    p_outflo_begin_instant text,
    p_creation_execution_id uuid
)
returns text
language plpgsql
security definer
set search_path = ''
as $function$
begin
    /* ------------------------------
       Authentication Identity
    -------------------------------- */

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

    /* ------------------------------
       Creation Boundary
    -------------------------------- */

    if exists (
        select
        from public.profiles
        where user_id = p_user_id
    ) then
        raise exception
            'Outflō already exists for this Guide.';
    end if;

    /* ------------------------------
       Required Canonical Values
    -------------------------------- */

    if p_guide_begin_instant is null
       or p_outflo_begin_instant is null
    then
        raise exception
            'Canonical temporal instants are required.';
    end if;

    if p_creation_execution_id is null then
        raise exception 'Creation execution identity is required.';
    end if;

    /* ------------------------------
       Atomic Creation
    -------------------------------- */

    insert into public.guide_begins (
        user_id,
        begin_instant
    )
    values (
        p_user_id,
        p_guide_begin_instant
    );

    insert into public.profiles (
        user_id,
        outflo_begin_instant,
        creation_execution_id
    )
    values (
        p_user_id,
        p_outflo_begin_instant,
        p_creation_execution_id
    );

    return p_outflo_begin_instant;
end;
$function$;

revoke all on function public.enter_time(uuid, text, text, uuid) from public, anon, authenticated;
grant execute on function public.enter_time(uuid, text, text, uuid) to service_role;

-- Preserve unrelated Machine observations through the optional parameter.

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
    p_creation_execution_id uuid
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

    insert into public.machine_time_observations (
        user_id,
        creation_execution_id,
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

revoke all on function public.record_machine_time_observation(uuid, bigint, text, bigint, text, bigint, bigint, bigint, bigint, bigint, text, text, text, text, text, jsonb, uuid) from public, anon, authenticated;
grant execute on function public.record_machine_time_observation(uuid, bigint, text, bigint, text, bigint, bigint, bigint, bigint, bigint, text, text, text, text, text, jsonb, uuid) to service_role;
