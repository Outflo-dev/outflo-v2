/* ==========================================================
   OUTFLO — GUIDE TIME
   File: supabase/schemas/40-guide-time.sql
   Scope: Own the Guide's mutable primary Orbit and Begin
   Last Updated:
   - date: 2026-08-11
   - note: establish Guide-owned Time orientation and temporal anchor
   ========================================================== */

/* ------------------------------
   Table
-------------------------------- */

create table public.guide_time (
    user_id uuid
        primary key
        references auth.users(id)
        on delete cascade,

    primary_orbit text
        not null,

    begin_ms bigint
        not null,

    constraint guide_time_primary_orbit
        check (
            primary_orbit in (
                'sidereal',
                'tropical',
                'anomalistic'
            )
        )
);

/* ------------------------------
   Row Level Security
-------------------------------- */

alter table public.guide_time
enable row level security;

/* ------------------------------
   Grants
-------------------------------- */

revoke all on table public.guide_time from anon;
revoke all on table public.guide_time from authenticated;

grant select on table public.guide_time to authenticated;

/* ------------------------------
   Policies
-------------------------------- */

create policy "Guides can read their own Guide Time"
on public.guide_time
for select
to authenticated
using (user_id = (select auth.uid()));

/* ------------------------------
   Comments
-------------------------------- */

comment on table public.guide_time is
'Mutable Guide-owned Time orientation and temporal anchor.';

comment on column public.guide_time.user_id is
'Immutable authentication identity binding owned canonically by auth.users.id.';

comment on column public.guide_time.primary_orbit is
'Mutable Guide primary Orbit: sidereal, tropical, or anomalistic.';

comment on column public.guide_time.begin_ms is
'Mutable Guide Begin stored canonically as Unix milliseconds.';
