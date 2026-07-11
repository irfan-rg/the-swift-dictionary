// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — App Header (Mobile)
// Layout: [TSD logo]  ···  [☀/☾] [menu./close.]
// Search lives inside the hamburger menu.
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct AppHeader: View {
    @Binding var isMenuOpen: Bool
    let colorScheme: ColorScheme
    @AppStorage("appThemeOverride") private var themeOverride: String = "system"

    var body: some View {
        HStack {
            // ── TSD Brand Logo ─────────────────────────────────
            Text("TSD")
                .font(AppFont.branding(size: 20))
                .tracking(-2)
                .foregroundColor(AppColors.accent(for: colorScheme))

            Spacer()

            // ── Right Actions ──────────────────────────────────
            HStack(spacing: 0) {
                // menu. / close. in handwriting font
                Button {
                    withAnimation(.easeInOut(duration: 0.25)) {
                        isMenuOpen.toggle()
                    }
                } label: {
                    Text(isMenuOpen ? "close." : "menu.")
                        .font(AppFont.handwriting(size: 20))
                        .tracking(0.5)
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                        .frame(minWidth: 64, minHeight: 38)
                        .contentTransition(.interpolate)
                }
                .contextMenu {
                    Button {
                        themeOverride = "light"
                    } label: {
                        Label("Light Mode", systemImage: "sun.max")
                    }
                    Button {
                        themeOverride = "dark"
                    } label: {
                        Label("Dark Mode", systemImage: "moon.stars")
                    }
                    Button {
                        themeOverride = "system"
                    } label: {
                        Label("System", systemImage: "circle.lefthalf.filled")
                    }
                }
            }
        }
        .padding(.horizontal, 16)
        .frame(height: 56)
        .background(AppColors.background(for: colorScheme))
        .overlay(
            Rectangle()
                .fill(AppColors.border(for: colorScheme))
                .frame(height: 1),
            alignment: .bottom
        )
    }
}
