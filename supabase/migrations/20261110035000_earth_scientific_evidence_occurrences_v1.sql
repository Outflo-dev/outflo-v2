-- OUTFLO EARTH — SOURCE OCCURRENCES V1
--
-- One scientific identity may have multiple distinct
-- occurrences within one preserved source document.
--
-- Existing evidence remains intact at ordinal 1.

alter table public.earth_scientific_unit_evidence
  add column occurrence_ordinal integer
  not null default 1
  check (occurrence_ordinal >= 1);

alter table public.earth_scientific_unit_evidence
  drop constraint
  earth_scientific_unit_evidence_unit_id_source_receipt_id_key;

alter table public.earth_scientific_unit_evidence
  add constraint earth_scientific_evidence_occurrence_unique
  unique (
    unit_id,
    source_receipt_id,
    occurrence_ordinal
  );
