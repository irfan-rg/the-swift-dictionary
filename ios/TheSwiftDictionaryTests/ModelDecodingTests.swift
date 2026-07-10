// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Unit Tests (Phase 7)
// ────────────────────────────────────────────────────────────────

import XCTest
@testable import TheSwiftDictionary

final class ModelDecodingTests: XCTestCase {

    /// Verify that EraSlug correctly decodes all known slugs.
    func testEraSlugDecoding() throws {
        let json = "\"folklore\""
        let data = json.data(using: .utf8)!
        let slug = try JSONDecoder().decode(EraSlug.self, from: data)
        XCTAssertEqual(slug, .folklore)
    }

    /// Verify that the "1989" slug (starting with a digit) decodes correctly.
    func testEraSlug1989Decoding() throws {
        let json = "\"1989\""
        let data = json.data(using: .utf8)!
        let slug = try JSONDecoder().decode(EraSlug.self, from: data)
        XCTAssertEqual(slug, .nineteen89)
    }

    /// Verify that Difficulty decodes from title-case strings.
    func testDifficultyDecoding() throws {
        let json = "\"Advanced\""
        let data = json.data(using: .utf8)!
        let diff = try JSONDecoder().decode(Difficulty.self, from: data)
        XCTAssertEqual(diff, .advanced)
    }

    /// Verify that Album correctly decodes from a sample JSON payload.
    func testAlbumDecoding() throws {
        let json = """
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "slug": "folklore",
            "title": "Folklore",
            "year": 2020,
            "description": "The eighth studio album.",
            "cover_url": "https://example.com/cover.jpg",
            "animated_cover_url": null,
            "song_count": 16,
            "vocab_count": 42,
            "spotify_url": null,
            "created_at": "2024-01-01T00:00:00Z"
        }
        """
        let data = json.data(using: .utf8)!
        let album = try JSONDecoder().decode(Album.self, from: data)

        XCTAssertEqual(album.slug, .folklore)
        XCTAssertEqual(album.title, "Folklore")
        XCTAssertEqual(album.year, 2020)
        XCTAssertEqual(album.songCount, 16)
        XCTAssertEqual(album.vocabCount, 42)
    }

    /// Verify that the EraInfo lookup map contains all eras.
    func testEraMapCompleteness() {
        for era in EraSlug.allCases {
            XCTAssertNotNil(eraMap[era], "Missing EraInfo for \(era.rawValue)")
        }
    }
}
