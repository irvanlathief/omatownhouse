# PLAYBOOK: OMA Townhouse content generation

This is the workflow for generating and publishing one lifestyle / off-plan
article for the OMA Townhouse site. Run one article per session. Quality over
volume.

## How this site differs from a normal blog

OMA Townhouse is a single-page app. There are no per-article URLs. "Publishing"
an article means appending a typed object to the `LIFESTYLE_ARTICLES` array in
`server/content/lifestyleArticles.ts`. The existing "Living in Kaba Kaba"
section renders it automatically, both with and without a database.

Do NOT create standalone HTML pages, a `resources/index.html`, or new routes.

## Steps

1. **Pick a topic.** Open `automation/topics.json`. Choose the `pending` topic
   with the lowest `priority` number. Set its `status` to `drafting`.

2. **Research.** Use `automation/SOURCES.md` for the source-authority hierarchy.
   Gather 2 to 4 concrete, citable facts (distances, regulations, yields,
   development news). Any number you publish (yield %, price, legal duration,
   distance) must be backed by a Tier 1 or Tier 2 source. Never invent figures.

3. **Draft.** Fill the skeleton in `automation/templates/article.snippet.ts`:
   `slug`, `title`, `category`, `imageUrl`, `sortOrder` (next integer),
   `metaDescription`, `body` (HTML with `<p>` paragraphs and
   `<a ... data-external="true">` links), `venues`, `faq` (2 to 4 items), and
   `publishedAt` (today, ISO date). Front-load the answer to the topic's
   `primaryQuestion` in the first one or two sentences.

4. **Humanize.** Run the draft against `automation/HUMANIZER.md` until it reads
   naturally. The banned characters (em dash, en dash, curly quotes, emoji) are
   non-negotiable.

5. **Gate.** Check the draft against every item in
   `automation/QUALITY_CHECKLIST.md`. If anything fails, revise or, if you
   cannot source a claim, pick a different angle or mark the topic `blocked` in
   `topics.json`.

6. **Publish to the content module.** Append the finished object to
   `LIFESTYLE_ARTICLES` in `server/content/lifestyleArticles.ts`.

7. **Update GEO assets.**
   - Bump `<lastmod>` in `client/public/sitemap.xml` to today.
   - If the article adds homepage-level questions, add matching entries to BOTH
     the `FAQ_ITEMS` const in `client/src/pages/Home.tsx` and the `FAQPage`
     JSON-LD in `client/index.html` (they must stay identical).
   - Add a line under "Topics covered" in `client/public/llms.txt` if it covers
     a genuinely new topic.

8. **Verify.** Run `pnpm vite build` to confirm the client still builds, and
   grep the new copy for banned characters (see QUALITY_CHECKLIST).

9. **Ship.** Create a branch `content/<slug>`, commit (with the repo's required
   commit trailer), push, open a PR via the GitHub MCP, and merge once checks
   pass. Never push to `main` directly.

10. **Close the loop.** In `topics.json`, set the topic `status` to `published`,
    fill `publishedAt` and `prUrl`.

## Hard rules

- One article per session.
- Never publish a topic that fails any QUALITY_CHECKLIST item.
- Never invent citations, prices, yields, or legal facts.
- Never use an em dash, en dash, curly quote, emoji, or rule-of-three pile-up.
- Never create standalone HTML article pages or new routes.
- Frame yield / return figures as ranges, with a "not financial advice" note.
