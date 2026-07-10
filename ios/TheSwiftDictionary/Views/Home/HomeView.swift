// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Home View
// Mirrors: src/app/page.tsx + mobile layouts of each component
//
// Sections (top to bottom, matching the web):
//   1. Hero — branding title, handwriting tagline, description
//   2. Word of the Day — polaroid flip card
//   3. Top Songs — diary/journal style with spiral binder
//   4. Era Timeline — horizontal album cover circles
//   5. Ornate end mark
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct HomeView: View {
    @StateObject private var viewModel = HomeViewModel()
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 40) {
                
                // ── 1. Hero Section ──────────────────────────
                HeroSection(colorScheme: colorScheme)
                
                // ── Loading / Error State ────────────────────
                if viewModel.isLoading {
                    VStack(spacing: 16) {
                        ProgressView()
                            .tint(AppColors.accent(for: colorScheme))
                        Text("Loading dictionary...")
                            .font(.system(size: 12, weight: .medium))
                            .tracking(2)
                            .textCase(.uppercase)
                            .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    }
                    .padding(.vertical, 60)
                } else if let error = viewModel.errorMessage {
                    VStack(spacing: 12) {
                        Image(systemName: "wifi.exclamationmark")
                            .font(.system(size: 32))
                            .foregroundColor(AppColors.accent(for: colorScheme))
                        Text(error)
                            .font(AppFont.bodyRegular)
                            .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                            .multilineTextAlignment(.center)
                        Button("Try Again") {
                            Task { await viewModel.loadData() }
                        }
                        .font(.system(size: 12, weight: .semibold))
                        .tracking(1.5)
                        .textCase(.uppercase)
                        .foregroundColor(AppColors.accent(for: colorScheme))
                        .padding(.top, 8)
                    }
                    .padding(.vertical, 40)
                } else {
                    
                    // ── 2. Word of the Day ────────────────────
                    if let wotd = viewModel.wordOfTheDay {
                        WordOfTheDayCard(word: wotd)
                            .padding(.horizontal, 16)
                    }
                    
                    // ── 3. Top Songs (Diary Journal) ──────────
                    TopSongsSection(
                        songs: viewModel.topSongs,
                        colorScheme: colorScheme
                    )
                    
                    // ── Divider ───────────────────────────────
                    Rectangle()
                        .fill(AppColors.border(for: colorScheme))
                        .frame(height: 1)
                        .padding(.horizontal, 16)
                    
                    // ── 4. Era Timeline ───────────────────────
                    EraTimelineSection(
                        viewModel: viewModel,
                        colorScheme: colorScheme
                    )
                    
                    // ── 5. Ornate End Mark ────────────────────
                    Text("✧")
                        .font(.system(size: 20))
                        .foregroundColor(AppColors.accent(for: colorScheme).opacity(0.4))
                        .padding(.vertical, 20)
                }
            }
            .padding(.bottom, 40)
        }
        .background(AppColors.background(for: colorScheme))
        .task {
            await viewModel.loadData()
        }
    }
}

// MARK: - Hero Section

/// Mirrors: src/components/HeroSection.tsx (mobile layout)
private struct HeroSection: View {
    let colorScheme: ColorScheme
    
    var body: some View {
        VStack(spacing: 16) {
            // Handwriting tagline (rotated slightly like the web)
            Text("a vocabulary for every era...")
                .font(AppFont.handwriting(size: 20))
                .foregroundColor(AppColors.accent(for: colorScheme))
                .rotationEffect(.degrees(-2))
                .padding(.top, 20)
            
            // Hero Title — THE SWIFT DICTIONARY
            VStack(spacing: 0) {
                Text("The Swift")
                    .font(AppFont.branding(size: 44))
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                Text("Dictionary")
                    .font(AppFont.branding(size: 44))
                    .foregroundColor(AppColors.foreground(for: colorScheme))
            }
            .multilineTextAlignment(.center)
            .padding(.top, 16)
            
            // Description
            Text("Every lyric tells a story. Every word carries a meaning.\nUncover the sophistication hidden in her discography.")
                .font(.system(size: 15, weight: .light))
                .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                .multilineTextAlignment(.center)
                .lineSpacing(4)
                .padding(.horizontal, 20)
                .padding(.top, 8)
            
            // Era Marquee Dots
            EraMarquee(colorScheme: colorScheme)
                .padding(.top, 16)
        }
    }
}

