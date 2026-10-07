/* ==========================================================
   OUTFLO — MACHINE TIME OBSERVATIONS
   Scope: Persist immutable observations of Machine Time without duplicating Machine law
   Last Updated:
   - date: 2026-10-07
   - note: establish the first persistence owner for observed Machine-Time intervals
   ========================================================== */

/* ------------------------------
   Machine-Time Observation Ledger
-------------------------------- */

create table public.machine_time_observations (
    observation_id uuid
        primary key
        default gen_random_uuid(),

    user_id uuid
        not null
        references auth.users(id)
        on delete cascade,

    first_wall_unix_milliseconds bigint
        not null,

    first_monotonic_milliseconds text
        not null,

    second_wall_unix_milliseconds bigint
        not null,

    second_monotonic_milliseconds text
        not null,

    first_instant text
        not null,

    second_instant text
        not null,

    duration text
        not null,

    observation_method text
        not null,

    clock_definition text
        not null,

    persisted_at timestamptz
        not null
        default now()
);

create index machine_time_observations_user_id_idx
    on public.machine_time_observations(user_id);

/* ------------------------------
   Observation Access
-------------------------------- */

alter table public.machine_time_observations
    enable row level security;

revoke all
on table public.machine_time_observations
from anon;

revoke all
on table public.machine_time_observations
from authenticated;

grant select
on table public.machine_time_observations
to authenticated;

create policy "Guides can read their own Machine Time observations"
on public.machine_time_observations
for select
to authenticated
using (
    user_id = (select auth.uid())
);

/* ------------------------------
   Observation Meaning
-------------------------------- */

comment on table public.machine_time_observations is
'Immutable persisted records of Machine-Time intervals resolved by the Outflō Machine from runtime temporal observations.';

comment on column public.machine_time_observations.observation_id is
'Immutable identity of one observed Machine-Time interval.';

comment on column public.machine_time_observations.user_id is
'Authentication identity associated with this observed Machine-Time interval.';

comment on column public.machine_time_observations.first_wall_unix_milliseconds is
'Raw first platform wall-clock observation expressed in Unix milliseconds.';

comment on column public.machine_time_observations.first_monotonic_milliseconds is
'Raw first platform monotonic reading preserved as its runtime decimal representation in milliseconds.';

comment on column public.machine_time_observations.second_wall_unix_milliseconds is
'Raw second platform wall-clock observation expressed in Unix milliseconds.';

comment on column public.machine_time_observations.second_monotonic_milliseconds is
'Raw second platform monotonic reading preserved as its runtime decimal representation in milliseconds.';

comment on column public.machine_time_observations.first_instant is
'First canonical TemporalInstant128 serialized by the Outflō Machine.';

comment on column public.machine_time_observations.second_instant is
'Second canonical TemporalInstant128 serialized by the Outflō Machine.';

comment on column public.machine_time_observations.duration is
'Canonical TemporalDuration128 serialized by the Outflō Machine.';

comment on column public.machine_time_observations.observation_method is
'Versioned runtime method that produced and resolved the temporal observations.';

comment on column public.machine_time_observations.clock_definition is
'Clock definition under which the canonical temporal values were resolved.';

comment on column public.machine_time_observations.persisted_at is
'Database persistence time for this record. Not a canonical Outflō temporal coordinate.';

/* ------------------------------
   Trusted Observation Write
-------------------------------- */

create function public.record_machine_time_observation(
    p_user_id uuid,
    p_first_wall_unix_milliseconds bigint,
    p_first_monotonic_milliseconds text,
    p_second_wall_unix_milliseconds bigint,
    p_second_monotonic_milliseconds text,
    p_first_instant text,
    p_second_instant text,
    p_duration text,
    p_observation_method text,
    p_clock_definition text
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
       or p_first_instant is null
       or p_second_instant is null
       or p_duration is null
       or p_observation_method is null
       or p_clock_definition is null
    then
        raise exception
            'Complete Machine-Time observation is required.';
    end if;

    insert into public.machine_time_observations (
        user_id,
        first_wall_unix_milliseconds,
        first_monotonic_milliseconds,
        second_wall_unix_milliseconds,
        second_monotonic_milliseconds,
        first_instant,
        second_instant,
        duration,
        observation_method,
        clock_definition
    )
    values (
        p_user_id,
        p_first_wall_unix_milliseconds,
        p_first_monotonic_milliseconds,
        p_second_wall_unix_milliseconds,
        p_second_monotonic_milliseconds,
        p_first_instant,
        p_second_instant,
        p_duration,
        p_observation_method,
        p_clock_definition
    )
    returning observation_id
    into v_observation_id;

    return v_observation_id;
end;
$function$;

/* ------------------------------
   Trusted Write Access
-------------------------------- */

revoke all on function public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    text,
    text,
    text,
    text,
    text
) from public;

revoke all on function public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    text,
    text,
    text,
    text,
    text
) from anon;

revoke all on function public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    text,
    text,
    text,
    text,
    text
) from authenticated;

grant execute on function public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    text,
    text,
    text,
    text,
    text
) to service_role;

comment on function public.record_machine_time_observation(
    uuid,
    bigint,
    text,
    bigint,
    text,
    text,
    text,
    text,
    text,
    text
) is
'Persists one trusted Machine-Time observation exactly as resolved and serialized by the Outflō runtime and Machine.';
