import WordOfTheDay from '@/components/WordOfTheDay';
import HeroSection from '@/components/HeroSection';
import TopSongs from '@/components/TopSongs';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Word of the Day */}
          <div className="lg:col-span-1">
            <WordOfTheDay />
          </div>
          
          {/* Top Songs */}
          <div className="lg:col-span-2">
            <TopSongs />
          </div>
        </div>
      </div>
    </div>
  );
}
