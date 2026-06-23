import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { lifestyleArticles } from "../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { LIFESTYLE_ARTICLES, type LifestyleArticleSeed } from "./content/lifestyleArticles";

// Map a static seed article into the shape the client expects from `list`.
// The blog/insights fields (faq, heroImage, gallery, citations, layoutVariant,
// etc.) are passed through so the homepage Insights row and the /blog/:slug
// page can render them; they are optional, so existing articles stay valid.
function toClientArticle(a: LifestyleArticleSeed, id: number) {
  return {
    id,
    slug: a.slug,
    title: a.title,
    content: { body: a.body, venues: a.venues },
    category: a.category,
    imageUrl: a.imageUrl,
    sortOrder: a.sortOrder,
    lastRefreshed: a.publishedAt ? new Date(a.publishedAt) : null,
    metaDescription: a.metaDescription ?? null,
    faq: a.faq ?? [],
    heroImage: a.heroImage ?? null,
    gallery: a.gallery ?? [],
    citations: a.citations ?? [],
    showMap: a.showMap ?? null,
    mapCoords: a.mapCoords ?? null,
    layoutVariant: a.layoutVariant ?? null,
    readingTime: a.readingTime ?? null,
    author: a.author ?? null,
    publishedAt: a.publishedAt ?? null,
    updatedAt: a.updatedAt ?? null,
    isInsight: a.isInsight ?? false,
  };
}

// Serialise an article seed into the content JSON stored in MySQL. Includes the
// blog/insights fields so the DB read path returns the same shape as the static
// path (otherwise isInsight, faq, heroImage etc. silently default to false/null
// and the homepage Insights row goes empty).
function seedContentJson(article: LifestyleArticleSeed) {
  return JSON.stringify({
    body: article.body,
    venues: article.venues,
    metaDescription: article.metaDescription,
    faq: article.faq,
    isInsight: article.isInsight,
    heroImage: article.heroImage,
    gallery: article.gallery,
    citations: article.citations,
    showMap: article.showMap,
    mapCoords: article.mapCoords,
    layoutVariant: article.layoutVariant,
    readingTime: article.readingTime,
    author: article.author,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
  });
}

// Seed the database with the static articles. Inserts any article whose slug is
// not already in the table, so newly added LIFESTYLE_ARTICLES entries surface on
// the next cold start. (The earlier version only seeded when the table was
// empty, which left new articles permanently absent from production.)
async function seedArticles() {
  const db = await getDb();
  if (!db) return;

  const existing = await db
    .select({ slug: lifestyleArticles.slug })
    .from(lifestyleArticles);
  const existingSlugs = new Set(existing.map((row) => row.slug));

  const toInsert = LIFESTYLE_ARTICLES.filter((a) => !existingSlugs.has(a.slug));
  if (toInsert.length === 0) return;

  for (const article of toInsert) {
    await db.insert(lifestyleArticles).values({
      slug: article.slug,
      title: article.title,
      content: seedContentJson(article),
      category: article.category,
      imageUrl: article.imageUrl || null,
      sortOrder: article.sortOrder,
      isActive: 1,
    });
  }
  console.log("[Lifestyle] Seeded", toInsert.length, "new articles");
}

// Seed on module load
seedArticles().catch(console.error);

