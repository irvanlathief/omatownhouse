// Article skeleton. Copy this object, fill every field following PLAYBOOK.md,
// HUMANIZER.md and QUALITY_CHECKLIST.md, then append it to LIFESTYLE_ARTICLES
// in server/content/lifestyleArticles.ts. Delete this comment from the copy.
//
// Rules reminder: no em dash, en dash, curly quotes, or emoji. Distance ranges
// in prose use the word "to". Front-load the answer in the first sentence.
// Frame any yield or return figure as a range, not a guarantee.

import type { LifestyleArticleSeed } from "../../server/content/lifestyleArticles";

export const ARTICLE: LifestyleArticleSeed = {
  slug: "", // unique, kebab-case, e.g. "what-is-off-plan-property-bali"
  title: "", // under ~60 chars, includes the primary keyword
  category: "", // investment | location | development | lifestyle | family | dining | fitness | wellness | community
  imageUrl: null, // prefer a local /blog asset path or a real URL; null uses the gallery fallback
  sortOrder: 0, // next integer after the current highest in LIFESTYLE_ARTICLES
  metaDescription: "", // ~140 to 160 chars, includes the primary keyword
  body: `<p>Answer the primary question in this first sentence, then expand. Link places like <a href="https://example.com" data-external="true">Place Name</a>.</p><p>Second paragraph with a specific, sourced fact.</p>`,
  venues: [
    // { name: "Place", distance: "10-15 min", coords: "-8.0000,115.0000", url: "https://..." },
  ],
  faq: [
    // { question: "", answer: "" }, // 2 to 4 items drawn from the topic relatedQuestions
  ],
  publishedAt: "", // today, ISO date e.g. "2026-06-21"
};
