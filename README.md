# 🎵 The Swift Dictionary

*A sophisticated vocabulary exploration tool inspired by Taylor Swift's lyrical genius*

Discover the beautiful, complex words hidden within Taylor Swift's discography. From *serendipitous* encounters to *ephemeral* moments, explore how Taylor's vocabulary enhances her storytelling across different eras.

## ✨ Features

- **📚 Interactive Dictionary**: Browse words with definitions, lyric snippets, and context
- **🎯 Word of the Day**: Daily featured vocabulary with detailed explanations
- **🎵 Era-Based Filtering**: Explore words by album/era (Debut through Midnights)
- **📊 Difficulty Levels**: Words categorized as Beginner, Intermediate, or Advanced
- **🔍 Smart Search**: Find words by definition, song, album, or difficulty
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🌙 Dark Mode**: Elegant dark theme support

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (configured)
- **Language**: TypeScript

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/irfan-rg/the-swift-dictionary
cd the-swift-dictionary
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── dictionary/          # Dictionary page
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── dictionary/          # Dictionary-specific components
│   │   ├── DictionaryFilters.tsx
│   │   ├── WordCard.tsx
│   │   └── WordModal.tsx
│   ├── HeroSection.tsx      # Landing hero
│   ├── WordOfTheDay.tsx    # Featured word component
│   ├── TopSongs.tsx        # Song recommendations
│   ├── Header.tsx          # Navigation
│   └── Footer.tsx          # Site footer
```

## 🎨 Design Philosophy

The Swift Dictionary embraces Taylor's aesthetic evolution through:
- **Era-specific color palettes** for each album
- **Elegant typography** with Playfair Display for headings
- **Smooth animations** that feel magical and refined
- **Glassmorphism effects** for a modern, sophisticated look
- **Responsive layouts** that work beautifully on all devices

## 📝 Current Status

This is a **temporary README** for development purposes. The project currently features:

- ✅ Homepage with hero section and era navigation
- ✅ Dictionary page with search and filtering
- ✅ Word cards with lyric snippets and definitions
- ✅ Word of the Day feature
- ✅ Responsive design with dark mode
- ✅ Mock data implementation

## 🔮 Future Enhancements

- [ ] Real database integration with Supabase
- [ ] User accounts and favorites
- [ ] Audio pronunciation features
- [ ] Quiz mode for vocabulary practice
- [ ] Social sharing of favorite words
- [ ] Advanced analytics and insights

## 🤝 Contributing

This is a personal project, but suggestions and feedback are always welcome!



---

