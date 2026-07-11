// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Typography
// Mirrors: src/app/layout.tsx → font declarations
//
// Custom fonts used (must be bundled in the app):
//   1. Cormorant Garamond  → .display   (Dictionary/Victorian feel)
//   2. Bricolage Grotesque → .body      (Modern era feel, UI body)
//   3. Cinzel Decorative   → .branding  (Epic branding / logo)
//   4. Nothing You Could Do → .handwriting (Taylor's diary feel)
//
// All four fonts must be:
//   1. Added to the Xcode project (drag .ttf/.otf files)
//   2. Listed in Info.plist under "Fonts provided by application"
//   3. Referenced here by their PostScript name
// ────────────────────────────────────────────────────────────────

import SwiftUI

// MARK: - Font Names

/// PostScript names for the bundled custom fonts.
/// These are the exact names you see in Font Book on Mac.
///
/// To find the PostScript name of a font file:
///   1. Open the font in Font Book
///   2. Select the font → File → Show in Finder
///   3. Or use: `fc-query --format='%{postscriptname}\n' FontFile.ttf`
enum FontName {
    // Cormorant Garamond
    static let cormorantRegular    = "CormorantGaramond-Regular"
    static let cormorantMedium     = "CormorantGaramond-Medium"
    static let cormorantSemiBold   = "CormorantGaramond-SemiBold"
    static let cormorantItalic     = "CormorantGaramond-Italic"
    static let cormorantMediumItalic = "CormorantGaramond-MediumItalic"
    static let cormorantSemiBoldItalic = "CormorantGaramond-SemiBoldItalic"

    // Bricolage Grotesque
    static let bricolageRegular    = "BricolageGrotesque-Regular"
    static let bricolageMedium     = "BricolageGrotesque-Medium"
    static let bricolageSemiBold   = "BricolageGrotesque-SemiBold"
    static let bricolageBold       = "BricolageGrotesque-Bold"

    // Cinzel Decorative
    static let cinzelRegular       = "CinzelDecorative-Regular"
    static let cinzelBold          = "CinzelDecorative-Bold"

    // Nothing You Could Do
    static let handwriting         = "NothingYouCouldDo"
}

// MARK: - Font Builders

/// Typography system matching the web app's font classes:
///   `.font-display`     → Cormorant Garamond (serif)
///   `.font-body`        → Bricolage Grotesque (sans)
///   `.font-branding`    → Cinzel Decorative (decorative serif)
///   `.font-handwriting` → Nothing You Could Do (cursive)
enum AppFont {

    // ── Display (Cormorant Garamond) ───────────────────────────

    /// Serif display font — used for headings, word titles, definitions.
    static func display(size: CGFloat, weight: Font.Weight = .regular) -> Font {
        let name: String
        switch weight {
        case .semibold:
            name = FontName.cormorantSemiBold
        case .medium:
            name = FontName.cormorantMedium
        default:
            name = FontName.cormorantRegular
        }
        return .custom(name, size: size)
    }

    /// Italic variant of the display font.
    static func displayItalic(size: CGFloat, weight: Font.Weight = .regular) -> Font {
        let name: String
        switch weight {
        case .semibold:
            name = FontName.cormorantSemiBoldItalic
        case .medium:
            name = FontName.cormorantMediumItalic
        default:
            name = FontName.cormorantItalic
        }
        return .custom(name, size: size)
    }

    // ── Body (Bricolage Grotesque) ─────────────────────────────

    /// Sans-serif body font — used for all UI text, descriptions, labels.
    static func body(size: CGFloat, weight: Font.Weight = .regular) -> Font {
        let name: String
        switch weight {
        case .bold:
            name = FontName.bricolageBold
        case .semibold:
            name = FontName.bricolageSemiBold
        case .medium:
            name = FontName.bricolageMedium
        default:
            name = FontName.bricolageRegular
        }
        return .custom(name, size: size)
    }

    // ── Branding (Cinzel Decorative) ───────────────────────────

