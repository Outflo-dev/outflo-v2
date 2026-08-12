/* ==========================================================
   OUTFLO — TIME SETTINGS
   File: supabase/schemas/30-time-settings.sql
   Scope: Own mutable Guide civil-Time resolution and presentation settings
   Last Updated:
   - date: 2026-08-11
   - note: establish Guide-owned Time settings and closed value domains
   ========================================================== */

/* ------------------------------
   Table
-------------------------------- */

create table public.time_settings (
    user_id uuid
        primary key
        references auth.users(id)
        on delete cascade,

    timezone text
        not null,

    time_format text
        not null,

    date_format text
        not null,

    week_start text
        not null,

    constraint time_settings_time_format
        check (time_format in ('system', '12h', '24h')),

    constraint time_settings_date_format
        check (date_format in ('system', 'locale', 'dmy', 'mdy', 'ymd')),

    constraint time_settings_week_start
        check (
            week_start in (
                'system',
                'locale',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday'
            )
        )
);

/* ------------------------------
   Row Level Security
-------------------------------- */

alter table public.time_settings
enable row level security;

/* ------------------------------
   Grants
-------------------------------- */

revoke all on table public.time_settings from anon;
revoke all on table public.time_settings from authenticated;

grant select on table public.time_settings to authenticated;

/* ------------------------------
   Policies
-------------------------------- */

create policy "Guides can read their own time settings"
on public.time_settings
for select
to authenticated
using (user_id = (select auth.uid()));

/* ------------------------------
   Comments
-------------------------------- */

comment on table public.time_settings is
'Mutable Guide-owned civil-Time resolution and presentation settings.';

comment on column public.time_settings.user_id is
'Immutable authentication identity binding owned canonically by auth.users.id.';

comment on column public.time_settings.timezone is
'Mutable Guide timezone setting. Stores system or a canonical IANA timezone identifier.';

comment on column public.time_settings.time_format is
'Mutable Guide clock-structure setting: system, 12h, or 24h.';

comment on column public.time_settings.date_format is
'Mutable Guide date-order setting: system, locale, dmy, mdy, or ymd.';

comment on column public.time_settings.week_start is
'Mutable Guide week-start setting: system, locale, or an explicit weekday.';
