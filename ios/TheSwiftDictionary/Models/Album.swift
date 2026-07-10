// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Album model
// Mirrors: src/lib/types.ts → Album
// Table:   public.albums
// ────────────────────────────────────────────────────────────────

import Foundation

/// A Taylor Swift album/era.
struct Album: Codable, Identifiable, Hashable {
    let id: UUID
    let slug: EraSlug
    let title: String
    let year: Int
    let description: String
    let coverUrl: String?
    let animatedCoverUrl: String?
    let songCount: Int
    let vocabCount: Int
    let spotifyUrl: String?
    let createdAt: String

    enum CodingKeys: String, CodingKey {
        case id, slug, title, year, description
        case coverUrl        = "cover_url"
        case animatedCoverUrl = "animated_cover_url"
        case songCount       = "song_count"
        case vocabCount      = "vocab_count"
        case spotifyUrl      = "spotify_url"
        case createdAt       = "created_at"
    }
}
