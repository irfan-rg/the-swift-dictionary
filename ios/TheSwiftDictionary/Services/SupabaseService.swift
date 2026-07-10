// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Supabase Service
// Mirrors: src/lib/queries.ts (all query functions)
//        + src/lib/supabase/client.ts (client initialization)
//
// Single shared instance that manages the Supabase connection
// and provides every data query the app needs.
// ────────────────────────────────────────────────────────────────

import Foundation
import Supabase

// MARK: - Configuration

/// Supabase project configuration.
/// These values come from your `.env.local`:
///   NEXT_PUBLIC_SUPABASE_URL  → supabaseURL
///   NEXT_PUBLIC_SUPABASE_ANON_KEY → supabaseAnonKey
///
/// ⚠️ IMPORTANT: Replace these with your actual Supabase project values
///   before building. In production, read from a Config.plist or
///   environment to avoid hardcoding secrets.
private enum SupabaseConfig {
    static let url = URL(string: "https://YOUR_PROJECT.supabase.co")!
    static let anonKey = "your-anon-key-here"
}

// MARK: - Supabase Service

/// The app's central data layer — a singleton that wraps the Supabase client
/// and exposes typed async functions for every query.
///
/// Usage:
/// ```swift
/// let albums = try await SupabaseService.shared.fetchAlbums()
/// ```
final class SupabaseService {

    /// Shared singleton instance.
    static let shared = SupabaseService()

    /// The underlying Supabase client.
    let client: SupabaseClient

