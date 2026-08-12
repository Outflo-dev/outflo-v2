-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

COMMENT ON TABLE public.profiles IS
'Completed Outflō profile. A row exists only after Enter Time succeeds.';

ALTER TABLE public.profiles
    ADD COLUMN username text NOT NULL;

COMMENT ON COLUMN public.profiles.username IS
'Mutable canonical Guide username. Three to thirty lowercase letters, digits, underscores, or periods. Globally unique while claimed.';

ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_username_format
    CHECK (username ~ '^[a-z0-9_.]+$'::text);

ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_username_length
    CHECK (char_length(username) >= 3 AND char_length(username) <= 30);

ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_username_unique
    UNIQUE (username);

ALTER TABLE public.profiles
    ADD COLUMN display_name text;

COMMENT ON COLUMN public.profiles.display_name IS
'Optional mutable Guide display name. NULL represents no display name.';
