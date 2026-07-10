// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Difficulty classification
// Mirrors: src/lib/types.ts → Difficulty
// ────────────────────────────────────────────────────────────────

import Foundation

/// Difficulty classification for vocabulary words.
/// Matches the database CHECK constraint: `('Beginner', 'Intermediate', 'Advanced')`.
enum Difficulty: String, Codable, CaseIterable, Identifiable, Hashable {
    case beginner     = "Beginner"
    case intermediate = "Intermediate"
    case advanced     = "Advanced"

    var id: String { rawValue }

    /// Human-readable label (same as rawValue for this enum).
    var label: String { rawValue }
}