    private init() {
        client = SupabaseClient(
            supabaseURL: SupabaseConfig.url,
            supabaseKey: SupabaseConfig.anonKey
        )
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MARK: - Albums
    // Mirrors: queries.ts → getAlbums(), getAlbumBySlug()
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    /// Fetch all albums, ordered by year descending (newest first).
    func fetchAlbums() async throws -> [Album] {
        try await client
            .from("albums")
            .select()
            .order("year", ascending: false)
            .execute()
            .value
    }

    /// Fetch a single album by its slug.
    func fetchAlbum(slug: String) async throws -> Album? {
        let results: [Album] = try await client
            .from("albums")
            .select()
            .eq("slug", value: slug)
            .limit(1)
            .execute()
            .value
        return results.first
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MARK: - Songs
    // Mirrors: queries.ts → getSongsByAlbum(), getSongBySlug()
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    /// Fetch all songs in an album, ordered by track number.
    func fetchSongs(albumId: UUID) async throws -> [Song] {
        try await client
            .from("songs")
            .select()
            .eq("album_id", value: albumId.uuidString)
            .order("track_number")
            .execute()
            .value
    }

    /// Fetch a specific song by album slug + song slug, including vocabulary words.
    func fetchSong(albumSlug: String, songSlug: String) async throws -> SongDetail? {
        // 1. Get the album
        guard let album = try await fetchAlbum(slug: albumSlug) else { return nil }

        // 2. Get the song
        let songs: [Song] = try await client
            .from("songs")
            .select()
            .eq("album_id", value: album.id.uuidString)
            .eq("slug", value: songSlug)
            .limit(1)
            .execute()
            .value

        guard let song = songs.first else { return nil }

        // 3. Get vocab words for this song
        let words: [Word] = try await client
            .from("words")
            .select()
            .eq("song_id", value: song.id.uuidString)
            .order("word")
            .execute()
            .value

        // 4. Assemble the SongDetail
        return SongDetail(
            id: song.id,
            albumId: song.albumId,
            slug: song.slug,
            title: song.title,
            trackNumber: song.trackNumber,
            lyrics: song.lyrics,
            vocabCount: song.vocabCount,
            difficulty: song.difficulty,
            spotifyEmbedUrl: song.spotifyEmbedUrl,
            createdAt: song.createdAt,
            albumSlug: album.slug,
            albumTitle: album.title,
            vocabWords: words
        )
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MARK: - Dictionary (Words)
    // Mirrors: queries.ts → getDictionaryWords()
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    /// Filter parameters for dictionary word queries.
    struct DictionaryFilters {
        var query: String?
        var album: EraSlug?          // nil = "all"
        var difficulty: Difficulty?   // nil = "all"
        var sort: SortOption = .az
        var limit: Int = 30
        var offset: Int = 0

        enum SortOption: String {
            case relevance, az, za, difficulty
        }
    }

    /// Fetch dictionary words with filtering, sorting, and pagination.
    /// Returns the words and the total count for pagination.
    func fetchDictionaryWords(
        filters: DictionaryFilters = DictionaryFilters()
    ) async throws -> (words: [WordWithDetails], total: Int) {

        var query = client
            .from("words")
            .select(
                """
                *,
                songs!inner ( title, slug ),
                albums!inner ( slug, title )
                """,
                head: false,
                count: .exact
            )

        // Filters
        if let searchQuery = filters.query, !searchQuery.isEmpty {
            query = query.ilike("word", pattern: "\(searchQuery)%")
        }
        if let album = filters.album {
            query = query.eq("albums.slug", value: album.rawValue)
        }
        if let difficulty = filters.difficulty {
            query = query.eq("difficulty", value: difficulty.rawValue)
        }

        // Sorting
        switch filters.sort {
        case .az:
            query = query.order("word", ascending: true)
        case .za:
            query = query.order("word", ascending: false)
        case .difficulty:
            query = query.order("difficulty")
        case .relevance:
            break // Natural order from text search
        }

        // Pagination
        query = query.range(from: filters.offset, to: filters.offset + filters.limit - 1)

        let response = try await query.execute()

        // Decode the joined response
        let decoder = JSONDecoder()
        let rows = try decoder.decode([WordWithJoins].self, from: response.data)
        let words = rows.map { $0.toWordWithDetails() }

        // Extract total count from response
        let total = response.count ?? words.count

        return (words, total)
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MARK: - Word of the Day
    // Mirrors: queries.ts → getWordOfTheDay()
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    /// Fetch today's Word of the Day via the `assign_wotd_today()` Supabase RPC.
    /// The DB function auto-assigns a random unfeatured word if one hasn't
    /// been picked yet today.
    func fetchWordOfTheDay() async throws -> WordWithDetails? {
        let response = try await client
            .rpc("assign_wotd_today")
            .execute()

        let decoder = JSONDecoder()
        let rows = try decoder.decode([WOTDResponse].self, from: response.data)

        return rows.first?.toWordWithDetails()
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MARK: - Top Songs
    // Mirrors: queries.ts → getTopSongs()
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    /// Fetch the top songs ranked by vocabulary count.
    /// Internal response type for decoding the Supabase join.
    private struct SongWithAlbumJoin: Codable {
        let id: UUID
        let albumId: UUID
        let slug: String
        let title: String
        let trackNumber: Int
        let lyrics: String?
        let vocabCount: Int
        let difficulty: Difficulty
        let spotifyEmbedUrl: String?
        let createdAt: String
        let albums: AlbumRef

        enum CodingKeys: String, CodingKey {
            case id, slug, title, lyrics, difficulty, albums
            case albumId         = "album_id"
            case trackNumber     = "track_number"
            case vocabCount      = "vocab_count"
            case spotifyEmbedUrl = "spotify_embed_url"
            case createdAt       = "created_at"
        }
    }

    func fetchTopSongs(limit: Int = 5) async throws -> [SongWithAlbum] {
        let response = try await client
            .from("songs")
            .select(
                """
                *,
                albums!inner ( slug, title )
                """
            )
            .order("vocab_count", ascending: false)
            .limit(limit)
            .execute()

        let decoder = JSONDecoder()
        let rows = try decoder.decode([SongWithAlbumJoin].self, from: response.data)

        return rows.map { row in
            SongWithAlbum(
                id: row.id,
                albumId: row.albumId,
                slug: row.slug,
                title: row.title,
                trackNumber: row.trackNumber,
                lyrics: row.lyrics,
                vocabCount: row.vocabCount,
                difficulty: row.difficulty,
                spotifyEmbedUrl: row.spotifyEmbedUrl,
                createdAt: row.createdAt,
                albumSlug: EraSlug(rawValue: row.albums.slug) ?? .debut,
                albumTitle: row.albums.title
            )
        }
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MARK: - Search
    // Mirrors: queries.ts → searchAll()
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    /// Search across words, songs, and albums. Returns unified results.
    func search(query: String) async throws -> [SearchResult] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return [] }

        var results: [SearchResult] = []

        // 1. Search words (prefix match)
        struct WordSearchRow: Codable {
            let id: UUID
            let word: String
            let definition: String
            let songs: SongRef
            let albums: AlbumRef
        }

        let wordResponse = try await client
            .from("words")
            .select("id, word, definition, songs(slug, title), albums(slug, title)")
            .ilike("word", pattern: "\(trimmed)%")
            .order("word")
            .limit(5)
            .execute()

        let wordRows = try JSONDecoder().decode([WordSearchRow].self, from: wordResponse.data)
        for w in wordRows {
            results.append(SearchResult(
                type: .word,
                id: w.id.uuidString,
                title: w.word,
                subtitle: "\(w.albums.title) • \(w.songs.title)",
                href: "/explorer/\(w.albums.slug)/\(w.songs.slug)"
            ))
        }

        // 2. Search songs (contains match)
        struct SongSearchRow: Codable {
            let id: UUID
            let title: String
            let slug: String
            let albums: AlbumRef
        }

        let songResponse = try await client
            .from("songs")
            .select("id, title, slug, albums(slug, title)")
            .ilike("title", pattern: "%\(trimmed)%")
            .order("title")
            .limit(5)
            .execute()

        let songRows = try JSONDecoder().decode([SongSearchRow].self, from: songResponse.data)
        for s in songRows {
            results.append(SearchResult(
                type: .song,
                id: s.id.uuidString,
                title: s.title,
                subtitle: s.albums.title,
                href: "/explorer/\(s.albums.slug)/\(s.slug)"
            ))
        }

        // 3. Search albums (contains match)
        struct AlbumSearchRow: Codable {
            let id: UUID
            let title: String
            let slug: String
        }

        let albumResponse = try await client
            .from("albums")
            .select("id, title, slug")
            .ilike("title", pattern: "%\(trimmed)%")
            .limit(3)
            .execute()

        let albumRows = try JSONDecoder().decode([AlbumSearchRow].self, from: albumResponse.data)
        for a in albumRows {
            results.append(SearchResult(
                type: .album,
                id: a.id.uuidString,
                title: a.title,
                subtitle: "Album",
                href: "/explorer/\(a.slug)"
            ))
        }

        return results
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MARK: - Favorites
    // Mirrors: queries.ts → getUserFavorites(), toggleFavorite()
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    /// Fetch all favorites for a user, with full word details.
    func fetchFavorites(userId: UUID) async throws -> [WordWithDetails] {
        let response = try await client
            .from("favorites")
            .select(
                """
                word_id,
                words (
                    *,
                    songs ( title, slug ),
                    albums ( slug, title )
                )
                """
            )
            .eq("user_id", value: userId.uuidString)
            .order("created_at", ascending: false)
            .execute()

        let decoder = JSONDecoder()
        let rows = try decoder.decode([FavoriteWithWordJoin].self, from: response.data)
        return rows.map { $0.words.toWordWithDetails() }
    }

    /// Toggle a word as favorite. Returns `true` if now favorited, `false` if unfavorited.
    func toggleFavorite(userId: UUID, wordId: UUID) async throws -> Bool {
        // Check if already favorited
        struct FavoriteRow: Codable { let id: UUID }

        let existing: [FavoriteRow] = try await client
            .from("favorites")
            .select("id")
            .eq("user_id", value: userId.uuidString)
            .eq("word_id", value: wordId.uuidString)
            .limit(1)
            .execute()
            .value

        if let fav = existing.first {
            // Unfavorite
            try await client
                .from("favorites")
                .delete()
                .eq("id", value: fav.id.uuidString)
                .execute()
            return false
        } else {
            // Favorite
            struct InsertFavorite: Codable {
                let userId: UUID
                let wordId: UUID
                enum CodingKeys: String, CodingKey {
                    case userId = "user_id"
                    case wordId = "word_id"
                }
            }
            try await client
                .from("favorites")
                .insert(InsertFavorite(userId: userId, wordId: wordId))
                .execute()
            return true
        }
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MARK: - Profile
    // Mirrors: queries.ts → getUserProfile(), getCalculatedEra(),
    //                        getUserBracelet()
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    /// Fetch a user's profile.
    func fetchProfile(userId: UUID) async throws -> Profile? {
        let results: [Profile] = try await client
            .from("profiles")
            .select()
            .eq("id", value: userId.uuidString)
            .limit(1)
            .execute()
            .value
        return results.first
    }

    /// Update a user's profile fields.
    func updateProfile(userId: UUID, displayName: String?, declaredEra: String?) async throws {
        struct ProfileUpdate: Codable {
            let displayName: String?
            let declaredEra: String?
            enum CodingKeys: String, CodingKey {
                case displayName = "display_name"
                case declaredEra = "declared_era"
            }
        }
        try await client
            .from("profiles")
            .update(ProfileUpdate(displayName: displayName, declaredEra: declaredEra))
            .eq("id", value: userId.uuidString)
            .execute()
    }

    /// Calculate the user's "true era" based on which album has the most favorites.
    func fetchCalculatedEra(userId: UUID) async throws -> (slug: EraSlug, count: Int)? {
        let favorites = try await fetchFavorites(userId: userId)
        guard !favorites.isEmpty else { return nil }

        // Count favorites per era
        var counts: [EraSlug: Int] = [:]
        for fav in favorites {
            counts[fav.albumSlug, default: 0] += 1
        }

        // Find the top era
        guard let top = counts.max(by: { $0.value < $1.value }) else { return nil }
        return (slug: top.key, count: top.value)
    }

    /// Fetch a user's bracelet beads.
    func fetchBracelet(userId: UUID) async throws -> [String]? {
        struct BraceletRow: Codable { let beads: [String] }

        let results: [BraceletRow] = try await client
            .from("bracelets")
            .select("beads")
            .eq("user_id", value: userId.uuidString)
            .limit(1)
            .execute()
            .value

        return results.first?.beads
    }

    /// Save/update a user's bracelet beads.
    func saveBracelet(userId: UUID, beads: [String]) async throws {
        struct BraceletUpsert: Codable {
            let userId: UUID
            let beads: [String]
            let updatedAt: String
            enum CodingKeys: String, CodingKey {
                case userId    = "user_id"
                case beads
                case updatedAt = "updated_at"
            }
        }

        let now = ISO8601DateFormatter().string(from: Date())
        try await client
            .from("bracelets")
            .upsert(BraceletUpsert(userId: userId, beads: beads, updatedAt: now))
            .execute()
    }
}
