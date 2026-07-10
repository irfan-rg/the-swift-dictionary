// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — HomeViewModel
// Fetches and manages data for the Home Screen.
// ────────────────────────────────────────────────────────────────

import Foundation

@MainActor
final class HomeViewModel: ObservableObject {
    
    @Published var wordOfTheDay: WordWithDetails?
    @Published var topSongs: [SongWithAlbum] = []
    
    @Published var isLoading = true
    @Published var errorMessage: String?
    
    private let supabase = SupabaseService.shared
    
    /// Fetch all necessary data for the home screen concurrently.
    func loadData() async {
        isLoading = true
        errorMessage = nil
        
        do {
            // Run both network requests in parallel
            async let fetchWOTD = supabase.fetchWordOfTheDay()
            async let fetchSongs = supabase.fetchTopSongs(limit: 5)
            
            let (wotdResult, songsResult) = try await (fetchWOTD, fetchSongs)
            
            self.wordOfTheDay = wotdResult
            self.topSongs = songsResult
            
        } catch {
            print("❌ [HomeViewModel] Failed to load data: \(error)")
            self.errorMessage = "Failed to load dictionary data. Please check your connection."
        }
        
        isLoading = false
    }
}
