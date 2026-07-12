import SwiftUI

struct WordDetailSheet: View {
    let word: WordWithDetails
    @Environment(\.colorScheme) var colorScheme
    @Environment(\.dismiss) var dismiss
    
    // We will wire up the favorite toggle in Phase 5
    @State private var isFavorited = false
    
    var body: some View {
        NavigationStack {
            ScrollView(showsIndicators: false) {
                VStack(alignment: .leading, spacing: 32) {
                    
                    // Header Area
                    HStack(alignment: .top) {
                        Text(word.word.lowercased())
                            .font(AppFont.display(size: 48))
                            .foregroundColor(AppColors.foreground(for: colorScheme))
                        
                        Spacer()
                        
                        Text(word.difficulty.rawValue.capitalized)
                            .font(AppFont.handwriting(size: 18))
                            .foregroundColor(AppColors.accent(for: colorScheme))
                            .padding(.top, 16)
                    }
                    
                    // Definition
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Definition")
                            .font(.system(size: 10, weight: .bold))
                            .tracking(2)
                            .textCase(.uppercase)
                            .foregroundColor(AppColors.accent(for: colorScheme))
                        
                        Text(word.definition)
                            .font(AppFont.body(size: 16))
                            .lineSpacing(6)
                            .foregroundColor(AppColors.foreground(for: colorScheme))
                    }
                    
                    // Lyric Snippet
                    if !word.lyricSnippet.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("As heard in")
                                .font(.system(size: 10, weight: .bold))
                                .tracking(2)
                                .textCase(.uppercase)
                                .foregroundColor(AppColors.accent(for: colorScheme))
                            
                            HStack(spacing: 12) {
                                Rectangle()
                                    .fill(AppColors.accent(for: colorScheme).opacity(0.3))
                                    .frame(width: 2)
                                
                                Text("\"\(word.lyricSnippet)\"")
                                    .font(AppFont.body(size: 16))
                                    .italic()
                                    .lineSpacing(6)
                                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                            }
                        }
                    }
                    
                    // Context (if available)
                    if let context = word.context, !context.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Context")
                                .font(.system(size: 10, weight: .bold))
                                .tracking(2)
                                .textCase(.uppercase)
                                .foregroundColor(AppColors.accent(for: colorScheme))
                            
                            Text(context)
                                .font(AppFont.body(size: 15))
                                .lineSpacing(5)
                                .foregroundColor(AppColors.foreground(for: colorScheme))
                        }
                    }
                    
                    // Song & Album Badge
                    if let eraInfo = allEras.first(where: { $0.slug == word.albumSlug }) {
                        HStack(spacing: 16) {
                            Circle()
                                .fill(eraInfo.resolvedColor(for: colorScheme))
                                .frame(width: 40, height: 40)
                                .overlay(
                                    Text(String(eraInfo.label.prefix(1)))
                                        .font(AppFont.branding(size: 20))
                                        .foregroundColor(AppColors.background(for: colorScheme).opacity(0.8))
                                )
                            
                            VStack(alignment: .leading, spacing: 4) {
                                Text(word.songTitle)
                                    .font(.system(size: 16, weight: .semibold))
                                    .foregroundColor(AppColors.foreground(for: colorScheme))
                                
                                Text("from \(eraInfo.label)")
                                    .font(.system(size: 13))
                                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                            }
                        }
                        .padding()
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(AppColors.surfaceRaised(for: colorScheme))
                        .cornerRadius(AppCorners.lg)
                    }
                    
                    Spacer(minLength: 40)
                }
                .padding(24)
            }
            .background(AppColors.background(for: colorScheme).ignoresSafeArea())
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button(action: { dismiss() }) {
                        Image(systemName: "xmark")
                            .font(.system(size: 16, weight: .regular))
                            .foregroundColor(AppColors.foreground(for: colorScheme))
                            .padding(8)
                    }
                }
                
                // Favorite Button Placeholder
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        isFavorited.toggle()
                    }) {
                        Image(systemName: isFavorited ? "heart.fill" : "heart")
                            .font(.system(size: 18, weight: .regular))
                            .foregroundColor(isFavorited ? AppColors.accent(for: colorScheme) : AppColors.foreground(for: colorScheme))
                            .padding(8)
                    }
                }
            }
        }
    }
}
