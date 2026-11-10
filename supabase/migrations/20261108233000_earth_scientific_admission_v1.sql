-- OUTFLO EARTH — SCIENTIFIC ADMISSION V1
--
-- Owner: Earth scientific identity and admitted source claims.
-- Source evidence is already owned by earth_source_receipts.
-- Machine mathematics and Proof remain separate.

create table public.earth_events (
  event_id text primary key
    check (length(trim(event_id)) > 0),

  first_evidence_receipt_id uuid not null
    references public.earth_source_receipts(receipt_id),

  admitted_at timestamptz not null default now()
);

create table public.earth_scientific_units (
  unit_id uuid primary key default gen_random_uuid(),

  event_id text not null
    references public.earth_events(event_id),

  unit_type text not null
    check (length(trim(unit_type)) > 0),

  source_public_id text not null
    check (length(trim(source_public_id)) > 0),

  admitted_at timestamptz not null default now(),

  unique (event_id, unit_type, source_public_id)
);

create table public.earth_scientific_unit_evidence (
  evidence_id uuid primary key default gen_random_uuid(),

  unit_id uuid not null
    references public.earth_scientific_units(unit_id),

  source_receipt_id uuid not null
    references public.earth_source_receipts(receipt_id),

  source_claim jsonb not null
    check (jsonb_typeof(source_claim) = 'object'),

  admitted_at timestamptz not null default now(),

  unique (unit_id, source_receipt_id)
);

create index earth_scientific_units_event_idx
  on public.earth_scientific_units(event_id);

create index earth_scientific_unit_evidence_receipt_idx
  on public.earth_scientific_unit_evidence(source_receipt_id);

alter table public.earth_events
  enable row level security;

alter table public.earth_scientific_units
  enable row level security;

alter table public.earth_scientific_unit_evidence
  enable row level security;

revoke all on
  public.earth_events,
  public.earth_scientific_units,
  public.earth_scientific_unit_evidence
from public, anon, authenticated, service_role;

grant select, insert on
  public.earth_events,
  public.earth_scientific_units,
  public.earth_scientific_unit_evidence
to service_role;
