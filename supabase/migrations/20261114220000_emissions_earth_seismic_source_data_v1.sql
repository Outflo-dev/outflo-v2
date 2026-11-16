-- ==========================================================
-- OUTFLO — EARTH SEISMIC SOURCE EMISSIONS V1
--
-- Table 2: emissions_earth_seismic_source_data
--
-- Admission owns the occurrence and coordinate.
-- Emission preserves exactly what USGS supplied.
-- Verification remains separate.
-- ==========================================================

create table public.emissions_earth_seismic_source_data (

  emission_id uuid primary key,

  admission_id uuid not null unique
    references public.admissions_earth_seismic(admission_id),

  "type" text not null,
  properties json not null,
  geometry json not null,
  id text not null,

  source_bytes bytea not null
    check (octet_length(source_bytes) > 0)

);

alter table public.emissions_earth_seismic_source_data
  enable row level security;

revoke all on public.emissions_earth_seismic_source_data
  from public, anon, authenticated, service_role;

grant select, insert
  on public.emissions_earth_seismic_source_data
  to service_role;

comment on table public.emissions_earth_seismic_source_data is
  'Original USGS seismic emission, linked to its Admission. No temporal mathematics or verification.';
