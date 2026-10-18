-- OUTFLO — ADMIT CONVERSATION GUIDE TURN V1
-- One authenticated Guide message and its turn are admitted atomically.
-- This does not invoke Mistral, record an inference execution, or alter Machine Time.

create function public.admit_conversation_guide_turn_v1(
    p_conversation_id uuid,
    p_guide_id uuid,
    p_content text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_guide_id uuid;
    v_turn_id uuid;
    v_message_id uuid;
    v_turn_ordinal integer;
begin
    if p_conversation_id is null or p_guide_id is null then
        raise exception 'Conversation and Guide identities are required.';
    end if;

    if p_content is null
        or char_length(btrim(p_content)) < 1
        or char_length(p_content) > 4000 then
        raise exception 'Guide message must contain 1 to 4000 characters.';
    end if;

    -- Lock this conversation until both inserts commit. Concurrent sends
    -- cannot independently claim the same next turn ordinal.
    select c.guide_id
      into v_guide_id
      from public.conversations as c
     where c.conversation_id = p_conversation_id
       and c.status = 'open'
     for update;

    if not found then
        raise exception 'Open conversation not found.';
    end if;

    if v_guide_id <> p_guide_id then
        raise exception 'Conversation does not belong to this Guide.';
    end if;

    select coalesce(max(t.turn_ordinal), 0) + 1
      into v_turn_ordinal
      from public.conversation_turns as t
     where t.conversation_id = p_conversation_id;

    insert into public.conversation_turns (
        conversation_id,
        turn_ordinal
    ) values (
        p_conversation_id,
        v_turn_ordinal
    )
    returning conversation_turns.turn_id into v_turn_id;

    insert into public.conversation_messages (
        turn_id,
        author,
        content
    ) values (
        v_turn_id,
        'guide',
        p_content
    )
    returning conversation_messages.message_id into v_message_id;

    return jsonb_build_object(
        'conversation_id', p_conversation_id,
        'turn_id', v_turn_id,
        'turn_ordinal', v_turn_ordinal,
        'message_id', v_message_id
    );
end;
$$;

-- Only the trusted server-side database client can invoke this operation.
revoke all on function public.admit_conversation_guide_turn_v1(uuid, uuid, text)
    from public, anon, authenticated;
grant execute on function public.admit_conversation_guide_turn_v1(uuid, uuid, text)
    to service_role;
