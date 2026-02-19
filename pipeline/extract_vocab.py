#!/usr/bin/env python3
"""
Step 2 -- Extract vocabulary from lyrics using Groq (Llama 3.3 70B).

Reads lyrics JSON from  pipeline/data/lyrics/<slug>.json
Outputs vocab JSON to   pipeline/data/vocab/<slug>.json

Usage:
    python extract_vocab.py            # process all albums
    python extract_vocab.py folklore   # process one album
"""

import json
import os
import re
import sys
import time
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq

load_dotenv(".env.local")

# -- Config -------------------------------------------------------

GROQ_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_KEY:
    sys.exit("Error: GROQ_API_KEY not set in .env.local\n"
             "Get a free key at https://console.groq.com/keys")

client = Groq(api_key=GROQ_KEY)
MODEL = "llama-3.1-8b-instant"

LYRICS_DIR = Path(__file__).parent / "data" / "lyrics"
VOCAB_DIR = Path(__file__).parent / "data" / "vocab"
VOCAB_DIR.mkdir(parents=True, exist_ok=True)

# Groq free tier: 30 req/min -> 2s between calls is safe
REQUEST_DELAY = 2.5

# -- Prompt --------------------------------------------------------

SYSTEM_PROMPT = """You are a vocabulary expert analysing Taylor Swift lyrics.
For each song, extract 3-8 interesting, uncommon, or sophisticated vocabulary words.

Skip extremely common words (love, heart, night, etc.).
Focus on words that could genuinely teach someone new vocabulary.

For each word return a JSON object with these exact keys:
- "word": the vocabulary word (lowercase)
- "definition": a clear, concise definition (1-2 sentences)
- "lyric_snippet": the exact short lyric line containing the word (max ~15 words)
- "context": a note on how Taylor uses this word in the song's narrative (1-2 sentences)
- "difficulty": one of "Beginner", "Intermediate", or "Advanced"

Return ONLY a valid JSON object like {"words": [...]} containing the array. No markdown fences, no commentary."""


def extract_vocab_for_song(song_title: str, album_title: str, lyrics: str) -> list[dict] | None:
    """Send lyrics to Groq and parse vocab JSON back. Returns None if rate-limited."""
    user_msg = f'Song: "{song_title}" from the album "{album_title}"\n\nLyrics:\n{lyrics[:6000]}'

    max_retries = 4
    for attempt in range(max_retries):
        try:
            resp = client.chat.completions.create(
                model=MODEL,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_msg},
                ],
                temperature=0.3,
                max_completion_tokens=2000,
                response_format={"type": "json_object"},
            )

            raw = resp.choices[0].message.content or "{}"
            parsed = json.loads(raw)

            # Handle both {"words": [...]} and [...] formats
            if isinstance(parsed, dict):
                parsed = parsed.get("words", parsed.get("vocabulary", []))
            if not isinstance(parsed, list):
                print(f"    [warn] Unexpected response format for {song_title}")
                return []
            return parsed

        except KeyboardInterrupt:
            print("\n    [interrupted] Stopping...")
            return None
        except Exception as e:
            err_str = str(e)
            if "429" in err_str or "rate" in err_str.lower():
                # Check if it's a daily limit (tokens per day)
                if "per day" in err_str.lower() or "tpd" in err_str.lower():
                    print(f"\n    [daily-limit] Daily token quota exhausted.")
                    return None  # Signal caller to stop entirely
                wait = 20 * (attempt + 1)
                print(f"\n    [rate-limit] Waiting {wait}s (attempt {attempt+1}/{max_retries})...")
                try:
                    time.sleep(wait)
                except KeyboardInterrupt:
                    print("\n    [interrupted] Stopping...")
                    return None
                continue
            print(f"    [error] Error processing {song_title}: {e}")
            return []

    print(f"    [error] Failed after {max_retries} retries for {song_title}")
    return None  # None = rate-limited, [] = real error


