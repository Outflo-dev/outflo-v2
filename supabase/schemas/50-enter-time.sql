/* ==========================================================
   OUTFLO — ENTER TIME
   File: supabase/schemas/50-enter-time.sql
   Scope: Own atomic authenticated creation of Outflō
   Last Updated:
   - date: 2026-08-11
   - note: create the four Outflō owners through one database operation
   ========================================================== */

/* ------------------------------
   Function
-------------------------------- */

create or replace function public.enter_time(
    p_username text,
    p_display_name text,
    p_language text,
    p_locale text,
    p_theme text,
    p_timezone text,
    p_time_format text,
    p_date_format text,
    p_week_start text,
    p_primary_orbit text,
    p_begin_ms bigint
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_user_id uuid;
    v_entered_at_ms bigint;
begin
    /* ------------------------------
       Authentication
    -------------------------------- */

    v_user_id := auth.uid();

    if v_user_id is null then
        raise exception 'Authentication required.'
            using errcode = '42501';
    end if;

    /* ------------------------------
       Creation Boundary
    -------------------------------- */

    if exists (
        select 1
        from public.profiles
        where user_id = v_user_id
    ) then
        raise exception 'Outflō already exists for this Guide.'
            using errcode = 'P0001';
    end if;

    /* ------------------------------
       Timezone Validation
    -------------------------------- */

    if p_timezone <> 'system'
       and not exists (
           select 1
           from pg_catalog.pg_timezone_names
           where name = p_timezone
       )
    then
        raise exception 'Invalid timezone.'
            using errcode = '22023';
    end if;

    /* ------------------------------
       Atomic Creation
    -------------------------------- */

    insert into public.guide_settings (
        user_id,
        language,
        locale,
        theme
    )
    values (
        v_user_id,
        p_language,
        p_locale,
        p_theme
    );

    insert into public.time_settings (
        user_id,
        timezone,
        time_format,
        date_format,
        week_start
    )
    values (
        v_user_id,
        p_timezone,
        p_time_format,
        p_date_format,
        p_week_start
    );

    insert into public.guide_time (
        user_id,
        primary_orbit,
        begin_ms
    )
    values (
        v_user_id,
        p_primary_orbit,
        p_begin_ms
    );

    insert into public.profiles (
        user_id,
        username,
        display_name
    )
    values (
        v_user_id,
        p_username,
        p_display_name
    )
    returning entered_at_ms
    into v_entered_at_ms;

    return v_entered_at_ms;
end;
$$;

/* ------------------------------
   Access
-------------------------------- */

revoke all on function public.enter_time(
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
) from public;

revoke all on function public.enter_time(
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
) from anon;

revoke all on function public.enter_time(
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
) from authenticated;

grant execute on function public.enter_time(
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
) to authenticated;

/* ------------------------------
   Comments
-------------------------------- */

comment on function public.enter_time(
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
) is
'Atomically creates Outflō for the authenticated Guide and returns immutable Outflō Begin as Unix milliseconds.';
