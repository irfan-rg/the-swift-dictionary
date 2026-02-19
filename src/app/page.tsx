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
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Word of the Day */}
          <div className="lg:col-span-1 h-full">
            <WordOfTheDay data={wotd} />
          </div>
          
          {/* Top Songs */}
          <div className="lg:col-span-2 h-full">
            <TopSongs songs={topSongs} />
          </div>
        </div>
      </div>
    </div>
  );
}
