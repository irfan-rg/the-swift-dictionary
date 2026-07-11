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
    @AppStorage("appThemeOverride") private var themeOverride: String = "system"
    
    // For Pull-to-Toggle gesture
    @State private var pullOffset: CGFloat = 0
    @State private var isReadyToToggle = false
    @State private var isDragging = false

    var body: some View {
        // GeometryReader measures the actual available height AFTER the
        // .safeAreaInset header is applied in ContentView. This is the
        // only reliable way to make the hero fill exactly the visible viewport.
        GeometryReader { geo in
        ScrollView(showsIndicators: false) {
            VStack(spacing: 0) {
                
                // Invisible tracker for scroll offset
                    GeometryReader { proxy in
                        Color.clear.preference(key: ScrollOffsetKey.self, value: proxy.frame(in: .named("scroll")).minY)
                    }
                    .frame(height: 0)

                    // ── 1. Hero — fills exactly the available viewport ──
                    HeroSection(colorScheme: colorScheme)
                        .frame(width: geo.size.width, height: geo.size.height)

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
        } // End ScrollView
        .coordinateSpace(name: "scroll")
        .simultaneousGesture(
            DragGesture(minimumDistance: 10)
                .onChanged { _ in
                    isDragging = true
                }
                .onEnded { _ in
                    isDragging = false
                    // Execute ONLY if user physically let go while past the threshold
                    if pullOffset > 90 && isReadyToToggle {
                        isReadyToToggle = false
                        ThemeTransitionManager.shared.isReadyToToggle = false
                        
                        let generator = UIImpactFeedbackGenerator(style: .heavy)
                        generator.impactOccurred()
                        
                        ThemeTransitionManager.shared.executeTransition {
                            themeOverride = colorScheme == .dark ? "light" : "dark"
                        }
                    }
                }
        )
        .onPreferenceChange(ScrollOffsetKey.self) { value in
            pullOffset = value
            ThemeTransitionManager.shared.pullOffset = value
            
            if value > 90 && isDragging {
                // User pulled past threshold
                if !isReadyToToggle {
                    isReadyToToggle = true
                    ThemeTransitionManager.shared.isReadyToToggle = true
                    
                    let generator = UIImpactFeedbackGenerator(style: .light)
                    generator.impactOccurred()
                    
                    // Pre-capture the screen exactly as it looks now!
                    ThemeTransitionManager.shared.preCaptureScreen()
                }
            } else if value <= 90 && isDragging {
                // User manually dragged back UP to cancel
                if isReadyToToggle {
                    isReadyToToggle = false
                    ThemeTransitionManager.shared.isReadyToToggle = false
                }
            }
        }
        } // End GeometryReader
        .background(
            ZStack(alignment: .top) {
                AppColors.background(for: colorScheme)
                // SpotlightIndicator is now exclusively rendered in ThemeTransitionOverlay at the App root!
            }
            .ignoresSafeArea()
        )
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
                    .padding(.bottom, 44) // Match web: mb-3 (12) + mt-8 (32) = 44px

                // Hero Title — "The Swift Dictionary" with small-caps:
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
                .padding(.bottom, 32) // Match web: mb-8 (32px)

                // Description
                Text("Every lyric tells a story.\nEvery word carries a meaning.\nUncover the sophistication hidden in discography.")
                    .font(AppFont.body(size: 15))
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    .multilineTextAlignment(.center)
                    .lineSpacing(5)
                    .padding(.horizontal, 28)
            }
            // Centered in the available space above the marquee
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
            .padding(.bottom, 120) // Push the hero content further up

            // ── Era Marquee — always at bottom ──────────────────
            AutoScrollingMarquee(colorScheme: colorScheme)
                .padding(.bottom, 32) // Match web: pb-8 (32px)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - Auto-Scrolling Marquee

/// Infinite horizontal marquee of era dots.
/// Uses a PreferenceKey to dynamically measure item width when layout stabilizes,
/// and resets / loops the offset seamlessly across 3 identical blocks to prevent gaps.
private struct AutoScrollingMarquee: View {
    let colorScheme: ColorScheme

    @State private var offset: CGFloat = 0
    @State private var blockWidth: CGFloat = 0

    var body: some View {
        HStack(spacing: 0) {
            // We place three identical blocks side by side.
            // Using 3 blocks ensures we NEVER see a gap on any device width!
            ForEach(0..<3, id: \.self) { index in
                EraMarqueeBlock(colorScheme: colorScheme)
                    .background(
                        GeometryReader { geo in
                            Color.clear
                                .preference(key: MarqueeSizeKey.self, value: index == 0 ? geo.size.width : 0)
                        }
                    )
            }
        }
        .fixedSize(horizontal: true, vertical: false) // CRITICAL: Prevents SwiftUI from squishing the HStack
        .offset(x: offset)
        .frame(maxWidth: .infinity, alignment: .leading)
        .clipped()
        .frame(height: 24)
        .onPreferenceChange(MarqueeSizeKey.self) { width in
            // When the first block layout settles and reports a non-zero size, kick off the scroll loop
            guard width > 0, width != blockWidth else { return }
            blockWidth = width
            startScrolling()
        }
    }

    private func startScrolling() {
        guard blockWidth > 0 else { return }
        
        // Safely cancel any active animation transaction and snap offset to 0
        withAnimation(.none) {
            offset = 0
        }
        
        // Kick off the scrolling animation on the next runloop tick to prevent visual jumpiness
        DispatchQueue.main.async {
            let duration = Double(self.blockWidth) / 40.0 // 40 pt/s speed
            withAnimation(.linear(duration: duration).repeatForever(autoreverses: false)) {
                self.offset = -self.blockWidth
            }
        }
    }
}

private struct EraMarqueeBlock: View {
    let colorScheme: ColorScheme
    
    var body: some View {
        HStack(spacing: 32) {
            ForEach(allEras) { era in
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
        .padding(.trailing, 32) // Gap between the end of this block and the start of the next block!
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

// MARK: - Scroll Offset Tracker

/// Preference key used to track the ScrollView's vertical offset for the Pull-to-Toggle gesture
struct ScrollOffsetKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value += nextValue()
    }
}

/// Preference key used to track the marquee block width
struct MarqueeSizeKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
}