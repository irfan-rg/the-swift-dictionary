// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Era metadata & lookup helpers
// Mirrors: src/lib/constants.ts → ERAS, ERA_MAP, getEraColor, etc.
// ────────────────────────────────────────────────────────────────

import SwiftUI

/// Complete metadata for a Taylor Swift era/album.
struct EraInfo: Identifiable, Hashable {
    let slug: EraSlug
    let label: String
    let year: Int
    let color: Color       // Light mode era color
    let colorDark: Color   // Dark mode era color

    var id: EraSlug { slug }

    /// Returns the appropriate era color for the current color scheme.
    func resolvedColor(for scheme: ColorScheme) -> Color {
        scheme == .dark ? colorDark : color
    }
}

// MARK: - All Eras (single source of truth)

/// Every Taylor Swift era, ordered chronologically.
let allEras: [EraInfo] = [
    EraInfo(
        slug: .debut,
        label: "Taylor Swift",
        year: 2006,
        color: Color(hex: "5F9EA0"),
        colorDark: Color(hex: "7EC8CA")
    ),
    EraInfo(
        slug: .fearless,
        label: "Fearless",
        year: 2008,
        color: Color(hex: "D4A017"),
        colorDark: Color(hex: "FFD700")
    ),
    EraInfo(
        slug: .speaknow,
        label: "Speak Now",
        year: 2010,
        color: Color(hex: "7B2D8E"),
        colorDark: Color(hex: "C084FC")
    ),
    EraInfo(
        slug: .red,
        label: "Red",
        year: 2012,
        color: Color(hex: "DC143C"),
        colorDark: Color(hex: "F87171")
    ),
    EraInfo(
        slug: .nineteen89,
        label: "1989",
        year: 2014,
        color: Color(hex: "4A90D9"),
        colorDark: Color(hex: "87CEEB")
    ),
    EraInfo(
        slug: .reputation,
        label: "Reputation",
        year: 2017,
        color: Color(hex: "1A1A1A"),
        colorDark: Color(hex: "C0C0C0")
    ),
    EraInfo(
        slug: .lover,
        label: "Lover",
        year: 2019,
        color: Color(hex: "E8788F"),
        colorDark: Color(hex: "FFB6C1")
    ),
    EraInfo(
        slug: .folklore,
        label: "Folklore",
        year: 2020,
        color: Color(hex: "8A8A8A"),
        colorDark: Color(hex: "C8C8C8")
    ),
    EraInfo(
        slug: .evermore,
        label: "Evermore",
        year: 2020,
        color: Color(hex: "CC5500"),
        colorDark: Color(hex: "E8923B")
    ),
    EraInfo(
        slug: .midnights,
        label: "Midnights",
        year: 2022,
        color: Color(hex: "191970"),
        colorDark: Color(hex: "818CF8")
    ),
    EraInfo(
        slug: .ttpd,
        label: "The Tortured Poets Department",
        year: 2024,
        color: Color(hex: "78716C"),
        colorDark: Color(hex: "A8A29E")
    ),
    EraInfo(
        slug: .showgirl,
        label: "The Life of a Showgirl",
        year: 2025,
        color: Color(hex: "F97316"),
        colorDark: Color(hex: "FB923C")
    ),
]

// MARK: - Lookup helpers

/// O(1) lookup: slug → EraInfo.
let eraMap: [EraSlug: EraInfo] = Dictionary(
    uniqueKeysWithValues: allEras.map { ($0.slug, $0) }
)

/// Get the display label for an era slug.
func eraLabel(for slug: EraSlug) -> String {
    eraMap[slug]?.label ?? slug.rawValue
}

/// Get the era color for a slug, automatically adapting to the color scheme.
func eraColor(for slug: EraSlug, scheme: ColorScheme) -> Color {
    guard let info = eraMap[slug] else { return .secondary }
    return info.resolvedColor(for: scheme)
}

// MARK: - Difficulty list

/// All difficulties, for use in filter pickers.
let allDifficulties: [Difficulty] = Difficulty.allCases.map { $0 }
