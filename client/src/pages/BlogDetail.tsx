import { useEffect } from "react";
import { useRoute } from "wouter";
import { MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { BlogArticleView } from "@/components/BlogArticleView";
import { SiteHeader } from "@/components/SiteHeader";
import { ChatPanel, ChatSheet, ChatDocViewer } from "@/components/AskAiChat";
import { useAskAiChat } from "@/hooks/useAskAiChat";
import { toBlogArticle, blogUrl } from "@/lib/blogLayout";
import NotFound from "./NotFound";

// Client route component for /blog/:slug.
//
// On a prerendered page the article data is baked into window.__BLOG_ARTICLE__,
// so the first client render is immediate and matches the static HTML. For
// in-app navigation (e.g. from the homepage Insights row) it falls back to the
// tRPC lifestyle.list query and finds the article by slug.
//
// The chat (SiteHeader is pure; the chat uses hooks/tRPC) lives only here in the
// client route, never in BlogArticleView, so the prerender/SSR path stays pure.
export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const chat = useAskAiChat();

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
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="lg:flex lg:gap-12">
            {/* Article */}
            <div className="flex-1 min-w-0">
              <BlogArticleView article={article} />
            </div>
            {/* Sticky chat panel (desktop) */}
            <div className="hidden lg:block w-[380px] flex-shrink-0">
              <div className="sticky top-24 py-6">
                <ChatPanel chat={chat} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: floating Ask AI button + slide-up sheet */}
        <button
          onClick={() => chat.openMobile()}
          className="lg:hidden fixed bottom-5 right-5 z-40 bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-full font-medium shadow-lg flex items-center gap-2 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Ask AI
        </button>
        <ChatSheet chat={chat} />
        <ChatDocViewer chat={chat} />
      </div>
    );
  }

  // Still resolving the article list.
  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-white">
        <SiteHeader />
        <div className="flex items-center justify-center py-32">
          <p className="text-gray-400 text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  // List loaded but no matching slug.
  return <NotFound />;
}
