-- OUTFLO — CONNECT CONVERSATION INFERENCE V1
-- Slice 2F: associate a persisted inference execution with a Guide turn,
-- then admit an accepted Outflo response as its own message.
-- Existing conversation, inference, and Machine records remain unchanged.
-- Separate operations ensure unsuccessful/malformed inference is still linkable.

create function public.associate_conversation_inference_execution_v1(
    p_turn_id uuid,
    p_guide_id uuid,
    p_execution_id uuid,
    p_attempt_ordinal integer
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_owner uuid;
    v_association_id uuid;
begin
    if p_turn_id is null or p_guide_id is null or p_execution_id is null
       or p_attempt_ordinal is null or p_attempt_ordinal < 1 then
        raise exception 'Turn, Guide, execution, and positive attempt ordinal are required.';
    end if;

    select c.guide_id into v_owner
      from public.conversation_turns t
      join public.conversations c on c.conversation_id = t.conversation_id
     where t.turn_id = p_turn_id and c.status = 'open'
     for update of c;

    if not found or v_owner <> p_guide_id then
        raise exception 'Open Guide turn not found.';
    end if;

    -- Execution evidence is never copied to conversation tables.
    -- Phone executions must carry the authenticated Guide's user_id.
    if not exists (
        select 1 from public.inference_execution_emissions e
         where e.execution_id = p_execution_id
           and e.user_id = p_guide_id
    ) then
        raise exception 'Authenticated inference execution not found.';
    end if;

    insert into public.conversation_inference_executions (
        turn_id, execution_id, attempt_ordinal
    ) values (
        p_turn_id, p_execution_id, p_attempt_ordinal
    ) returning association_id into v_association_id;

    return v_association_id;
end;
$$;

revoke all on function public.associate_conversation_inference_execution_v1(
    uuid, uuid, uuid, integer
) from public, anon, authenticated;
grant execute on function public.associate_conversation_inference_execution_v1(
    uuid, uuid, uuid, integer
) to service_role;


create function public.accept_conversation_outflo_reply_v1(
    p_turn_id uuid,
    p_guide_id uuid,
    p_execution_id uuid,
    p_content text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_owner uuid;
    v_message_id uuid;
begin
    if p_turn_id is null or p_guide_id is null or p_execution_id is null
       or p_content is null or char_length(btrim(p_content)) < 1
       or char_length(p_content) > 12000 then
        raise exception 'Turn, Guide, linked execution and valid reply are required.';
    end if;

    select c.guide_id into v_owner
      from public.conversation_turns t
      join public.conversations c on c.conversation_id = t.conversation_id
     where t.turn_id = p_turn_id and c.status = 'open'
     for update of c;

    if not found or v_owner <> p_guide_id then
        raise exception 'Open Guide turn not found.';
    end if;

    -- The accepted reply must refer to an already-associated successful HTTP
    -- execution. Valid structured output is established by the inference runtime.
    if not exists (
        select 1
          from public.conversation_inference_executions a
          join public.inference_execution_emissions e
            on e.execution_id = a.execution_id
         where a.turn_id = p_turn_id
           and a.execution_id = p_execution_id
           and e.user_id = p_guide_id
           and e.outcome = 'http_success'
    ) then
        raise exception 'Linked successful inference execution not found.';
    end if;

    insert into public.conversation_messages (turn_id, author, content)
    values (p_turn_id, 'outflo', p_content)
    returning message_id into v_message_id;

    return v_message_id;
end;
$$;

revoke all on function public.accept_conversation_outflo_reply_v1(
    uuid, uuid, uuid, text
) from public, anon, authenticated;
grant execute on function public.accept_conversation_outflo_reply_v1(
    uuid, uuid, uuid, text
) to service_role;
