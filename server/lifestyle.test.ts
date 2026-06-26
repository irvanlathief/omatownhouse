import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { LIFESTYLE_ARTICLES } from "./content/lifestyleArticles";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("lifestyle.list", () => {
  it("returns an array of articles", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const articles = await caller.lifestyle.list();

    expect(Array.isArray(articles)).toBe(true);
  });

  it("articles have required fields when available", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const articles = await caller.lifestyle.list();

    if (articles.length > 0) {
      const article = articles[0];
      expect(article).toHaveProperty("id");
      expect(article).toHaveProperty("slug");
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("content");
      expect(article).toHaveProperty("category");
      expect(article.content).toHaveProperty("body");
      expect(typeof article.content.body).toBe("string");
    }
  });

  it("articles are sorted by sortOrder", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const articles = await caller.lifestyle.list();

    if (articles.length > 1) {
      for (let i = 1; i < articles.length; i++) {
        expect(articles[i].sortOrder).toBeGreaterThanOrEqual(articles[i - 1].sortOrder);
      }
    }
  });
});

// Guards the daily content routine: every post must carry its own distinct,
// locally-committed imagery instead of recycling the shared pool (which made all
// the investment posts look identical). The cron's QUALITY_CHECKLIST relies on
// these passing before a PR can merge.
describe("blog image distinctness", () => {
  // Every locally-hosted /blog/ image a single article references (hero + gallery).
  function localImages(a: (typeof LIFESTYLE_ARTICLES)[number]): string[] {
    const imgs: string[] = [];
    if (a.imageUrl?.startsWith("/blog/")) imgs.push(a.imageUrl);
    if (a.heroImage?.startsWith("/blog/")) imgs.push(a.heroImage);
    for (const g of a.gallery ?? []) {
      if (g.url?.startsWith("/blog/")) imgs.push(g.url);
    }
    return imgs;
  }

  it("no local blog image is shared across two articles", () => {
    const owner = new Map<string, string>(); // image path -> first slug that used it
    const collisions: string[] = [];
    for (const a of LIFESTYLE_ARTICLES) {
      for (const img of new Set(localImages(a))) {
        const prev = owner.get(img);
        if (prev && prev !== a.slug) {
          collisions.push(`${img} used by both "${prev}" and "${a.slug}"`);
        } else {
          owner.set(img, a.slug);
        }
      }
    }
    expect(collisions).toEqual([]);
  });

  it("insight posts set their own explicit hero + gallery (never the category fallback)", () => {
    const offenders: string[] = [];
    for (const a of LIFESTYLE_ARTICLES.filter((x) => x.isInsight)) {
      const hero = a.heroImage ?? a.imageUrl;
      const heroLocal = typeof hero === "string" && hero.startsWith("/blog/");
      const galleryOk =
        Array.isArray(a.gallery) &&
        a.gallery.length > 0 &&
        a.gallery.every((g) => g.url?.startsWith("/blog/"));
      if (!heroLocal || !galleryOk) offenders.push(a.slug);
    }
    expect(offenders).toEqual([]);
  });
});