// MARK: - Era Marquee (scrolling era dots)

/// Mirrors: HeroSection.tsx → scrolling marquee of era dots at bottom
private struct EraMarquee: View {
    let colorScheme: ColorScheme
    
    // We duplicate the list to create a seamless infinite loop
    private let doubledEras = allEras + allEras
    
    @State private var offset: CGFloat = 0
    // Approximate width of one full set of eras (11 eras * ~100pt each = ~1100pt). 
    // We scroll exactly this distance then reset.
    // A better approach is using GeometryReader but for a simple marquee this works.
    
    var body: some View {
        GeometryReader { geometry in
            HStack(spacing: 24) {
                ForEach(Array(doubledEras.enumerated()), id: \.offset) { _, era in
                    HStack(spacing: 6) {
                        Circle()
                            .fill(era.resolvedColor(for: colorScheme))
                            .frame(width: 6, height: 6)
                        Text(era.label)
                            .font(.system(size: 11, weight: .medium))
                            .tracking(1)
                            .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    }
                    .fixedSize()
                }
            }
            .offset(x: offset)
            .onAppear {
                // Calculate the width of ONE set of eras (half the content)
                // Roughly: 11 eras * ~90px width each + 24px spacing = ~1250px
                let singleSetWidth: CGFloat = 1250 
                
                // Animate infinitely
                withAnimation(.linear(duration: 20).repeatForever(autoreverses: false)) {
                    offset = -singleSetWidth
                }
            }
        }
        .frame(height: 20)
        .clipped()
    }
}

// MARK: - Top Songs Section

/// Mirrors: src/components/TopSongs.tsx (mobile layout)
/// Diary/journal style with spiral binder holes on the left.
private struct TopSongsSection: View {
    let songs: [SongWithAlbum]
    let colorScheme: ColorScheme
    
    var body: some View {
        VStack(spacing: 0) {
            // The Diary Page Container
            HStack(spacing: 0) {
                // Spiral Binder Column
                VStack(spacing: 0) {
                    ForEach(0..<12, id: \.self) { _ in
                        Spacer()
                        Circle()
                            .fill(AppColors.background(for: colorScheme))
                            .frame(width: 8, height: 8)
                            .overlay(
                                Circle()
                                    .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
                            )
                        Spacer()
                    }
                }
                .frame(width: 24)
                .overlay(
                    Rectangle()
                        .fill(AppColors.border(for: colorScheme))
                        .frame(width: 1),
                    alignment: .trailing
                )
                .padding(.vertical, 24)
                
                // Content
                VStack(alignment: .leading, spacing: 0) {
                    // Header
                    VStack(alignment: .leading, spacing: 4) {
                        Text("The Mastermind Collection")
                            .font(.system(size: 10, weight: .medium))
                            .tracking(2)
                            .textCase(.uppercase)
                            .foregroundColor(AppColors.accent(for: colorScheme).opacity(0.8))
                        
                        Text("Top Songs")
                            .font(AppFont.display(size: 32, weight: .medium))
                            .foregroundColor(AppColors.foreground(for: colorScheme))
                    }
                    .padding(.bottom, 16)
                    
                    // Song List
                    ForEach(Array(songs.enumerated()), id: \.element.id) { index, song in
                        TopSongRow(rank: index + 1, song: song, colorScheme: colorScheme)
                    }
                    
                    // Mobile explore link
                    HStack {
                        Spacer()
                        Text("Explore Index")
                            .font(.system(size: 11, weight: .medium))
                            .tracking(2)
                            .textCase(.uppercase)
                            .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                        Spacer()
                    }
                    .padding(.top, 16)
                }
                .padding(.leading, 16)
                .padding(.trailing, 12)
                .padding(.vertical, 24)
            }
            .background(AppColors.surfaceRaised(for: colorScheme))
            .overlay(
                RoundedRectangle(cornerRadius: 2)
                    .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
            )
            .cornerRadius(2)
        }
        .padding(.horizontal, 16)
    }
}

