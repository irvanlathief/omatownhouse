import { useEffect } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { BlogArticleView } from "@/components/BlogArticleView";
import { toBlogArticle, blogUrl } from "@/lib/blogLayout";
import NotFound from "./NotFound";

// Client route component for /blog/:slug.
//
// On a prerendered page the article data is baked into window.__BLOG_ARTICLE__,
// so the first client render is immediate and matches the static HTML. For
// in-app navigation (e.g. from the homepage Insights row) it falls back to the
// tRPC lifestyle.list query and finds the article by slug.
export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";

  const baked =
    typeof window !== "undefined" && (window as any).__BLOG_ARTICLE__?.slug === slug
      ? (window as any).__BLOG_ARTICLE__
      : undefined;

  // Only fetch when we do not already have baked data for this slug.
  const { data, isLoading } = trpc.lifestyle.list.useQuery(undefined, {
    enabled: !baked,
  });

  const raw = baked ?? data?.find((a) => a.slug === slug);
  const article = raw ? toBlogArticle(raw) : null;

  useEffect(() => {
    if (!article) return;
    const prevTitle = document.title;
    document.title = `${article.title} | OMA Townhouse`;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute("href") ?? null;
    if (canonical) canonical.setAttribute("href", blogUrl(article.slug));
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (canonical && prevCanonical) canonical.setAttribute("href", prevCanonical);
    };
  }, [article?.slug]);

  if (article) {
    return <BlogArticleView article={article} />;
  }

  // Still resolving the article list.
  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading article...</p>
      </div>
    );
  }

  // List loaded but no matching slug.
  return <NotFound />;
}
