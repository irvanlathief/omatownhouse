import { useEffect } from "react";
import { useLocation } from "wouter";
import { ChatDrawer } from "@/components/AskAiChat";
import { useAskAiChat } from "@/hooks/useAskAiChat";

export function SiteAiAssistant() {
  const chat = useAskAiChat();
  const [location] = useLocation();
  const isInvestorPage = location.startsWith("/investors");

  useEffect(() => {
    const open = () => chat.setChatOpen(true);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") chat.setChatOpen(false);
    };

    window.addEventListener("oma:open-chat", open);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("oma:open-chat", open);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [chat.setChatOpen]);

  useEffect(() => {
    document.body.classList.toggle("oma-chat-open", chat.isChatOpen);
    return () => document.body.classList.remove("oma-chat-open");
  }, [chat.isChatOpen]);

  return (
    <>
      {!chat.isChatOpen && (
        <button
          type="button"
          onClick={() => chat.setChatOpen(true)}
          className={`oma-guide-trigger fixed right-5 z-[70] flex items-center gap-3 rounded-full bg-black px-4 py-3 text-sm font-medium text-white shadow-[0_16px_45px_rgba(0,0,0,0.24)] transition-transform duration-300 hover:-translate-y-1 sm:bottom-7 sm:right-7 sm:px-5 ${
            isInvestorPage ? "bottom-20" : "bottom-5"
          }`}
          aria-label="Open OMA AI property guide"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[9px] font-semibold tracking-tight text-black">
            OMA
          </span>
          <span>Ask OMA</span>
        </button>
      )}
      <ChatDrawer chat={chat} />
    </>
  );
}
