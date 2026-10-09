/* ==========================================================
   OUTFLO — GUIDE BEGIN TITLES
   File: supabase/migrations/20261009120000_guide_begin_titles.sql
   Scope: Establish Guide-owned titles for canonical Begins
   Last Updated:
   - date: 2026-10-09
   - note: introduce optional Begin identity without altering Time
   ========================================================== */

alter table public.guide_begins
    add column title text;

comment on column public.guide_begins.title is
'Guide-owned human-readable title of this Begin. Nullable for existing unnamed Begins. Does not define or alter the canonical Begin Instant.';
