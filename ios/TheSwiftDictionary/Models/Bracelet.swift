// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Bracelet model
// Mirrors: src/lib/types.ts → Bracelet
// Table:   public.bracelets
// ────────────────────────────────────────────────────────────────

import Foundation

/// A user's friendship bracelet (beads = array of emoji/letter strings).
struct Bracelet: Codable, Identifiable, Hashable {
    let id: UUID
    let userId: UUID
    let beads: [String]
    let createdAt: String
    let updatedAt: String

    enum CodingKeys: String, CodingKey {
        case id, beads
        case userId    = "user_id"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}
