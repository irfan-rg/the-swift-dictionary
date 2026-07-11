// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — App Header (Mobile)
// Mirrors: src/components/Header.tsx → mobile layout (lines 245-286)
//
// Layout: [TSD logo]  ···  [☀/☾] [🔍] [menu./close.]
// ────────────────────────────────────────────────────────────────

import SwiftUI

struct AppHeader: View {
    @Binding var isMenuOpen: Bool
    let colorScheme: ColorScheme
    @AppStorage("appThemeOverride") private var themeOverride: String = "system"
    
    var body: some View {
        HStack {
            // ── Left: TSD Brand Logo ──
            // Web: BrandLogo short → "TSD" in font-branding, tracking-[-0.1em]
            Text("TSD")
                .font(AppFont.branding(size: 20))
                .tracking(-2) // -0.1em at 20pt ≈ -2pt
                .foregroundColor(AppColors.accent(for: colorScheme))
            
            Spacer()
            
            // ── Right: Action Buttons ──
            HStack(spacing: 2) {
                // Theme Toggle (sun/moon)
                Button {
                    themeOverride = colorScheme == .dark ? "light" : "dark"
                } label: {
                    Image(systemName: colorScheme == .dark ? "sun.max" : "moon.stars")
                        .font(.system(size: 18, weight: .light))
                        .frame(width: 38, height: 38)
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                }
                
                // Search Icon (placeholder for Phase 3)
                Button { } label: {
                    Image(systemName: "magnifyingglass")
                        .font(.system(size: 18, weight: .light))
                        .frame(width: 38, height: 38)
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                }
                
                // Menu / Close Button (handwriting font)
                Button {
                    withAnimation(.easeInOut(duration: 0.25)) {
                        isMenuOpen.toggle()
                    }
                } label: {
                    Text(isMenuOpen ? "close." : "menu.")
                        .font(AppFont.handwriting(size: 20))
                        .tracking(1)
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                        .frame(minWidth: 64, minHeight: 36)
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
