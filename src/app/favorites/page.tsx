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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
          Favorites
        </h1>
        <div className="h-[2px] w-28 accent-gradient rounded-full opacity-80" />
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-3">
          {favorites.length} saved word{favorites.length !== 1 ? "s" : ""}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            You haven&apos;t saved any words yet.
          </p>
          <Link
            href="/dictionary"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-200"
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
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-playfair text-xl font-bold text-neutral-900 dark:text-white">
                    {word.word}
                  </h3>
                  <p
                    className="text-sm font-medium mt-1"
                    style={{ color: getEraColor(word.album_slug) }}
                  >
                    {word.song_title}
                  </p>
                </div>
                <Heart className="w-5 h-5 fill-current" style={{ color: "var(--accent)" }} />
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed line-clamp-2">
                {word.definition}
              </p>
              <Link
                href={`/explorer/${word.album_slug}/${word.song_slug}`}
                className="text-sm font-medium link-accent self-start"
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
