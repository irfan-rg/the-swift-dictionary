import WordOfTheDay from '@/components/WordOfTheDay';
import HeroSection from '@/components/HeroSection';
import TopSongs from '@/components/TopSongs';
import { getWordOfTheDay, getTopSongs } from '@/lib/queries';

export default async function Home() {
  const [wotd, topSongs] = await Promise.all([
    getWordOfTheDay(),
    getTopSongs(5),
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

      {/* Ornate End Mark */}
      <div className="w-full max-w-xs mx-auto my-10 divider-ornate">
        <span className="text-[var(--accent)] opacity-40">✧</span>
      </div>

    </div>
  );
}
