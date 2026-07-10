// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Favorite model
// Mirrors: src/lib/types.ts → Favorite
// Table:   public.favorites
// ────────────────────────────────────────────────────────────────

import Foundation

/// A user's favorited vocabulary word.
struct Favorite: Codable, Identifiable, Hashable {
    let id: UUID
    let userId: UUID
    let wordId: UUID
    let createdAt: String

    enum CodingKeys: String, CodingKey {
        case id
        case userId    = "user_id"
        case wordId    = "word_id"
        case createdAt = "created_at"
    }
}

// MARK: - Supabase join response for favorites

/// The raw shape returned when selecting favorites with word joins:
/// `"word_id, words(*, songs(title, slug), albums(slug, title))"`
struct FavoriteWithWordJoin: Codable {
    let wordId: UUID
    let words: WordWithJoins

    enum CodingKeys: String, CodingKey {
        case wordId = "word_id"
        case words
    }
}
