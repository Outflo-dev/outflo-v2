-- OUTFLO — EARTH SEISMIC EMISSION BOUNDARY
--
-- Emission owns original source data.
-- Admission references Emission.
-- Emission does not reference Admission.

alter table public.emissions_earth_seismic_source_data
  drop column admission_id;
