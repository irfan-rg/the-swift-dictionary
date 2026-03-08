import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserFavorites } from "@/lib/queries";
import Link from "next/link";
import { Heart, BookOpen } from "lucide-react";
import { getEraColor } from "@/lib/constants";

export const metadata = {
  title: "Favorites | The Swift Dictionary",
  description: "Your saved vocabulary words",
};

export default async function FavoritesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/favorites");
  }

  const favorites = await getUserFavorites(user.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-2">
          Your Collection
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-[var(--foreground)] mb-4">
          Favorites
        </h1>
        <p className="font-body text-sm text-[var(--foreground-muted)]">
          {favorites.length} saved word{favorites.length !== 1 ? "s" : ""}
        </p>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-6 opacity-50" />
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-12 h-12 text-[var(--foreground-muted)] opacity-30 mx-auto mb-4" />
          <p className="font-body text-sm text-[var(--foreground-muted)] mb-6">
            You haven&apos;t saved any words yet.
          </p>
          <Link
            href="/dictionary"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-body text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Browse Dictionary
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((word) => (
            <div
              key={word.id}
              className="rounded-sm border border-[var(--border)] bg-[var(--surface-raised)] p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-medium text-[var(--foreground)]">
                    {word.word}
                  </h3>
                  <p
                    className="font-body text-xs font-medium mt-1"
                    style={{ color: getEraColor(word.album_slug) }}
                  >
                    {word.song_title}
                  </p>
                </div>
                <Heart className="w-5 h-5 fill-current text-[var(--accent)]" />
              </div>
              <p className="font-body text-sm text-[var(--foreground-muted)] leading-relaxed line-clamp-2">
                {word.definition}
              </p>
              <Link
                href={`/explorer/${word.album_slug}/${word.song_slug}`}
                className="font-body text-[10px] tracking-widest uppercase text-[var(--foreground-muted)] hover:text-[var(--accent)] self-start transition-colors"
              >
                View in song →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
