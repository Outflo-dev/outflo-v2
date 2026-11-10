-- OUTFLO EARTH — SOURCE EVIDENCE V1
--
-- Owner: Earth source persistence
--
-- Preserve received source evidence independently
-- from scientific admission and Machine computation.

insert into storage.buckets (id, name, public)
values ('earth-evidence', 'earth-evidence', false)
on conflict (id) do nothing;

do $$
begin
  if exists (
    select 1 from storage.buckets
    where id = 'earth-evidence' and public = true
  ) then
    raise exception 'Earth evidence bucket must be private';
  end if;
end;
$$;

create table public.earth_source_receipts (
  receipt_id uuid primary key default gen_random_uuid(),

  collection_id uuid not null,

  source_provider text not null
    check (source_provider <> ''),

  source_url text not null
    check (source_url <> ''),

  event_id text,

  product_type text,
  product_source text,
  product_code text,
  product_updated_ms bigint,

  media_type text,

  storage_bucket text not null
    default 'earth-evidence'
    check (storage_bucket = 'earth-evidence'),

  storage_path text not null
    check (storage_path <> ''),

  byte_length bigint not null
    check (byte_length >= 0),

  sha256 text not null
    check (sha256 ~ '^[0-9a-f]{64}$'),

  retrieved_at timestamptz not null,

  persisted_at timestamptz not null
    default now(),

  unique (collection_id, source_url, sha256),
  unique (storage_bucket, storage_path)
);

create index earth_source_receipts_event_idx
  on public.earth_source_receipts (event_id);

create index earth_source_receipts_collection_idx
  on public.earth_source_receipts (collection_id);

alter table public.earth_source_receipts
  enable row level security;

revoke all on public.earth_source_receipts
  from public, anon, authenticated, service_role;

grant select, insert
  on public.earth_source_receipts
  to service_role;

comment on table public.earth_source_receipts is
  'Append-oriented evidence receipts for the system-owned Earth source archive. Original bytes reside in private storage. Not canonical scientific admission or Machine Proof.';
