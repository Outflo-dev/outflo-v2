-- OUTFLO — ONE OPEN CONVERSATION PER GUIDE
-- Preserve all conversations and their independent identities.
-- Completed conversations do not occupy the active slot.

create unique index conversations_one_open_per_guide_idx
on public.conversations (guide_id)
where status = 'open';
