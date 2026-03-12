"use client";

import { useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Props = {
  wordId: string;
  /** Whether this word is currently favorited */
  isFavorited: boolean;
  /** null = not signed in */
  userId: string | null;
  /** Optional callback after toggle */
  onToggle?: (wordId: string, nowFavorited: boolean) => void;
  /** Size variant */
  size?: "sm" | "md";
};

export default function FavoriteButton({
  wordId,
  isFavorited,
  userId,
  onToggle,
  size = "sm",
}: Props) {
  const [favorited, setFavorited] = useState(isFavorited);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const btnPadding = size === "sm" ? "p-1.5" : "p-2";

  const toggle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation(); // Don't trigger card click

      if (!userId) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        return;
      }

      if (loading) return;

      // Optimistic update
      setFavorited((prev) => !prev);
      setLoading(true);

      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wordId }),
        });

        if (!res.ok) {
          // Revert on error
          setFavorited((prev) => !prev);
          return;
        }

        const { favorited: nowFavorited } = await res.json();
        setFavorited(nowFavorited);
        onToggle?.(wordId, nowFavorited);
      } catch {
        // Revert on error
        setFavorited((prev) => !prev);
      } finally {
        setLoading(false);
      }
    },
    [userId, wordId, loading, onToggle]
  );

  return (
    <div className="relative">
      <button
        onClick={toggle}
        disabled={loading}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        className={`${btnPadding} rounded-full transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-60 ${
          favorited
            ? "text-red-500 hover:text-red-600"
            : "text-[var(--foreground-muted)] hover:text-red-400"
        }`}
      >
        <Heart
          className={`${iconSize} transition-all duration-200`}
          fill={favorited ? "currentColor" : "none"}
          strokeWidth={favorited ? 0 : 2}
        />
      </button>

      {/* Sign-in popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 w-56 rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] shadow-lg p-4"
          >
            <p className="font-body text-sm text-[var(--foreground-muted)] mb-3">
              Sign in to save your favorite words
            </p>
            <Link
              href="/auth/login"
              className="block w-full text-center px-3 py-2 rounded-sm bg-[var(--accent)] text-white font-body text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              Sign In
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
