import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlbumBySlug, getSongsByAlbum } from "@/lib/queries";
import AlbumDetail from "@/components/explorer/AlbumDetail";

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const { album: slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) return { title: "Album Not Found" };
  return {
    title: album.title,
    description: `Explore vocabulary from Taylor Swift's ${album.title} (${album.year}) — ${album.song_count} songs, ${album.vocab_count} words.`,
    openGraph: {
      title: `${album.title} — The Swift Dictionary`,
      description: album.description,
      ...(album.cover_url ? { images: [album.cover_url] } : {}),
    },
  };
}

type AlbumPageProps = {
  params: Promise<{ album: string }>;
};

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { album: albumSlug } = await params;
  const album = await getAlbumBySlug(albumSlug);

  if (!album) notFound();

  const songs = await getSongsByAlbum(album.id);

  return <AlbumDetail album={album} songs={songs} />;
}
