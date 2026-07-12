import SwiftUI

struct WordCardView: View {
    let word: WordWithDetails
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        ScrapbookCard {
            VStack(alignment: .leading, spacing: 12) {
                // Header: Word + Difficulty
                HStack(alignment: .top) {
                    Text(word.word)
                        .font(AppFont.branding(size: 28))
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                        .lineLimit(1)
                        .minimumScaleFactor(0.8)
                    
                    Spacer()
                    
                    Text(word.difficulty.rawValue.capitalized)
                        .font(.system(size: 9, weight: .bold))
                        .tracking(1)
                        .textCase(.uppercase)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(AppColors.border(for: colorScheme))
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                        .clipShape(Capsule())
                }
                
                // Definition Snippet
                Text(word.definition)
                    .font(AppFont.body(size: 14))
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    .lineSpacing(4)
                    .lineLimit(3)
                    .multilineTextAlignment(.leading)
                
                // Divider
                Rectangle()
                    .fill(AppColors.border(for: colorScheme))
                    .frame(height: 1)
                    .padding(.vertical, 4)
                
                // Footer: Era dot + Song / Album
                HStack(spacing: 8) {
                    if let eraInfo = allEras.first(where: { $0.slug == word.albumSlug }) {
                        Circle()
                            .fill(eraInfo.resolvedColor(for: colorScheme))
                            .frame(width: 8, height: 8)
                        
                        Text("\(word.songTitle) • \(eraInfo.label)")
                            .font(.system(size: 11, weight: .medium))
                            .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                            .lineLimit(1)
                    }
                }
            }
        }
    }
}
