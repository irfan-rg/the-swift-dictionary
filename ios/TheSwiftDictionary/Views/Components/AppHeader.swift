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

            // ── Right Actions: [☀/☾] [menu./close.] ───────────
            HStack(spacing: 0) {
                // Theme toggle
                Button {
                    themeOverride = colorScheme == .dark ? "light" : "dark"
                } label: {
                    Image(systemName: colorScheme == .dark ? "sun.max" : "moon.stars")
                        .font(.system(size: 17, weight: .light))
                        .frame(width: 38, minHeight: 38)
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                }

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
