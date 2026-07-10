// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Era slug identifiers
// Mirrors: src/lib/types.ts → EraSlug
// ────────────────────────────────────────────────────────────────

import Foundation

/// Every Taylor Swift album era, used as the canonical identifier
/// across the database (`albums.slug`) and the entire UI.
enum EraSlug: String, Codable, CaseIterable, Identifiable, Hashable {
    case debut      = "debut"
    case fearless   = "fearless"
    case speaknow   = "speaknow"
    case red        = "red"
    case nineteen89 = "1989"
    case reputation = "reputation"
    case lover      = "lover"
    case folklore   = "folklore"
    case evermore   = "evermore"
    case midnights  = "midnights"
    case ttpd       = "ttpd"
    case showgirl   = "showgirl"

    var id: String { rawValue }
}
