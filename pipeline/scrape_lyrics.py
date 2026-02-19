#!/usr/bin/env python3
"""
Step 1 — Scrape lyrics from Genius for every Taylor Swift song.

Outputs one JSON file per album into  pipeline/data/lyrics/<slug>.json

Usage:
    python scrape_lyrics.py            # scrape all albums
    python scrape_lyrics.py folklore   # scrape one album
"""

import json
import os
import re
import sys
import time
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(".env.local")

import lyricsgenius

from albums import ALBUMS

# ── Config ──────────────────────────────────────────────────────

GENIUS_TOKEN = os.getenv("GENIUS_ACCESS_TOKEN")
if not GENIUS_TOKEN:
    sys.exit("Error: GENIUS_ACCESS_TOKEN not set in .env")

OUT_DIR = Path(__file__).parent / "data" / "lyrics"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ── Genius client ───────────────────────────────────────────────

genius = lyricsgenius.Genius(
    GENIUS_TOKEN,
    timeout=15,
    retries=3,
    remove_section_headers=True,  # strip [Verse], [Chorus], etc.
    skip_non_songs=True,
    excluded_terms=["(Remix)", "(Live)", "(Demo)"],
    verbose=False,
)


def slugify(text: str) -> str:
    """Convert a song title to a URL-safe slug."""
    text = text.lower().strip()
    text = re.sub(r"['']+", "", text)           # remove apostrophes
    text = re.sub(r"[^a-z0-9]+", "-", text)     # non-alphanum → dash
    text = text.strip("-")
    return text


def clean_lyrics(raw: str) -> str:
    """Remove Genius junk (contributor notes, embed text, etc.)."""
    # Remove "XXXContributors..." header Genius sometimes prepends
    raw = re.sub(r"^\d*Contributors.*?\n", "", raw, count=1)
    # Remove trailing "Embed" or "XXEmbed"
    raw = re.sub(r"\d*Embed$", "", raw).rstrip()
    # Collapse triple+ newlines to double
    raw = re.sub(r"\n{3,}", "\n\n", raw)
    return raw.strip()


def scrape_album(album_meta: dict) -> dict:
    """Fetch lyrics for every song in an album, return structured dict."""
    title = album_meta["title"]
    songs_out = []

    for idx, song_title in enumerate(album_meta["songs"], start=1):
        print(f"  [{idx}/{len(album_meta['songs'])}] {song_title} ... ", end="", flush=True)

        song = genius.search_song(song_title, "Taylor Swift")
        if song is None:
            print("NOT FOUND")
            songs_out.append({
                "track_number": idx,
                "title": song_title,
                "slug": slugify(song_title),
                "lyrics": None,
                "genius_url": None,
            })
            continue

        lyrics = clean_lyrics(song.lyrics) if song.lyrics else None
        print(f"OK ({len(lyrics or '')} chars)")

        songs_out.append({
            "track_number": idx,
            "title": song_title,
            "slug": slugify(song_title),
            "lyrics": lyrics,
            "genius_url": song.url,
        })

        # Be respectful to the API
        time.sleep(1.5)

    return {
        "slug": album_meta["slug"],
        "title": album_meta["title"],
        "year": album_meta["year"],
        "description": album_meta["description"],
        "songs": songs_out,
    }


def main():
    # Optional: filter to a single album via CLI arg
    targets = ALBUMS
    if len(sys.argv) > 1:
        slug_filter = sys.argv[1].lower()
        targets = [a for a in ALBUMS if a["slug"] == slug_filter]
        if not targets:
            sys.exit(f"Unknown album slug: {slug_filter}")

    for album_meta in targets:
        slug = album_meta["slug"]
        out_path = OUT_DIR / f"{slug}.json"

        # Skip if already scraped (delete file to re-scrape)
        if out_path.exists():
            print(f"[skip] {slug} -- already scraped ({out_path})")
            continue

        print(f"\n[scrape] Scraping: {album_meta['title']} ({slug})")
        result = scrape_album(album_meta)

        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        print(f"[done] Saved -> {out_path}")

    print("\nDone! Lyrics saved to pipeline/data/lyrics/")


if __name__ == "__main__":
    main()
