// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — App Entry Point
// Mirrors: src/app/layout.tsx (root layout + theme provider)
// ────────────────────────────────────────────────────────────────

import SwiftUI

@main
struct TheSwiftDictionaryApp: App {

    init() {
        // Disable Liquid Glass / translucent materials (iOS 26+)
        let navAppearance = UINavigationBarAppearance()
        navAppearance.configureWithOpaqueBackground()
        UINavigationBar.appearance().standardAppearance = navAppearance
        UINavigationBar.appearance().scrollEdgeAppearance = navAppearance

        let tabAppearance = UITabBarAppearance()
        tabAppearance.configureWithOpaqueBackground()
        UITabBar.appearance().standardAppearance = tabAppearance
        if #available(iOS 15.0, *) {
            UITabBar.appearance().scrollEdgeAppearance = tabAppearance
        }
    }

    /// Auth service injected as an environment object for the entire app.
    @StateObject private var authService = AuthService()
    
    /// User-selected theme override. "system" follows device, "light"/"dark" are forced.
    @AppStorage("appThemeOverride") private var themeOverride: String = "system"

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(authService)
                .preferredColorScheme(resolvedScheme)
                .overlay(ThemeTransitionOverlay()) // Guaranteed to sit above everything, including safeAreaInsets
                .onOpenURL { url in
                    // Handle OAuth callback (e.g. theswiftdictionary://auth/callback)
                    handleDeepLink(url)
                }
        }
    }
    
    /// Maps the stored string to an optional ColorScheme.
    private var resolvedScheme: ColorScheme? {
        switch themeOverride {
        case "light": return .light
        case "dark": return .dark
        default: return nil // system
        }
    }

    /// Process incoming deep links for OAuth callbacks.
    private func handleDeepLink(_ url: URL) {
        Task {
            do {
                try await SupabaseService.shared.client.auth.session(from: url)
            } catch {
                print("⚠️ Deep link auth error: \(error.localizedDescription)")
            }
        }
    }
}
