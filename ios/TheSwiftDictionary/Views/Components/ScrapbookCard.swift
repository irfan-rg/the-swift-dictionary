// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Scrapbook Card
// Generic vintage card container.
// ────────────────────────────────────────────────────────────────

import SwiftUI

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
            .background(AppColors.surfaceRaised(for: colorScheme))
            .cornerRadius(AppCorners.sm)
            .overlay(
                RoundedRectangle(cornerRadius: AppCorners.sm)
                    .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
            )
            .shadow(
                color: Color.black.opacity(colorScheme == .dark ? 0.3 : 0.03),
                radius: 10,
                x: 0,
                y: 4
            )
    }
}
