// ────────────────────────────────────────────────────────────────
// The Swift Dictionary — Environment / .env file reader
//
// Reads key-value pairs from a `.env` file bundled as an app
// resource. Mirrors the web app's `.env.local` approach so you
// can keep secrets out of source code.
//
// Setup:
//   1. Copy `ios/.env.example` → `ios/.env`
//   2. Fill in your real Supabase URL and anon key
//   3. In Xcode: drag the `.env` file into the project navigator
//      and ensure "Copy items if needed" is checked and the file
//      is added to the TheSwiftDictionary target
//   4. The file will be bundled inside the app at build time
// ────────────────────────────────────────────────────────────────

import Foundation

/// Reads configuration from a `.env` file bundled in the app resources.
///
/// Supports:
///   - `KEY=value` pairs (one per line)
///   - `# comment` lines (skipped)
///   - Empty lines (skipped)
///   - Values with or without quotes
///   - Inline comments after values
enum Environment {

    /// Parsed key-value store, loaded once on first access.
    private static let values: [String: String] = {
        guard let url = Bundle.main.url(forResource: ".env", withExtension: nil)
                ?? Bundle.main.url(forResource: "env", withExtension: "")
                ?? findEnvFile()
        else {
            print("⚠️ [Environment] .env file not found in bundle. Using empty config.")
            print("   → Copy ios/.env.example to ios/.env and add it to your Xcode target.")
            return [:]
        }

        guard let contents = try? String(contentsOf: url, encoding: .utf8) else {
            print("⚠️ [Environment] Could not read .env file.")
            return [:]
        }

        return parse(contents)
    }()

    /// Get a value for a key, or `nil` if not found.
    static func get(_ key: String) -> String? {
        values[key]
    }

    /// Get a value for a key, crashing with a clear message if missing.
    /// Use this for required configuration like Supabase URL.
    static func require(_ key: String) -> String {
        guard let value = values[key], !value.isEmpty else {
            fatalError(
                """
                ❌ [Environment] Missing required key: \(key)
                
                Make sure your ios/.env file contains:
                  \(key)=your_value_here
                
                And that the .env file is added to the Xcode target's
                "Copy Bundle Resources" build phase.
                """
            )
        }
        return value
    }

    // MARK: - Convenience accessors

    /// Supabase project URL — `SUPABASE_URL`
    static var supabaseURL: URL {
        guard let url = URL(string: require("SUPABASE_URL")) else {
            fatalError("❌ [Environment] SUPABASE_URL is not a valid URL.")
        }
        return url
    }

    /// Supabase anonymous key — `SUPABASE_ANON_KEY`
    static var supabaseAnonKey: String {
        require("SUPABASE_ANON_KEY")
    }

    // MARK: - Parser

    /// Parse a `.env` file's contents into a dictionary.
    private static func parse(_ contents: String) -> [String: String] {
        var result: [String: String] = [:]

        for line in contents.components(separatedBy: .newlines) {
            let trimmed = line.trimmingCharacters(in: .whitespaces)

            // Skip empty lines and comments
            if trimmed.isEmpty || trimmed.hasPrefix("#") {
                continue
            }

            // Split on the first `=`
            guard let equalsIndex = trimmed.firstIndex(of: "=") else {
                continue
            }

            let key = String(trimmed[trimmed.startIndex..<equalsIndex])
                .trimmingCharacters(in: .whitespaces)

            var value = String(trimmed[trimmed.index(after: equalsIndex)...])
                .trimmingCharacters(in: .whitespaces)

            // Strip surrounding quotes (single or double)
            if (value.hasPrefix("\"") && value.hasSuffix("\"")) ||
               (value.hasPrefix("'") && value.hasSuffix("'")) {
                value = String(value.dropFirst().dropLast())
            }

            // Strip inline comments (only if not inside quotes)
            if let commentIndex = value.range(of: " #")?.lowerBound {
                value = String(value[value.startIndex..<commentIndex])
                    .trimmingCharacters(in: .whitespaces)
            }

            result[key] = value
        }

        return result
    }

    /// Try to find the .env file by searching common bundle resource locations.
    private static func findEnvFile() -> URL? {
        // Try with a dot prefix (some file systems/Xcode versions handle this differently)
        if let url = Bundle.main.url(forResource: "", withExtension: "env") {
            return url
        }
        // Try looking in the bundle root directly
        let bundlePath = Bundle.main.bundlePath
        let envPath = (bundlePath as NSString).appendingPathComponent(".env")
        if FileManager.default.fileExists(atPath: envPath) {
            return URL(fileURLWithPath: envPath)
        }
        return nil
    }
}
