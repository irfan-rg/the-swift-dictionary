// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Design System / Theme
// Mirrors: src/app/globals.css → CSS custom properties
// ────────────────────────────────────────────────────────────────

import SwiftUI

// MARK: - Color Tokens

/// The app's color palette, translating the CSS custom properties
/// from `globals.css` into SwiftUI semantic colors.
///
/// Light mode = "Folklore" theme (warm linen/parchment)
/// Dark mode  = "Dark Academia" theme (deep charcoal ink)
enum AppColors {

    // ── Backgrounds ────────────────────────────────────────────

    /// Main background — `--background`
    /// Light: #FDFBF7 (soft linen), Dark: #0A0A0A (deepest charcoal)
    static let background = Color("Background", bundle: nil)

    /// Elevated surface — `--surface`
    /// Light: #FFFFFF, Dark: #141414
    static let surface = Color("Surface", bundle: nil)

    /// Raised surface (cards, modals) — `--surface-raised`
    /// Light: #F5EFE6, Dark: #1F1F1F
    static let surfaceRaised = Color("SurfaceRaised", bundle: nil)

    // ── Text ───────────────────────────────────────────────────

    /// Primary text — `--foreground`
    /// Light: #2A2421 (warm walnut), Dark: #F5EFE6 (warm starlight)
    static let foreground = Color("Foreground", bundle: nil)

    /// Secondary/muted text — `--foreground-muted`
    /// Light: #7A6F68, Dark: #A39B93
    static let foregroundMuted = Color("ForegroundMuted", bundle: nil)

    // ── Borders ────────────────────────────────────────────────

    /// Default border — `--border`
    /// Light: #E8DFD3, Dark: rgba(255,255,255,0.08)
    static let border = Color("Border", bundle: nil)

    /// Focused/active border — `--border-focus`
    /// Light: #C2B2A4, Dark: rgba(255,255,255,0.2)
    static let borderFocus = Color("BorderFocus", bundle: nil)

    // ── Accents ────────────────────────────────────────────────

    /// Primary accent — `--accent`
    /// Light: #8B5E3C (warm acoustic brown), Dark: #D1AF84
    static let accent = Color("Accent", bundle: nil)

    /// Muted accent — `--accent-muted`
    /// Light: #D4A373, Dark: #8F7052
    static let accentMuted = Color("AccentMuted", bundle: nil)

    // ── Glass ──────────────────────────────────────────────────

    /// Glass panel background — `--glass-bg`
    /// Light: rgba(255,255,255,0.85), Dark: rgba(20,20,20,0.7)
    static let glassBg = Color("GlassBg", bundle: nil)

    // ── Fallbacks (for use before Assets.xcassets is set up) ──

    /// Light mode background fallback.
    static let backgroundLight = Color(hex: "FDFBF7")
    /// Dark mode background fallback.
    static let backgroundDark  = Color(hex: "0A0A0A")

    /// Light mode foreground fallback.
    static let foregroundLight = Color(hex: "2A2421")
    /// Dark mode foreground fallback.
    static let foregroundDark  = Color(hex: "F5EFE6")

    /// Light mode accent fallback.
    static let accentLight = Color(hex: "8B5E3C")
    /// Dark mode accent fallback.
    static let accentDark  = Color(hex: "D1AF84")

    // ── Adaptive color helpers ─────────────────────────────────

    /// Returns the appropriate background color for the given scheme.
    static func background(for scheme: ColorScheme) -> Color {
        scheme == .dark ? backgroundDark : backgroundLight
    }

    /// Returns the appropriate foreground color for the given scheme.
    static func foreground(for scheme: ColorScheme) -> Color {
        scheme == .dark ? foregroundDark : foregroundLight
    }

    /// Returns the appropriate accent color for the given scheme.
    static func accent(for scheme: ColorScheme) -> Color {
        scheme == .dark ? accentDark : accentLight
    }

    /// Returns the surface color for the given scheme.
    static func surface(for scheme: ColorScheme) -> Color {
        scheme == .dark ? Color(hex: "141414") : .white
    }

    /// Returns the raised surface color for the given scheme.
    static func surfaceRaised(for scheme: ColorScheme) -> Color {
        scheme == .dark ? Color(hex: "1F1F1F") : Color(hex: "F5EFE6")
    }

    /// Returns the border color for the given scheme.
    static func border(for scheme: ColorScheme) -> Color {
        scheme == .dark ? .white.opacity(0.08) : Color(hex: "E8DFD3")
    }

    /// Returns the focused border color for the given scheme.
    static func borderFocus(for scheme: ColorScheme) -> Color {
        scheme == .dark ? .white.opacity(0.2) : Color(hex: "C2B2A4")
    }

    /// Returns the muted foreground for the given scheme.
    static func foregroundMuted(for scheme: ColorScheme) -> Color {
        scheme == .dark ? Color(hex: "A39B93") : Color(hex: "7A6F68")
    }
}

// MARK: - Shadows

/// Shadow presets matching the CSS `--shadow-soft` and `--shadow-polaroid`.
enum AppShadows {
    /// Subtle soft shadow for cards — `--shadow-soft`
    static func soft(for scheme: ColorScheme) -> (color: Color, radius: CGFloat, x: CGFloat, y: CGFloat) {
        if scheme == .dark {
            return (Color.black.opacity(0.8), 15, 0, 8)
        } else {
            return (Color(hex: "2A2421").opacity(0.04), 15, 0, 8)
        }
    }

    /// Polaroid-style deeper shadow — `--shadow-polaroid`
    static func polaroid(for scheme: ColorScheme) -> (color: Color, radius: CGFloat, x: CGFloat, y: CGFloat) {
        if scheme == .dark {
            return (Color.black.opacity(0.9), 20, 0, 10)
        } else {
            return (Color(hex: "2A2421").opacity(0.08), 20, 0, 10)
        }
    }
}

// MARK: - Spacing

/// Consistent spacing scale used across the app.
enum AppSpacing {
    static let xxs: CGFloat = 2
    static let xs: CGFloat  = 4
    static let sm: CGFloat  = 8
    static let md: CGFloat  = 12
    static let lg: CGFloat  = 16
    static let xl: CGFloat  = 20
    static let xxl: CGFloat = 24
    static let xxxl: CGFloat = 32

    /// Horizontal page padding.
    static let pagePadding: CGFloat = 16
}

// MARK: - Corner Radius

enum AppCorners {
    static let sm: CGFloat   = 4   // Polaroid cards (sharp, intentional)
    static let md: CGFloat   = 8   // Buttons, inputs
    static let lg: CGFloat   = 12  // Cards, panels
    static let xl: CGFloat   = 16  // Modal sheets
    static let full: CGFloat = 9999 // Pills, avatars
}

// MARK: - Color Hex Initializer

extension Color {
    /// Create a Color from a hex string (e.g. "FF5733" or "#FF5733").
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)

        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255,
                            (int >> 8) * 17,
                            (int >> 4 & 0xF) * 17,
                            (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255,
                            int >> 16,
                            int >> 8 & 0xFF,
                            int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24,
                            int >> 16 & 0xFF,
                            int >> 8 & 0xFF,
                            int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
