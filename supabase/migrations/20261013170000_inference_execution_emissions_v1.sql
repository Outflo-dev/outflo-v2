-- OUTFLO — INFERENCE EXECUTION EMISSIONS V1
-- One execution. Original evidence. Independent ownership.

create table public.inference_execution_emissions (
    execution_id uuid primary key,
    session_id uuid not null,
    turn_ordinal integer not null check (turn_ordinal > 0),
    user_id uuid references auth.users(id),

    provider text not null,
    requested_model text,
    returned_model text,
    provider_response_id text,
    provider_created_unix_seconds bigint,

    request_observed_at timestamptz not null,
    response_observed_at timestamptz,
    request_monotonic_ms double precision,
    response_monotonic_ms double precision,
    elapsed_ms double precision,

    request_body text not null,
    response_body text,
    request_utf8_bytes integer,
    response_utf8_bytes integer,
    request_sha256 text,
    response_sha256 text,

    http_status integer,
    response_headers jsonb,
    outcome text not null,
    error_message text,

    usage jsonb,
    input_tokens bigint,
    output_tokens bigint,
    total_tokens bigint,
    cached_input_tokens bigint,
    service_tier text,
    finish_reasons jsonb,

    runtime_provenance jsonb,

    persisted_at timestamptz not null default now(),

    unique (session_id, turn_ordinal)
);

create index inference_execution_emissions_session_idx
on public.inference_execution_emissions(session_id, turn_ordinal);

alter table public.inference_execution_emissions
enable row level security;

revoke all on public.inference_execution_emissions
from anon, authenticated;

grant select, insert
on public.inference_execution_emissions
to service_role;
