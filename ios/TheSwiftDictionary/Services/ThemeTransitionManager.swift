import SwiftUI
import UIKit

/// Manages a global radial mask transition for theme changes by taking a snapshot of the UIWindow.
class ThemeTransitionManager: ObservableObject {
    static let shared = ThemeTransitionManager()
    
    @Published var snapshotImage: UIImage? = nil
    @Published var maskRadius: CGFloat = 0
    @Published var isTransitioning: Bool = false
    
    private init() {}
    
    /// Triggers a radial theme transition.
    /// - Parameter themeToggleAction: A closure that performs the actual theme state flip.
    func triggerTransition(themeToggleAction: @escaping () -> Void) {
        guard let window = getMainWindow() else {
            // Fallback if window isn't accessible
            withAnimation(.easeInOut(duration: 0.4)) {
                themeToggleAction()
            }
            return
        }
        
        // 1. Capture the exact current state of the screen
        UIGraphicsBeginImageContextWithOptions(window.bounds.size, false, 0.0)
        window.drawHierarchy(in: window.bounds, afterScreenUpdates: false)
        let image = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        // 2. Set the overlay state
        self.snapshotImage = image
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
    
    var body: some View {
        if manager.isTransitioning, let image = manager.snapshotImage {
            Image(uiImage: image)
                .resizable()
                .ignoresSafeArea()
                .mask(
                    ZStack {
                        // The base mask that keeps the image visible
                        Rectangle()
                        
                        // The expanding circle that punches a hole in the mask
                        Circle()
                            .frame(width: manager.maskRadius * 2, height: manager.maskRadius * 2)
                            // Starts exactly from the top center (where the string is pulled)
                            .position(x: UIScreen.main.bounds.width / 2, y: 0)
                            .blendMode(.destinationOut)
                    }
                    .compositingGroup()
                )
                .ignoresSafeArea()
                .allowsHitTesting(false)
        }
    }
}
