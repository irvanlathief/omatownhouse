import { Home as HomeIcon, Image, DollarSign, MapPin, ArrowRight, X } from "lucide-react";
import { Streamdown } from "streamdown";
import { DocumentViewer } from "@/components/DocumentViewer";
import type { AskAiChat } from "@/hooks/useAskAiChat";

// Presentational chat UI. These components are defined at MODULE SCOPE (not
// inside a page component), so a page re-render on each keystroke re-renders
// them with new props but never remounts the <input> -> focus is retained.

const QUICK_DOCS = [
  { id: "layout", name: "Layouts", icon: HomeIcon },
  { id: "renders", name: "Renders", icon: Image },
  { id: "pricing", name: "Pricing", icon: DollarSign },
  { id: "location", name: "Location", icon: MapPin },
];

// Renders an assistant message, handling inline image markdown and links.
function RichChatMessage({ content }: { content: string }) {
  const parts = content.split(/(!\[.*?\]\(.*?\))/);
  return (
    <div className="text-sm leading-relaxed space-y-2">
      {parts.map((part, idx) => {
        const imgMatch = part.match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
          return (
            <img
              key={idx}
              src={imgMatch[2]}
              alt={imgMatch[1]}
              className="rounded-lg w-full max-w-[280px] mt-1 mb-1"
              loading="lazy"
            />
          );
        }
        if (part.trim()) {
          return (
            <div
              key={idx}
              className="prose prose-gray prose-sm max-w-none [&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium [&_img]:rounded-lg [&_img]:max-w-full"
            >
              <Streamdown>{part}</Streamdown>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function MessageList({ chat, maxWidth }: { chat: AskAiChat; maxWidth: string }) {
  return (
    <>
      <div className="flex justify-start">
        <div className={`bg-gray-100 px-3 py-2 rounded-2xl rounded-tl-md ${maxWidth}`}>
          <p className="text-gray-800 whitespace-pre-line text-sm leading-relaxed">
            {chat.displayedText}
            {!chat.isTypingComplete && <span className="typing-cursor ml-0.5 text-gray-400">|</span>}
          </p>
        </div>
      </div>

      {chat.messages.map((message) => (
        <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`px-3 py-2 rounded-2xl ${maxWidth} ${
              message.role === "user"
                ? "bg-gray-900 text-white rounded-tr-md"
                : "bg-gray-100 text-gray-800 rounded-tl-md"
            }`}
          >
            {message.role === "assistant" ? (
              <RichChatMessage content={message.content} />
            ) : (
              <p className="text-sm leading-relaxed">{message.content}</p>
            )}
          </div>
        </div>
      ))}

      {chat.isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-tl-md">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}

      {chat.leadCollected && (
        <div className="flex justify-center">
          <div className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs">We'll be in touch soon ✓</div>
        </div>
      )}

      <div ref={chat.messagesEndRef} />
    </>
  );
}

function QuickDocs({ chat }: { chat: AskAiChat }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {QUICK_DOCS.map((doc) => (
        <button
          key={doc.id}
          onClick={() => chat.openDocument(doc.id)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 whitespace-nowrap text-xs font-medium transition-colors"
        >
          <doc.icon className="w-3 h-3" />
          {doc.name}
        </button>
      ))}
    </div>
  );
}

// Desktop sidebar card.
export function ChatPanel({ chat }: { chat: AskAiChat }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg flex flex-col h-[520px]">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Ask about OMA Townhouse</h3>
        <p className="text-sm text-gray-500">AI-powered property assistant</p>
      </div>

      <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-3">
        <MessageList chat={chat} maxWidth="max-w-[90%]" />
      </div>

      <div className="px-4 pb-2">
        <QuickDocs chat={chat} />
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={chat.inputValue}
            onChange={(e) => chat.setInputValue(e.target.value)}
            onKeyPress={chat.handleKeyPress}
            placeholder="Ask anything..."
            disabled={chat.isLoading}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 text-sm transition-all"
          />
          <button
            onClick={chat.handleSend}
            disabled={!chat.inputValue.trim() || chat.isLoading}
            className="bg-gray-900 hover:bg-black text-white rounded-full w-10 h-10 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-gray-400 text-[10px] mt-2">AI-powered • Verify info with our team</p>
      </div>
    </div>
  );
}

// Mobile slide-up sheet. The trigger (an "Ask AI" button) is supplied by the
// page, so this only renders the backdrop + sheet, gated on chat.isChatOpen.
export function ChatSheet({ chat }: { chat: AskAiChat }) {
  if (!chat.isChatOpen) return null;
  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={() => chat.setChatOpen(false)} />

      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-center py-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-900">Ask about OMA Townhouse</h3>
            <p className="text-xs text-gray-500">AI-powered property assistant</p>
          </div>
          <button
            onClick={() => chat.setChatOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-3 min-h-[300px] max-h-[50vh]">
          <MessageList chat={chat} maxWidth="max-w-[85%]" />
        </div>

        <div className="px-4 pb-2">
          <QuickDocs chat={chat} />
        </div>

        <div className="p-4 border-t border-gray-100 pb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={chat.inputValue}
              onChange={(e) => chat.setInputValue(e.target.value)}
              onKeyPress={chat.handleKeyPress}
              placeholder="Ask anything about OMA..."
              disabled={chat.isLoading}
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 text-sm transition-all"
            />
            <button
              onClick={chat.handleSend}
              disabled={!chat.inputValue.trim() || chat.isLoading}
              className="bg-gray-900 hover:bg-black text-white rounded-full w-12 h-12 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-gray-400 text-[10px] mt-2">AI-powered • Verify info with our team</p>
        </div>
      </div>
    </div>
  );
}

// Document viewer modal, driven by chat state. Render once at page top level.
export function ChatDocViewer({ chat }: { chat: AskAiChat }) {
  return <DocumentViewer isOpen={chat.showDocuments} onClose={chat.closeDocuments} documentId={chat.selectedDocId} />;
}
