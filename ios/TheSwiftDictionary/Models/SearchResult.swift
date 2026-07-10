// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Search result model
// Mirrors: src/lib/types.ts → SearchResult
// ────────────────────────────────────────────────────────────────

import Foundation

/// The type of search result (word, song, or album).
enum SearchResultType: String, Codable, Hashable {
    case word
    case song
    case album
}

/// A unified search result across words, songs, and albums.
struct SearchResult: Identifiable, Hashable {
    let type: SearchResultType
    let id: String
    let title: String      // word, song title, or album title
    let subtitle: String   // e.g. "folklore • cardigan"
    let href: String       // navigation destination

    /// SF Symbol icon name for this result type.
    var iconName: String {
        switch type {
        case .word:  return "textformat.abc"
        case .song:  return "music.note"
        case .album: return "square.stack"
        }
    }
}
