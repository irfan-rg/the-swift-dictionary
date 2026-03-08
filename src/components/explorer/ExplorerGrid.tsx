"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import type { Album } from "@/lib/types";

function AlbumCard({ album, index }: { album: Album; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/explorer/${album.slug}`}
        className="block rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] overflow-hidden hover:shadow-[var(--shadow-soft)] hover:border-[var(--border-focus)] transition-all duration-300"
      >
        {/* Album Cover */}
        <div className="relative aspect-square w-full overflow-hidden">
          {album.cover_url ? (
            <Image
              src={album.cover_url}
              alt={`${album.title} album cover`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-[var(--surface)] flex items-center justify-center">
              <span className="font-display text-2xl text-[var(--foreground-muted)] opacity-40">{album.title}</span>
            </div>
          )}

          {/* Animated Video (plays on hover) */}
          {album.animated_cover_url && (
            <video
              ref={videoRef}
              src={album.animated_cover_url}
              muted
              loop
              playsInline
              preload="none"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovering ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-[var(--foreground)] tracking-tight mb-2 -mt-2">
            {album.title}
          </h3>
          <div className="flex items-center gap-2 font-body text-xs text-[var(--foreground-muted)] mb-3">
            <span>{album.year}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-50" />
            <span>{album.song_count} songs</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-focus)] opacity-50" />
            <span>{album.vocab_count} words</span>
          </div>

          <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed mb-4 line-clamp-2">
            {album.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] group-hover:text-[var(--accent)] transition-colors">
              View Album →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ExplorerGrid({ albums }: { albums: Album[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {albums.map((album, index) => (
        <AlbumCard key={album.slug} album={album} index={index} />
      ))}
    </motion.div>
  );
}
