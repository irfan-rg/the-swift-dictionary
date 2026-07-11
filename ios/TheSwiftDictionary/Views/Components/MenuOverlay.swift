// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Full-Screen Menu Overlay
// Mirrors: src/components/Header.tsx → mobile menu
//
// Layout (top → bottom):
//   Search bar (wide)
//   Numbered nav links (staggered in/out)
//   Theme toggle
//   Divider
//   Login / Register button
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
    @AppStorage("appThemeOverride") private var themeOverride: String = "system"
    let colorScheme: ColorScheme

    @State private var itemsVisible = false
    @State private var overlayVisible = false
    @State private var searchText = ""

    private let navLinks: [(page: AppPage, label: String)] = [
        (.home,       "Home"),
        (.dictionary, "Dictionary"),
        (.explorer,   "The Eras"),
        (.about,      "About"),
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {

            // ── Utilities: Search & Theme Toggle ────────────────
            HStack(spacing: 12) {
                // Search Bar
                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass")
                        .font(.system(size: 15, weight: .light))
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    TextField("Search...", text: $searchText)
                        .font(AppFont.bodyRegular)
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                }
                .padding(.horizontal, 16)
                .frame(height: 48)
                .background(AppColors.surfaceRaised(for: colorScheme))
                .cornerRadius(AppCorners.sm)
                .overlay(RoundedRectangle(cornerRadius: AppCorners.sm).stroke(AppColors.border(for: colorScheme), lineWidth: 1))
                
                // Theme Toggle
                Button {
                    themeOverride = colorScheme == .dark ? "light" : "dark"
                } label: {
                    Image(systemName: colorScheme == .dark ? "sun.max" : "moon.stars")
                        .font(.system(size: 16, weight: .light))
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                        .frame(width: 48, height: 48)
                        .background(AppColors.surfaceRaised(for: colorScheme))
                        .cornerRadius(AppCorners.sm)
                        .overlay(RoundedRectangle(cornerRadius: AppCorners.sm).stroke(AppColors.border(for: colorScheme), lineWidth: 1))
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 24)
            .padding(.top, 28)
            .offset(y: itemsVisible ? 0 : -10)
            .opacity(itemsVisible ? 1 : 0)
            .animation(.easeOut(duration: 0.25).delay(0.0), value: itemsVisible)

            // ── Nav Links ───────────────────────────────────────
            VStack(alignment: .leading, spacing: 0) {
                ForEach(Array(navLinks.enumerated()), id: \.element.page) { index, link in
                    Button {
                        currentPage = link.page
                        closeMenu()
                    } label: {
                        HStack(spacing: 20) {
                            Text(String(format: "%02d", index + 1))
                                .font(.system(size: 12, weight: .medium))
                                .tracking(2)
                                .foregroundColor(AppColors.accent(for: colorScheme).opacity(0.5))
                                .frame(width: 20, alignment: .trailing)
                                .monospacedDigit()
                            Text(link.label)
                                .font(AppFont.body(size: 20, weight: .semibold))
                                .tracking(0.5)
                                .foregroundColor(AppColors.foreground(for: colorScheme))
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.vertical, 16)
                    }
                    .buttonStyle(.plain)
                    .offset(x: itemsVisible ? 0 : -20)
                    .opacity(itemsVisible ? 1 : 0)
                    .animation(.easeOut(duration: 0.3).delay(Double(index) * 0.06 + 0.1), value: itemsVisible)
                }
            }
            .padding(.horizontal, 24)
            .padding(.top, 16)

            Spacer()

            // ── Divider ─────────────────────────────────────────
            Rectangle()
                .fill(AppColors.border(for: colorScheme))
                .frame(height: 1)
                .padding(.horizontal, 24)
                .padding(.top, 12)
                .padding(.bottom, 24)

            // ── Login / Register ────────────────────────────────
            Button {
                closeMenu()
            } label: {
                HStack(spacing: 8) {
                    Image(systemName: "person")
                        .font(.system(size: 14))
                    Text("Login / Register")
                        .font(.system(size: 14, weight: .medium))
                        .tracking(0.5)
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
            .padding(.horizontal, 24)
            .padding(.bottom, 40)
            .offset(y: itemsVisible ? 0 : 12)
            .opacity(itemsVisible ? 1 : 0)
            .animation(.easeOut(duration: 0.35).delay(0.35), value: itemsVisible)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .background(AppColors.background(for: colorScheme))
        .opacity(overlayVisible ? 1 : 0)
        .allowsHitTesting(overlayVisible)
        .onAppear {
            if isMenuOpen {
                overlayVisible = true
                itemsVisible = true
            }
        }
        .onChange(of: isMenuOpen) { open in
            if open {
                // Entrance sequence: show background, then stagger items in
                withAnimation(.easeInOut(duration: 0.2)) { overlayVisible = true }
                withAnimation { itemsVisible = true }
            } else {
                // Exit sequence: stagger items out, then hide background
                withAnimation(.easeIn(duration: 0.18)) { itemsVisible = false }
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.28) {
                    withAnimation(.easeInOut(duration: 0.15)) { overlayVisible = false }
                }
            }
        }
    }

    /// Triggers the close sequence by toggling the binding
    private func closeMenu() {
        isMenuOpen = false
    }
}
