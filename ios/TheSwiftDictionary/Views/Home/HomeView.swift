// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Home View
// Mirrors: src/app/page.tsx + mobile component designs
//
// The hero section fills the entire screen (below the fixed header),
// with the era marquee anchored at the bottom — exactly like the web.
// Subsequent sections scroll below it.
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct HomeView: View {
    @StateObject private var viewModel = HomeViewModel()
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 0) {

                // ── 1. Hero — Full Screen Height ─────────────────
                // Uses GeometryReader to fill the viewport (minus the 56pt header)
                GeometryReader { geo in
                    HeroSection(colorScheme: colorScheme)
                        .frame(width: geo.size.width, height: geo.size.height)
                }
                // Height = screen height minus the 56pt fixed header
                .frame(height: UIScreen.main.bounds.height - 56)

                // ── Content below the hero ────────────────────────
                VStack(spacing: 40) {

                    if viewModel.isLoading {
                        VStack(spacing: 16) {
                            ProgressView()
                                .tint(AppColors.accent(for: colorScheme))
                            Text("Loading dictionary...")
                                .font(.system(size: 11, weight: .medium))
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
                                .padding(.horizontal, 32)
                            Button("Try Again") {
                                Task { await viewModel.loadData() }
                            }
                            .font(.system(size: 11, weight: .semibold))
                            .tracking(1.5)
                            .textCase(.uppercase)
                            .foregroundColor(AppColors.accent(for: colorScheme))
                        }
                        .padding(.vertical, 40)

                    } else {

                        // ── 2. Word of the Day ────────────────────
                        if let wotd = viewModel.wordOfTheDay {
                            WordOfTheDayCard(word: wotd)
                                .padding(.horizontal, 16)
                        }

                        // ── 3. Top Songs ──────────────────────────
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
                .padding(.top, 40)
                .padding(.bottom, 60)
            }
        }
        .background(AppColors.background(for: colorScheme))
        .task {
            await viewModel.loadData()
        }
    }
}

// MARK: - Hero Section

/// Full-screen hero. Uses ZStack so the marquee is ALWAYS pinned to the
/// bottom of the viewport regardless of content height.
private struct HeroSection: View {
    let colorScheme: ColorScheme

