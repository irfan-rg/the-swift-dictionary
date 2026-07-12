import SwiftUI

struct WordDetailSheet: View {
    let word: WordWithDetails
    @Environment(\.colorScheme) var colorScheme
    @Environment(\.dismiss) var dismiss
    
    // We will wire up the favorite toggle in Phase 5
    @State private var isFavorited = false
    
    var body: some View {
        VStack(spacing: 0) {
            // Top Action Bar
            HStack {
                Button(action: { dismiss() }) {
                    Image(systemName: "xmark")
                        .font(.system(size: 20, weight: .regular))
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                        .padding(20)
                }
                
                Spacer()
                
                Button(action: { isFavorited.toggle() }) {
                    Image(systemName: isFavorited ? "heart.fill" : "heart")
                        .font(.system(size: 20, weight: .regular))
                        .foregroundColor(isFavorited ? AppColors.accent(for: colorScheme) : AppColors.foreground(for: colorScheme))
                        .padding(20)
                }
            }
            .background(AppColors.background(for: colorScheme))
            ScrollView(showsIndicators: false) {
                VStack(alignment: .leading, spacing: 32) {
                    
                    // Header Area
                    HStack(alignment: .top) {
                        Text(word.word.lowercased())
                            .font(AppFont.display(size: 48))
                            .foregroundColor(AppColors.foreground(for: colorScheme))
                        
                        Spacer()
                        
                        Text(word.difficulty.rawValue.capitalized)
                            .font(AppFont.handwriting(size: 15))
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
                    
                    // Song & Album Tappable Card
                    if let eraInfo = allEras.first(where: { $0.slug == word.albumSlug }) {
                        HStack(spacing: 16) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text(word.songTitle)
                                    .font(.system(size: 16, weight: .semibold))
                                    .foregroundColor(AppColors.foreground(for: colorScheme))
                                    .lineLimit(2)
                                    .multilineTextAlignment(.leading)
                                
                                Text("from \(eraInfo.label)")
                                    .font(.system(size: 13))
                                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                            }
                            
                            Spacer(minLength: 16)
                            
                            Image(systemName: "chevron.right")
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundColor(AppColors.foregroundMuted(for: colorScheme).opacity(0.4))
                        }
                        .padding()
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(
                            LinearGradient(
                                colors: [
                                    eraInfo.resolvedColor(for: colorScheme).opacity(0.15),
                                    AppColors.surfaceRaised(for: colorScheme)
                                ],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .cornerRadius(AppCorners.lg)
                        .overlay(
                            RoundedRectangle(cornerRadius: AppCorners.lg)
                                .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
                        )
                        .onTapGesture {
                            // Phase 4: Route to SongDetailView
                            dismiss()
                        }
                    }
                    
                    Spacer(minLength: 40)
                }
                .padding(.horizontal, 24)
                .padding(.bottom, 24)
            }
            .background(AppColors.background(for: colorScheme).ignoresSafeArea())
        }
    }
}
