import type { Metadata } from "next";
import { getDictionaryWords } from "@/lib/queries";
import type { EraSlug, Difficulty } from "@/lib/types";
import DictionaryClient from "@/components/dictionary/DictionaryClient";

export const metadata: Metadata = {
  title: "Dictionary",
  description: "Search and filter vocabulary words discovered in Taylor Swift's lyrics. An interactive glossary for Swifties.",
  keywords: ["Taylor Swift dictionary", "lyrics search", "lyrical vocabulary", "Taylor Swift language"],
};

type DictionaryPageProps = {
  searchParams: Promise<{
    q?: string;
    album?: string;
    difficulty?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function DictionaryPage({ searchParams }: DictionaryPageProps) {
  const sp = await searchParams;
  const query = sp.q ?? "";
  const album = (sp.album ?? "all") as EraSlug | "all";
  const difficulty = (sp.difficulty ?? "all") as Difficulty | "all";
  const sort = (sp.sort ?? "az") as "relevance" | "az" | "za" | "difficulty";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const limit = 30;
  const offset = (page - 1) * limit;

  const { words, total } = await getDictionaryWords({
    query: query || undefined,
    album,
    difficulty,
    sort,
    limit,
    offset,
  });

  return (
    <DictionaryClient
      words={words}
      total={total}
      query={query}
      album={album}
      difficulty={difficulty}
      sort={sort}
      page={page}
      limit={limit}
    />
  );
}