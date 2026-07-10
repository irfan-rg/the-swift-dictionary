// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Auth Service
// Manages authentication state via Supabase Auth.
//
// Supports:
//   • Sign in with Apple
//   • Google Sign In (via ASWebAuthenticationSession)
//   • Session persistence (automatic via supabase-swift)
//   • Auth state observation
// ────────────────────────────────────────────────────────────────

import Foundation
import Supabase
import AuthenticationServices

/// Manages the user's authentication state and provides sign-in/out methods.
///
/// Inject as an `@EnvironmentObject` so all views can react to auth changes.
@MainActor
final class AuthService: ObservableObject {

    /// The currently authenticated user, or `nil` if signed out.
    @Published var currentUser: User?

    /// Whether the initial session check has completed.
    @Published var isLoaded = false

    /// Whether a sign-in operation is in progress.
    @Published var isSigningIn = false

    /// Human-readable error message from the last failed operation.
    @Published var errorMessage: String?

    /// Convenience: is the user currently signed in?
    var isAuthenticated: Bool { currentUser != nil }

    /// The user's UUID, if authenticated.
    var userId: UUID? {
        guard let id = currentUser?.id else { return nil }
        return id
    }

    private let supabase = SupabaseService.shared.client

    // ── Initialization ─────────────────────────────────────────

    init() {
        Task {
            await loadSession()
            observeAuthChanges()
        }
    }

    /// Check for an existing session on app launch.
    private func loadSession() async {
        do {
            let session = try await supabase.auth.session
            currentUser = session.user
        } catch {
            // No existing session — that's fine
            currentUser = nil
        }
        isLoaded = true
    }

    /// Listen for auth state changes (sign in, sign out, token refresh).
    private func observeAuthChanges() {
        Task {
            for await (event, session) in supabase.auth.authStateChanges {
                switch event {
                case .signedIn:
                    currentUser = session?.user
                case .signedOut:
                    currentUser = nil
                case .tokenRefreshed:
                    currentUser = session?.user
                default:
                    break
                }
            }
        }
    }

    // ── Sign In with Apple ─────────────────────────────────────

    /// Handle the Apple Sign In credential and authenticate with Supabase.
    func signInWithApple(credential: ASAuthorizationAppleIDCredential) async {
        guard let identityToken = credential.identityToken,
              let tokenString = String(data: identityToken, encoding: .utf8)
        else {
            errorMessage = "Failed to get Apple ID token."
            return
        }

        isSigningIn = true
        errorMessage = nil

        do {
            let session = try await supabase.auth.signInWithIdToken(
                credentials: .init(
                    provider: .apple,
                    idToken: tokenString
                )
            )
            currentUser = session.user
        } catch {
            errorMessage = "Apple Sign In failed: \(error.localizedDescription)"
        }

        isSigningIn = false
    }

    // ── Google Sign In ─────────────────────────────────────────

    /// Initiate Google Sign In via Supabase OAuth (opens a web auth session).
    /// The redirect URL must be configured in your Supabase project's
    /// Auth settings and in your app's URL scheme.
    func signInWithGoogle() async {
        isSigningIn = true
        errorMessage = nil

        do {
            try await supabase.auth.signInWithOAuth(
                provider: .google,
                redirectTo: URL(string: "theswiftdictionary://auth/callback")
            )
        } catch {
            errorMessage = "Google Sign In failed: \(error.localizedDescription)"
        }

        isSigningIn = false
    }

    // ── Sign Out ───────────────────────────────────────────────

    /// Sign out the current user.
    func signOut() async {
        do {
            try await supabase.auth.signOut()
            currentUser = nil
        } catch {
            errorMessage = "Sign out failed: \(error.localizedDescription)"
        }
    }
}
