/* ==========================================================
   OUTFLO — SEPARATE OUTFLO CREATION
   File: supabase/migrations/20261005014208_separate_outflo_creation.sql
   Scope: Separate trusted Outflō creation from Guide Name and persist Machine-serialized temporal coordinates without duplicating Machine law
   Last Updated:
   - Outflō Time: 847729319492559263982364593050
   - note: remove Guide Name creation dependency and retire database-owned Clock validation
   ========================================================== */

/* ------------------------------
   Retire Database-Owned Clock Law
-------------------------------- */

alter table public.profiles
    drop constraint if exists
        profiles_outflo_begin_instant_range;

alter table public.guide_begins
    drop constraint if exists
        guide_begins_begin_instant_range;

/* ------------------------------
   Persist Machine Serialization
-------------------------------- */

alter table public.profiles
    alter column outflo_begin_instant
        type text
        using outflo_begin_instant::text;

alter table public.guide_begins
    alter column begin_instant
        type text
        using begin_instant::text;

comment on column public.profiles.outflo_begin_instant is
'Immutable canonical Outflō Begin serialized by the Outflō Machine.';

comment on column public.guide_begins.begin_instant is
'Canonical Guide Begin serialized by the Outflō Machine.';

/* ------------------------------
   Retire Guide Name Creation Dependency
-------------------------------- */

alter table public.profiles
    drop column if exists username;

/* ------------------------------
   Retire Previous Creation Contract
-------------------------------- */

drop function if exists public.enter_time(
    uuid,
    text,
    numeric,
    numeric
);

/* ------------------------------
   Trusted Outflō Creation
-------------------------------- */

create function public.enter_time(
    p_user_id uuid,
    p_guide_begin_instant text,
    p_outflo_begin_instant text
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
        outflo_begin_instant
    )
    values (
        p_user_id,
        p_outflo_begin_instant
    );

    return p_outflo_begin_instant;
end;
$function$;

/* ------------------------------
   Creation Access
-------------------------------- */

revoke all on function public.enter_time(
    uuid,
    text,
    text
) from public;

revoke all on function public.enter_time(
    uuid,
    text,
    text
) from anon;

revoke all on function public.enter_time(
    uuid,
    text,
    text
) from authenticated;

grant execute on function public.enter_time(
    uuid,
    text,
    text
) to service_role;

/* ------------------------------
   Creation Contract
-------------------------------- */

comment on function public.enter_time(
    uuid,
    text,
    text
) is
'Atomically creates Outflō for one trusted authenticated identity and persists Machine-serialized Guide Begin and Outflō Begin coordinates.';
