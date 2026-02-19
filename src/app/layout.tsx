import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Swift Dictionary",
    template: "%s | The Swift Dictionary",
  },
  description: "Discover Taylor Swift's sophisticated vocabulary through her lyrics.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://theswiftdictionary.com"),
  openGraph: {
    title: "The Swift Dictionary",
    description: "Discover Taylor Swift's sophisticated vocabulary through her lyrics.",
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
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 minimal-grid-bg`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Floating header appears after hero threshold via internal scroll logic */}
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
