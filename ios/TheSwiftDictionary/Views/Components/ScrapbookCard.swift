// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Scrapbook Card
// Mirrors the `.scrapbook-card` CSS class for the Victorian aesthetic.
// ────────────────────────────────────────────────────────────────

import SwiftUI

/// A container view that applies the signature Victorian scrapbook styling:
/// torn edges (simulated via corner radius here, since full SVG torn edges
/// are complex in pure SwiftUI, though we can add an overlay later if needed),
/// a subtle border, off-white paper background, and a soft shadow.
struct ScrapbookCard<Content: View>: View {
    
    @Environment(\.colorScheme) var colorScheme
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        content
            .padding(AppSpacing.lg)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(AppColors.cardBackground(for: colorScheme))
            .cornerRadius(AppRadius.md)
            .overlay(
                RoundedRectangle(cornerRadius: AppRadius.md)
                    .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
            )
            .shadow(
                color: Color.black.opacity(colorScheme == .dark ? 0.3 : 0.05),
                radius: 10,
                x: 0,
                y: 4
            )
    }
}
