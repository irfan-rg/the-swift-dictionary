import { NextResponse } from "next/server";
import { searchAll } from "@/lib/queries";
import { apiLimiter, getClientIp, checkRateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  // Rate limiting
  const ip = getClientIp(request);
  const { success, headers: rlHeaders } = await checkRateLimit(apiLimiter(), ip);
  if (!success) {
    return NextResponse.json(
      { results: [], error: "Too many requests" },
      { status: 429, headers: rlHeaders }
    );
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").slice(0, 100); // Cap length

  if (!q.trim()) {
    return NextResponse.json({ results: [] }, { headers: rlHeaders });
  }

  try {
    const results = await searchAll(q);
    return NextResponse.json({ results }, { headers: rlHeaders });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { results: [], error: "Search failed" },
      { status: 500, headers: rlHeaders }
    );
  }
}

