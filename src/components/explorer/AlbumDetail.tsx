"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Music } from "lucide-react";
import type { Album, Song } from "@/lib/types";

export default function AlbumDetail({
  album,
  songs,
}: {
  album: Album;
  songs: Song[];
}) {
  const totalVocab = songs.reduce((sum, s) => sum + s.vocab_count, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 max-md:py-10">
      {/* Header */}
      <div className="mb-12 max-md:mb-6">
        <Link
          href="/explorer"
          className="max-md:hidden inline-flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--accent)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Explorer
        </Link>

        <h1 className="font-display text-5xl md:text-6xl max-md:text-4xl font-medium tracking-tight text-[var(--foreground)] mb-3 max-md:mb-2">
          {album.title}
        </h1>
        <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
          <span className="font-body text-sm">{album.year}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)]" />
          <span className="font-body text-sm">{songs.length} songs</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-focus)]" />
          <span className="font-body text-sm">{totalVocab} vocab words</span>
        </div>
        <div className="w-16 h-px bg-[var(--border-focus)] mt-6 opacity-50" />
      </div>

      {/* Album Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] overflow-hidden mb-12 max-md:mb-8"
      >
        <div className="flex flex-col md:flex-row">
          {/* Album Cover */}
          <div className="md:w-64 max-md:aspect-square md:h-auto relative shrink-0 overflow-hidden max-md:border-b border-[var(--border)]">
            {album.animated_cover_url ? (
              <video
                src={album.animated_cover_url}
                autoPlay
                muted
                loop
                playsInline
                poster={album.cover_url || undefined}
                className="w-full h-full object-cover"
              />
            ) : album.cover_url ? (
              <Image
                src={album.cover_url}
                alt={`${album.title} album cover`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            ) : (
              <div className="w-full h-full bg-[var(--surface)] flex items-center justify-center">
                <span className="font-display text-2xl text-[var(--foreground-muted)] opacity-40">{album.title}</span>
              </div>
            )}
          </div>

          {/* Album Info */}
          <div className="flex-1 p-8 max-md:p-5">
            <p className="font-body text-base text-[var(--foreground-muted)] max-md:text-sm leading-relaxed">
              {album.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Songs List */}
      <div className="mb-4">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)]">
          Tracklist
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-t border-[var(--border)]"
      >
        {songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
          >
            <Link
              href={`/explorer/${album.slug}/${song.slug}`}
              className="group flex items-center gap-5 max-md:gap-3 py-4 max-md:py-3 border-b border-[var(--border)] hover:bg-[var(--surface-raised)] px-4 -mx-4 transition-colors"
            >
              {/* Track Number */}
              <span className="font-display italic text-xl text-[var(--border-focus)] w-6 text-right shrink-0 opacity-60 group-hover:text-[var(--accent)] transition-colors">
                {song.track_number}
              </span>

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-medium text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] truncate transition-colors">
                  {song.title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Music className="w-3 h-3 text-[var(--foreground-muted)] opacity-50" />
                  <span className="font-body text-xs text-[var(--foreground-muted)]">
                    {song.vocab_count} vocab words
                  </span>
                </div>
              </div>

              {/* Difficulty */}
              <span className="font-handwriting text-sm text-[var(--foreground-muted)] opacity-50 shrink-0 hidden sm:block group-hover:opacity-80 transition-opacity">
                {song.difficulty}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
