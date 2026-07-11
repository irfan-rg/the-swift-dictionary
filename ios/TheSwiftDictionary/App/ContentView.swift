// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Root App Container
// Mirrors: web mobile layout — custom top header + page content
//
// Architecture:
//   ZStack {
//     current page content (with top padding for the fixed header)
//     fixed AppHeader (always on top)
//     MenuOverlay (full-screen, shown when isMenuOpen = true)
//   }
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var authService: AuthService
    @Environment(\.colorScheme) var colorScheme

    @State private var currentPage: AppPage = .home
    @State private var isMenuOpen: Bool = false

    var body: some View {
        // Header is a safe-area inset on top of the whole ZStack —
        // this means it sits above BOTH the page content and the menu overlay.
        ZStack(alignment: .top) {
            // Page content
            pageContent
                .ignoresSafeArea(edges: .bottom)

            // Menu overlay — starts right below header (ZStack top = below header)
            if isMenuOpen {
                MenuOverlay(
                    currentPage: $currentPage,
                    isMenuOpen: $isMenuOpen,
                    colorScheme: colorScheme
                )
                .ignoresSafeArea(edges: .bottom)
                .transition(.opacity)
            }
        }
        .ignoresSafeArea(edges: .bottom)
        // Header sits above the entire ZStack via safeAreaInset
        .safeAreaInset(edge: .top, spacing: 0) {
            AppHeader(isMenuOpen: $isMenuOpen, colorScheme: colorScheme)
        }
        .background(AppColors.background(for: colorScheme))
    }

    @ViewBuilder
    private var pageContent: some View {
        switch currentPage {
        case .home:
            HomeView()
        case .dictionary:
            PagePlaceholder(
                icon: "text.book.closed.fill",
                title: "Dictionary",
                subtitle: "Search & filter vocabulary across all eras"
            )
        case .explorer:
            PagePlaceholder(
                icon: "square.grid.2x2.fill",
                title: "The Eras",
                subtitle: "Browse albums → songs → lyrics"
            )
        case .about:
            PagePlaceholder(
                icon: "info.circle",
                title: "About",
                subtitle: "The story behind The Swift Dictionary"
            )
        }
    }
}

// MARK: - Generic Page Placeholder

/// Reusable placeholder for screens being built in later phases.
struct PagePlaceholder: View {
    let icon: String
    let title: String
    let subtitle: String
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        VStack(spacing: AppSpacing.lg) {
            Image(systemName: icon)
                .font(.system(size: 36, weight: .light))
                .foregroundColor(AppColors.accent(for: colorScheme))

            Text(title)
                .font(AppFont.display(size: 28, weight: .medium))
                .foregroundColor(AppColors.foreground(for: colorScheme))

            Text(subtitle)
                .font(AppFont.caption)
                .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(AppColors.background(for: colorScheme))
    }
}

// MARK: - Preview

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(AuthService())
    }
}
