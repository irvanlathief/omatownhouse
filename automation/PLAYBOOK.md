# PLAYBOOK: OMA Townhouse content generation

This is the workflow for generating and publishing one article for the OMA
Townhouse site. Run one article per session. Quality over volume.

The audience is English-speaking foreign investors, primarily US-based and
Dubai / UAE-based, evaluating Bali off-plan property as an investment or second
home. Write to that reader.

## How publishing works

"Publishing" an article means appending one typed object to the
`LIFESTYLE_ARTICLES` array in `server/content/lifestyleArticles.ts`. Everything
else is automatic:

- The "Living in Kaba Kaba" homepage section renders lifestyle articles inline,
  with and without a database.
- Every article also becomes a real, prerendered page at `/blog/<slug>`. The
  build step (`scripts/prerender-blog.ts`, run by `pnpm build`) renders it to
  static HTML with its own title, meta description, canonical, OpenGraph tags and
  BlogPosting + FAQPage JSON-LD, then regenerates `sitemap.xml`. That is what
  gives Google and AI crawlers full content without running JavaScript.
- Articles marked `isInsight: true` appear in the homepage Insights row (the
  horizontal card row below the FAQ) and link to their `/blog/<slug>` page. Use
  this for investor-facing posts.

Do NOT hand-write page HTML, edit files under `dist/`, or change the prerender
script to fake a page. Fill the article object; the build produces the page.

## Steps

1. **Pick a topic.** Open `automation/topics.json`. Choose the `pending` topic
   with the lowest `priority` number. Set its `status` to `drafting`.

2. **Research.** Use `automation/SOURCES.md` for the source-authority hierarchy.
   Gather 2 to 4 concrete, citable facts (ownership rules, taxes, distances,
   yields, development news). Any number or legal claim you publish must be
   backed by a Tier 1 or Tier 2 source. Never invent figures. Record the sources
   you used, you will put them in the article `citations` array.

3. **Draft.** Fill the skeleton in `automation/templates/article.snippet.ts`:
   `slug`, `title`, `category`, `imageUrl`, `sortOrder` (next integer),
   `metaDescription`, `body` (HTML with `<p>` paragraphs and
   `<a ... data-external="true">` links), `venues`, `faq` (2 to 4 items), and
   `publishedAt` (today, ISO date). Front-load the answer to the topic's
   `primaryQuestion` in the first one or two sentences.

4. **Add media and blog fields.** Fill the blog fields so the page is rich and
   does not look templated:
   - `heroImage`: a topic-relevant image served from `client/public/blog/`. Add
     a new file there if needed (real, rights-cleared images only).
   - `gallery`: 2 to 3 relevant images with `alt`, and `credit` / `sourceUrl`
     when the image is not first-party.
   - For a location or area topic, leave `showMap` on (it defaults on when the
     article has venues with coords) so a map of the area embeds.
   - `citations`: the Tier 1 / Tier 2 sources behind your facts. These render as
     a "Sources" list on the page.
   - `isInsight: true` for investor-facing posts (ownership, tax, yield, Bali vs
     other markets). Leave it off for pure lifestyle pieces.
   - `layoutVariant` is optional. Leave it unset to let the slug pick one, or set
     `gallery`, `map`, `qa` or `standard` deliberately.
   Media must be relevant to the specific topic. Never fabricate a screenshot.

5. **Humanize.** Run the draft against `automation/HUMANIZER.md` until it reads
   naturally. The banned characters (em dash, en dash, curly quotes, emoji) are
   non-negotiable.

6. **Gate.** Check the draft against every item in
   `automation/QUALITY_CHECKLIST.md`. If anything fails, revise or, if you
   cannot source a claim, pick a different angle or mark the topic `blocked` in
   `topics.json`.

7. **Publish to the content module.** Append the finished object to
   `LIFESTYLE_ARTICLES` in `server/content/lifestyleArticles.ts`.

8. **Sync the homepage FAQ (only if it changed).** If the article adds
   homepage-level questions, add matching entries to BOTH the `FAQ_ITEMS` const
   in `client/src/pages/Home.tsx` and the `FAQPage` JSON-LD in
   `client/index.html` (they must stay identical). Add a line under "Topics
   covered" in `client/public/llms.txt` if it covers a genuinely new topic. The
   per-article sitemap entry and `/blog/<slug>` page are generated for you by the
   build, so you do not edit `sitemap.xml` by hand.

9. **Verify.** Run `pnpm build` (runs `vite build` plus the blog prerender) and
   confirm it succeeds. Check `dist/public/blog/<slug>/index.html` exists and
   contains the article body and a `BlogPosting` JSON-LD block. Grep the new copy
   for banned characters (see QUALITY_CHECKLIST).

10. **Ship.** Create a branch `content/<slug>`, commit (with the repo's required
    commit trailer), push, open a PR via the GitHub MCP, and merge once checks
    pass. Never push to `main` directly.

11. **Close the loop.** In `topics.json`, set the topic `status` to `published`,
    fill `publishedAt` and `prUrl`.

12. **Log to Notion.** After the PR merges, use the Notion MCP to record the run:
    - System Record page `36a441a6-7c99-8167-ac8a-e45b746a0b5b`: set `Last Run`
      to now and `Last Output Summary` to the published title plus the
      `/blog/<slug>` URL. Do NOT change `Status`; leave it exactly as set.
    - OMA project page `3afe92eb-dd9d-4f2b-b7a6-1403b5db19e0`: append one dated
      log line, e.g. `Published "<title>" at
      https://www.omatownhouse.com/blog/<slug> (<date>).`

## Hard rules

- One article per session.
- Never publish a topic that fails any QUALITY_CHECKLIST item.
- Never invent citations, prices, yields, or legal facts. Put real sources in
  `citations`.
- Never use an em dash, en dash, curly quote, emoji, or rule-of-three pile-up.
- Never hand-write page HTML or edit `dist/` output; the build renders the page.
- Frame yield / return figures as ranges, with a "not financial advice" note.
- Do not change the Notion System Record `Status`. Only log the run.
