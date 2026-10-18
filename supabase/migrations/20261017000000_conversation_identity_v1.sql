-- OUTFLO — CONVERSATION IDENTITY V1
-- Slice 1: durable conversation, turn, message, and execution-association identities.
-- Inference HTTP evidence remains owned by inference_execution_emissions.
-- Machine observations and composed Proofs remain separately owned.

create table public.conversations (
    conversation_id uuid primary key default gen_random_uuid(),
    guide_id uuid not null references auth.users(id) on delete restrict,
    status text not null default 'open'
        check (status in ('open', 'completed')),
    created_at timestamptz not null default now(),
    completed_at timestamptz,
    constraint conversations_completion_consistent check (
        (status = 'open' and completed_at is null)
        or (status = 'completed' and completed_at is not null)
    )
);

create index conversations_guide_created_idx
    on public.conversations (guide_id, created_at desc);

create table public.conversation_turns (
    turn_id uuid primary key default gen_random_uuid(),
    conversation_id uuid not null
        references public.conversations(conversation_id) on delete restrict,
    turn_ordinal integer not null check (turn_ordinal > 0),
    created_at timestamptz not null default now(),
    unique (conversation_id, turn_ordinal)
);

create table public.conversation_messages (
    message_id uuid primary key default gen_random_uuid(),
    turn_id uuid not null
        references public.conversation_turns(turn_id) on delete restrict,
    author text not null check (author in ('guide', 'outflo')),
    content text not null check (length(btrim(content)) > 0),
    recorded_at timestamptz not null default now(),
    unique (turn_id, author)
);

create table public.conversation_inference_executions (
    association_id uuid primary key default gen_random_uuid(),
    turn_id uuid not null
        references public.conversation_turns(turn_id) on delete restrict,
    execution_id uuid not null unique
        references public.inference_execution_emissions(execution_id)
        on delete restrict,
    attempt_ordinal integer not null check (attempt_ordinal > 0),
    associated_at timestamptz not null default now(),
    unique (turn_id, attempt_ordinal)
);

-- Audit timestamps describe database operations. They are not canonical Machine Instants.
comment on column public.conversations.created_at is
    'Database audit timestamp; not a canonical Machine Time observation.';
comment on column public.conversations.completed_at is
    'Database lifecycle timestamp; canonical completion evidence belongs to the Machine.';

-- The browser has no direct table privileges. Authenticated server code
-- must check the Guide identity and conversation ownership before any write/read.
alter table public.conversations enable row level security;
alter table public.conversation_turns enable row level security;
alter table public.conversation_messages enable row level security;
alter table public.conversation_inference_executions enable row level security;

revoke all on public.conversations from public, anon, authenticated;
revoke all on public.conversation_turns from public, anon, authenticated;
revoke all on public.conversation_messages from public, anon, authenticated;
revoke all on public.conversation_inference_executions from public, anon, authenticated;

grant select, insert on public.conversations to service_role;
grant update (status, completed_at) on public.conversations to service_role;
grant select, insert on public.conversation_turns to service_role;
grant select, insert on public.conversation_messages to service_role;
grant select, insert on public.conversation_inference_executions to service_role;
