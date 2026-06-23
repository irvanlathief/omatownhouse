import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";

// Shared chat state + logic for the "Ask AI" assistant. Extracted from Home so
// the chat can be rendered on multiple pages (homepage, blog) and, crucially,
// so the presentational chat components live at module scope. Keeping the input
// in stable, module-scope components (see AskAiChat.tsx) is what fixes the
// focus-loss-on-every-keystroke bug: the page re-renders on typing, but the
// input is never unmounted/remounted.

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const WELCOME_TEXT =
  "Hey, welcome to OMA Townhouse.\n\nAre you looking to invest in Kaba Kaba, Bali?";

export function useAskAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | undefined>();
  const [leadCollected, setLeadCollected] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.send.useMutation();

  // The welcome message is shown statically. The earlier typewriter animation
  // pulled attention on landing; the static text keeps the chat looking ready
  // without grabbing focus.
  const displayedText = WELCOME_TEXT;
  const isTypingComplete = true;

  // Auto-scroll to the latest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatOpen]);

  // Send `content` to the assistant and append the reply. Shared by the normal
  // send flow and the pricing "I'm interested" flow.
  const sendContent = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatMutation.mutateAsync({
        message: content,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
      });

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: response.reply },
      ]);

      if (response.leadCollected) {
        setLeadCollected(true);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I apologize, but I'm having trouble responding right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const content = inputValue.trim();
    setInputValue("");
    await sendContent(content);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openDocument = (docId: string) => {
    setSelectedDocId(docId);
    setShowDocuments(true);
  };

  const closeDocuments = () => {
    setShowDocuments(false);
    setSelectedDocId(undefined);
  };

  // Pricing CTA: open the mobile sheet and ask about a specific tier.
  const sendInterest = (tierName: string, price: string) => {
    setIsChatOpen(true);
    void sendContent(
      `I'm interested in the ${tierName} option at ${price}. Can you help me with the next steps?`,
    );
  };

  const openMobile = () => setIsChatOpen(true);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    leadCollected,
    displayedText,
    isTypingComplete,
    isChatOpen,
    setChatOpen: setIsChatOpen,
    showDocuments,
    selectedDocId,
    closeDocuments,
    messagesEndRef,
    handleSend,
    handleKeyPress,
    openDocument,
    sendInterest,
    openMobile,
  };
}

export type AskAiChat = ReturnType<typeof useAskAiChat>;
