// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — HomeViewModel
// Fetches and manages data for the Home Screen.
// ────────────────────────────────────────────────────────────────

import Foundation

@MainActor
final class HomeViewModel: ObservableObject {
    
    @Published var wordOfTheDay: WordWithDetails?
    @Published var topSongs: [SongWithAlbum] = []
    @Published var albums: [Album] = []
    
    @Published var isLoading = true
    @Published var errorMessage: String?
    
    private let supabase = SupabaseService.shared
    
    /// Fetch all necessary data for the home screen concurrently.
    func loadData() async {
        isLoading = true
        errorMessage = nil
        
        do {
            // Run all three network requests in parallel
            async let fetchWOTD = supabase.fetchWordOfTheDay()
            async let fetchSongs = supabase.fetchTopSongs(limit: 5)
            async let fetchAlbums = supabase.fetchAlbums()
            
            let (wotdResult, songsResult, albumsResult) = try await (fetchWOTD, fetchSongs, fetchAlbums)
            
            self.wordOfTheDay = wotdResult
            self.topSongs = songsResult
            self.albums = albumsResult
            
        } catch {
            print("❌ [HomeViewModel] Failed to load data: \(error)")
            self.errorMessage = "Failed to load dictionary data. Please check your connection."
        }
        
        isLoading = false
    }
    
    /// Get the cover URL for a given era slug from loaded albums.
    func coverURL(for slug: EraSlug) -> URL? {
        guard let album = albums.first(where: { $0.slug == slug }),
              let urlString = album.coverUrl,
              let url = URL(string: urlString) else {
            return nil
        }
        return url
    }
}