    var body: some View {
        ZStack(alignment: .bottom) {

            // ── Central Content (vertically centered in remaining space) ──
            VStack(spacing: 0) {
                // Handwriting tagline
                Text("a vocabulary for every era...")
                    .font(AppFont.handwriting(size: 22))
                    .foregroundColor(AppColors.accent(for: colorScheme))
                    .rotationEffect(.degrees(-2))
                    .padding(.bottom, 24)

                // Hero Title — "The Swift Dictionary" with small-caps:
                // T, S, D are full-height; other letters are synthesised small-caps.
                VStack(spacing: -2) {
                    Text("The Swift")
                        .font(AppFont.brandingSmallCaps(size: 48))
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                        .tracking(1)
                    Text("Dictionary")
                        .font(AppFont.brandingSmallCaps(size: 48))
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                        .tracking(1)
                }
                .multilineTextAlignment(.center)
                .padding(.bottom, 28)

                // Description
                Text("Every lyric tells a story. Every word carries a meaning.\nUncover the sophistication hidden in her discography.")
                    .font(.system(size: 15, weight: .light))
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    .multilineTextAlignment(.center)
                    .lineSpacing(5)
                    .padding(.horizontal, 28)
            }
            // Slightly above true center to give room for the marquee at bottom
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
            .padding(.bottom, 64) // nudge up so marquee doesn't overlap

            // ── Era Marquee — always at bottom ──────────────────
            AutoScrollingMarquee(colorScheme: colorScheme)
                .padding(.bottom, 32)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - Auto-Scrolling Marquee

/// Infinite horizontal marquee of era dots.
/// Uses a GeometryReader in the background to measure item width, then
/// kicks off a repeating linear animation for seamless looping.
private struct AutoScrollingMarquee: View {
    let colorScheme: ColorScheme

    // Double the list so we can seamlessly loop
    private let items: [EraInfo] = allEras + allEras

    @State private var offset: CGFloat = 0
    @State private var singleWidth: CGFloat = 0

    var body: some View {
        HStack(spacing: 20) {
            ForEach(Array(items.enumerated()), id: \.offset) { _, era in
                HStack(spacing: 6) {
                    Circle()
                        .fill(era.resolvedColor(for: colorScheme))
                        .frame(width: 6, height: 6)
                    Text(era.label)
                        .font(.system(size: 11, weight: .medium))
                        .tracking(0.5)
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                        .fixedSize()
                }
            }
        }
        // Measure the rendered width
        .background(
            GeometryReader { geo in
                Color.clear.onAppear {
                    let full = geo.size.width
                    // We doubled the list so single-set width = half
                    singleWidth = full / 2
                    startScrolling()
                }
            }
        )
        .offset(x: offset)
        .frame(maxWidth: .infinity, alignment: .leading)
        .clipped()
        .frame(height: 24)
        .padding(.horizontal, 16)
    }

    private func startScrolling() {
        guard singleWidth > 0 else { return }
        offset = 0
        let duration = Double(singleWidth) / 40.0 // 40 pt/s
        withAnimation(.linear(duration: duration).repeatForever(autoreverses: false)) {
            offset = -singleWidth
        }
    }
}


// MARK: - Top Songs Section

/// Mirrors: src/components/TopSongs.tsx — diary/journal style with spiral binder.
private struct TopSongsSection: View {
    let songs: [SongWithAlbum]
    let colorScheme: ColorScheme

    var body: some View {
        HStack(spacing: 0) {

            // Spiral Binder Column
            VStack(spacing: 0) {
                ForEach(0..<12, id: \.self) { _ in
                    Spacer()
                    Circle()
                        .fill(AppColors.background(for: colorScheme))
                        .frame(width: 8, height: 8)
                        .overlay(Circle().stroke(AppColors.border(for: colorScheme), lineWidth: 1))
                    Spacer()
                }
            }
            .frame(width: 24)
            .overlay(Rectangle().fill(AppColors.border(for: colorScheme)).frame(width: 1), alignment: .trailing)
            .padding(.vertical, 24)

            // Journal Content
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

                // Song Rows
                ForEach(Array(songs.enumerated()), id: \.element.id) { index, song in
                    TopSongRow(rank: index + 1, song: song, colorScheme: colorScheme)
                }

                // Explore link
                HStack {
                    Spacer()
                    Text("Explore Index")
                        .font(.system(size: 10, weight: .medium))
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
        .overlay(RoundedRectangle(cornerRadius: 2).stroke(AppColors.border(for: colorScheme), lineWidth: 1))
        .cornerRadius(2)
        .padding(.horizontal, 16)
    }
}

private struct TopSongRow: View {
    let rank: Int
    let song: SongWithAlbum
    let colorScheme: ColorScheme

    var body: some View {
        HStack(alignment: .center, spacing: 12) {
            Text("\(rank)")
                .font(AppFont.displayItalic(size: 20))
                .foregroundColor(AppColors.accent(for: colorScheme).opacity(0.8))
                .frame(width: 20, alignment: .trailing)

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
        .overlay(Rectangle().fill(AppColors.border(for: colorScheme)).frame(height: 1), alignment: .bottom)
    }
}

// MARK: - Era Timeline Section

private struct EraTimelineSection: View {
    @ObservedObject var viewModel: HomeViewModel
    let colorScheme: ColorScheme

    var body: some View {
        VStack(spacing: 20) {
            Text("The Eras")
                .font(.system(size: 10, weight: .medium))
                .tracking(2.5)
                .textCase(.uppercase)
                .foregroundColor(AppColors.foregroundMuted(for: colorScheme).opacity(0.5))

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(allEras) { era in
                        VStack(spacing: 10) {
                            // Album cover
                            Group {
                                if let url = viewModel.coverURL(for: era.slug) {
                                    AsyncImage(url: url) { phase in
                                        switch phase {
                                        case .success(let img):
                                            img.resizable().aspectRatio(contentMode: .fill)
                                        default:
                                            eraPlaceholder(era)
                                        }
                                    }
                                } else {
                                    eraPlaceholder(era)
                                }
                            }
                            .frame(width: 68, height: 68)
                            .clipShape(RoundedRectangle(cornerRadius: AppCorners.md))
                            .overlay(RoundedRectangle(cornerRadius: AppCorners.md).stroke(AppColors.border(for: colorScheme), lineWidth: 1))

                            Text(era.label)
                                .font(.system(size: 9, weight: .medium))
                                .tracking(0.8)
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
    private func eraPlaceholder(_ era: EraInfo) -> some View {
        Rectangle()
            .fill(era.resolvedColor(for: colorScheme).opacity(0.2))
            .overlay(
                Text(String(era.label.prefix(1)))
                    .font(AppFont.branding(size: 28))
                    .foregroundColor(era.resolvedColor(for: colorScheme).opacity(0.5))
            )
    }
}
