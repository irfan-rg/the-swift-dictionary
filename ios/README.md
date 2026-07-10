# The Swift Dictionary — iOS App

Native iOS client for [The Swift Dictionary](https://www.the-swift-dictionary.me), built with **SwiftUI** targeting **iOS 16+**.

Uses the same **Supabase** backend as the web app — no backend changes needed.

## Prerequisites

- **macOS 26** (Tahoe) on Intel MacBook Pro 2020
- **Xcode 17+** (latest from Mac App Store)
- **XcodeGen** (optional, for generating `.xcodeproj` from `project.yml`)

## Setup

### Option A: Using XcodeGen (Recommended)

1. **Install XcodeGen:**
   ```bash
   brew install xcodegen
   ```

2. **Generate the Xcode project:**
   ```bash
   cd ios/
   xcodegen generate
   ```

3. **Open in Xcode:**
   ```bash
   open TheSwiftDictionary.xcodeproj
   ```

### Option B: Manual Xcode Project

1. Open Xcode → **File → New → Project**
2. Choose **iOS → App**
3. Settings:
   - Product Name: `TheSwiftDictionary`
   - Bundle ID: `com.irfan.theswiftdictionary`
   - Interface: **SwiftUI**
   - Language: **Swift**
   - Minimum Deployment: **iOS 16.0**
4. Delete the auto-generated files (ContentView.swift, etc.)
5. Drag the `TheSwiftDictionary/` folder into the project
6. Add SPM dependency:
   - File → Add Package Dependencies
   - URL: `https://github.com/supabase/supabase-swift`
   - Version: `2.0.0` – Next Major

## Custom Fonts

Download these from [Google Fonts](https://fonts.google.com) and place the `.ttf` files in `TheSwiftDictionary/Resources/Fonts/`:

| Font Family | Weights Needed | Download |
|---|---|---|
| Cormorant Garamond | Regular, Medium, SemiBold + Italic variants | [↗](https://fonts.google.com/specimen/Cormorant+Garamond) |
| Bricolage Grotesque | Regular, Medium, SemiBold, Bold | [↗](https://fonts.google.com/specimen/Bricolage+Grotesque) |
| Cinzel Decorative | Regular, Bold | [↗](https://fonts.google.com/specimen/Cinzel+Decorative) |
| Nothing You Could Do | Regular | [↗](https://fonts.google.com/specimen/Nothing+You+Could+Do) |

Then add them to your Xcode target and register in `Info.plist` under `UIAppFonts` (already configured in `project.yml`).

## Supabase Configuration

1. **Copy the example file:**
   ```bash
   cp ios/Supabase.env.example ios/TheSwiftDictionary/Resources/Supabase.env
   ```

2. **Fill in your real values** (same as your web app's `.env.local`):
   ```env
   SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Regenerate the project:**
   Since `Supabase.env` does not start with a dot, XcodeGen will automatically see it and bundle it into your app on the next run:
   ```bash
   cd ios/
   xcodegen generate
   ```

The `DotEnv.swift` helper reads this file from the app bundle at runtime — no secrets in code.

## OAuth Setup

### Sign in with Apple
1. In Xcode: Target → Signing & Capabilities → **+ Capability → Sign in with Apple**
2. In Supabase Dashboard: Authentication → Providers → **Apple** → Enable

### Google Sign In
1. In Supabase Dashboard: Authentication → Providers → **Google** (already configured for web)
2. Add the iOS URL scheme redirect: `theswiftdictionary://auth/callback`
3. In your Google Cloud Console, add the iOS bundle ID to the OAuth client

## Build & Run

1. Select an **iPhone Simulator** (iPhone 15, iPhone SE, etc.)
2. Press **⌘R** to build and run
3. The app should launch with the tab bar showing placeholder screens

## Project Structure

```
ios/
├── Supabase.env.example                 # Template config
├── project.yml                          # XcodeGen config
├── README.md                            # This file
├── TheSwiftDictionary/
│   ├── App/
│   │   ├── TheSwiftDictionaryApp.swift  # @main entry
│   │   └── ContentView.swift            # Tab bar root
│   ├── Models/
│   │   ├── EraSlug.swift
│   │   ├── Difficulty.swift
│   │   ├── Album.swift
│   │   ├── Song.swift
│   │   ├── Word.swift
│   │   ├── Profile.swift
│   │   ├── Favorite.swift
│   │   ├── Bracelet.swift
│   │   └── SearchResult.swift
│   ├── Design/
│   │   ├── EraInfo.swift                # Era metadata + colors
│   │   ├── Theme.swift                  # Color tokens + shadows
│   │   └── Typography.swift             # Custom font system
│   ├── Services/
│   │   ├── SupabaseService.swift        # Data layer (all queries)
│   │   ├── AuthService.swift            # Auth state management
│   │   └── DotEnv.swift                 # .env file reader
│   ├── ViewModels/                      # Phase 2+
│   ├── Views/                           # Phase 2+
│   ├── Extensions/                      # Phase 2+
│   └── Resources/
│       ├── Supabase.env                 # Your secrets (gitignored)
│       ├── Assets.xcassets/             # Create in Xcode
│       └── Fonts/                       # Google Fonts .ttf files
└── TheSwiftDictionaryTests/             # Phase 7
```