    /// Decorative branding font — used exclusively for the app logo/title.
    static func branding(size: CGFloat, weight: Font.Weight = .regular) -> Font {
        let name = weight == .bold ? FontName.cinzelBold : FontName.cinzelRegular
        return .custom(name, size: size)
    }

    /// Branding font with small-caps synthesis:
    /// uppercase letters (T, S, D) render at full height,
    /// lowercase letters are synthesized as smaller caps.
    /// Write text as "The Swift Dictionary" — NOT all-caps.
    static func brandingSmallCaps(size: CGFloat) -> Font {
        Font.custom(FontName.cinzelRegular, size: size).smallCaps()
    }

    // ── Handwriting (Nothing You Could Do) ─────────────────────

    /// Handwritten cursive font — used for diary-style annotations, quotes.
    static func handwriting(size: CGFloat) -> Font {
        .custom(FontName.handwriting, size: size)
    }
}

// MARK: - Typography Scale

/// Predefined text styles matching the app's visual hierarchy.
extension AppFont {
    /// Hero title — large serif display (e.g. "The Swift Dictionary").
    static var heroTitle: Font { display(size: 36, weight: .semibold) }

    /// Section heading — serif display.
    static var sectionTitle: Font { display(size: 28, weight: .medium) }

    /// Card title — serif display (e.g. word name in dictionary card).
    static var cardTitle: Font { display(size: 22, weight: .medium) }

    /// Body text — sans-serif.
    static var bodyRegular: Font { body(size: 15) }

    /// Body text medium weight.
    static var bodyMedium: Font { body(size: 15, weight: .medium) }

    /// Small body text / captions.
    static var caption: Font { body(size: 13) }

    /// Very small text / labels.
    static var label: Font { body(size: 11, weight: .medium) }

    /// Tab bar item label.
    static var tabLabel: Font { body(size: 10, weight: .medium) }

    /// App logo in the header.
    static var logoTitle: Font { branding(size: 18) }

    /// Lyric snippet in handwriting.
    static var lyricQuote: Font { handwriting(size: 16) }

    /// Definition text in italic serif.
    static var definition: Font { displayItalic(size: 17) }
}

// MARK: - Info.plist font registration list

/// The exact filenames to add under "Fonts provided by application" in Info.plist.
///
/// ```
/// UIAppFonts:
///   - CormorantGaramond-Regular.ttf
///   - CormorantGaramond-Medium.ttf
///   - CormorantGaramond-SemiBold.ttf
///   - CormorantGaramond-Italic.ttf
///   - CormorantGaramond-MediumItalic.ttf
///   - CormorantGaramond-SemiBoldItalic.ttf
///   - BricolageGrotesque-Regular.ttf
///   - BricolageGrotesque-Medium.ttf
///   - BricolageGrotesque-SemiBold.ttf
///   - BricolageGrotesque-Bold.ttf
///   - CinzelDecorative-Regular.ttf
///   - CinzelDecorative-Bold.ttf
///   - NothingYouCouldDo-Regular.ttf
/// ```
///
/// Download from Google Fonts:
///   - https://fonts.google.com/specimen/Cormorant+Garamond
///   - https://fonts.google.com/specimen/Bricolage+Grotesque
///   - https://fonts.google.com/specimen/Cinzel+Decorative
///   - https://fonts.google.com/specimen/Nothing+You+Could+Do
let registeredFontFiles: [String] = [
    "CormorantGaramond-Regular.ttf",
    "CormorantGaramond-Medium.ttf",
    "CormorantGaramond-SemiBold.ttf",
    "CormorantGaramond-Italic.ttf",
    "CormorantGaramond-MediumItalic.ttf",
    "CormorantGaramond-SemiBoldItalic.ttf",
    "BricolageGrotesque-Regular.ttf",
    "BricolageGrotesque-Medium.ttf",
    "BricolageGrotesque-SemiBold.ttf",
    "BricolageGrotesque-Bold.ttf",
    "CinzelDecorative-Regular.ttf",
    "CinzelDecorative-Bold.ttf",
    "NothingYouCouldDo-Regular.ttf",
]
