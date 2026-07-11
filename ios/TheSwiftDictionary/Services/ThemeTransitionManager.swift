import SwiftUI
import UIKit

/// Manages a global radial mask transition for theme changes by taking a snapshot of the UIWindow.
class ThemeTransitionManager: ObservableObject {
    static let shared = ThemeTransitionManager()
    
    @Published var snapshotImage: UIImage? = nil
    @Published var maskRadius: CGFloat = 0
    @Published var isTransitioning: Bool = false
    
    // For Pull-to-Toggle gesture
    @Published var pullOffset: CGFloat = 0
    @Published var isReadyToToggle: Bool = false
    
    private init() {}
    
    /// Captures the screen silently in the background while the user is still pulling.
    func preCaptureScreen() {
        // Dispatch to the next main thread cycle to prevent stuttering the user's scroll gesture frame!
        DispatchQueue.main.async {
            guard let window = self.getMainWindow() else { return }
            
            // Use the highly optimized UIGraphicsImageRenderer instead of the legacy context
            let format = UIGraphicsImageRendererFormat()
            format.opaque = true
            let renderer = UIGraphicsImageRenderer(size: window.bounds.size, format: format)
            
            let image = renderer.image { _ in
                window.drawHierarchy(in: window.bounds, afterScreenUpdates: false)
            }
            
            self.snapshotImage = image
        }
    }
    
    /// Triggers the radial theme transition instantly using the pre-captured snapshot.
    /// - Parameter themeToggleAction: A closure that performs the actual theme state flip.
    func executeTransition(themeToggleAction: @escaping () -> Void) {
        guard snapshotImage != nil, let window = getMainWindow() else {
            // Fallback if window isn't accessible
            withAnimation(.easeInOut(duration: 0.4)) {
                themeToggleAction()
            }
            return
        }
        
        
        // 2. Set the overlay state
        self.maskRadius = 0
        self.isTransitioning = true
        
        // 3. Perform the actual theme change immediately (behind the snapshot)
        // We do NOT use withAnimation here so the underlying UI snaps instantly,
        // preventing any crossfade bleeding through the mask edge.
        themeToggleAction()
        
        // 4. Animate the hole punch mask over the snapshot
        // We wait a tiny fraction of a second to ensure the underlying UI has re-rendered
        // in the new theme before we start ripping the mask open.
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.05) {
            withAnimation(.easeIn(duration: 0.6)) {
                self.maskRadius = max(window.bounds.width, window.bounds.height) * 1.5
            }
            
            // 5. Cleanup overlay after animation finishes
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) {
                self.isTransitioning = false
                self.snapshotImage = nil
            }
        }
    }
    
    private func getMainWindow() -> UIWindow? {
        UIApplication.shared.connectedScenes
            .filter { $0.activationState == .foregroundActive }
            .compactMap { $0 as? UIWindowScene }
            .first?.windows.filter { $0.isKeyWindow }.first
    }
}

/// The overlay view that holds the snapshot and applies the inverse radial mask.
struct ThemeTransitionOverlay: View {
    @ObservedObject var manager = ThemeTransitionManager.shared
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        ZStack {
            if manager.isTransitioning, let image = manager.snapshotImage {
                Image(uiImage: image)
                    .resizable()
                    .ignoresSafeArea()
                    .mask(
                        ZStack {
                            // The base mask that keeps the image visible
                            Rectangle()
                            
                            // The expanding Capsule that punches a hole in the mask
                            Capsule()
                                // Base size perfectly hugs the Dynamic Island (126x37).
                                // As maskRadius grows, it expands outward natively.
                                .frame(width: 126 + manager.maskRadius * 2, height: 37 + manager.maskRadius * 2)
                                // Starts exactly from the center of the Dynamic Island (y: 30)
                                .position(x: UIScreen.main.bounds.width / 2, y: 30)
                                .blendMode(.destinationOut)
                        }
                        .compositingGroup()
                    )
                    .ignoresSafeArea()
                    .allowsHitTesting(false)
            }
            
            // Render the Spotlight Indicator above everything (including AppHeader)
            // We hide it the moment the transition starts so the text doesn't slide backward,
            // leaving ONLY the perfectly frozen version in the screenshot to be erased!
            if manager.pullOffset > 0 && !manager.isTransitioning {
                SpotlightIndicator(
                    offset: manager.pullOffset,
                    colorScheme: colorScheme,
                    isReady: manager.isReadyToToggle
                )
                .allowsHitTesting(false)
            }
        }
        .ignoresSafeArea() // CRITICAL: Ensures y:30 is actually the physical notch
    }
}

// MARK: - Eras Tour Spotlight Indicator

/// A highly cinematic Taylor Swift themed pull indicator that shines a light beam from the Dynamic Island.
struct SpotlightIndicator: View {
    let offset: CGFloat
    let colorScheme: ColorScheme
    let isReady: Bool
    
    var body: some View {
        let lyric = colorScheme == .dark ? "step into the daylight..." : "meet me at midnight..."
        let progress = min(max(offset / 90.0, 0), 1.0)
        
        ZStack(alignment: .top) {
            // The Spotlight Beam extending down from the dynamic island
            Path { path in
                let width = UIScreen.main.bounds.width
                let islandTop: CGFloat = 30
                // Notch is roughly 120pt wide. Start beam from edges of notch.
                path.move(to: CGPoint(x: width/2 - 50, y: islandTop))
                path.addLine(to: CGPoint(x: width/2 + 50, y: islandTop))
                // The beam widens as it reaches down
                path.addLine(to: CGPoint(x: width/2 + 120, y: islandTop + max(offset, 10)))
                path.addLine(to: CGPoint(x: width/2 - 120, y: islandTop + max(offset, 10)))
                path.closeSubpath()
            }
            .fill(
                LinearGradient(
                    gradient: Gradient(colors: [
                        (isReady ? AppColors.foreground(for: colorScheme) : AppColors.accent(for: colorScheme)).opacity(0.4 * progress),
                        Color.clear
                    ]),
                    startPoint: .top,
                    endPoint: .bottom
                )
            )
            .blur(radius: 8) // Makes the light beam soft and volumetric
            .blendMode(colorScheme == .dark ? .screen : .normal)
            .animation(.spring(response: 0.3, dampingFraction: 0.7), value: isReady)
            
            // The illuminated lyric text
            Text(lyric)
                .font(AppFont.handwriting(size: 22))
                .foregroundColor(isReady ? AppColors.foreground(for: colorScheme) : AppColors.accent(for: colorScheme))
                .opacity(progress)
                .scaleEffect(isReady ? 1.08 : 1.0)
                // Positioned in the middle of the growing beam
                .padding(.top, max(50, offset))
                .animation(.spring(response: 0.3, dampingFraction: 0.6), value: isReady)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .ignoresSafeArea()
    }
}