def process_album(album_path: Path, out_path: Path) -> dict:
    """Process all songs in one album's lyrics JSON. Supports resuming."""
    with open(album_path, "r", encoding="utf-8") as f:
        album_data = json.load(f)

    slug = album_data["slug"]
    title = album_data["title"]

    # Load existing partial results to resume from
    existing_vocab = {}
    if out_path.exists():
        with open(out_path, "r", encoding="utf-8") as f:
            prev = json.load(f)
        for s in prev.get("songs", []):
            if len(s.get("vocab", [])) > 0:
                existing_vocab[s["title"]] = s["vocab"]
        if existing_vocab:
            print(f"  [resume] Found {len(existing_vocab)} songs already done, skipping them")

    songs_out = []
    hit_limit = False

    for song in album_data["songs"]:
        if not song.get("lyrics"):
            print(f"  [skip] {song['title']} -- no lyrics, skipping")
            songs_out.append({**song, "vocab": []})
            continue

        # Re-use existing vocab if already extracted
        if song["title"] in existing_vocab:
            print(f"  [cached] {song['title']} -- {len(existing_vocab[song['title']])} words")
            songs_out.append({
                "track_number": song["track_number"],
                "title": song["title"],
                "slug": song["slug"],
                "lyrics": song["lyrics"],
                "genius_url": song.get("genius_url"),
                "vocab": existing_vocab[song["title"]],
            })
            continue

        if hit_limit:
            # Already hit limit this run, skip remaining songs (will resume later)
            songs_out.append({
                "track_number": song["track_number"],
                "title": song["title"],
                "slug": song["slug"],
                "lyrics": song["lyrics"],
                "genius_url": song.get("genius_url"),
                "vocab": [],
            })
            continue

        print(f"  >> {song['title']} ... ", end="", flush=True)
        vocab = extract_vocab_for_song(song["title"], title, song["lyrics"])

        if vocab is None:
            # None signals a rate limit was hit
            hit_limit = True
            print("RATE LIMITED - will resume later")
            songs_out.append({
                "track_number": song["track_number"],
                "title": song["title"],
                "slug": song["slug"],
                "lyrics": song["lyrics"],
                "genius_url": song.get("genius_url"),
                "vocab": [],
            })
            continue

        print(f"{len(vocab)} words found")

        songs_out.append({
            "track_number": song["track_number"],
            "title": song["title"],
            "slug": song["slug"],
            "lyrics": song["lyrics"],
            "genius_url": song.get("genius_url"),
            "vocab": vocab,
        })

        # Respect Groq free-tier rate limit (30 req/min)
        time.sleep(REQUEST_DELAY)

    return {
        "slug": slug,
        "title": title,
        "year": album_data["year"],
        "description": album_data["description"],
        "songs": songs_out,
    }


def main():
    # Gather album files to process
    if len(sys.argv) > 1:
        slug_filter = sys.argv[1].lower()
        paths = [LYRICS_DIR / f"{slug_filter}.json"]
        if not paths[0].exists():
            sys.exit(f"Lyrics file not found: {paths[0]}")
    else:
        paths = sorted(LYRICS_DIR.glob("*.json"))

    if not paths:
        sys.exit("No lyrics files found. Run scrape_lyrics.py first.")

    for lyrics_path in paths:
        slug = lyrics_path.stem
        out_path = VOCAB_DIR / f"{slug}.json"

        # Check if already fully done (all songs have vocab)
        if out_path.exists():
            with open(out_path, "r", encoding="utf-8") as f:
                prev = json.load(f)
            songs_with_lyrics = [s for s in prev["songs"] if s.get("lyrics")]
            songs_with_vocab = [s for s in songs_with_lyrics if len(s.get("vocab", [])) > 0]
            if len(songs_with_vocab) == len(songs_with_lyrics):
                print(f"[skip] {slug} -- fully done ({len(songs_with_vocab)} songs)")
                continue
            else:
                print(f"\n[resume] {slug}: {len(songs_with_vocab)}/{len(songs_with_lyrics)} songs done")
        else:
            print(f"\n[extract] Extracting vocab: {slug}")

        result = process_album(lyrics_path, out_path)

        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        # Summary
        total_words = sum(len(s["vocab"]) for s in result["songs"])
        songs_done = sum(1 for s in result["songs"] if len(s.get("vocab", [])) > 0)
        songs_total = sum(1 for s in result["songs"] if s.get("lyrics"))
        status = "done" if songs_done == songs_total else "partial"
        print(f"[{status}] {slug}: {songs_done}/{songs_total} songs, {total_words} vocab words -> {out_path}")

        if songs_done < songs_total:
            print(f"\n[!] Rate limit hit. Re-run the script later to continue.")
            break

    # Write a summary CSV for manual review
    print("\n[summary] Writing review summary...")
    summary_path = VOCAB_DIR / "_review_summary.csv"
    with open(summary_path, "w", encoding="utf-8") as f:
        f.write("album,song,word,difficulty,definition\n")
        for vp in sorted(VOCAB_DIR.glob("*.json")):
            if vp.name.startswith("_"):
                continue
            with open(vp, "r", encoding="utf-8") as vf:
                data = json.load(vf)
            for song in data["songs"]:
                for w in song.get("vocab", []):
                    # Escape CSV fields
                    def_escaped = w.get("definition", "").replace('"', '""')
                    f.write(f'{data["slug"]},{song["title"]},"{w["word"]}",{w.get("difficulty","")},"{def_escaped}"\n')

    print(f"Review file -> {summary_path}")
    print("\nDone! Check the summary CSV, then run seed_db.py to push to Supabase.")


if __name__ == "__main__":
    main()
