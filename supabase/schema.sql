-- ================================================================
-- The Swift Dictionary — Supabase schema migration
-- Run this in the Supabase SQL Editor (or via supabase db push)
-- ================================================================

-- ── 1. Albums ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.albums (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,          -- e.g. "folklore"
  title       text NOT NULL,                 -- e.g. "Folklore"
  year        smallint NOT NULL,
  description text NOT NULL DEFAULT '',
  cover_url   text,                          -- Cloudinary / Supabase Storage URL
  song_count  smallint NOT NULL DEFAULT 0,
  vocab_count smallint NOT NULL DEFAULT 0,
  spotify_url text,                          -- Link to full album on Spotify
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_albums_slug ON public.albums (slug);

-- ── 2. Songs ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.songs (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id          uuid NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  slug              text NOT NULL,           -- e.g. "cardigan"
  title             text NOT NULL,
  track_number      smallint NOT NULL DEFAULT 1,
  lyrics            text,                    -- Full lyrics text
  vocab_count       smallint NOT NULL DEFAULT 0,
  difficulty        text NOT NULL DEFAULT 'Intermediate'
                      CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  spotify_embed_url text,                    -- e.g. https://open.spotify.com/embed/track/xxx
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (album_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_songs_album ON public.songs (album_id);
CREATE INDEX IF NOT EXISTS idx_songs_slug  ON public.songs (slug);

-- ── 3. Words (vocabulary) ──────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.words (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word          text NOT NULL,
  definition    text NOT NULL,
  song_id       uuid NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE,
  album_id      uuid NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  lyric_snippet text NOT NULL DEFAULT '',
  context       text,                        -- How Taylor uses the word
  difficulty    text NOT NULL DEFAULT 'Intermediate'
                  CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  positions     jsonb NOT NULL DEFAULT '[]', -- Character offsets in lyrics
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_words_word    ON public.words (word);
CREATE INDEX IF NOT EXISTS idx_words_song    ON public.words (song_id);
CREATE INDEX IF NOT EXISTS idx_words_album   ON public.words (album_id);
CREATE INDEX IF NOT EXISTS idx_words_diff    ON public.words (difficulty);

-- ── 4. Word of the Day ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.word_of_the_day (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word_id       uuid NOT NULL REFERENCES public.words(id) ON DELETE CASCADE,
  featured_date date UNIQUE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_wotd_date ON public.word_of_the_day (featured_date);

-- ── 5. User profiles ───────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'display_name');
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── 6. Favorites ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.favorites (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_id    uuid NOT NULL REFERENCES public.words(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, word_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites (user_id);

-- ── 7. Full-text search ────────────────────────────────────────

-- Words search vector
ALTER TABLE public.words ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(word, '') || ' ' || coalesce(definition, ''))
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_words_fts ON public.words USING gin(fts);

-- Songs search vector
ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS fts tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title, ''))
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_songs_fts ON public.songs USING gin(fts);

-- ── 8. Row Level Security ──────────────────────────────────────

ALTER TABLE public.albums         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.words          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_of_the_day ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites      ENABLE ROW LEVEL SECURITY;

-- Public read for content tables
CREATE POLICY "Public read albums"  ON public.albums  FOR SELECT USING (true);
CREATE POLICY "Public read songs"   ON public.songs   FOR SELECT USING (true);
CREATE POLICY "Public read words"   ON public.words   FOR SELECT USING (true);
CREATE POLICY "Public read wotd"    ON public.word_of_the_day FOR SELECT USING (true);

-- Profiles: users can read/update their own
CREATE POLICY "Users read own profile"   ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Favorites: authenticated users manage their own
CREATE POLICY "Users read own favorites"   ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);
