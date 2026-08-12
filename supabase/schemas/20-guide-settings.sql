/* ==========================================================
   OUTFLO — GUIDE SETTINGS
   File: supabase/schemas/20-guide-settings.sql
   Scope: Own mutable Guide language, locale, and theme settings
   Last Updated:
   - date: 2026-08-11
   - note: establish Guide-owned presentation settings
   ========================================================== */

/* ------------------------------
   Table
-------------------------------- */

create table public.guide_settings (
    user_id uuid
        primary key
        references auth.users(id)
        on delete cascade,

    language text
        not null,

    locale text
        not null,

    theme text
        not null
);

/* ------------------------------
   Row Level Security
-------------------------------- */

alter table public.guide_settings
enable row level security;

/* ------------------------------
   Grants
-------------------------------- */

revoke all on table public.guide_settings from anon;
revoke all on table public.guide_settings from authenticated;

grant select on table public.guide_settings to authenticated;

/* ------------------------------
   Policies
-------------------------------- */

create policy "Guides can read their own settings"
on public.guide_settings
for select
to authenticated
using (user_id = (select auth.uid()));

/* ------------------------------
   Comments
-------------------------------- */

comment on table public.guide_settings is
'Mutable Guide-owned language, locale, and theme settings.';

comment on column public.guide_settings.user_id is
'Immutable authentication identity binding owned canonically by auth.users.id.';

comment on column public.guide_settings.language is
'Mutable canonical Guide language setting.';

comment on column public.guide_settings.locale is
'Mutable canonical Guide locale setting.';

comment on column public.guide_settings.theme is
'Mutable canonical Guide theme setting.';
