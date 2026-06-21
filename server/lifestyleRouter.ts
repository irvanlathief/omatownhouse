import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { lifestyleArticles } from "../drizzle/schema";
import { eq, asc } from "drizzle-orm";

// OMA Townhouse coordinates for Google Maps directions
const OMA_COORDS = "-8.576677,115.145663";

// Static seed data with rich hyperlinks and SEO content
const SEED_ARTICLES = [
  {
    slug: "gyms-fitness",
    title: "World-Class Fitness, Minutes Away",
    category: "fitness",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/OZqFwqmLzpWwJFpW.webp",
    sortOrder: 1,
    content: JSON.stringify({
      body: `The fitness scene near Kaba Kaba is genuinely world-class. <a href="https://www.instagram.com/reloadsanctuary/" data-external="true">Reload Sanctuary</a> is opening in Canggu — a massive 6,000 sqm wellness sanctuary with a premium gym, rooftop performance zone, recovery spa, day club pool, and biohacking facilities. It's about 25 minutes from OMA.\n\nCloser to home, <a href="https://www.instagram.com/omnibali/" data-external="true">Omni Gym</a> in Pererenan (20 min) is a favourite among serious lifters with top-tier equipment. <a href="https://www.instagram.com/theblockbali/" data-external="true">The Block Bali</a> offers functional fitness and CrossFit-style training. For a more holistic approach, <a href="https://www.instagram.com/nirvanalifebali/" data-external="true">Nirvana Life</a> combines fitness with wellness retreats.\n\nThe point is — you're not sacrificing your fitness routine by living in Kaba Kaba. You're just trading traffic for rice field views on the drive there.`,
      venues: [
        { name: "Reload Sanctuary", distance: "25-30 min", coords: "-8.6478,115.1385", url: "https://www.instagram.com/reloadsanctuary/" },
        { name: "Omni Gym", distance: "20-25 min", coords: "-8.6395,115.1290", url: "https://www.instagram.com/omnibali/" },
        { name: "The Block Bali", distance: "20-25 min", coords: "-8.6410,115.1310", url: "https://www.instagram.com/theblockbali/" },
        { name: "Nirvana Life", distance: "25-30 min", coords: "-8.6550,115.1400", url: "https://www.instagram.com/nirvanalifebali/" }
      ]
    }),
  },
  {
    slug: "cafes-dining",
    title: "From Ramen to Rice Field Brunch",
    category: "dining",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/ABCQFXQbtcsZAkdh.webp",
    sortOrder: 2,
    content: JSON.stringify({
      body: `The dining scene around Canggu and Seseh is one of the best reasons to live in Bali. <a href="https://www.instagram.com/yukicanggu/" data-external="true">Yuki Canggu</a> on Batu Bolong is famous for its 14-course Omakase nights and modern Japanese izakaya vibes — about 25 minutes from OMA.\n\n<a href="https://www.instagram.com/chottomatto.bali/" data-external="true">Chotto Matto</a> brings incredible ramen and Japanese street food to the area. For your morning coffee and work sessions, <a href="https://www.instagram.com/cratecafebali/" data-external="true">Crate Cafe</a> is a digital nomad institution with meals from 50k IDR.\n\nCloser to home in Seseh (15-20 min), <a href="https://www.instagram.com/openhouseseseh/" data-external="true">Open House Seseh</a> is the new favourite — beautiful space, great food, rice field views. <a href="https://www.instagram.com/neighbourhoodseseh/" data-external="true">Neighbourhood Seseh</a> and <a href="https://www.instagram.com/thalassabali/" data-external="true">Thalassa</a> round out the Seseh scene perfectly.`,
      venues: [
        { name: "Yuki Canggu", distance: "25-30 min", coords: "-8.6510,115.1380", url: "https://www.instagram.com/yukicanggu/" },
        { name: "Chotto Matto", distance: "25-30 min", coords: "-8.6500,115.1370", url: "https://www.instagram.com/chottomatto.bali/" },
        { name: "Crate Cafe", distance: "25-30 min", coords: "-8.6490,115.1360", url: "https://www.instagram.com/cratecafebali/" },
        { name: "Open House Seseh", distance: "15-20 min", coords: "-8.6200,115.1250", url: "https://www.instagram.com/openhouseseseh/" },
        { name: "Neighbourhood Seseh", distance: "15-20 min", coords: "-8.6180,115.1240", url: "https://www.instagram.com/neighbourhoodseseh/" }
      ]
    }),
  },
  {
    slug: "beach-clubs",
    title: "Beach Clubs Without the Batu Bolong Traffic",
    category: "lifestyle",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/PDCHwUSBfHEidARn.webp",
    sortOrder: 3,
    content: JSON.stringify({
      body: `Your closest beach club is <a href="https://www.instagram.com/lunabeachclub/" data-external="true">Luna Beach Club</a> at Nuanu — just 10-15 minutes from OMA. World-class facilities, sunset views, and zero traffic. That alone is a selling point.\n\n<a href="https://www.instagram.com/finnsbeachclub/" data-external="true">Finns Beach Club</a>, voted the World's Best Beach Club, is 25-30 minutes away with 170m of oceanfront, 3 pools, and 11 bars. <a href="https://www.instagram.com/labrisabali/" data-external="true">La Brisa</a> on Echo Beach — built from 500 repurposed fishing boats — has some of the best sunset views in Bali.\n\n<a href="https://www.instagram.com/atlasbeachclub/" data-external="true">Atlas Beach Club</a>, one of the largest in the world, is also within reach. Living in Kaba Kaba means you have access to all of these without living in the chaos that surrounds them.`,
      venues: [
        { name: "Luna Beach Club", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.instagram.com/lunabeachclub/" },
        { name: "Finns Beach Club", distance: "25-30 min", coords: "-8.6560,115.1350", url: "https://www.instagram.com/finnsbeachclub/" },
        { name: "La Brisa", distance: "25-30 min", coords: "-8.6530,115.1320", url: "https://www.instagram.com/labrisabali/" },
        { name: "Atlas Beach Club", distance: "30-35 min", coords: "-8.6600,115.1400", url: "https://www.instagram.com/atlasbeachclub/" }
      ]
    }),
  },
  {
    slug: "spas-wellness",
    title: "Wellness is a Way of Life Here",
    category: "wellness",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/NAcHHeirtQpdYOqQ.webp",
    sortOrder: 4,
    content: JSON.stringify({
      body: `Bali's wellness scene is legendary, and it's all accessible from Kaba Kaba. <a href="https://www.instagram.com/therapybali/" data-external="true">Therapy Day Spa</a> in Pererenan offers natural, toxin-free treatments in a mindful setting (20-25 min). <a href="https://www.instagram.com/goldustbali/" data-external="true">Goldust Spa</a> and <a href="https://www.instagram.com/amospabali/" data-external="true">AMO Spa</a> are Canggu icons for a reason.\n\nIn Seseh, <a href="https://www.instagram.com/udarabali/" data-external="true">Udara Bali</a> combines yoga retreats with detox and spa services — a proper wellness escape. For something unique, try float therapy at <a href="https://www.instagram.com/solacefloat/" data-external="true">Solace Float</a>.\n\nAnd locally, <a href="https://www.instagram.com/ulamanretreat/" data-external="true">Ulaman Retreat</a> is right in the Kaba Kaba area — an eco-luxury wellness resort that's putting this village on the map for high-end travellers.`,
      venues: [
        { name: "Ulaman Retreat", distance: "5-10 min", coords: "-8.5800,115.1500", url: "https://www.instagram.com/ulamanretreat/" },
        { name: "Therapy Day Spa", distance: "20-25 min", coords: "-8.6380,115.1280", url: "https://www.instagram.com/therapybali/" },
        { name: "Udara Bali", distance: "15-20 min", coords: "-8.6150,115.1220", url: "https://www.instagram.com/udarabali/" },
        { name: "Goldust Spa", distance: "25-30 min", coords: "-8.6480,115.1350", url: "https://www.instagram.com/goldustbali/" }
      ]
    }),
  },
  {
    slug: "local-community",
    title: "Kaba Kaba Social & The Local Scene",
    category: "community",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/wMIMhbjKOmFFjkpP.webp",
    sortOrder: 5,
    content: JSON.stringify({
      body: `What makes Kaba Kaba special isn't just what's nearby — it's what's right here. <a href="https://www.instagram.com/kabakaba.social/" data-external="true">Kaba Kaba Social</a> is the village's own social hub, bringing together locals and expats in a way that bigger areas can't replicate.\n\n<a href="https://www.instagram.com/ulamanretreat/" data-external="true">Ulaman Resort</a> draws international wellness travellers, creating a sophisticated yet grounded community. The village still has authentic Balinese ceremonies, temple festivals, and a genuine sense of neighbourhood.\n\nThis is the Canggu of 10 years ago — before the crowds, before the traffic, before the prices went through the roof. Except now, you have all the modern amenities within a short drive. That's the sweet spot.`,
      venues: [
        { name: "Kaba Kaba Social", distance: "2-5 min", coords: "-8.5780,115.1480", url: "https://www.instagram.com/kabakaba.social/" },
        { name: "Ulaman Resort", distance: "5-10 min", coords: "-8.5800,115.1500", url: "https://www.instagram.com/ulamanretreat/" }
      ]
    }),
  },
  {
    slug: "hotels-development",
    title: "New Hotels & What's Coming Next",
    category: "development",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/RFpzOLCapYdEXOzx.webp",
    sortOrder: 6,
    content: JSON.stringify({
      body: `The biggest signal that Kaba Kaba is the right investment? The hotel brands are moving in. <a href="https://www.instagram.com/alilahotels/" data-external="true">Alila Hotels</a> is opening a property in the Tabanan area — when luxury hotel chains invest, property values follow.\n\n<a href="https://www.nuanu.com" data-external="true">Nuanu Creative City</a> is a 44-hectare development just 10-15 minutes away, bringing coworking spaces, international schools, wellness centres, and <a href="https://www.instagram.com/lunabeachclub/" data-external="true">Luna Beach Club</a> to the area. This is billions of dollars of development happening right next door.\n\nThe Tabanan government is actively promoting "Quality Tourism" — sustainable, high-end development that preserves the natural beauty while creating world-class infrastructure. Early investors in Canggu saw 5-10x returns. The same trajectory is happening here.`,
      venues: [
        { name: "Nuanu Creative City", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
        { name: "Alila (coming soon)", distance: "15-20 min", coords: "-8.5900,115.1200", url: "https://www.instagram.com/alilahotels/" }
      ]
    }),
  },
  {
    slug: "schools-family",
    title: "Family-Friendly: Schools & Healthcare Nearby",
    category: "family",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028072074/LQcTfcrQovcgmBPl.webp",
    sortOrder: 7,
    content: JSON.stringify({
      body: `For families, Kaba Kaba is surprisingly well-connected. <a href="https://growinkedungu.com/" data-external="true">Grow International School</a> in Kedungu (10 min) offers Cambridge curriculum with shuttle service. <a href="https://www.nuanu.com" data-external="true">ProEd Global School at Nuanu</a> provides another excellent international option right next door.\n\nFor healthcare, Kasih Ibu Hospital in Tabanan is 15-20 minutes away for everyday needs. <a href="https://www.bfriendhospital.com/" data-external="true">BFriend Hospital</a> and <a href="https://www.siloamhospitals.com/" data-external="true">Siloam Hospital</a> are accessible in 30-40 minutes for more specialized care.\n\nThe combination of quality education, accessible healthcare, and a safe village environment makes Kaba Kaba one of the best places in Bali for families who want the island lifestyle without compromising on essentials.`,
      venues: [
        { name: "Grow International School", distance: "10 min", coords: "-8.5900,115.1150", url: "https://growinkedungu.com/" },
        { name: "Nuanu / ProEd", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
        { name: "Kasih Ibu Hospital", distance: "15-20 min", coords: "-8.5400,115.1700", url: "https://maps.google.com/?q=Kasih+Ibu+Hospital+Tabanan" }
      ]
    }),
  },
];

// Seed the database with initial articles if empty
async function seedArticles() {
  const db = await getDb();
  if (!db) return;

  const existing = await db.select().from(lifestyleArticles).limit(1);
  if (existing.length > 0) return; // Already seeded

  for (const article of SEED_ARTICLES) {
    await db.insert(lifestyleArticles).values({
      slug: article.slug,
      title: article.title,
      content: article.content,
      category: article.category,
      imageUrl: article.imageUrl || null,
      sortOrder: article.sortOrder,
      isActive: 1,
    });
  }
  console.log("[Lifestyle] Seeded", SEED_ARTICLES.length, "articles");
}

// Seed on module load
seedArticles().catch(console.error);

export const lifestyleRouter = router({
  // Get all active articles
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const articles = await db
      .select()
      .from(lifestyleArticles)
      .where(eq(lifestyleArticles.isActive, 1))
      .orderBy(asc(lifestyleArticles.sortOrder));

    return articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      content: JSON.parse(a.content),
      category: a.category,
      imageUrl: a.imageUrl,
      sortOrder: a.sortOrder,
      lastRefreshed: a.lastRefreshed,
    }));
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
            content: `You are a content writer for OMA Townhouse, a property development in Kaba Kaba, Bali. Your job is to update lifestyle articles about the area with the latest positive developments. Write in a casual, authentic tone — like a knowledgeable friend, not a salesperson. Keep each article body under 200 words. Include HTML anchor tags with data-external="true" attribute for any venue or place mentioned. Return valid JSON array.`,
          },
          {
            role: "user",
            content: `Update these lifestyle articles about living near Kaba Kaba, Bali. Focus on positive developments, new openings, and why the area is great for expats. Include specific venue names with Instagram or website links where possible.

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
