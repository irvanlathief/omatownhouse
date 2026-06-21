import { useState, useEffect, useCallback } from "react";
import { ExternalLink, X } from "lucide-react";

interface ExternalLinkConfirmProps {
  children: React.ReactNode;
}

export function ExternalLinkConfirm({ children }: ExternalLinkConfirmProps) {
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a[data-external='true'], a[target='_blank']") as HTMLAnchorElement | null;
    
    if (!anchor) return;
    
    const href = anchor.getAttribute("href");
    if (!href) return;
    
    // Skip internal links
    if (href.startsWith("/") || href.startsWith("#")) return;
    
    // Skip same-domain links
    try {
      const url = new URL(href, window.location.origin);
      if (url.origin === window.location.origin) return;
    } catch {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    setPendingUrl(href);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handleClick]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (pendingUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [pendingUrl]);

  const handleProceed = () => {
    if (pendingUrl) {
      window.open(pendingUrl, "_blank", "noopener,noreferrer");
    }
    setPendingUrl(null);
  };

  const handleStay = () => {
    setPendingUrl(null);
  };

  // Truncate long URLs for display
  const displayUrl = pendingUrl && pendingUrl.length > 60 
    ? pendingUrl.substring(0, 57) + "..." 
    : pendingUrl;

  return (
    <>
      {children}

      {/* Confirmation Modal */}
      {pendingUrl && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
            onClick={handleStay}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in zoom-in-95 duration-200">
              {/* Close button */}
              <button 
                onClick={handleStay}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ExternalLink className="w-6 h-6 text-gray-700" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Opening external link
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                This will open a new tab to:
              </p>
              <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 mb-6 break-all font-mono">
                {displayUrl}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleStay}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Stay on OMA
                </button>
                <button
                  onClick={handleProceed}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black transition-colors"
                >
                  Open link
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
