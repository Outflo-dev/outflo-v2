-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

CREATE TABLE public.profiles (
  user_id       uuid   NOT NULL,
  entered_at_ms bigint DEFAULT (floor((EXTRACT(epoch FROM clock_timestamp()) * (1000)::numeric)))::bigint NOT NULL
);

COMMENT ON TABLE public.profiles IS 'Completed Outflō account shell. A row exists only after Enter Time succeeds.';

COMMENT ON COLUMN public.profiles.user_id IS 'Immutable authentication identity binding owned canonically by auth.users.id.';

COMMENT ON COLUMN public.profiles.entered_at_ms IS 'Immutable Outflō Begin: the server-observed Unix millisecond instant when the Guide entered Outflō.';

ALTER TABLE public.profiles
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_pkey PRIMARY KEY (user_id);

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

GRANT SELECT ON public.profiles TO authenticated;

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON public.profiles TO service_role;

CREATE POLICY "Guides can read their own profile" ON public.profiles
  FOR SELECT
  TO authenticated
  USING ((user_id = ( SELECT auth.uid() AS uid)));