#!/usr/bin/env python3
"""
Step 3 — Seed Supabase with processed album/song/vocab data.

Reads from  pipeline/data/vocab/<slug>.json
Upserts into albums → songs → words tables.
Also generates a word_of_the_day schedule.

Usage:
    python seed_db.py            # seed everything
    python seed_db.py folklore   # seed one album
"""

import json
import os
import sys
from datetime import date, timedelta
from pathlib import Path
import random

from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv(".env.local")

# ── Config ──────────────────────────────────────────────────────

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    sys.exit("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

VOCAB_DIR = Path(__file__).parent / "data" / "vocab"


def upsert_album(album_data: dict) -> str:
    """Upsert album row, return its UUID."""
    total_vocab = sum(len(s.get("vocab", [])) for s in album_data["songs"])
    row = {
        "slug": album_data["slug"],
        "title": album_data["title"],
        "year": album_data["year"],
        "description": album_data.get("description", ""),
        "song_count": len(album_data["songs"]),
        "vocab_count": total_vocab,
    }

    result = supabase.table("albums").upsert(row, on_conflict="slug").execute()
    album_id = result.data[0]["id"]
    print(f"  Album: {row['title']} → {album_id}")
    return album_id


def determine_difficulty(vocab_list: list[dict]) -> str:
    """Determine overall song difficulty from its vocab words."""
    if not vocab_list:
        return "Beginner"
    levels = [v.get("difficulty", "Intermediate") for v in vocab_list]
    # Most common difficulty
    from collections import Counter
    most_common = Counter(levels).most_common(1)[0][0]
    return most_common


def upsert_song(album_id: str, song_data: dict) -> str:
    """Upsert song row, return its UUID."""
    vocab = song_data.get("vocab", [])
    row = {
        "album_id": album_id,
        "slug": song_data["slug"],
        "title": song_data["title"],
        "track_number": song_data.get("track_number", 1),
        "lyrics": song_data.get("lyrics"),
        "vocab_count": len(vocab),
        "difficulty": determine_difficulty(vocab),
    }

    result = (
        supabase.table("songs")
        .upsert(row, on_conflict="album_id,slug")
        .execute()
    )
    song_id = result.data[0]["id"]
    return song_id


def upsert_words(album_id: str, song_id: str, vocab: list[dict], lyrics: str | None):
    """Insert vocab words for a song."""
    if not vocab:
        return

    rows = []
    for v in vocab:
        # Try to find character position of the word in the lyrics
        positions = []
        if lyrics:
            word_lower = v["word"].lower()
            text_lower = lyrics.lower()
            start = 0
            while True:
                idx = text_lower.find(word_lower, start)
                if idx == -1:
                    break
                positions.append(idx)
                start = idx + 1

        rows.append({
            "word": v["word"],
            "definition": v.get("definition", ""),
            "song_id": song_id,
            "album_id": album_id,
            "lyric_snippet": v.get("lyric_snippet", ""),
            "context": v.get("context"),
            "difficulty": v.get("difficulty", "Intermediate"),
            "positions": positions,
        })

    supabase.table("words").upsert(rows).execute()


def seed_album(vocab_path: Path):
    """Seed one album from its vocab JSON file."""
    with open(vocab_path, "r", encoding="utf-8") as f:
        album_data = json.load(f)

    slug = album_data["slug"]
    print(f"\n[seed] Seeding: {album_data['title']} ({slug})")

    album_id = upsert_album(album_data)

    word_count = 0
    for song in album_data["songs"]:
        song_id = upsert_song(album_id, song)
        vocab = song.get("vocab", [])
        upsert_words(album_id, song_id, vocab, song.get("lyrics"))
        word_count += len(vocab)
        print(f"    {song['title']}: {len(vocab)} words")

    print(f"  [done] {slug}: {len(album_data['songs'])} songs, {word_count} vocab words")


def schedule_word_of_the_day(days: int = 90):
    """Pick random words and schedule them as Word of the Day."""
    print(f"\n[schedule] Scheduling Word of the Day for {days} days...")

    # Get all word IDs
    result = supabase.table("words").select("id").execute()
    all_ids = [r["id"] for r in result.data]

    if not all_ids:
        print("  [warn] No words in database, skipping WotD scheduling")
        return

    # Shuffle and cycle through
    random.shuffle(all_ids)
    today = date.today()

    rows = []
    for i in range(days):
        word_id = all_ids[i % len(all_ids)]
        featured = today + timedelta(days=i)
        rows.append({
            "word_id": word_id,
            "featured_date": featured.isoformat(),
        })

    # Upsert (on conflict = featured_date)
    supabase.table("word_of_the_day").upsert(
        rows, on_conflict="featured_date"
    ).execute()

    print(f"  [done] Scheduled {days} days of Word of the Day")


def main():
    # Gather vocab files
    if len(sys.argv) > 1:
        slug_filter = sys.argv[1].lower()
        paths = [VOCAB_DIR / f"{slug_filter}.json"]
        if not paths[0].exists():
            sys.exit(f"Vocab file not found: {paths[0]}. Run extract_vocab.py first.")
    else:
        paths = sorted(VOCAB_DIR.glob("*.json"))
        paths = [p for p in paths if not p.name.startswith("_")]

    if not paths:
        sys.exit("No vocab files found. Run extract_vocab.py first.")

    for vocab_path in paths:
        seed_album(vocab_path)

    # Schedule Word of the Day
    schedule_word_of_the_day()

    print("\n[success] Database seeded successfully!")
    print("You can now start the Next.js app and see real data.")


if __name__ == "__main__":
    main()
