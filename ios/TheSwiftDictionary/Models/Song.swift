// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Song models
// Mirrors: src/lib/types.ts → Song, SongWithAlbum, SongDetail
// Table:   public.songs
// ────────────────────────────────────────────────────────────────

import Foundation

/// A song within an album.
struct Song: Codable, Identifiable, Hashable {
    let id: UUID
    let albumId: UUID
    let slug: String
    let title: String
    let trackNumber: Int
    let lyrics: String?
    let vocabCount: Int
    let difficulty: Difficulty
    let spotifyEmbedUrl: String?
    let createdAt: String

    enum CodingKeys: String, CodingKey {
        case id, slug, title, lyrics, difficulty
        case albumId         = "album_id"
        case trackNumber     = "track_number"
        case vocabCount      = "vocab_count"
        case spotifyEmbedUrl = "spotify_embed_url"
        case createdAt       = "created_at"
    }
}

// MARK: - Joined view types

/// Song with its parent album info — used by Top Songs, explorer listings.
struct SongWithAlbum: Codable, Identifiable, Hashable {
    let id: UUID
    let albumId: UUID
    let slug: String
    let title: String
    let trackNumber: Int
    let lyrics: String?
    let vocabCount: Int
    let difficulty: Difficulty
    let spotifyEmbedUrl: String?
    let createdAt: String
    let albumSlug: EraSlug
    let albumTitle: String

    enum CodingKeys: String, CodingKey {
        case id, slug, title, lyrics, difficulty
        case albumId         = "album_id"
        case trackNumber     = "track_number"
        case vocabCount      = "vocab_count"
        case spotifyEmbedUrl = "spotify_embed_url"
        case createdAt       = "created_at"
        case albumSlug       = "album_slug"
        case albumTitle      = "album_title"
    }
}

/// Full song detail payload — song + vocabulary words.
struct SongDetail: Codable, Identifiable, Hashable {
    let id: UUID
    let albumId: UUID
    let slug: String
    let title: String
    let trackNumber: Int
    let lyrics: String?
    let vocabCount: Int
    let difficulty: Difficulty
    let spotifyEmbedUrl: String?
    let createdAt: String
    let albumSlug: EraSlug
    let albumTitle: String
    let vocabWords: [Word]

    enum CodingKeys: String, CodingKey {
        case id, slug, title, lyrics, difficulty
        case albumId         = "album_id"
        case trackNumber     = "track_number"
        case vocabCount      = "vocab_count"
        case spotifyEmbedUrl = "spotify_embed_url"
        case createdAt       = "created_at"
        case albumSlug       = "album_slug"
        case albumTitle      = "album_title"
        case vocabWords      = "vocab_words"
    }
}

// MARK: - Supabase join response helpers

/// Lightweight song reference returned inside a Supabase join.
/// e.g. `select("*, songs!inner(title, slug)")` → `{ "songs": { "title": "...", "slug": "..." } }`
struct SongRef: Codable, Hashable {
    let title: String
    let slug: String
}

/// Lightweight album reference returned inside a Supabase join.
struct AlbumRef: Codable, Hashable {
    let slug: String
    let title: String
}
