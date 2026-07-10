// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Profile model
// Mirrors: src/lib/types.ts → Profile
// Table:   public.profiles
// ────────────────────────────────────────────────────────────────

import Foundation

/// A user's profile, auto-created on signup via a Postgres trigger.
struct Profile: Codable, Identifiable, Hashable {
    let id: UUID            // = auth.users.id
    let displayName: String?
    let declaredEra: String?
    let createdAt: String

    enum CodingKeys: String, CodingKey {
        case id
        case displayName = "display_name"
        case declaredEra = "declared_era"
        case createdAt   = "created_at"
    }

    /// The declared era as a typed `EraSlug`, if valid.
    var declaredEraSlug: EraSlug? {
        guard let declaredEra else { return nil }
        return EraSlug(rawValue: declaredEra)
    }
}
