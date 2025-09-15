import Link from 'next/link';
import { Heart, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-100 to-purple-100 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎵</span>
              </div>
              <span className="font-playfair text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                The Swift Dictionary
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Discover Taylor Swift's sophisticated vocabulary through her lyrics. 
              A fan-made educational project celebrating the artistry of her words.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dictionary" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Word Dictionary
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Song Explorer
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-pink-600 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Albums */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Albums</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explorer?album=folklore" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Folklore
                </Link>
              </li>
              <li>
                <Link href="/explorer?album=evermore" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Evermore
                </Link>
              </li>
              <li>
                <Link href="/explorer?album=midnights" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Midnights
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-gray-600 hover:text-pink-600 transition-colors">
                  View All
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            Made with <Heart className="inline w-4 h-4 text-pink-500" /> by Swifties, for Swifties
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            © 2024 The Swift Dictionary. Fan-made project, not affiliated with Taylor Swift.
          </p>
        </div>
      </div>
    </footer>
  );
}

