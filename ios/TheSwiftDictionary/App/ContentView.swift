// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Root Tab Bar
// Mirrors: The web app's header navigation
//   Home | Dictionary | Explorer | Favorites | Profile
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var authService: AuthService

    /// The currently selected tab.
    @State private var selectedTab: AppTab = .home

    /// Color scheme for adaptive styling.
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        TabView(selection: $selectedTab) {
            // ── Home ───────────────────────────────────────────
            NavigationStack {
                HomeView()
            }
            .tabItem {
                Label("Home", systemImage: "house.fill")
            }
            .tag(AppTab.home)

            // ── Dictionary ─────────────────────────────────────
            NavigationStack {
                DictionaryViewPlaceholder()
            }
            .tabItem {
                Label("Dictionary", systemImage: "text.book.closed.fill")
            }
            .tag(AppTab.dictionary)

            // ── Explorer ───────────────────────────────────────
            NavigationStack {
                ExplorerViewPlaceholder()
            }
            .tabItem {
                Label("Explorer", systemImage: "square.grid.2x2.fill")
            }
            .tag(AppTab.explorer)

            // ── Favorites ──────────────────────────────────────
            NavigationStack {
                FavoritesViewPlaceholder()
            }
            .tabItem {
                Label("Favorites", systemImage: "heart.fill")
            }
            .tag(AppTab.favorites)

            // ── Profile ────────────────────────────────────────
            NavigationStack {
                ProfileViewPlaceholder()
            }
            .tabItem {
                Label("Profile", systemImage: "person.fill")
            }
            .tag(AppTab.profile)
        }
        .tint(AppColors.accent(for: colorScheme))
    }
}

// MARK: - Tab Enum

/// The five primary navigation destinations.
enum AppTab: Hashable {
    case home
    case dictionary
    case explorer
    case favorites
    case profile
}

// MARK: - Placeholder Views (replaced in later phases)

/// Placeholder for the Dictionary screen — Phase 3.
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

            Text("Search & filter vocabulary across all eras")
                .font(AppFont.caption)
                .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(AppColors.background(for: colorScheme))
        .navigationTitle("Dictionary")
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// Placeholder for the Explorer screen — Phase 4.
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

            Text("Browse albums → songs → lyrics")
                .font(AppFont.caption)
                .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(AppColors.background(for: colorScheme))
        .navigationTitle("Explorer")
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// Placeholder for the Favorites screen — Phase 5.
struct FavoritesViewPlaceholder: View {
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        VStack(spacing: AppSpacing.lg) {
            Image(systemName: "heart.fill")
                .font(.system(size: 40))
                .foregroundColor(AppColors.accent(for: colorScheme))

            Text("Favorites")
                .font(AppFont.sectionTitle)
                .foregroundColor(AppColors.foreground(for: colorScheme))

            Text("Your saved vocabulary words")
                .font(AppFont.caption)
                .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(AppColors.background(for: colorScheme))
        .navigationTitle("Favorites")
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// Placeholder for the Profile screen — Phase 6.
struct ProfileViewPlaceholder: View {
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        VStack(spacing: AppSpacing.lg) {
            Image(systemName: "person.fill")
                .font(.system(size: 40))
                .foregroundColor(AppColors.accent(for: colorScheme))

            Text("Profile")
                .font(AppFont.sectionTitle)
                .foregroundColor(AppColors.foreground(for: colorScheme))

            Text("Your era · bracelet · settings")
                .font(AppFont.caption)
                .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(AppColors.background(for: colorScheme))
        .navigationTitle("Profile")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Preview

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(AuthService())
    }
}
