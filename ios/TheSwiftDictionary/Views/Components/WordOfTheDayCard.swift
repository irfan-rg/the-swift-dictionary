// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Word of the Day Card
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct WordOfTheDayCard: View {
    let word: WordWithDetails
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        ScrapbookCard {
            VStack(alignment: .leading, spacing: AppSpacing.md) {
                
                // Header: "Word of the Day" + Date
                HStack {
                    Text("Word of the Day")
                        .font(AppFont.caption)
                        .foregroundColor(AppColors.accent(for: colorScheme))
                        .fontWeight(.bold)
                        .textCase(.uppercase)
                        .tracking(2)
                    
                    Spacer()
                    
                    Text(formattedDate)
                        .font(AppFont.caption)
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                }
                
                Divider()
                    .background(AppColors.border(for: colorScheme))
                
                // The Word itself
                Text(word.word)
                    .font(AppFont.display(size: 42))
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                
                // Definition
                Text(word.definition)
                    .font(AppFont.bodyRegular)
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                    .fixedSize(horizontal: false, vertical: true)
                
                // Era + Song Tags
                HStack(spacing: AppSpacing.sm) {
                    EraPill(slug: word.albumSlug)
                    
                    Text(word.songTitle)
                        .font(AppFont.caption)
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                        .lineLimit(1)
                }
                .padding(.top, AppSpacing.xs)
            }
        }
    }
    
    private var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        return formatter.string(from: Date())
    }
}
