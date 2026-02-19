import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSongBySlug } from "@/lib/queries";
import SongDetailView from "@/components/explorer/SongDetailView";

export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  const { album, song: songSlug } = await params;
  const song = await getSongBySlug(album, songSlug);
  if (!song) return { title: "Song Not Found" };
  return {
    title: `${song.title} — ${song.album_title}`,
    description: `${song.vocab_words.length} vocabulary words from "${song.title}" on ${song.album_title}.`,
  };
}

type SongPageProps = {
  params: Promise<{ album: string; song: string }>;
};

export default async function SongPage({ params }: SongPageProps) {
  const { album, song: songSlug } = await params;
  const songDetail = await getSongBySlug(album, songSlug);

  if (!songDetail) notFound();

  return <SongDetailView song={songDetail} />;
}
