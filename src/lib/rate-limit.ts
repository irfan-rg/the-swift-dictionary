// ────────────────────────────────────────────────────────────────
// Rate limiting with Upstash Redis
// ────────────────────────────────────────────────────────────────

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Lazy-init: only create if env vars are present
let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn("[rate-limit] UPSTASH_REDIS_REST_URL or TOKEN not set — rate limiting disabled.");
    return null;
  }

  redis = new Redis({ url, token });
  return redis;
}

// ── Pre-configured limiters ────────────────────────────────────

/** Tight limit for auth endpoints: 5 requests per 60 seconds */
export function authLimiter() {
  const r = getRedis();
  if (!r) return null;
  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    prefix: "rl:auth",
  });
}

/** Standard limit for public APIs: 20 requests per 60 seconds */
export function apiLimiter() {
  const r = getRedis();
  if (!r) return null;
  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(20, "60 s"),
    prefix: "rl:api",
  });
}

/** Generous limit for authenticated mutations: 30 requests per 60 seconds */
export function mutationLimiter() {
  const r = getRedis();
  if (!r) return null;
  return new Ratelimit({
    redis: r,
    limiter: Ratelimit.slidingWindow(30, "60 s"),
    prefix: "rl:mutation",
  });
}

// ── Helper to get client IP ────────────────────────────────────

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

// ── Rate-limit check helper ────────────────────────────────────

export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; headers: Record<string, string> }> {
  if (!limiter) {
    return { success: true, headers: {} };
  }

  const result = await limiter.limit(identifier);

  const headers: Record<string, string> = {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.reset.toString(),
  };

  return { success: result.success, headers };
}
