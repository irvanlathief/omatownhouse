# QUALITY_CHECKLIST: publish gate

Every box must be checked before an article is appended to
`server/content/lifestyleArticles.ts` and shipped. If any item fails, revise or
mark the topic `blocked`.

## Writing

- [ ] No em dash, en dash, curly quote, or emoji anywhere in `title`,
      `metaDescription`, `body`, `faq`, or `venues`.
- [ ] No rule-of-three pile-ups and no banned hype filler (see HUMANIZER.md).
- [ ] The first one or two sentences directly answer the topic's
      `primaryQuestion`.
- [ ] Body is roughly 200 to 400 words, in `<p>` paragraphs.

## SEO / GEO

- [ ] `title` is under about 60 characters and contains the primary keyword,
      and reads naturally.
- [ ] `metaDescription` is about 140 to 160 characters and contains the primary
      keyword.
- [ ] Target keywords from the topic appear naturally in the body (no stuffing).
- [ ] `faq` has 2 to 4 question and answer pairs drawn from the topic's
      `relatedQuestions`.

## Accuracy

- [ ] Every numeric or legal claim (price, yield, duration, distance) has a
      Tier 1 or Tier 2 source from SOURCES.md.
- [ ] No guaranteed-return language. Yield, ROI, and appreciation are ranges
      with a "not financial advice" qualifier.
- [ ] All `<a>` links use `data-external="true"` and resolve (no 404).

## Data integrity

- [ ] `slug` is unique versus existing entries in `LIFESTYLE_ARTICLES`.
- [ ] `sortOrder` is set to the next integer (or an intentional position).
- [ ] `imageUrl` points to a real asset (prefer `client/public/blog/*`), or is
      null to use the gallery fallback.
- [ ] `publishedAt` is today's date in ISO format.

## Build and ship

- [ ] `pnpm vite build` succeeds.
- [ ] `client/public/sitemap.xml` `<lastmod>` bumped to today.
- [ ] If homepage FAQ changed, `FAQ_ITEMS` (Home.tsx) and the FAQPage JSON-LD
      (index.html) are identical.
- [ ] Shipped on a `content/<slug>` branch via PR, not pushed to `main`.
- [ ] `topics.json` updated: `status: published`, `publishedAt`, `prUrl` filled.
