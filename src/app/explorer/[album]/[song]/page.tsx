"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Music, Play, ExternalLink, BookOpen, Volume2 } from "lucide-react";

// Mock song data - will be replaced with real API data
const songData: Record<string, Record<string, {
  title: string;
  album: string;
  year: string;
  lyrics: string;
  vocabWords: Array<{
    word: string;
    definition: string;
    context: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    positions: number[]; // Character positions in lyrics
  }>;
  preview?: string;
}>> = {
  folklore: {
    "cardigan": {
      title: "cardigan",
      album: "Folklore",
      year: "2020",
      lyrics: `Vintage tee, brand new phone
High heels on cobblestones
When you are young, they assume you know nothing
Sequin smile, black lipstick
Sensual politics
When you are young, they assume you know nothing

But I knew you
Dancin' in your Levi's
Drunk under a streetlight, I
I knew you
Hand under my sweatshirt
Baby, kiss it better, I
And when I felt like I was an old cardigan
Under someone's bed
You put me on and said I was your favorite

You drew stars around my scars
But now I'm bleedin'
'Cause I knew you
Steppin' on the last train
Marked me like a bloodstain, I
I knew you
Tried to change the ending
Peter losing Wendy, I
I knew you
Leavin' like a father
Running like water, I
And when you are young, they assume you know nothing

But I knew you'd linger like a tattoo kiss
I knew you'd haunt all of my what-ifs
The smell of smoke would hang around this long
'Cause I knew everything when I was young
I knew I'd curse you for the longest time
Chasin' shadows in the grocery line
I knew you'd miss me once the thrill expired
And you'd be standin' in my front porch light
And I knew you'd come back to me
You'd come back to me
And you'd come back to me
And you'd come back

And when I felt like I was an old cardigan
Under someone's bed
You put me on and said I was your favorite

To kiss in cars and downtown bars
Was all we needed
You drew stars around my scars
But now I'm bleedin'
'Cause I knew you'd linger like a tattoo kiss
I knew you'd haunt all of my what-ifs
The smell of smoke would hang around this long
'Cause I knew everything when I was young
I knew I'd curse you for the longest time
Chasin' shadows in the grocery line
I knew you'd miss me once the thrill expired
And you'd be standin' in my front porch light
And I knew you'd come back to me
You'd come back to me
And you'd come back to me
And you'd come back to me`,
      vocabWords: [
        {
          word: "cobblestones",
          definition: "Small stones used to pave streets, typically rounded",
          context: "Creates imagery of urban romance and youthful adventures",
          difficulty: "Intermediate",
          positions: [45, 200]
        },
        {
          word: "sensual",
          definition: "Relating to or involving gratification of the senses",
          context: "Describes the intimate, physical nature of young love",
          difficulty: "Advanced",
          positions: [78]
        },
        {
          word: "cardigan",
          definition: "A knitted sweater that opens at the front",
          context: "Metaphor for feeling discarded and forgotten, then cherished",
          difficulty: "Beginner",
          positions: [150, 400]
        },
        {
          word: "linger",
          definition: "Stay in a place longer than necessary",
          context: "Describes how memories and feelings persist",
          difficulty: "Intermediate",
          positions: [350]
        },
        {
          word: "haunt",
          definition: "To be persistently present in someone's mind",
          context: "How past relationships continue to affect present thoughts",
          difficulty: "Intermediate",
          positions: [360]
        },
        {
          word: "what-ifs",
          definition: "Speculations about what might have happened",
          context: "The endless questions about alternative outcomes",
          difficulty: "Beginner",
          positions: [365]
        },
        {
          word: "expired",
          definition: "No longer valid or in effect",
          context: "When the excitement and novelty of a relationship fades",
          difficulty: "Intermediate",
          positions: [420]
        }
      ],
      preview: "https://p.scdn.co/mp3-preview/sample.mp3"
    }
  },
  evermore: {
    "champagne-problems": {
      title: "champagne problems",
      album: "Evermore",
      year: "2020",
      lyrics: `You booked the night train for a reason
So you could sit there in this hurt
Bustling crowds or silent sleepers
You're not sure which is worse

Because I dropped your hand while dancing
Left you out there standing
Crestfallen on the landing
Champagne problems

Your mom's ring in your pocket
My picture in your wallet
Your heart was glass, I dropped it
Champagne problems

You told your family for a reason
You couldn't keep it in
Your sister splashed out on the bottle
Now no one's celebrating

Dom Pérignon, you brought it
No crowd of friends applauded
Your hometown skeptics called it
Champagne problems

Your Midas touch on the Chevy door
November flush and your flannel cure
This dorm was once a madhouse
I made a joke, "Well, it's made for me"
How evergreen, our group of friends
Don't think we'll say that word again
And soon they'll have the nerve to deck the halls
That we once walked through

One for the money, two for the show
I never was ready, so I watch you go
Sometimes you just don't know the answer
'Til someone's on their knees and asks you
"She would've made such a lovely bride
What a shame she's fucked in the head," they said
But you'll find the real thing instead
She'll patch up your tapestry that I shred
And hold your hand while dancing
Never leave you standing
Crestfallen on the landing
With champagne problems

Your Midas touch on the Chevy door
November flush and your flannel cure
This dorm was once a madhouse
I made a joke, "Well, it's made for me"
How evergreen, our group of friends
Don't think we'll say that word again
And soon they'll have the nerve to deck the halls
That we once walked through

One for the money, two for the show
I never was ready, so I watch you go
Sometimes you just don't know the answer
'Til someone's on their knees and asks you
"She would've made such a lovely bride
What a shame she's fucked in the head," they said
But you'll find the real thing instead
She'll patch up your tapestry that I shred
And hold your hand while dancing
Never leave you standing
Crestfallen on the landing
With champagne problems

This dorm was once a madhouse
I made a joke, "Well, it's made for me"
How evergreen, our group of friends
Don't think we'll say that word again
And soon they'll have the nerve to deck the halls
That we once walked through`,
      vocabWords: [
        {
          word: "crestfallen",
          definition: "Sad and disappointed",
          context: "Describes the devastation of a rejected proposal",
          difficulty: "Advanced",
          positions: [120, 450]
        },
        {
          word: "Midas touch",
          definition: "The ability to make everything one touches turn to gold",
          context: "Metaphor for someone who brings good fortune and success",
          difficulty: "Advanced",
          positions: [200, 350]
        },
        {
          word: "evergreen",
          definition: "Remaining fresh and relevant over time",
          context: "How friendships seem permanent until they're not",
          difficulty: "Intermediate",
          positions: [250, 400]
        },
        {
          word: "tapestry",
          definition: "A piece of thick textile fabric with pictures or designs",
          context: "Metaphor for the fabric of a relationship that gets torn apart",
          difficulty: "Advanced",
          positions: [420]
        },
        {
          word: "madhouse",
          definition: "A place of chaos and confusion",
          context: "Describes the chaotic nature of college life",
          difficulty: "Beginner",
          positions: [220, 370]
        }
      ]
    }
  }
};

