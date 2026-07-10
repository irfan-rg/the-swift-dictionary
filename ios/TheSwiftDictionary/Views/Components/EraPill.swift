// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Era Pill
// Small rounded badge showing an era's color and title.
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct EraPill: View {
    let slug: EraSlug
    
    var body: some View {
        let info = eraMap[slug] ?? eraMap[.debut]!
        
        Text(info.title.uppercased())
            .font(AppFont.caption)
            .fontWeight(.semibold)
            .padding(.horizontal, AppSpacing.sm)
            .padding(.vertical, AppSpacing.xs)
            .background(info.colorTheme.background)
            .foregroundColor(info.colorTheme.text)
            .cornerRadius(AppRadius.full)
    }
}
