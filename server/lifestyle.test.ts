import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

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