const albumCovers = {
  folklore: "/covers/folklore.jpg",
  evermore: "/covers/evermore.jpg",
  midnights: "/covers/midnights.jpg"
};

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
};

type SongPageProps = {
  params: {
    album: string;
    song: string;
  };
};

export default function SongPage({ params }: SongPageProps) {
  const [selectedWord, setSelectedWord] = useState<typeof songData[string][string]["vocabWords"][0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const song = songData[params.album]?.[params.song];

  if (!song) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Song Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            The song you're looking for doesn't exist.
          </p>
          <Link
            href={`/explorer/${params.album}`}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Album</span>
          </Link>
        </div>
      </div>
    );
  }

  const renderLyricsWithVocab = () => {
    let result = song.lyrics;
    let offset = 0;

    // Sort vocab words by position (descending) to avoid position shifts
    const sortedWords = [...song.vocabWords].sort((a, b) => 
      Math.max(...b.positions) - Math.max(...a.positions)
    );

    sortedWords.forEach((vocabWord) => {
      vocabWord.positions.forEach((position) => {
        const adjustedPosition = position + offset;
        const before = result.substring(0, adjustedPosition);
        const word = result.substring(adjustedPosition, adjustedPosition + vocabWord.word.length);
        const after = result.substring(adjustedPosition + vocabWord.word.length);
        
        if (word.toLowerCase() === vocabWord.word.toLowerCase()) {
          result = before + 
            `<span class="vocab-word cursor-pointer underline decoration-dotted underline-offset-2 text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors" data-word="${vocabWord.word}">${word}</span>` + 
            after;
          offset += 100; // Account for added HTML
        }
      });
    });

    return result;
  };

  const handleVocabClick = (word: string) => {
    const vocabWord = song.vocabWords.find(w => w.word.toLowerCase() === word.toLowerCase());
    if (vocabWord) {
      setSelectedWord(vocabWord);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href={`/explorer/${params.album}`}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </Link>
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              {song.title}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">
              {song.album} • {song.year}
            </p>
          </div>
        </div>
        <div className="h-[2px] w-20 accent-gradient rounded-full opacity-80 hidden md:block" />
      </div>

      {/* Song Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 backdrop-blur overflow-hidden mb-8"
      >
        <div className="flex flex-col md:flex-row">
          {/* Album Cover */}
          <div className="md:w-64 h-48 md:h-auto">
            <img
              src={albumCovers[params.album as keyof typeof albumCovers]}
              alt={`${song.album} album cover`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="400" fill="#f3f4f6"/>
                    <text x="200" y="200" text-anchor="middle" dy=".3em" font-family="Arial" font-size="24" fill="#6b7280">${song.album}</text>
                  </svg>
                `)}`;
              }}
            />
          </div>
          
          {/* Song Info */}
          <div className="flex-1 p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <Music className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {song.vocabWords.length} vocabulary words
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Click highlighted words to learn
                    </span>
                  </div>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
                  Explore the sophisticated vocabulary Taylor uses in this song. Click on any highlighted word to see its definition and context.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {song.preview && (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-white/60 dark:bg-neutral-900/40 rounded-xl flex items-center justify-center backdrop-blur hover:bg-white/80 dark:hover:bg-neutral-800/60 transition-colors"
                  >
                    {isPlaying ? (
                      <div className="w-4 h-4 bg-neutral-700 dark:text-neutral-300" />
                    ) : (
                      <Play className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lyrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-playfair text-2xl font-bold text-neutral-900 dark:text-white">
            Lyrics
          </h2>
          <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Volume2 className="w-4 h-4" />
            <span>Click highlighted words</span>
          </div>
        </div>
        
        <div 
          className="text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-line text-lg"
          dangerouslySetInnerHTML={{ __html: renderLyricsWithVocab() }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('vocab-word')) {
              const word = target.getAttribute('data-word');
              if (word) {
                handleVocabClick(word);
              }
            }
          }}
        />
      </motion.div>

      {/* Vocabulary Words List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8"
      >
        <h3 className="font-playfair text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          Vocabulary Words
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {song.vocabWords.map((word, index) => (
            <motion.div
              key={word.word}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/60 dark:bg-neutral-900/40 backdrop-blur rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedWord(word)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-neutral-900 dark:text-white text-lg">
                  {word.word}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[word.difficulty]}`}>
                  {word.difficulty}
                </span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-2">
                {word.definition}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs italic">
                {word.context}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWord(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur shadow-xl max-h-[85vh] overflow-hidden pointer-events-auto">
                {/* Header */}
                <div className="relative p-6 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
                  <div className="relative z-10">
                    <button
                      aria-label="Close"
                      className="absolute top-3 right-3 p-2 rounded-full border border-neutral-300/70 dark:border-neutral-700/60 bg-white/70 dark:bg-neutral-900/70 text-neutral-700 dark:text-neutral-200 hover:bg-white/90 dark:hover:bg-neutral-800/80 focus:outline-none focus:ring-2 focus:ring-neutral-400/40"
                      onClick={() => setSelectedWord(null)}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mb-1 pr-10">
                      {selectedWord.word}
                    </h2>
                    <p className="text-gray-700 dark:text-neutral-300 text-sm pr-12">
                      From <span className="font-semibold capitalize">{song.album}</span> • <span className="font-semibold">{song.title}</span>
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Definition</h3>
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700">
                        {selectedWord.difficulty}
                      </span>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
                      {selectedWord.definition}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Context</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {selectedWord.context}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-neutral-50 dark:bg-neutral-800 px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
