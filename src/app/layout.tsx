import type { Metadata } from "next";
import { Cormorant_Garamond, Nothing_You_Could_Do, Bricolage_Grotesque, Cinzel_Decorative } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 1. Classic Serif Display (Dictionary/Victorian feel)
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// 2. Romantic Handwriting (Taylor's Diary feel)
const nothingYouCouldDo = Nothing_You_Could_Do({
  variable: "--font-handwriting",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// 3. Clean, Soft UI/Body (Modern era feel)
const bricolage = Bricolage_Grotesque({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// 4. Epic Branding (Main Logo)
const cinzel = Cinzel_Decorative({
  variable: "--font-branding",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Swift Dictionary",
    template: "%s | The Swift Dictionary",
  },
  description: "Discover Taylor Swift's sophisticated vocabulary through her lyrics.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.the-swift-dictionary.me"),
  openGraph: {
    title: "The Swift Dictionary",
    description: "A curated scrapbook of Taylor Swift's lyrical vocabulary.",
    siteName: "The Swift Dictionary",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cormorant.variable} ${nothingYouCouldDo.variable} ${bricolage.variable} ${cinzel.variable} font-body antialiased selection:bg-[var(--accent)] selection:text-[var(--background)]`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen relative overflow-x-hidden">
            {/* Soft background glow decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px] pointer-events-none -z-10" />
            <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-muted)] opacity-[0.03] blur-[100px] pointer-events-none -z-10" />

            <Header />
            <main className="flex-1 w-full flex flex-col pt-8 pb-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
