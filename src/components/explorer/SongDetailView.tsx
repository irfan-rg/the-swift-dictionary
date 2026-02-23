"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Music } from "lucide-react";
import WordModal from "@/components/dictionary/WordModal";
import { createClient } from "@/lib/supabase/client";
import type { SongDetail, Word, WordCardItem } from "@/lib/types";

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200",
};

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href={`/explorer/${song.album_slug}`}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </Link>
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              {song.title}
            </h1>
            <div className="h-[2px] w-28 accent-gradient rounded-full opacity-80 my-2" />
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              {song.album_title} &bull; Track {song.track_number}
            </p>
          </div>
        </div>
      </div>

      {/* Song Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur overflow-hidden mb-8"
      >
        <div className="flex-1 p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Music className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {song.vocab_words.length} vocabulary words
                  </span>
                </div>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
                Explore the sophisticated vocabulary Taylor uses in this song.
              </p>
            </div>
          </div>
        </div>

        {/* Spotify Embed */}
        {song.spotify_embed_url && (
          <div className="px-8 pb-6">
            <iframe
              src={song.spotify_embed_url}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
              title={`Listen to ${song.title}`}
            />
          </div>
        )}
      </motion.div>

      {/* Lyrics and Vocabulary Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lyrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-bold text-neutral-900 dark:text-white">
              Lyrics
            </h2>
          </div>

          <div className="text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-line text-lg">
            {song.lyrics ?? "Lyrics not available yet."}
          </div>
        </motion.div>

        {/* Vocabulary Words List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 flex flex-col"
        >
          <h3 className="font-playfair text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Vocabulary Words
          </h3>

          {song.vocab_words.length === 0 ? (
            <p className="text-neutral-500 dark:text-neutral-400 text-center py-12">
              No vocabulary words extracted for this song yet.
            </p>
          ) : (
            <div className="space-y-4 flex-1 overflow-y-auto min-h-0">
              {song.vocab_words.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => setSelectedWord(wordToCardItem(word, song))}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900 dark:text-white text-lg">
                      {word.word}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[word.difficulty]}`}
                    >
                      {word.difficulty}
                    </span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-2">
                    {word.definition}
                  </p>
                  {word.context && (
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs italic">
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
