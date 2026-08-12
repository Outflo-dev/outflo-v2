-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

CREATE TABLE public.guide_settings (
  user_id  uuid NOT NULL,
  language text NOT NULL,
  locale   text NOT NULL,
  theme    text NOT NULL
);

COMMENT ON TABLE public.guide_settings IS
'Mutable Guide-owned language, locale, and theme settings.';

COMMENT ON COLUMN public.guide_settings.user_id IS
'Immutable authentication identity binding owned canonically by auth.users.id.';

COMMENT ON COLUMN public.guide_settings.language IS
'Mutable canonical Guide language setting.';

COMMENT ON COLUMN public.guide_settings.locale IS
'Mutable canonical Guide locale setting.';

COMMENT ON COLUMN public.guide_settings.theme IS
'Mutable canonical Guide theme setting.';

ALTER TABLE public.guide_settings
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.guide_settings
  ADD CONSTRAINT guide_settings_pkey
  PRIMARY KEY (user_id);

ALTER TABLE public.guide_settings
  ADD CONSTRAINT guide_settings_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

GRANT SELECT ON public.guide_settings TO authenticated;

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE
ON public.guide_settings TO service_role;

CREATE POLICY "Guides can read their own settings"
ON public.guide_settings
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));
