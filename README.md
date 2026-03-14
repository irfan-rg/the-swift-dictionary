<p align="center">
  <img src="public\images\TSD-Promo-Logo-HQ.png" alt="The Swift Dictionary" width="80" />
</p>

<h1 align="center">The Swift Dictionary</h1>

<p align="center">
  A curated scrapbook of Taylor Swift's lyrical vocabulary — explore sophisticated words hidden across every era.
</p>

<p align="center">
  <a href="https://www.the-swift-dictionary.me">Live Site</a> · <a href="#features">Features</a> · <a href="#getting-started">Get Started</a> · <a href="#contributing">Contribute</a>
</p>

---

## About

Taylor Swift's songwriting is remarkable not just for its emotional depth, but for its vocabulary. Words like *iridescent*, *clandestine*, and *harbored* appear naturally in her lyrics, carrying layers of meaning that reward closer reading.

**The Swift Dictionary** extracts, defines, and contextualizes the vocabulary that makes her writing distinctive — turning lyrics into a living glossary spanning all 12 eras, from *Taylor Swift* (2006) through *The Life of a Showgirl* (2025).

## Features

- **Dictionary** — Browse, search, and filter vocabulary words across every era with prefix-matched search and difficulty filters
- **Explorer** — Navigate by album and song; view full lyrics with highlighted vocabulary words in context
- **Word of the Day** — A daily featured word with definition, lyric snippet, and Taylor's usage context
- **Era Timeline** — Visual journey through all 12 albums with era-specific color palettes
- **Top Songs** — Rankings of the most vocabulary-rich tracks in the discography
- **Favorites** — Sign in to save words and build a personal vocabulary collection
- **Dark Mode** — Full light/dark theme support
- **Responsive** — Designed to work beautifully on all screen sizes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) (App Router, Server Components) |
| Language | TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Database | [Supabase](https://supabase.com) (PostgreSQL + Auth + RLS) |
| Animations | [Framer Motion](https://www.framer.com/motion) |
| Icons | [Lucide React](https://lucide.dev) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) |
| Fonts | Cormorant Garamond, Bricolage Grotesque, Cinzel Decorative |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Installation

```bash
git clone https://github.com/irfan-rg/the-swift-dictionary.git
cd the-swift-dictionary
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Database Setup

Run the schema in your Supabase SQL Editor:

```bash
# The schema file is at:
supabase/schema.sql
```

This creates all tables (albums, songs, words, favorites, profiles), full-text search indexes, and row-level security policies.

### Seed Data

The `pipeline/` directory contains Python scripts for populating the database:

```bash
cd pipeline
pip install -r requirements.txt
python seed_db.py
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── about/                  # About page
│   ├── api/
│   │   ├── favorites/          # Favorite toggle endpoint
│   │   └── search/             # Search endpoint
│   ├── auth/                   # Login, signup, OAuth callback
│   ├── contribute/             # Contribution guide page
│   ├── dictionary/             # Dictionary browse + search
│   ├── explorer/               # Album → Song → Lyrics explorer
│   │   ├── [album]/
│   │   │   └── [song]/
│   ├── favorites/              # User's saved words
│   ├── layout.tsx              # Root layout with theme provider
│   └── page.tsx                # Homepage
├── components/
│   ├── dictionary/             # WordCard, WordModal, DictionaryFilters
│   ├── explorer/               # AlbumDetail, SongDetailView, LyricsDisplay
│   ├── BrandLogo.tsx
│   ├── EraTimeline.tsx
│   ├── FavoriteButton.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── TopSongs.tsx
│   └── WordOfTheDay.tsx
├── lib/
│   ├── constants.ts            # Era metadata, colors, helpers
│   ├── queries.ts              # Supabase query functions
│   ├── types.ts                # Shared TypeScript types
│   └── supabase/               # Supabase client (browser, server, middleware)
└── middleware.ts                # Auth session refresh

pipeline/                       # Python data pipeline
├── albums.py                   # Album metadata
├── scrape_lyrics.py            # Lyrics scraper
├── extract_vocab.py            # GPT-powered vocab extraction
├── seed_db.py                  # Database seeder
└── data/                       # Raw lyrics + vocab JSON files

supabase/
└── schema.sql                  # Full database schema with RLS
```

## Contributing

Contributions are welcome! Check the [Contribute page](https://www.the-swift-dictionary.me/contribute) on the site for ways to help — suggest missing words, report issues, or open a PR.

## License

This is a personal fan project. Not affiliated with Taylor Swift or her management.

---

<p align="center">
  <sub>Built with ♡ for Swifties who love words</sub>
</p>

