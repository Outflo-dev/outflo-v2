/* ==========================================================
   OUTFLO — PUBLIC TABLE ACCESS BASELINE
   File: supabase/migrations/20260811182132_lock_public_table_defaults.sql
   Scope: Remove inherited client-role privileges from
          postgres-owned public tables
   Last Updated:
   - date: 2026-08-11
   - note: establish explicit default access for future public tables
   ========================================================== */

/* ------------------------------
Future Tables
-------------------------------- */

alter default privileges
for role postgres
in schema public
revoke all on tables from anon, authenticated;

/* ------------------------------
Existing Tables
-------------------------------- */

revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;

grant select on table public.profiles to authenticated;