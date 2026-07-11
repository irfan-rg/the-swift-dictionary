// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Full-Screen Menu Overlay
// Mirrors: src/components/Header.tsx → mobile menu
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
            
            // ── Search Bar ──────────────────────────────────────
            HStack(spacing: 10) {
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 15, weight: .light))
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                
                TextField("Search for a lyric, word, or era...", text: $searchText)
                    .font(AppFont.bodyRegular)
                    .foregroundColor(AppColors.foreground(for: colorScheme))
                    .autocorrectionDisabled()
                    .textInputAutocapitalization(.never)
                
                if !searchText.isEmpty {
                    Button {
                        withAnimation { searchText = "" }
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 15))
                            .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
            .background(AppColors.surfaceRaised(for: colorScheme))
            .cornerRadius(AppCorners.sm)
            .overlay(RoundedRectangle(cornerRadius: AppCorners.sm).stroke(AppColors.border(for: colorScheme), lineWidth: 1))
            .padding(.horizontal, 24)
            .padding(.top, 28)
            .offset(y: itemsVisible ? 0 : -10)
            .opacity(itemsVisible ? 1 : 0)
            .animation(.easeOut(duration: 0.25).delay(0.0), value: itemsVisible)

            // ── Dynamic Content: Menu Links vs Search Results ───
            if searchText.isEmpty {
                menuLinksContent
                    .transition(.opacity)
            } else {
                searchResultsContent
                    .transition(.opacity)
            }
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
                withAnimation(.easeInOut(duration: 0.2)) { overlayVisible = true }
                withAnimation { itemsVisible = true }
            } else {
                // Also clear search when closing so it's fresh next time
                searchText = ""
                withAnimation(.easeIn(duration: 0.18)) { itemsVisible = false }
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.28) {
                    withAnimation(.easeInOut(duration: 0.15)) { overlayVisible = false }
                }
            }
        }
    }

    // MARK: - Subviews

    /// The default navigation links and footer shown when NOT searching.
    private var menuLinksContent: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Nav Links
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
                
                // Theme Toggle Row (Looks like Nav Link #05)
                HStack(spacing: 20) {
                    Text(String(format: "%02d", navLinks.count + 1))
                        .font(.system(size: 12, weight: .medium))
                        .tracking(2)
                        .foregroundColor(AppColors.accent(for: colorScheme).opacity(0.5))
                        .frame(width: 20, alignment: .trailing)
                        .monospacedDigit()
                    Text("Theme")
                        .font(AppFont.body(size: 20, weight: .semibold))
                        .tracking(0.5)
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                    Spacer()
                    themeTogglePill
                        .frame(width: 90)
                }
                .padding(.vertical, 16)
                .offset(x: itemsVisible ? 0 : -20)
                .opacity(itemsVisible ? 1 : 0)
                .animation(.easeOut(duration: 0.3).delay(Double(navLinks.count) * 0.06 + 0.1), value: itemsVisible)
            }
            .padding(.horizontal, 24)
            .padding(.top, 16)

            Spacer()

            // Divider
            Rectangle()
                .fill(AppColors.border(for: colorScheme))
                .frame(height: 1)
                .padding(.horizontal, 24)
                .padding(.vertical, 24)

            // Login / Register
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
                .foregroundColor(AppColors.background(for: colorScheme))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(AppColors.foreground(for: colorScheme))
                .cornerRadius(AppCorners.full)
            }
            .buttonStyle(.plain)
            .padding(.horizontal, 24)
            .padding(.bottom, 40)
            .offset(y: itemsVisible ? 0 : 12)
            .opacity(itemsVisible ? 1 : 0)
            .animation(.easeOut(duration: 0.35).delay(0.35), value: itemsVisible)
        }
    }

    /// Compact, icon-only pill-shaped theme toggle for the nav list.
    private var themeTogglePill: some View {
        HStack(spacing: 0) {
            Button {
                themeOverride = "light"
            } label: {
                Image(systemName: "sun.max.fill")
                    .font(.system(size: 13))
                    .foregroundColor(colorScheme == .light ? AppColors.background(for: .light) : AppColors.foregroundMuted(for: colorScheme))
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 8)
                    .background(colorScheme == .light ? AppColors.foreground(for: .light) : Color.clear)
                    .cornerRadius(AppCorners.full)
            }
            
            Button {
                themeOverride = "dark"
            } label: {
                Image(systemName: "moon.stars.fill")
                    .font(.system(size: 13))
                    .foregroundColor(colorScheme == .dark ? AppColors.background(for: .dark) : AppColors.foregroundMuted(for: colorScheme))
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 8)
                    .background(colorScheme == .dark ? AppColors.foreground(for: .dark) : Color.clear)
                    .cornerRadius(AppCorners.full)
            }
        }
        .padding(4)
        .background(AppColors.surfaceRaised(for: colorScheme))
        .cornerRadius(AppCorners.full)
    }

    /// The Spotlight-style search results shown when typing.
    private var searchResultsContent: some View {
        ScrollView(showsIndicators: false) {
            VStack(alignment: .leading, spacing: 0) {
                Text("Results for \"\(searchText)\"")
                    .font(AppFont.body(size: 13, weight: .medium))
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    .padding(.horizontal, 24)
                    .padding(.vertical, 24)
                
                // Placeholder results until Phase 3 backend integration
                SearchResultRow(
                    icon: "text.book.closed.fill",
                    title: "epiphany",
                    subtitle: "folklore",
                    colorScheme: colorScheme,
                    onTap: { closeMenu() }
                )
                
                SearchResultRow(
                    icon: "music.note",
                    title: "Cruel Summer",
                    subtitle: "Lover · Track 2",
                    colorScheme: colorScheme,
                    onTap: { closeMenu() }
                )
                
                SearchResultRow(
                    icon: "quote.opening",
                    title: "I've been the archer...",
                    subtitle: "The Archer · Lover",
                    colorScheme: colorScheme,
                    onTap: { closeMenu() }
                )
            }
        }
    }

    /// Triggers the close sequence by toggling the binding
    private func closeMenu() {
        isMenuOpen = false
    }
}

// MARK: - Search Result Row

/// A reusable row for displaying a Spotlight search result.
private struct SearchResultRow: View {
    let icon: String
    let title: String
    let subtitle: String
    let colorScheme: ColorScheme
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 16) {
                // Icon circle
                ZStack {
                    Circle()
                        .fill(AppColors.surfaceRaised(for: colorScheme))
                        .frame(width: 40, height: 40)
                    Image(systemName: icon)
                        .font(.system(size: 14))
                        .foregroundColor(AppColors.accent(for: colorScheme))
                }
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(AppFont.body(size: 16, weight: .medium))
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                    Text(subtitle)
                        .font(.system(size: 12))
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(AppColors.borderFocus(for: colorScheme))
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}
