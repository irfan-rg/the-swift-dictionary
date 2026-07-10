// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Word of the Day Card (Polaroid Style)
// Mirrors: src/components/WordOfTheDay.tsx (mobile layout)
//
// Features a front/back flip interaction just like the web:
//   Front: word, definition, album + difficulty, lyric snippet
//   Back:  context, song/album info
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct WordOfTheDayCard: View {
    let word: WordWithDetails
    @Environment(\.colorScheme) var colorScheme
    @State private var isFlipped = false
    
    var body: some View {
        // 3D flip container
        ZStack {
            // ── FRONT FACE ──
            frontFace
                .opacity(isFlipped ? 0 : 1)
                .rotation3DEffect(.degrees(isFlipped ? 180 : 0), axis: (x: 0, y: 1, z: 0))
            
            // ── BACK FACE ──
            backFace
                .opacity(isFlipped ? 1 : 0)
                .rotation3DEffect(.degrees(isFlipped ? 0 : -180), axis: (x: 0, y: 1, z: 0))
        }
        .onTapGesture {
            withAnimation(.easeInOut(duration: 0.5)) {
                isFlipped.toggle()
            }
        }
    }
    
    // MARK: - Front Face
    
    private var frontFace: some View {
        VStack(spacing: 0) {
            // Polaroid Photo Area
            VStack(spacing: 12) {
                // "— Word of the Day —" label
                Text("— Word of the Day —")
                    .font(.system(size: 10, weight: .medium))
                    .tracking(2)
                    .textCase(.uppercase)
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                
                // The Word
                Text(word.word)
                    .font(AppFont.display(size: 36, weight: .semibold))
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                    .multilineTextAlignment(.center)
                
                // Album · Difficulty
                HStack(spacing: 8) {
                    Text(word.albumTitle)
                        .font(.system(size: 10, weight: .medium))
                        .tracking(1.5)
                        .textCase(.uppercase)
                        .foregroundColor(AppColors.accent(for: colorScheme))
                    
                    Circle()
                        .fill(AppColors.border(for: colorScheme))
                        .frame(width: 4, height: 4)
                    
                    Text(word.difficulty.rawValue)
                        .font(.system(size: 10, weight: .medium))
                        .tracking(1.5)
                        .textCase(.uppercase)
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                }
                .padding(.bottom, 8)
                
                // Definition
                Text(word.definition)
                    .font(.system(size: 14))
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 32)
            .frame(maxWidth: .infinity)
            .background(AppColors.surfaceRaised(for: colorScheme))
            .overlay(
                RoundedRectangle(cornerRadius: 2)
                    .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
            )
            .cornerRadius(2)
            
            // Polaroid Chin — Lyric quote
            VStack(spacing: 16) {
                Text("\"\(word.lyricSnippet)\"")
                    .font(AppFont.handwriting(size: 18))
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                    .multilineTextAlignment(.center)
                    .lineSpacing(4)
                
                Text("tap to flip")
                    .font(.system(size: 9, weight: .medium))
                    .tracking(2)
                    .textCase(.uppercase)
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme).opacity(0.4))
            }
            .padding(.horizontal, 16)
            .padding(.top, 24)
            .padding(.bottom, 8)
        }
        .padding(16)
        .background(AppColors.surfaceRaised(for: colorScheme))
        .cornerRadius(4)
        .shadow(
            color: Color.black.opacity(colorScheme == .dark ? 0.4 : 0.06),
            radius: 20,
            x: 0,
            y: 10
        )
    }
    
    // MARK: - Back Face
    
    private var backFace: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Handwritten heading
            Text("about this word...")
                .font(AppFont.handwriting(size: 26))
                .foregroundColor(AppColors.accent(for: colorScheme))
            
            // Accent line
            Rectangle()
                .fill(AppColors.accent(for: colorScheme).opacity(0.4))
                .frame(width: 32, height: 1)
                .padding(.top, 8)
                .padding(.bottom, 16)
            
            // Context body
            Text(word.context ?? "No additional context found for this lyric.")
                .font(.system(size: 14))
                .foregroundColor(AppColors.foreground(for: colorScheme))
                .lineSpacing(8)
                .fixedSize(horizontal: false, vertical: true)
            
            Spacer(minLength: 24)
            
            // Bottom meta strip
            VStack(spacing: 0) {
                Rectangle()
                    .stroke(style: StrokeStyle(lineWidth: 1, dash: [4, 4]))
                    .foregroundColor(AppColors.border(for: colorScheme))
                    .frame(height: 1)
                
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(word.songTitle)
                            .font(AppFont.handwriting(size: 16))
                            .foregroundColor(AppColors.foreground(for: colorScheme))
                        
                        Text(word.albumTitle)
                            .font(.system(size: 9, weight: .medium))
                            .tracking(2)
                            .textCase(.uppercase)
                            .foregroundColor(AppColors.foreground(for: colorScheme).opacity(0.5))
                    }
                    
                    Spacer()
                }
                .padding(.top, 16)
            }
        }
        .padding(24)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(AppColors.surfaceRaised(for: colorScheme))
        .cornerRadius(4)
        .shadow(
            color: Color.black.opacity(colorScheme == .dark ? 0.4 : 0.06),
            radius: 20,
            x: 0,
            y: 10
        )
    }
}
