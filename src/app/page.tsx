import WordOfTheDay from '@/components/WordOfTheDay';
import HeroSection from '@/components/HeroSection';
import TopSongs from '@/components/TopSongs';
import EraTimeline from '@/components/EraTimeline';
import { getWordOfTheDay, getTopSongs, getAlbums } from '@/lib/queries';

export default async function Home() {
  const [wotd, topSongs, albums] = await Promise.all([
    getWordOfTheDay(),
    getTopSongs(5),
    getAlbums(),
  ]);

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto gap-12 lg:gap-20">

      {/* Elegant Hero */}
      <div className="w-full relative">
        <HeroSection />
      </div>

      {/* The Scrapbook Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">

        {/* WOTD - Polaroid Card */}
        <div className="lg:col-span-5 flex items-center h-full">
          <WordOfTheDay data={wotd} />
        </div>

        {/* Top Songs - Diary Log */}
        <div className="lg:col-span-7 flex">
          <TopSongs songs={topSongs} />
        </div>
      </div>

      <div>
         <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]"></section>
      </div>
      
      {/* Era Timeline */}
      <EraTimeline albums={albums} />

      {/* Ornate End Mark */}
      <div className="w-full max-w-xs mx-auto divider-ornate">
        <span className="text-[var(--accent)] opacity-40">✧</span>
      </div>
      
      
    </div>
  );
}