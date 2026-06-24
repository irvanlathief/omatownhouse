// Lightweight, dependency-free rate limiting for the public AI chat endpoint.
//
// IMPORTANT: this is an in-memory, per-instance limiter. On Vercel each warm
// serverless instance keeps its own counters, so this is best-effort defense
// against a single client hammering the endpoint, not a global guarantee. For
// hard, cross-instance limits you need a shared store (e.g. Upstash/Redis).
// It still meaningfully caps cost/abuse from a single source and bounds total
// throughput per instance.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

export interface RateLimitResult {
  ok: boolean;
  retryAfterSec: number;
}

// Fixed-window limiter. Returns ok=false once `limit` is exceeded within
// `windowMs`, with the seconds until the window resets.
export function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();

  // Occasionally drop expired buckets so the map cannot grow unbounded.
  if (now - lastSweep > 60_000) {
    buckets.forEach((b, k) => {
      if (b.resetAt <= now) buckets.delete(k);
    });
    lastSweep = now;
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, retryAfterSec: 0 };
  }

  if (bucket.count >= opts.limit) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count++;
  return { ok: true, retryAfterSec: 0 };
}

// Best-effort client IP from an Express request, honouring the proxy header
// Vercel sets (x-forwarded-for).
export function getClientIp(req: unknown): string {
  const r = req as { headers?: Record<string, unknown>; ip?: string; socket?: { remoteAddress?: string } };
  const xff = r?.headers?.["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0]!.trim();
  }
  return r?.ip || r?.socket?.remoteAddress || "unknown";
}
