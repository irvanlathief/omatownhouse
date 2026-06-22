// Build-time prerender for /blog/:slug pages.
//
// Runs after `vite build`, inside the Vercel build command. For each article it
// renders the pure BlogArticleView to a static HTML string, injects per-article
// <title>/meta/canonical/OpenGraph and BlogPosting + FAQPage JSON-LD, and writes
// dist/public/blog/<slug>/index.html. Google and AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot and friends) get the full article content and structured data
// without running any JavaScript.
//
// The article data is also baked into window.__BLOG_ARTICLE__ so the client's
// first render matches the static HTML. The client uses createRoot (not
// hydration), so the prerendered markup is purely for crawlers and first paint;
// there is no hydration-mismatch risk.
//
// This file is bundled with esbuild (--jsx=automatic) before it runs, so it can
// import the .tsx view directly without relying on the project's
// `jsx: preserve` tsconfig setting.

import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { LIFESTYLE_ARTICLES } from "../server/content/lifestyleArticles";
import { BlogArticleView } from "../client/src/components/BlogArticleView";
import { toBlogArticle, buildBlogJsonLd, blogUrl, absoluteUrl, SITE_URL } from "../client/src/lib/blogLayout";

const DIST = path.resolve(process.cwd(), "dist/public");
const TEMPLATE_PATH = path.join(DIST, "index.html");

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Escape "<" so embedded HTML/JSON cannot break out of the <script> context.
function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function buildHtml(template: string, seed: (typeof LIFESTYLE_ARTICLES)[number]): string {
  const article = toBlogArticle(seed);
  const appHtml = renderToString(React.createElement(BlogArticleView, { article }));
  const url = blogUrl(article.slug);
  const title = `${article.title} | OMA Townhouse`;
  const description = article.metaDescription || article.title;
  const heroAbs = absoluteUrl(article.heroImage);
  const jsonLd = safeJson(buildBlogJsonLd(article));

  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeAttr(title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    () => `<meta name="description" content="${escapeAttr(description)}" />`,
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/>/,
    () => `<link rel="canonical" href="${escapeAttr(url)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/>/,
    () => `<meta property="og:type" content="article" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
    () => `<meta property="og:title" content="${escapeAttr(title)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    () => `<meta property="og:description" content="${escapeAttr(description)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
    () => `<meta property="og:url" content="${escapeAttr(url)}" />`,
  );

  // Add og:image after og:url if not already present.
  if (!/property="og:image"/.test(html)) {
    html = html.replace(
      /(<meta\s+property="og:url"[\s\S]*?\/>)/,
      (m) => `${m}\n    <meta property="og:image" content="${escapeAttr(heroAbs)}" />`,
    );
  }

  // Replace the homepage JSON-LD block with the article's BlogPosting graph.
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    () => `<script type="application/ld+json">${jsonLd}</script>`,
  );

  // Inject the baked article data before the module entry script so the client
  // can render synchronously on a direct load.
  const bakedScript = `<script>window.__BLOG_ARTICLE__=${safeJson(seed)};</script>\n    `;
  html = html.replace(/<script type="module"/, () => `${bakedScript}<script type="module"`);

  // Place the rendered article into the root element.
  html = html.replace(/<div id="root"><\/div>/, () => `<div id="root">${appHtml}</div>`);

  return html;
}

function buildSitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls: { loc: string; lastmod: string; priority: string }[] = [
    { loc: `${SITE_URL}/`, lastmod: today, priority: "1.0" },
  ];
  for (const seed of LIFESTYLE_ARTICLES) {
    const a = toBlogArticle(seed);
    urls.push({ loc: blogUrl(a.slug), lastmod: a.updatedAt, priority: a.isInsight ? "0.8" : "0.6" });
  }
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(`[prerender-blog] template not found at ${TEMPLATE_PATH}. Run \`vite build\` first.`);
  }
  const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  let count = 0;
  for (const seed of LIFESTYLE_ARTICLES) {
    const outDir = path.join(DIST, "blog", seed.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), buildHtml(template, seed), "utf-8");
    count++;
  }

  fs.writeFileSync(path.join(DIST, "sitemap.xml"), buildSitemap(), "utf-8");

  console.log(`[prerender-blog] wrote ${count} blog pages and refreshed sitemap.xml`);
}

main();
