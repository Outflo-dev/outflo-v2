-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

CREATE TABLE public.guide_time (
  user_id       uuid   NOT NULL,
  primary_orbit text   NOT NULL,
  begin_ms      bigint NOT NULL
);

COMMENT ON TABLE public.guide_time IS
'Mutable Guide-owned Time orientation and temporal anchor.';

COMMENT ON COLUMN public.guide_time.user_id IS
'Immutable authentication identity binding owned canonically by auth.users.id.';

COMMENT ON COLUMN public.guide_time.primary_orbit IS
'Mutable Guide primary Orbit: sidereal, tropical, or anomalistic.';

COMMENT ON COLUMN public.guide_time.begin_ms IS
'Mutable Guide Begin stored canonically as Unix milliseconds.';

ALTER TABLE public.guide_time
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.guide_time
  ADD CONSTRAINT guide_time_pkey
  PRIMARY KEY (user_id);

ALTER TABLE public.guide_time
  ADD CONSTRAINT guide_time_primary_orbit
  CHECK (
    primary_orbit IN (
      'sidereal',
      'tropical',
      'anomalistic'
    )
  );

ALTER TABLE public.guide_time
  ADD CONSTRAINT guide_time_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

GRANT SELECT ON public.guide_time TO authenticated;

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE
ON public.guide_time TO service_role;

CREATE POLICY "Guides can read their own Guide Time"
ON public.guide_time
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));
