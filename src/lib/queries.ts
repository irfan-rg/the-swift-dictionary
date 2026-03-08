// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Supabase query helpers
// Used by server components & API routes.
// ────────────────────────────────────────────────────────────────

import { createClient } from "@/lib/supabase/server";
import type {
  Album,
  Song,
  WordWithDetails,
  SongWithAlbum,
  SongDetail,
  SearchResult,
  Difficulty,
  EraSlug,
} from "@/lib/types";

// ── Albums ─────────────────────────────────────────────────────

export async function getAlbums(): Promise<Album[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .order("year", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getAlbumBySlug(slug: string): Promise<Album | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
  return data ?? null;
}

// ── Songs ──────────────────────────────────────────────────────

export async function getSongsByAlbum(albumId: string): Promise<Song[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("album_id", albumId)
    .order("track_number");

  if (error) throw error;
  return data ?? [];
}

export async function getSongBySlug(
  albumSlug: string,
  songSlug: string
): Promise<SongDetail | null> {
  const supabase = await createClient();

  // First get the album
  const album = await getAlbumBySlug(albumSlug);
  if (!album) return null;

  // Then get the song
  const { data: song, error: songError } = await supabase
    .from("songs")
    .select("*")
    .eq("album_id", album.id)
    .eq("slug", songSlug)
    .single();

  if (songError && songError.code !== "PGRST116") throw songError;
  if (!song) return null;

  // Get vocab words for this song
  const { data: words, error: wordsError } = await supabase
    .from("words")
    .select("*")
    .eq("song_id", song.id)
    .order("word");

  if (wordsError) throw wordsError;

  return {
    ...song,
    album_slug: album.slug as EraSlug,
    album_title: album.title,
    vocab_words: words ?? [],
  };
}

// ── Words / Dictionary ─────────────────────────────────────────

interface DictionaryFilters {
  query?: string;
  album?: EraSlug | "all";
  difficulty?: Difficulty | "all";
  sort?: "relevance" | "az" | "za" | "difficulty";
  limit?: number;
  offset?: number;
}

export async function getDictionaryWords(
  filters: DictionaryFilters = {}
): Promise<{ words: WordWithDetails[]; total: number }> {
  const supabase = await createClient();
  const {
    query,
    album = "all",
    difficulty = "all",
    sort = "az",
    limit = 30,
    offset = 0,
  } = filters;

  let q = supabase
    .from("words")
    .select(
      `
      *,
      songs!inner ( title, slug ),
      albums!inner ( slug, title )
    `,
      { count: "exact" }
    );

  // Filters
  if (query) {
    q = q.ilike("word", `${query}%`);
  }
  if (album !== "all") {
    q = q.eq("albums.slug", album);
  }
  if (difficulty !== "all") {
    q = q.eq("difficulty", difficulty);
  }

  // Sorting
  if (sort === "az") q = q.order("word", { ascending: true });
  else if (sort === "za") q = q.order("word", { ascending: false });
  else if (sort === "difficulty") q = q.order("difficulty");
  // "relevance" — natural rank from textSearch

  q = q.range(offset, offset + limit - 1);

  const { data, error, count } = await q;
  if (error) throw error;

  const words: WordWithDetails[] = (data ?? []).map((row: Record<string, unknown>) => {
    const songs = row.songs as Record<string, unknown>;
    const albums = row.albums as Record<string, unknown>;
    return {
      ...(row as Record<string, unknown>),
      song_title: songs.title as string,
      song_slug: songs.slug as string,
      album_slug: albums.slug as EraSlug,
      album_title: albums.title as string,
    } as WordWithDetails;
  });

  return { words, total: count ?? 0 };
}

// ── Word of the Day ────────────────────────────────────────────

export async function getWordOfTheDay(): Promise<WordWithDetails | null> {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const { data, error } = await supabase
    .from("word_of_the_day")
    .select(
      `
      word_id,
      words (
        *,
        songs ( title, slug ),
        albums ( slug, title )
      )
    `
    )
    .eq("featured_date", today)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  if (!data?.words) return null;

  const w = data.words as unknown as Record<string, unknown>;
  const songs = w.songs as Record<string, unknown>;
  const albums = w.albums as Record<string, unknown>;
  return {
    ...w,
    song_title: songs.title as string,
    song_slug: songs.slug as string,
    album_slug: albums.slug as EraSlug,
    album_title: albums.title as string,
  } as WordWithDetails;
}

// ── Top Songs (by vocab count) ─────────────────────────────────

export async function getTopSongs(
  limit = 5
): Promise<SongWithAlbum[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("songs")
    .select(
      `
      *,
      albums!inner ( slug, title )
    `
    )
    .order("vocab_count", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((row: Record<string, unknown>) => {
    const albums = row.albums as Record<string, unknown>;
    return {
      ...(row as Record<string, unknown>),
      album_slug: albums.slug as EraSlug,
      album_title: albums.title as string,
    } as SongWithAlbum;
  });
}

// ── Search ─────────────────────────────────────────────────────

export async function searchAll(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  const supabase = await createClient();
  const results: SearchResult[] = [];

  // Search words (prefix match)
  const { data: words } = await supabase
    .from("words")
    .select("id, word, definition, songs(slug, title), albums(slug, title)")
    .ilike("word", `${query}%`)
    .order("word")
    .limit(5);

  for (const w of words ?? []) {
    const ws = w as unknown as Record<string, unknown>;
    const wSongs = ws.songs as Record<string, string>;
    const wAlbums = ws.albums as Record<string, string>;
    results.push({
      type: "word",
      id: ws.id as string,
      title: ws.word as string,
      subtitle: `${wAlbums.title} • ${wSongs.title}`,
      href: `/explorer/${wAlbums.slug}/${wSongs.slug}`,
    });
  }

  // Search songs (prefix match)
  const { data: songs } = await supabase
    .from("songs")
    .select("id, title, slug, albums(slug, title)")
    .ilike("title", `%${query}%`)
    .order("title")
    .limit(5);

  for (const s of songs ?? []) {
    const ss = s as unknown as Record<string, unknown>;
    const sAlbums = ss.albums as Record<string, string>;
    results.push({
      type: "song",
      id: ss.id as string,
      title: ss.title as string,
      subtitle: sAlbums.title,
      href: `/explorer/${sAlbums.slug}/${ss.slug}`,
    });
  }

  // Search albums (simple ilike since no fts column)
  const { data: albums } = await supabase
    .from("albums")
    .select("id, title, slug")
    .ilike("title", `%${query}%`)
    .limit(3);

  for (const a of albums ?? []) {
    results.push({
      type: "album",
      id: a.id,
      title: a.title,
      subtitle: "Album",
      href: `/explorer/${a.slug}`,
    });
  }

  return results;
}

// ── Favorites ──────────────────────────────────────────────────

export async function getUserFavorites(
  userId: string
): Promise<WordWithDetails[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select(
      `
      word_id,
      words (
        *,
        songs ( title, slug ),
        albums ( slug, title )
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row: Record<string, unknown>) => {
    const words = row.words as Record<string, unknown>;
    const songs = words.songs as Record<string, unknown>;
    const albums = words.albums as Record<string, unknown>;
    return {
      ...words,
      song_title: songs.title as string,
      song_slug: songs.slug as string,
      album_slug: albums.slug as EraSlug,
      album_title: albums.title as string,
    } as WordWithDetails;
  });
}

export async function toggleFavorite(
  userId: string,
  wordId: string
): Promise<boolean> {
  const supabase = await createClient();

  // Check if already favorited
  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("word_id", wordId)
    .single();

  if (existing) {
    await supabase.from("favorites").delete().eq("id", existing.id);
    return false; // unfavorited
  } else {
    await supabase.from("favorites").insert({ user_id: userId, word_id: wordId });
    return true; // favorited
  }
}
