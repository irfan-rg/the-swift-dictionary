// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — shared type definitions
// ────────────────────────────────────────────────────────────────

/** Difficulty classification for vocabulary words */
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

/** Era/album slug identifiers */
export type EraSlug =
  | "debut"
  | "fearless"
  | "speaknow"
  | "red"
  | "1989"
  | "reputation"
  | "lover"
  | "folklore"
  | "evermore"
  | "midnights"
  | "ttpd"
  | "showgirl";

// ── Database row types (mirror Supabase tables) ────────────────

export interface Album {
  id: string;
  slug: EraSlug;
  title: string;
  year: number;
  description: string;
  cover_url: string | null;
  animated_cover_url: string | null;
  song_count: number;
  vocab_count: number;
  spotify_url: string | null;
  created_at: string;
}

export interface Song {
  id: string;
  album_id: string;
  slug: string;
  title: string;
  track_number: number;
  lyrics: string | null;
  vocab_count: number;
  difficulty: Difficulty;
  spotify_embed_url: string | null;
  created_at: string;
}

export interface Word {
  id: string;
  word: string;
  definition: string;
  song_id: string;
  album_id: string;
  lyric_snippet: string;
  context: string | null;
  difficulty: Difficulty;
  positions: number[];
  created_at: string;
}

export interface WordOfTheDayEntry {
  id: string;
  word_id: string;
  featured_date: string; // ISO date yyyy-mm-dd
}

export interface Profile {
  id: string; // = auth.users.id
  display_name: string | null;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  word_id: string;
  created_at: string;
}

// ── Joined / view types used by the frontend ───────────────────

/** Word with its song & album info — used by dictionary listing, Word of the Day, etc. */
export interface WordWithDetails extends Word {
  song_title: string;
  song_slug: string;
  album_slug: EraSlug;
  album_title: string;
}

/** Song with its parent album slug — used by explorer song list */
export interface SongWithAlbum extends Song {
  album_slug: EraSlug;
  album_title: string;
}

/** Full song page payload — song + vocab words */
export interface SongDetail extends SongWithAlbum {
  vocab_words: Word[];
}

/** Search result union */
export type SearchResultType = "word" | "song" | "album";

export interface SearchResult {
  type: SearchResultType;
  id: string;
  title: string;       // word, song title, or album title
  subtitle: string;    // e.g. "folklore • cardigan"
  href: string;        // link destination
}

// ── Component prop helpers ─────────────────────────────────────

/** Minimal word item used by WordCard / WordModal before full DB wiring */
export interface WordCardItem {
  id: string;
  word: string;
  definition: string;
  lyricSnippet: string;
  song: string;
  songSlug: string;
  album: EraSlug;
  difficulty: Difficulty;
  context?: string;
}
