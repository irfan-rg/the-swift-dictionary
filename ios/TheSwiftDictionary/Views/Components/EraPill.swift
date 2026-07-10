// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Era Pill
// Small rounded badge showing an era's color and title.
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct EraPill: View {
    let slug: EraSlug
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        let info = eraMap[slug] ?? eraMap[.debut]!
        
        Text(info.label.uppercased())
            .font(.system(size: 8, weight: .bold))
            .tracking(1.5)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(info.resolvedColor(for: colorScheme))
            .foregroundColor(.white)
            .cornerRadius(AppCorners.full)
    }
}
