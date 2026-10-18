-- OUTFLO — REMOVE REDUNDANT INFERENCE INDEX
-- The UNIQUE (session_id, turn_ordinal) constraint retains its index.
drop index if exists public.inference_execution_emissions_session_idx;
