// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Home View
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct HomeView: View {
    @StateObject private var viewModel = HomeViewModel()
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        ScrollView {
            VStack(spacing: AppSpacing.xl) {
                
                // ── Hero Section ─────────────────────────────
                VStack(spacing: AppSpacing.md) {
                    Text("The Swift Dictionary")
                        .font(AppFont.branding(size: 36))
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                        .multilineTextAlignment(.center)
                    
                    Text("A complete lexicon of vocabulary used across all eras of Taylor Swift's discography.")
                        .font(AppFont.bodyRegular)
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, AppSpacing.lg)
                }
                .padding(.top, AppSpacing.xl)
                
                // ── Loading / Error State ────────────────────
                if viewModel.isLoading {
                    ProgressView()
                        .padding(.vertical, AppSpacing.xl)
                } else if let error = viewModel.errorMessage {
                    Text(error)
                        .foregroundColor(.red)
                        .padding()
                } else {
                    
                    // ── Word of the Day ──────────────────────
                    if let wotd = viewModel.wordOfTheDay {
                        VStack(alignment: .leading, spacing: AppSpacing.md) {
                            SectionHeader(title: "Word of the Day")
                            WordOfTheDayCard(word: wotd)
                                .padding(.horizontal, AppSpacing.md)
                        }
                    }
                    
                    // ── Era Timeline ─────────────────────────
                    VStack(alignment: .leading, spacing: AppSpacing.md) {
                        SectionHeader(title: "The Eras")
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: AppSpacing.md) {
                                // Add leading padding inside the scrollview for proper inset behavior
                                Spacer().frame(width: AppSpacing.xs)
                                
                                ForEach(EraSlug.allCases, id: \.self) { era in
                                    EraTimelineCard(era: era)
                                }
                                
                                Spacer().frame(width: AppSpacing.xs)
                            }
                        }
                    }
                    
                    // ── Top Songs ────────────────────────────
                    VStack(alignment: .leading, spacing: AppSpacing.md) {
                        SectionHeader(title: "Most Vocabulary")
                        
                        VStack(spacing: AppSpacing.sm) {
                            ForEach(Array(viewModel.topSongs.enumerated()), id: \.element.id) { index, song in
                                TopSongRow(rank: index + 1, song: song)
                            }
                        }
                        .padding(.horizontal, AppSpacing.md)
                    }
                }
            }
            .padding(.bottom, AppSpacing.xxl)
        }
        .background(AppColors.background(for: colorScheme))
        .task {
            // Load data when view appears
            await viewModel.loadData()
        }
    }
}

// MARK: - Subcomponents

/// Simple reusable section header
private struct SectionHeader: View {
    let title: String
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        Text(title)
            .font(AppFont.sectionTitle)
            .foregroundColor(AppColors.foreground(for: colorScheme))
            .padding(.horizontal, AppSpacing.md)
    }
}

/// A card for the horizontal era timeline
private struct EraTimelineCard: View {
    let era: EraSlug
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        let info = eraMap[era]!
        
        VStack {
            // Since we don't have album images bundled yet, we use a colored block
            // In Phase 4, we might replace this with actual album art via AsyncImage
            Rectangle()
                .fill(info.resolvedColor(for: colorScheme))
                .frame(width: 120, height: 120)
                .cornerRadius(AppCorners.md)
                .overlay(
                    Text(info.label.prefix(1))
                        .font(AppFont.branding(size: 48))
                        .foregroundColor(.white.opacity(0.3))
                )
            
            Text(info.label)
                .font(AppFont.caption)
                .foregroundColor(AppColors.foreground(for: colorScheme))
                .fontWeight(.medium)
                .lineLimit(1)
        }
        .frame(width: 120)
    }
}

/// A row for the Top Songs list
private struct TopSongRow: View {
    let rank: Int
    let song: SongWithAlbum
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        HStack(spacing: AppSpacing.md) {
            Text("\(rank)")
                .font(AppFont.sectionTitle)
                .foregroundColor(AppColors.accent(for: colorScheme))
                .frame(width: 24, alignment: .center)
            
            VStack(alignment: .leading, spacing: 2) {
                Text(song.title)
                    .font(AppFont.bodyRegular)
                    .fontWeight(.semibold)
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                    .lineLimit(1)
                
                HStack {
                    EraPill(slug: song.albumSlug)
                }
            }
            
            Spacer()
            
            VStack(alignment: .trailing, spacing: 2) {
                Text("\(song.vocabCount)")
                    .font(AppFont.display(size: 20))
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                Text("words")
                    .font(.system(size: 10, weight: .medium, design: .serif))
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
            }
        }
        .padding()
        .background(AppColors.surfaceRaised(for: colorScheme))
        .cornerRadius(AppCorners.md)
        .overlay(
            RoundedRectangle(cornerRadius: AppCorners.md)
                .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
        )
    }
}
