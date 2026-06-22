// Shared blog helpers used by both the client BlogDetail page and the
// build-time prerender script (scripts/prerender-blog.ts).
//
// IMPORTANT: keep this module free of browser-only APIs, the `@/` path alias,
// wouter and tRPC. The prerender step bundles it with esbuild and runs it under
// Node, so it must import only React-agnostic, relative-path code. The layout
// variant is chosen from a deterministic slug hash (never Math.random) so the
// prerendered HTML and the client render stay identical.

export const SITE_URL = "https://www.omatownhouse.com";

// OMA Townhouse coordinates, used for Google Maps directions links.
export const OMA_COORDS = "-8.576677,115.145663";

export interface BlogVenue {
  name: string;
  distance: string;
  coords: string;
  url?: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogGalleryImage {
  url: string;
  alt?: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
}

export interface BlogCitation {
  label: string;
  url: string;
}

export type BlogLayoutVariant = "standard" | "gallery" | "map" | "qa";

// Normalised article shape consumed by BlogArticleView. Both the static seed
// (server/content) and the tRPC client object are mapped into this via
// toBlogArticle().
export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  body: string;
  metaDescription: string;
  venues: BlogVenue[];
  faq: BlogFaqItem[];
  heroImage: string;
  gallery: BlogGalleryImage[];
  citations: BlogCitation[];
  showMap: boolean;
  mapCoords: string;
  layoutVariant: BlogLayoutVariant;
  readingTime: number;
  author: string;
  publishedAt: string;
  updatedAt: string;
  isInsight: boolean;
}

// Per-category relevant imagery, served from client/public/blog. Used as the
// hero and gallery default when an article does not specify its own media, so
// every post carries topic-relevant images without hand-wiring each one.
const CATEGORY_MEDIA: Record<string, { hero: string; gallery: string[] }> = {
  fitness: { hero: "/blog/blog-gym-fitness.webp", gallery: ["/blog/blog-gym-fitness.webp", "/blog/blog-spa-wellness.webp"] },
  dining: { hero: "/blog/blog-cafe-coworking.webp", gallery: ["/blog/blog-cafe-coworking.webp", "/blog/digital-nomad-cafe.webp", "/blog/blog-community-dining.webp"] },
  lifestyle: { hero: "/blog/blog-beach-club.webp", gallery: ["/blog/blog-beach-club.webp", "/blog/luna-beach-club.jpg", "/blog/blog-surf-beach.webp"] },
  wellness: { hero: "/blog/blog-spa-wellness.webp", gallery: ["/blog/blog-spa-wellness.webp", "/blog/rice-terraces.jpg"] },
  community: { hero: "/blog/blog-community-dining.webp", gallery: ["/blog/blog-community-dining.webp", "/blog/rice-terraces.jpg"] },
  development: { hero: "/blog/blog-nuanu-creative.webp", gallery: ["/blog/blog-nuanu-creative.webp", "/blog/nuanu-creative-city.jpg", "/blog/kedungu-beach.jpg"] },
  family: { hero: "/blog/blog-school-family.webp", gallery: ["/blog/blog-school-family.webp", "/blog/rice-terraces.jpg"] },
  investment: { hero: "/blog/blog-nuanu-creative.webp", gallery: ["/blog/blog-nuanu-creative.webp", "/blog/blog-rice-field.webp", "/blog/kedungu-beach.jpg"] },
};

const DEFAULT_HERO = "/blog/blog-rice-field.webp";
const DEFAULT_DATE = "2026-01-15";
const VARIANTS: BlogLayoutVariant[] = ["standard", "gallery", "map", "qa"];

// Deterministic, stable string hash (djb2). Same slug always maps to the same
// number, so the layout variant never differs between prerender and client.
export function hashSlug(slug: string): number {
  let hash = 5381;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 33) ^ slug.charCodeAt(i);
  }
  return hash >>> 0;
}

export function pickLayoutVariant(slug: string, explicit?: BlogLayoutVariant): BlogLayoutVariant {
  if (explicit) return explicit;
  return VARIANTS[hashSlug(slug) % VARIANTS.length];
}

export function estimateReadingTime(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  return Math.max(1, Math.round(words.length / 200));
}

export function getDirectionsUrl(destCoords: string): string {
  return `https://www.google.com/maps/dir/${OMA_COORDS}/${destCoords}`;
}

// Keyless Google Maps embed, safe to render in static HTML (no API key needed).
export function getMapEmbedUrl(coords: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(coords)}&z=13&output=embed`;
}

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function blogUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

// Accepts either the static seed (flat body/venues) or the tRPC client object
// (nested content) and returns the normalised BlogArticle.
export function toBlogArticle(input: any): BlogArticle {
  const body: string = input?.content?.body ?? input?.body ?? "";
  const venues: BlogVenue[] = input?.content?.venues ?? input?.venues ?? [];
  const faq: BlogFaqItem[] = input?.faq ?? input?.content?.faq ?? [];
  const category: string = input?.category ?? "lifestyle";
  const media = CATEGORY_MEDIA[category];

  const heroImage: string = input?.heroImage ?? input?.imageUrl ?? media?.hero ?? DEFAULT_HERO;

  const gallery: BlogGalleryImage[] = (input?.gallery ?? (media?.gallery ?? []).map((url) => ({ url, alt: input?.title }))) as BlogGalleryImage[];

  const publishedAt: string = input?.publishedAt ?? DEFAULT_DATE;

  return {
    slug: input?.slug ?? "",
    title: input?.title ?? "",
    category,
    body,
    metaDescription: input?.metaDescription ?? "",
    venues,
    faq,
    heroImage,
    gallery,
    citations: input?.citations ?? [],
    showMap: input?.showMap ?? venues.length > 0,
    mapCoords: input?.mapCoords ?? venues[0]?.coords ?? OMA_COORDS,
    layoutVariant: pickLayoutVariant(input?.slug ?? "", input?.layoutVariant),
    readingTime: input?.readingTime ?? estimateReadingTime(body),
    author: input?.author ?? "OMA Townhouse",
    publishedAt,
    updatedAt: input?.updatedAt ?? publishedAt,
    isInsight: Boolean(input?.isInsight),
  };
}

// Ordered section keys per layout variant. BlogArticleView renders sections in
// this order, so posts with different variants do not look templated.
export type BlogSection = "body" | "map" | "gallery" | "venues" | "faq" | "sources";

export function sectionOrder(variant: BlogLayoutVariant): BlogSection[] {
  switch (variant) {
    case "gallery":
      return ["gallery", "body", "venues", "map", "faq", "sources"];
    case "map":
      return ["map", "body", "venues", "gallery", "faq", "sources"];
    case "qa":
      return ["body", "faq", "venues", "gallery", "map", "sources"];
    case "standard":
    default:
      return ["body", "map", "gallery", "venues", "faq", "sources"];
  }
}

// schema.org JSON-LD for a blog post, including an FAQPage node when the article
// carries FAQ items. Injected into the prerendered <head>.
export function buildBlogJsonLd(article: BlogArticle): Record<string, unknown> {
  const url = blogUrl(article.slug);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: article.title,
      description: article.metaDescription,
      image: [absoluteUrl(article.heroImage)],
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      articleSection: article.category,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Organization", name: article.author, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "OMA Townhouse",
        url: SITE_URL,
      },
    },
  ];

  if (article.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
