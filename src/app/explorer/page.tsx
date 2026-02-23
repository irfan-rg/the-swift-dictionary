import type { Metadata } from "next";
import { getAlbums } from "@/lib/queries";
import ExplorerGrid from "@/components/explorer/ExplorerGrid";

export const metadata: Metadata = {
  title: "Explorer",
  description: "Browse all 10 Taylor Swift albums and discover vocabulary from every era.",
};

export default async function ExplorerPage() {
  let albums;
  
  try {
    albums = await getAlbums();
  } catch (error) {
    console.error("Error fetching albums:", error);
    albums = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
          Explorer
        </h1>
        <div className="h-[2px] w-28 accent-gradient rounded-full opacity-80" />
      </div>

      {/* Albums Grid */}
      {albums.length > 0 ? (
        <ExplorerGrid albums={albums} />
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">No albums found. Please check your database connection.</p>
        </div>
      )}
    </div>
  );
}
