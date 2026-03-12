"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import WordModal from "@/components/dictionary/WordModal";
import LyricsDisplay from "@/components/explorer/LyricsDisplay";
import { createClient } from "@/lib/supabase/client";
import type { SongDetail, Word, WordCardItem } from "@/lib/types";

function wordToCardItem(word: Word, song: SongDetail): WordCardItem {
  return {
    id: word.id,
    word: word.word,
    definition: word.definition,
    lyricSnippet: word.lyric_snippet,
    song: song.title,
    songSlug: song.slug,
    album: song.album_slug,
    difficulty: word.difficulty,
    context: word.context ?? undefined,
  };
}

export default function SongDetailView({ song }: { song: SongDetail }) {
  const [selectedWord, setSelectedWord] = useState<WordCardItem | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [favIds, setFavIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      supabase
        .from("favorites")
        .select("word_id")
        .eq("user_id", user.id)
        .then(({ data }) => {
          if (data) setFavIds(new Set(data.map((r: { word_id: string }) => r.word_id)));
        });
    });
  }, []);

  const handleFavToggle = useCallback((wordId: string, nowFavorited: boolean) => {
    setFavIds((prev) => {
      const next = new Set(prev);
      if (nowFavorited) next.add(wordId);
      else next.delete(wordId);
      return next;
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link
          href={`/explorer/${song.album_slug}`}
          className="inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--accent)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to {song.album_title}
        </Link>

        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-[var(--foreground)] mb-3">
          {song.title}
        </h1>
        <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
          <span className="font-body text-sm">{song.album_title}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)]" />
          <span className="font-body text-sm">Track {song.track_number}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)]" />
          <span className="font-body text-sm">{song.vocab_words.length} vocabulary words</span>
        </div>
        <div className="w-16 h-px bg-[var(--border-focus)] mt-6 opacity-50" />
      </div>

      {/* Spotify Embed */}
      {song.spotify_embed_url && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <iframe
            src={song.spotify_embed_url}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-sm border border-[var(--border)]"
            title={`Listen to ${song.title}`}
          />
        </motion.div>
      )}

      {/* Lyrics and Vocabulary Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lyrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[var(--surface-raised)] rounded-sm border border-[var(--border)] p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-1">
                Full Text
              </span>
              <h2 className="font-display text-2xl font-medium text-[var(--foreground)]">
                Lyrics
              </h2>
            </div>
          </div>

          {song.lyrics ? (
            <LyricsDisplay
              lyrics={song.lyrics}
              vocabWords={song.vocab_words}
              albumSlug={song.album_slug}
              onWordClick={(wordObj) => setSelectedWord(wordToCardItem(wordObj, song))}
            />
          ) : (
            <div className="font-body text-sm text-[var(--foreground)] leading-[2] whitespace-pre-line opacity-80">
              Lyrics not available yet.
            </div>
          )}
        </motion.div>

        {/* Vocabulary Words List */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="mb-4">
            <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-1">
              Discovered Words
            </span>
            <h3 className="font-display text-2xl font-medium text-[var(--foreground)]">
              Vocabulary
            </h3>
          </div>

          {song.vocab_words.length === 0 ? (
            <p className="font-body text-sm text-[var(--foreground-muted)] text-center py-12">
              No vocabulary words extracted for this song yet.
            </p>
          ) : (
            <div className="border-t border-[var(--border)]">
              {song.vocab_words.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="border-b border-[var(--border)] py-4 cursor-pointer hover:bg-[var(--surface-raised)] px-4 -mx-4 transition-colors group"
                  onClick={() => setSelectedWord(wordToCardItem(word, song))}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-display text-lg font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {word.word}
                    </h4>
                    <span className="font-handwriting text-sm text-[var(--foreground-muted)] opacity-50 shrink-0">
                      {word.difficulty}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed">
                    {word.definition}
                  </p>
                  {word.context && (
                    <p className="font-handwriting text-xs text-[var(--foreground-muted)] opacity-60 mt-1.5 italic">
                      {word.context}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Word Modal */}
      <WordModal
        open={!!selectedWord}
        onClose={() => setSelectedWord(null)}
        item={selectedWord}
        isFavorited={selectedWord ? favIds.has(selectedWord.id) : false}
        userId={userId}
        onFavToggle={handleFavToggle}
      />
    </div>
  );
}
