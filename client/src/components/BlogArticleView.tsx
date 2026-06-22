// Presentational, side-effect-free renderer for a single blog post.
//
// This component is intentionally pure: it takes a normalised BlogArticle and
// renders markup with no hooks, no browser APIs, no wouter and no tRPC. That is
// what lets the build-time prerender (scripts/prerender-blog.ts) render it to a
// static HTML string with renderToString, while the client BlogDetail container
// wraps it for in-app navigation. Keep imports relative (no `@/` alias) so the
// esbuild prerender bundle resolves cleanly under Node.

import {
  type BlogArticle,
  type BlogSection,
  getDirectionsUrl,
  getMapEmbedUrl,
  sectionOrder,
} from "../lib/blogLayout";

const CATEGORY_LABELS: Record<string, string> = {
  fitness: "Fitness",
  dining: "Cafes and dining",
  lifestyle: "Lifestyle",
  wellness: "Wellness",
  community: "Community",
  development: "Development",
  family: "Family",
  investment: "Investment",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function MapSection({ article }: { article: BlogArticle }) {
  if (!article.showMap) return null;
  return (
    <section className="py-6 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">On the map</h2>
      <div className="rounded-xl overflow-hidden aspect-video bg-gray-100">
        <iframe
          src={getMapEmbedUrl(article.mapCoords)}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map near ${article.title}`}
        />
      </div>
      <p className="text-gray-500 text-xs mt-2">
        Distances are measured by road from OMA Townhouse in Kaba Kaba, Tabanan.
      </p>
    </section>
  );
}

function VenuesSection({ article }: { article: BlogArticle }) {
  if (!article.venues || article.venues.length === 0) return null;
  return (
    <section className="py-6 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Nearby, and how far</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {article.venues.map((venue, idx) => (
          <a
            key={idx}
            href={getDirectionsUrl(venue.coords)}
            data-external="true"
            className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-700 font-medium">{venue.name}</span>
            <span className="text-gray-900">{venue.distance}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ article }: { article: BlogArticle }) {
  if (!article.faq || article.faq.length === 0) return null;
  return (
    <section className="py-6 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently asked questions</h2>
      <div className="border-t border-gray-200">
        {article.faq.map((item, idx) => (
          <div key={idx} className="py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{item.question}</p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SourcesSection({ article }: { article: BlogArticle }) {
  if (!article.citations || article.citations.length === 0) return null;
  return (
    <section className="py-6 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Sources</h2>
      <ul className="space-y-2 text-sm">
        {article.citations.map((c, idx) => (
          <li key={idx} className="text-gray-600">
            <a href={c.url} data-external="true" className="text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-900 transition-colors">
              {c.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BodySection({ article }: { article: BlogArticle }) {
  return (
    <section className="py-6">
      <div
        className="text-gray-700 leading-relaxed space-y-4 [&_p]:text-[15px] [&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-gray-300 hover:[&_a]:decoration-gray-900 [&_a]:transition-colors"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </section>
  );
}

export function BlogArticleView({ article }: { article: BlogArticle }) {
  const order = sectionOrder(article.layoutVariant);
  const categoryLabel = CATEGORY_LABELS[article.category] || article.category;
  const showDisclaimer = article.category === "investment" || article.category === "development";

  const renderSection = (section: BlogSection) => {
    switch (section) {
      case "body":
        return <BodySection key="body" article={article} />;
      case "map":
        return <MapSection key="map" article={article} />;
      case "venues":
        return <VenuesSection key="venues" article={article} />;
      case "faq":
        return <FaqSection key="faq" article={article} />;
      case "sources":
        return <SourcesSection key="sources" article={article} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        {/* Breadcrumb / back link */}
        <nav className="py-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <a href="/" className="hover:text-gray-900 transition-colors">
            OMA Townhouse
          </a>
          <span className="px-2 text-gray-300">/</span>
          <span className="text-gray-700">Insights</span>
        </nav>

        {/* Hero */}
        <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-6">
          <img src={article.heroImage} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Title + meta */}
        <header className="pb-6 border-b border-gray-200">
          <span className="inline-block text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">
            {categoryLabel}
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight mb-3">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
            <span>{article.author}</span>
            <span className="text-gray-300">•</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span className="text-gray-300">•</span>
            <span>{article.readingTime} min read</span>
          </div>
          {article.metaDescription && (
            <p className="text-gray-600 text-base leading-relaxed mt-4">{article.metaDescription}</p>
          )}
        </header>

        {/* Sections, ordered by layout variant */}
        {order.map((section) => renderSection(section))}

        {showDisclaimer && (
          <p className="mt-8 text-xs text-gray-400 leading-relaxed border-t border-gray-200 pt-6">
            This article is general information, not financial, legal or tax advice. Any yield, price
            or appreciation figures are ranges and not guarantees. Confirm current pricing, ownership
            structures and regulations with the OMA Townhouse team and a qualified adviser before you
            commit.
          </p>
        )}

        {/* Back to property */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            View OMA Townhouse
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogArticleView;
