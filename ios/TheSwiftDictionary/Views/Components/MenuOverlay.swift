// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Full-Screen Menu Overlay
// Mirrors: src/components/Header.tsx → mobile menu (lines 350-418)
//
// - Numbered nav links with staggered entrance/exit animations
// - Bottom auth section (login or profile/favorites/sign out)
// ────────────────────────────────────────────────────────────────

import SwiftUI

/// The pages available in the app.
enum AppPage: String, CaseIterable {
    case home       = "Home"
    case dictionary = "Dictionary"
    case explorer   = "The Eras"
    case about      = "About"
}

struct MenuOverlay: View {
    @Binding var currentPage: AppPage
    @Binding var isMenuOpen: Bool
    @EnvironmentObject var authService: AuthService
    let colorScheme: ColorScheme
    
    /// Controls staggered item animations.
    @State private var itemsVisible = false
    
    private let navLinks: [(page: AppPage, label: String)] = [
        (.home, "Home"),
        (.dictionary, "Dictionary"),
        (.explorer, "The Eras"),
        (.about, "About"),
    ]
    
    var body: some View {
        VStack(spacing: 0) {
            // ── Navigation Links ──
            VStack(alignment: .leading, spacing: 0) {
                ForEach(Array(navLinks.enumerated()), id: \.element.page) { index, link in
                    Button {
                        currentPage = link.page
                        closeMenu()
                    } label: {
                        HStack(spacing: 20) {
                            // Numbered index (01, 02, ...)
                            Text(String(format: "%02d", index + 1))
                                .font(.system(size: 12, weight: .medium))
                                .tracking(2)
                                .foregroundColor(AppColors.accent(for: colorScheme).opacity(0.5))
                                .frame(width: 20, alignment: .trailing)
                                .monospacedDigit()
                            
                            // Link label
                            Text(link.label)
                                .font(AppFont.body(size: 20, weight: .semibold))
                                .tracking(1)
                                .foregroundColor(AppColors.foreground(for: colorScheme))
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.vertical, 16)
                    }
                    .buttonStyle(.plain)
                    .offset(x: itemsVisible ? 0 : -20)
                    .opacity(itemsVisible ? 1 : 0)
                    .animation(
                        .easeOut(duration: 0.3).delay(Double(index) * 0.06),
                        value: itemsVisible
                    )
                }
            }
            .padding(.top, 40)
            .padding(.horizontal, 24)
            
            Spacer()
            
            // ── Bottom Auth Section ──
            VStack(spacing: 0) {
                Rectangle()
                    .fill(AppColors.border(for: colorScheme))
                    .frame(height: 1)
                    .padding(.bottom, 32)
                
                // Login / Register button (when not signed in)
                Button {
                    closeMenu()
                    // Auth will be implemented in Phase 5
                } label: {
                    HStack(spacing: 8) {
                        Image(systemName: "person")
                            .font(.system(size: 14))
                        Text("Login / Register")
                            .font(.system(size: 14, weight: .medium))
                            .tracking(1)
                    }
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .overlay(
                        RoundedRectangle(cornerRadius: AppCorners.full)
                            .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
                    )
                }
                .buttonStyle(.plain)
                .offset(y: itemsVisible ? 0 : 12)
                .opacity(itemsVisible ? 1 : 0)
                .animation(
                    .easeOut(duration: 0.35).delay(0.3),
                    value: itemsVisible
                )
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 40)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(AppColors.background(for: colorScheme))
        .onAppear {
            withAnimation {
                itemsVisible = true
            }
        }
    }
    
    /// Reverse animation on close, then dismiss.
    private func closeMenu() {
        // Animate items out (reverse of entrance)
        withAnimation(.easeIn(duration: 0.2)) {
            itemsVisible = false
        }
        // Dismiss overlay after items finish animating
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            withAnimation(.easeInOut(duration: 0.15)) {
                isMenuOpen = false
            }
        }
    }
}