export const lifestyleRouter = router({
  // Get all active articles. Falls back to the static content module when no
  // database is configured (e.g. the Vercel deploy with no DATABASE_URL), so
  // the section always renders.
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      return [...LIFESTYLE_ARTICLES]
        .sort((x, y) => x.sortOrder - y.sortOrder)
        .map((a, i) => toClientArticle(a, i + 1));
    }

    const articles = await db
      .select()
      .from(lifestyleArticles)
      .where(eq(lifestyleArticles.isActive, 1))
      .orderBy(asc(lifestyleArticles.sortOrder));

    return articles.map((a) => {
      const content = JSON.parse(a.content);
      return {
        id: a.id,
        slug: a.slug,
        title: a.title,
        content,
        category: a.category,
        imageUrl: a.imageUrl,
        sortOrder: a.sortOrder,
        lastRefreshed: a.lastRefreshed,
        // Blog/insights fields are not stored as columns; surface any that were
        // persisted in the JSON content, otherwise fall back to defaults so the
        // shape matches the static branch (toClientArticle).
        metaDescription: content.metaDescription ?? null,
        faq: content.faq ?? [],
        heroImage: content.heroImage ?? null,
        gallery: content.gallery ?? [],
        citations: content.citations ?? [],
        showMap: content.showMap ?? null,
        mapCoords: content.mapCoords ?? null,
        layoutVariant: content.layoutVariant ?? null,
        readingTime: content.readingTime ?? null,
        author: content.author ?? null,
        publishedAt: content.publishedAt ?? null,
        updatedAt: content.updatedAt ?? null,
        isInsight: content.isInsight ?? false,
      };
    });
  }),

  // Refresh content using AI (called by scheduled task or admin)
  refresh: publicProcedure.mutation(async () => {
    const db = await getDb();
    if (!db) return { success: false, message: "Database not available" };

    try {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are a content writer for OMA Townhouse, an off-plan property development in Kaba Kaba, Tabanan, Bali. Update the lifestyle articles about the area with the latest developments, aimed at people researching off-plan property investment and relocation in Bali. Write in a clear, natural tone, like a knowledgeable local rather than a salesperson. Front-load a direct answer in the first sentence. Keep each article body under 250 words. Wrap paragraphs in <p> tags and include HTML anchor tags with the data-external="true" attribute for any venue or place mentioned. Never use em dashes, en dashes, curly quotes, emoji, or rule-of-three pile-ups. Frame any yield or return figures as ranges, not guarantees. Return valid JSON.`,
          },
          {
            role: "user",
            content: `Update these lifestyle articles about living near and investing off-plan in Kaba Kaba, Bali. Weave in relevant search terms naturally across off-plan property, location (Kaba Kaba, Tabanan, Canggu, Nuanu), investment (freehold vs leasehold, rental yield, capital appreciation), and lifestyle/relocation themes. Include specific venue names with Instagram or website links where possible.

Categories to cover:
1. Gyms & Fitness (Reload Sanctuary, Omni, The Block, Nirvana Life)
2. Cafes & Dining (Yuki, Chotto Matto, Crate, Open House Seseh, Neighbourhood)
3. Beach Clubs (Luna at Nuanu, Finns, La Brisa, Atlas)
4. Spas & Wellness (Therapy, Goldust, AMO, Udara, Ulaman)
5. Local Community (Kaba Kaba Social, Ulaman Resort)
6. New Hotels & Development (Alila, Nuanu Creative City)
7. Schools & Family (Grow International, ProEd, hospitals)

Return a JSON array of objects with: slug, title, body (HTML string with <a> tags).
Keep the same slugs: gyms-fitness, cafes-dining, beach-clubs, spas-wellness, local-community, hotels-development, schools-family`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "lifestyle_articles",
            strict: true,
            schema: {
              type: "object",
              properties: {
                articles: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      slug: { type: "string" },
                      title: { type: "string" },
                      body: { type: "string" },
                    },
                    required: ["slug", "title", "body"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["articles"],
              additionalProperties: false,
            },
          },
        },
      });

      const rawContent = response.choices[0]?.message?.content;
      if (typeof rawContent !== "string") {
        return { success: false, message: "No content from LLM" };
      }

      const parsed = JSON.parse(rawContent);
      const updatedArticles = parsed.articles;

      for (const article of updatedArticles) {
        // Get existing article to preserve venues
        const existing = await db
          .select()
          .from(lifestyleArticles)
          .where(eq(lifestyleArticles.slug, article.slug))
          .limit(1);

        if (existing.length > 0) {
          const existingContent = JSON.parse(existing[0].content);
          const updatedContent = JSON.stringify({
            body: article.body,
            venues: existingContent.venues, // Preserve venue data
          });

          await db
            .update(lifestyleArticles)
            .set({
              title: article.title,
              content: updatedContent,
              lastRefreshed: new Date(),
            })
            .where(eq(lifestyleArticles.slug, article.slug));
        }
      }

      return { success: true, message: `Updated ${updatedArticles.length} articles` };
    } catch (error) {
      console.error("[Lifestyle] Refresh error:", error);
      return { success: false, message: "Failed to refresh content" };
    }
  }),
});
