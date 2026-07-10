// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — App Entry Point
// Mirrors: src/app/layout.tsx (root layout + theme provider)
// ────────────────────────────────────────────────────────────────

import SwiftUI

@main
struct TheSwiftDictionaryApp: App {

    /// Auth service injected as an environment object for the entire app.
    @StateObject private var authService = AuthService()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(authService)
                .onOpenURL { url in
                    // Handle OAuth callback (e.g. theswiftdictionary://auth/callback)
                    handleDeepLink(url)
                }
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
