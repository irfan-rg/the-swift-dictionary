// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Word / vocabulary models
// Mirrors: src/lib/types.ts → Word, WordWithDetails, WordCardItem
// Table:   public.words
// ────────────────────────────────────────────────────────────────

import Foundation

/// A vocabulary word extracted from Taylor Swift's lyrics.
struct Word: Codable, Identifiable, Hashable {
    let id: UUID
    let word: String
    let definition: String
    let songId: UUID
    let albumId: UUID
    let lyricSnippet: String
    let context: String?
    let difficulty: Difficulty
    let positions: [Int]
    let createdAt: String

    enum CodingKeys: String, CodingKey {
        case id, word, definition, context, difficulty, positions
        case songId      = "song_id"
        case albumId     = "album_id"
        case lyricSnippet = "lyric_snippet"
        case createdAt   = "created_at"
    }
}

// MARK: - Joined view type

/// Word enriched with song & album info — used by Dictionary, Word of the Day, Favorites.
struct WordWithDetails: Identifiable, Hashable {
    let id: UUID
    let word: String
    let definition: String
    let songId: UUID
    let albumId: UUID
    let lyricSnippet: String
    let context: String?
    let difficulty: Difficulty
    let positions: [Int]
    let createdAt: String
    let songTitle: String
    let songSlug: String
    let albumSlug: EraSlug
    let albumTitle: String
}

// MARK: - Raw Supabase join response (for decoding)

/// The raw shape returned by Supabase when selecting
/// `"*, songs!inner(title, slug), albums!inner(slug, title)"` on the `words` table.
/// We decode this first, then map to `WordWithDetails`.
struct WordWithJoins: Codable {
    let id: UUID
    let word: String
    let definition: String
    let songId: UUID
    let albumId: UUID
    let lyricSnippet: String
    let context: String?
    let difficulty: Difficulty
    let positions: [Int]
    let createdAt: String
    let songs: SongRef
    let albums: AlbumRef

    enum CodingKeys: String, CodingKey {
        case id, word, definition, context, difficulty, positions, songs, albums
        case songId       = "song_id"
        case albumId      = "album_id"
        case lyricSnippet = "lyric_snippet"
        case createdAt    = "created_at"
    }

    /// Convert to the frontend-friendly `WordWithDetails` type.
    func toWordWithDetails() -> WordWithDetails {
        WordWithDetails(
            id: id,
            word: word,
            definition: definition,
            songId: songId,
            albumId: albumId,
            lyricSnippet: lyricSnippet,
            context: context,
            difficulty: difficulty,
            positions: positions,
            createdAt: createdAt,
            songTitle: songs.title,
            songSlug: songs.slug,
            albumSlug: EraSlug(rawValue: albums.slug) ?? .debut,
            albumTitle: albums.title
        )
    }
}

// MARK: - Word of the Day RPC response

/// The shape returned by the `assign_wotd_today()` Supabase RPC function.
struct WOTDResponse: Codable {
    let word: String
    let definition: String
    let lyricSnippet: String
    let difficulty: String
    let context: String?
    let albumTitle: String
    let albumSlug: String
    let songTitle: String

    enum CodingKeys: String, CodingKey {
        case word, definition, context
        case lyricSnippet = "lyric_snippet"
        case difficulty
        case albumTitle   = "album_title"
        case albumSlug    = "album_slug"
        case songTitle    = "song_title"
    }

    /// Convert the RPC response to `WordWithDetails`.
    func toWordWithDetails() -> WordWithDetails {
        WordWithDetails(
            id: UUID(),   // RPC doesn't return the word ID
            word: word,
            definition: definition,
            songId: UUID(),
            albumId: UUID(),
            lyricSnippet: lyricSnippet,
            context: context ?? "",
            difficulty: Difficulty(rawValue: difficulty) ?? .intermediate,
            positions: [],
            createdAt: "",
            songTitle: songTitle,
            songSlug: "",  // RPC doesn't return song slug — not needed for WOTD card
            albumSlug: EraSlug(rawValue: albumSlug) ?? .debut,
            albumTitle: albumTitle
        )
    }
}

// MARK: - UI helper type

/// Minimal word item used by WordCard views.
struct WordCardItem: Identifiable, Hashable {
    let id: UUID
    let word: String
    let definition: String
    let lyricSnippet: String
    let song: String
    let songSlug: String
    let album: EraSlug
    let difficulty: Difficulty
    let context: String?

    /// Create from a `WordWithDetails`.
    init(from details: WordWithDetails) {
        self.id = details.id
        self.word = details.word
        self.definition = details.definition
        self.lyricSnippet = details.lyricSnippet
        self.song = details.songTitle
        self.songSlug = details.songSlug
        self.album = details.albumSlug
        self.difficulty = details.difficulty
        self.context = details.context
    }
}
