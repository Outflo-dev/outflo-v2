-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

CREATE FUNCTION public.enter_time (
  p_username      text,
  p_display_name  text,
  p_language      text,
  p_locale        text,
  p_theme         text,
  p_timezone      text,
  p_time_format   text,
  p_date_format   text,
  p_week_start    text,
  p_primary_orbit text,
  p_begin_ms      bigint
)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
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
$function$;

COMMENT ON FUNCTION public.enter_time(
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
) IS
'Atomically creates Outflō for the authenticated Guide and returns immutable Outflō Begin as Unix milliseconds.';

REVOKE ALL ON FUNCTION public.enter_time(
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
) FROM PUBLIC;

REVOKE ALL ON FUNCTION public.enter_time(
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
) FROM anon;

REVOKE ALL ON FUNCTION public.enter_time(
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
) FROM authenticated;

GRANT EXECUTE ON FUNCTION public.enter_time(
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
) TO authenticated;
