import type { Metadata } from "next";
import { getAlbums } from "@/lib/queries";
import ExplorerGrid from "@/components/explorer/ExplorerGrid";
import { Album } from "@/lib/types";

export const metadata: Metadata = {
  title: "Explorer",
  description: "Browse all 12 Taylor Swift eras and discover vocabulary from every album. Explore the lyrics of Fearless, 1989, Folklore, and more.",
  keywords: ["Taylor Swift eras", "lyrics by album", "Taylor Swift discography", "Swiftie vocabulary"],
};

export default async function ExplorerPage() {
  let album: Album[] = [];

  try {
    album = await getAlbums();
  } catch (error) {
    console.error("Error fetching albums:", error);
    album = [];
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 max-md:py-14">
      {/* Page Header */}
      <div className="mb-12 max-md:mb-6 text-center">
        <span className="font-body text-[10px] tracking-widest uppercase text-[var(--accent)] block mb-2">
          The Eras Collection
        </span>
        <h1 className="font-display text-5xl md:text-6xl max-md:text-4xl font-medium tracking-tight text-[var(--foreground)] mb-4 max-md:mb-2">
          Explorer
        </h1>
        <p className="font-body text-sm text-[var(--foreground-muted)] max-w-md mx-auto">
          Browse every era, discover the vocabulary woven through her discography.
        </p>
        <div className="w-16 h-px bg-[var(--border-focus)] mx-auto mt-6 opacity-50" />
      </div>

      {/* Albums Grid */}
      {album.length > 0 ? (
        <ExplorerGrid albums={album} />
      ) : (
        <div className="text-center py-12">
          <p className="font-body text-sm text-[var(--foreground-muted)]">No albums found. Please check your database connection.</p>
        </div>
      )}
    </div>
  );
}
