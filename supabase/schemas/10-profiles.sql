/* ==========================================================
   OUTFLO — PROFILES
   File: supabase/schemas/10-profiles.sql
   Scope: Own the completed Outflō profile and immutable Outflō Begin
   Last Updated:
   - date: 2026-08-11
   - note: add canonical Guide profile identity and username ownership
   ========================================================== */

/* ------------------------------
   Table
-------------------------------- */

create table public.profiles (
    user_id uuid
        primary key
        references auth.users(id)
        on delete cascade,

    username text
        not null,

    display_name text,

    entered_at_ms bigint
        not null
        default (floor(extract(epoch from clock_timestamp()) * 1000)::bigint),

    constraint profiles_username_length
        check (char_length(username) between 3 and 30),

    constraint profiles_username_format
        check (username ~ '^[a-z0-9_.]+$'),

    constraint profiles_username_unique
        unique (username)
);

/* ------------------------------
   Row Level Security
-------------------------------- */

alter table public.profiles
enable row level security;

/* ------------------------------
   Grants
-------------------------------- */

revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;

grant select on table public.profiles to authenticated;

/* ------------------------------
   Policies
-------------------------------- */

create policy "Guides can read their own profile"
on public.profiles
for select
to authenticated
using (user_id = (select auth.uid()));

/* ------------------------------
   Comments
-------------------------------- */

comment on table public.profiles is
'Completed Outflō profile. A row exists only after Enter Time succeeds.';

comment on column public.profiles.user_id is
'Immutable authentication identity binding owned canonically by auth.users.id.';

comment on column public.profiles.username is
'Mutable canonical Guide username. Three to thirty lowercase letters, digits, underscores, or periods. Globally unique while claimed.';

comment on column public.profiles.display_name is
'Optional mutable Guide display name. NULL represents no display name.';

comment on column public.profiles.entered_at_ms is
'Immutable Outflō Begin: the server-observed Unix millisecond instant when the Guide entered Outflō.';
