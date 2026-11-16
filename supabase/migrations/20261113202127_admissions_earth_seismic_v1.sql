-- ==========================================================
-- OUTFLO — EARTH SEISMIC ADMISSIONS V1
-- File: supabase/migrations/20261113202127_admissions_earth_seismic_v1.sql
-- Scope: Persist canonical Earth seismic Admissions
--
-- Owner: Earth seismic Admission persistence
-- Machine: Sole owner of canonical temporal mathematics
--
-- Outflō Clock Definition: v1
-- Outflō Time Stamp: 849072122441943093905848566596
-- Stamp Unit: Outflōseconds
-- Observed Unix Milliseconds: 1794601287206
-- ==========================================================

create table public.admissions_earth_seismic (
  admission_id uuid primary key default gen_random_uuid(),

  source text not null
    check (length(trim(source)) > 0),

  coordinate numeric not null
    check (coordinate = trunc(coordinate))
    check (
      coordinate >= -170141183460469231731687303715884105728
      and
      coordinate <= 170141183460469231731687303715884105727
    ),

  emission_id uuid,

  provided_timestamp text not null
    check (length(trim(provided_timestamp)) > 0),

  verification_id uuid,

  constraint earth_seismic_verification_requires_emission
    check (
      verification_id is null
      or emission_id is not null
    )
);

alter table public.admissions_earth_seismic
  enable row level security;

revoke all on public.admissions_earth_seismic
  from public, anon, authenticated, service_role;

grant select, insert
  on public.admissions_earth_seismic
  to service_role;

comment on table public.admissions_earth_seismic is
  'Canonical seismic Admissions. Machine owns temporal mathematics. Evidence and verification remain independently owned.';
