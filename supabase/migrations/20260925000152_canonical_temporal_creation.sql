/* ==========================================================
   OUTFLO — CANONICAL TEMPORAL CREATION
   File: supabase/migrations/20260925000152_canonical_temporal_creation.sql
   Scope: Establish canonical TemporalInstant128 persistence and the new atomic Outflō creation boundary
   Last Updated:
   - date: 2026-09-24
   - note: replace new-creation Unix-millisecond ownership with exact signed-128-bit Clock coordinates
   ========================================================== */

/* ------------------------------
   Canonical Temporal Bounds
-------------------------------- */

/*
  TemporalInstant128:

  MIN
  -170141183460469231731687303715884105728

  MAX
   170141183460469231731687303715884105727

  PostgreSQL numeric(39, 0) preserves the complete signed 128-bit
  integer domain exactly.
*/

/* ------------------------------
   Profiles — Outflō Begin
-------------------------------- */

alter table public.profiles
    rename column entered_at_ms
    to legacy_entered_at_ms;

alter table public.profiles
    alter column legacy_entered_at_ms
        drop default,
    alter column legacy_entered_at_ms
        drop not null;

alter table public.profiles
    add column outflo_begin_instant numeric(39, 0);

alter table public.profiles
    add constraint profiles_outflo_begin_instant_range
    check (
        outflo_begin_instant is null
        or outflo_begin_instant between
            -170141183460469231731687303715884105728
            and
             170141183460469231731687303715884105727
    );

alter table public.profiles
    add constraint profiles_begin_representation
    check (
        (
            outflo_begin_instant is not null
            and legacy_entered_at_ms is null
        )
        or
        (
            outflo_begin_instant is null
            and legacy_entered_at_ms is not null
        )
    );

comment on column public.profiles.legacy_entered_at_ms is
'Legacy Unix-millisecond Outflō Begin representation. Preserved only for pre-Clock rows and not used for new canonical creation.';

comment on column public.profiles.outflo_begin_instant is
'Immutable canonical Outflō Begin stored as an exact TemporalInstant128 Clock coordinate.';

/* ------------------------------
   Guide Begins
-------------------------------- */

create table public.guide_begins (
    begin_id uuid
        primary key
        default gen_random_uuid(),

    user_id uuid
        not null
        references auth.users(id)
        on delete cascade,

    begin_instant numeric(39, 0)
        not null,

    constraint guide_begins_begin_instant_range
        check (
            begin_instant between
                -170141183460469231731687303715884105728
                and
                 170141183460469231731687303715884105727
        )
);

create index guide_begins_user_id_idx
    on public.guide_begins(user_id);

alter table public.guide_begins
    enable row level security;

revoke all
on table public.guide_begins
from anon;

revoke all
on table public.guide_begins
from authenticated;

grant select
on table public.guide_begins
to authenticated;

create policy "Guides can read their own Begins"
on public.guide_begins
for select
to authenticated
using (
    user_id = (select auth.uid())
);

comment on table public.guide_begins is
'Guide-owned repeatable Begin anchors on the canonical Outflō Clock.';

comment on column public.guide_begins.begin_id is
'Immutable identity of one Guide Begin.';

comment on column public.guide_begins.user_id is
'Authentication identity that owns this Guide Begin.';

comment on column public.guide_begins.begin_instant is
'Canonical TemporalInstant128 coordinate owned by this Guide Begin.';

comment on table public.guide_time is
'Legacy Unix-millisecond Guide Time representation. No new canonical Begin writes occur here.';

/* ------------------------------
   Retire Legacy Creation
-------------------------------- */

drop function if exists public.enter_time(
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    bigint
);

/* ------------------------------
   Canonical Enter Time
-------------------------------- */

create function public.enter_time(
    p_user_id uuid,
    p_username text,
    p_guide_begin_instant numeric,
    p_outflo_begin_instant numeric
)
returns text
language plpgsql
security definer
set search_path = ''
as $function$
declare
    v_outflo_begin_serialized text;
begin
    /* ------------------------------
       Authentication Identity
    -------------------------------- */

    if p_user_id is null then
        raise exception 'Authentication identity is required.'
            using errcode = '22004';
    end if;

    if not exists (
        select 1
        from auth.users
        where id = p_user_id
    ) then
        raise exception 'Authentication identity does not exist.'
            using errcode = '23503';
    end if;

    /* ------------------------------
       Creation Boundary
    -------------------------------- */

    if exists (
        select 1
        from public.profiles
        where user_id = p_user_id
    ) then
        raise exception 'Outflō already exists for this Guide.'
            using errcode = 'P0001';
    end if;

    /* ------------------------------
       Canonical Temporal Validation
    -------------------------------- */

    if p_guide_begin_instant is null
       or p_outflo_begin_instant is null
    then
        raise exception 'Canonical temporal instants are required.'
            using errcode = '22004';
    end if;

    if p_guide_begin_instant <> trunc(p_guide_begin_instant)
       or p_outflo_begin_instant <> trunc(p_outflo_begin_instant)
    then
        raise exception 'Temporal instants must be integer Clock coordinates.'
            using errcode = '22003';
    end if;

    if p_guide_begin_instant <
           -170141183460469231731687303715884105728
       or p_guide_begin_instant >
            170141183460469231731687303715884105727
    then
        raise exception 'Guide Begin exceeds the signed 128-bit temporal domain.'
            using errcode = '22003';
    end if;

    if p_outflo_begin_instant <
           -170141183460469231731687303715884105728
       or p_outflo_begin_instant >
            170141183460469231731687303715884105727
    then
        raise exception 'Outflō Begin exceeds the signed 128-bit temporal domain.'
            using errcode = '22003';
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
        username,
        outflo_begin_instant
    )
    values (
        p_user_id,
        p_username,
        p_outflo_begin_instant
    );

    v_outflo_begin_serialized :=
        p_outflo_begin_instant::text;

    return v_outflo_begin_serialized;
end;
$function$;

/* ------------------------------
   Creation Access
-------------------------------- */

revoke all on function public.enter_time(
    uuid,
    text,
    numeric,
    numeric
) from public;

revoke all on function public.enter_time(
    uuid,
    text,
    numeric,
    numeric
) from anon;

revoke all on function public.enter_time(
    uuid,
    text,
    numeric,
    numeric
) from authenticated;

grant execute on function public.enter_time(
    uuid,
    text,
    numeric,
    numeric
) to service_role;

/* ------------------------------
   Creation Contract
-------------------------------- */

comment on function public.enter_time(
    uuid,
    text,
    numeric,
    numeric
) is
'Atomically creates Outflō for one trusted authenticated identity, persists the initial Guide Begin and immutable Outflō Begin as exact TemporalInstant128 Clock coordinates, and returns the serialized Outflō Begin.';