/// Individual song row — mirrors TopSongs.tsx row layout
private struct TopSongRow: View {
    let rank: Int
    let song: SongWithAlbum
    let colorScheme: ColorScheme
    
    var body: some View {
        HStack(alignment: .center, spacing: 12) {
            // Rank Number
            Text("\(rank)")
                .font(AppFont.displayItalic(size: 20))
                .foregroundColor(AppColors.accent(for: colorScheme).opacity(0.8))
                .frame(width: 20, alignment: .trailing)
            
            // Song Info
            VStack(alignment: .leading, spacing: 3) {
                Text(song.title)
                    .font(AppFont.display(size: 17, weight: .medium))
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                    .lineLimit(1)
                
                HStack(spacing: 6) {
                    Text(song.albumTitle)
                        .font(.system(size: 9, weight: .medium))
                        .tracking(1.5)
                        .textCase(.uppercase)
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme).opacity(0.8))
                    
                    Circle()
                        .fill(AppColors.border(for: colorScheme).opacity(0.3))
                        .frame(width: 3, height: 3)
                    
                    Text("\(song.vocabCount) words")
                        .font(.system(size: 10))
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme).opacity(0.7))
                }
            }
            
            Spacer()
        }
        .padding(.vertical, 10)
        .overlay(
            Rectangle()
                .fill(AppColors.border(for: colorScheme))
                .frame(height: 1),
            alignment: .bottom
        )
    }
}

// MARK: - Era Timeline Section

/// Mirrors: src/components/EraTimeline.tsx → mobile layout
/// Horizontal scroll of album cover circles with era labels.
private struct EraTimelineSection: View {
    @ObservedObject var viewModel: HomeViewModel
    let colorScheme: ColorScheme
    
    var body: some View {
        VStack(spacing: 20) {
            // Section Label
            Text("The Eras")
                .font(.system(size: 10, weight: .medium))
                .tracking(2.5)
                .textCase(.uppercase)
                .foregroundColor(AppColors.foregroundMuted(for: colorScheme).opacity(0.5))
            
            // Horizontal Scroll of Album Covers
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(allEras) { era in
                        VStack(spacing: 10) {
                            // Album Cover Circle
                            if let coverURL = viewModel.coverURL(for: era.slug) {
                                AsyncImage(url: coverURL) { phase in
                                    switch phase {
                                    case .success(let image):
                                        image
                                            .resizable()
                                            .aspectRatio(contentMode: .fill)
                                    case .failure:
                                        eraPlaceholder(for: era)
                                    case .empty:
                                        ProgressView()
                                            .frame(width: 68, height: 68)
                                    @unknown default:
                                        eraPlaceholder(for: era)
                                    }
                                }
                                .frame(width: 68, height: 68)
                                .clipShape(RoundedRectangle(cornerRadius: AppCorners.md))
                                .overlay(
                                    RoundedRectangle(cornerRadius: AppCorners.md)
                                        .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
                                )
                            } else {
                                eraPlaceholder(for: era)
                                    .frame(width: 68, height: 68)
                                    .clipShape(RoundedRectangle(cornerRadius: AppCorners.md))
                                    .overlay(
                                        RoundedRectangle(cornerRadius: AppCorners.md)
                                            .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
                                    )
                            }
                            
                            // Era Label
                            Text(era.label)
                                .font(.system(size: 9, weight: .medium))
                                .tracking(1)
                                .textCase(.uppercase)
                                .foregroundColor(era.resolvedColor(for: colorScheme))
                                .lineLimit(1)
                        }
                        .frame(width: 80)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 8)
            }
        }
    }
    
    @ViewBuilder
    private func eraPlaceholder(for era: EraInfo) -> some View {
        Rectangle()
            .fill(era.resolvedColor(for: colorScheme).opacity(0.2))
            .overlay(
                Text(era.label.prefix(1))
                    .font(AppFont.branding(size: 28))
                    .foregroundColor(era.resolvedColor(for: colorScheme).opacity(0.5))
            )
    }
}
