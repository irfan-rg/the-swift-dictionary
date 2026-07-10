// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Root Navigation Container
// Custom ZStack replacing TabView for the new mobile header layout.
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var authService: AuthService
    @Environment(\.colorScheme) var colorScheme
    
    /// The currently selected page.
    @State private var currentPage: AppPage = .home
    
    /// Controls the full-screen menu overlay visibility.
    @State private var isMenuOpen = false
    
    var body: some View {
        ZStack(alignment: .top) {
            
            // ── 1. Page Content ──
            // Safe area is ignored for the header so we offset the content manually.
            Group {
                switch currentPage {
                case .home:
                    HomeView()
                case .dictionary:
                    DictionaryViewPlaceholder()
                case .explorer:
                    ExplorerViewPlaceholder()
                case .about:
                    AboutViewPlaceholder()
                }
            }
            .padding(.top, 56) // Height of AppHeader
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            // ── 2. Fixed App Header ──
            AppHeader(isMenuOpen: $isMenuOpen, colorScheme: colorScheme)
                .zIndex(10)
            
            // ── 3. Menu Overlay ──
            if isMenuOpen {
                MenuOverlay(currentPage: $currentPage, isMenuOpen: $isMenuOpen, colorScheme: colorScheme)
                    .zIndex(20)
                    .transition(.opacity) // We handle custom animations inside MenuOverlay
            }
        }
        .background(AppColors.background(for: colorScheme))
    }
}

// MARK: - Placeholder Views (replaced in later phases)

struct DictionaryViewPlaceholder: View {
    @Environment(\.colorScheme) var colorScheme
    var body: some View {
        VStack(spacing: AppSpacing.lg) {
            Image(systemName: "text.book.closed.fill")
                .font(.system(size: 40))
                .foregroundColor(AppColors.accent(for: colorScheme))
            Text("Dictionary")
                .font(AppFont.sectionTitle)
                .foregroundColor(AppColors.foreground(for: colorScheme))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

struct ExplorerViewPlaceholder: View {
    @Environment(\.colorScheme) var colorScheme
    var body: some View {
        VStack(spacing: AppSpacing.lg) {
            Image(systemName: "square.grid.2x2.fill")
                .font(.system(size: 40))
                .foregroundColor(AppColors.accent(for: colorScheme))
            Text("Explorer")
                .font(AppFont.sectionTitle)
                .foregroundColor(AppColors.foreground(for: colorScheme))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

struct AboutViewPlaceholder: View {
    @Environment(\.colorScheme) var colorScheme
    var body: some View {
        VStack(spacing: AppSpacing.lg) {
            Image(systemName: "info.circle.fill")
                .font(.system(size: 40))
                .foregroundColor(AppColors.accent(for: colorScheme))
            Text("About")
                .font(AppFont.sectionTitle)
                .foregroundColor(AppColors.foreground(for: colorScheme))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - Preview

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(AuthService())
    }
}
