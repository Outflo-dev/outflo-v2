-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

CREATE TABLE public.time_settings (
  user_id     uuid NOT NULL,
  timezone    text NOT NULL,
  time_format text NOT NULL,
  date_format text NOT NULL,
  week_start  text NOT NULL
);

COMMENT ON TABLE public.time_settings IS
'Mutable Guide-owned civil-Time resolution and presentation settings.';

COMMENT ON COLUMN public.time_settings.user_id IS
'Immutable authentication identity binding owned canonically by auth.users.id.';

COMMENT ON COLUMN public.time_settings.timezone IS
'Mutable Guide timezone setting. Stores system or a canonical IANA timezone identifier.';

COMMENT ON COLUMN public.time_settings.time_format IS
'Mutable Guide clock-structure setting: system, 12h, or 24h.';

COMMENT ON COLUMN public.time_settings.date_format IS
'Mutable Guide date-order setting: system, locale, dmy, mdy, or ymd.';

COMMENT ON COLUMN public.time_settings.week_start IS
'Mutable Guide week-start setting: system, locale, or an explicit weekday.';

ALTER TABLE public.time_settings
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.time_settings
  ADD CONSTRAINT time_settings_date_format
  CHECK (
    date_format IN ('system', 'locale', 'dmy', 'mdy', 'ymd')
  );

ALTER TABLE public.time_settings
  ADD CONSTRAINT time_settings_pkey
  PRIMARY KEY (user_id);

ALTER TABLE public.time_settings
  ADD CONSTRAINT time_settings_time_format
  CHECK (
    time_format IN ('system', '12h', '24h')
  );

ALTER TABLE public.time_settings
  ADD CONSTRAINT time_settings_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

ALTER TABLE public.time_settings
  ADD CONSTRAINT time_settings_week_start
  CHECK (
    week_start IN (
      'system',
      'locale',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
    )
  );

GRANT SELECT ON public.time_settings TO authenticated;

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE
ON public.time_settings TO service_role;

CREATE POLICY "Guides can read their own time settings"
ON public.time_settings
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));
