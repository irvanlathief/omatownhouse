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
  "Hey, welcome to OMA Townhouse.\n\nHappy to walk you through the townhouse, the Kaba Kaba area, or how buying here works. What's on your mind?";

const INVESTOR_WELCOME_TEXT =
  "You are looking at the full OMA investor case.\n\nI can help you compare ownership routes, understand the floor plans, or question the return assumptions. Where should we start?";

function getInlineFallback(content: string) {
  const normalized = content.toLowerCase();

  if (normalized.includes("render")) {
    return `Here is one of the main living-space renders. The ground floor keeps the kitchen, dining and lounge open to the private pool.

![OMA Townhouse living space](https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene32.webp)`;
  }

  if (normalized.includes("layout") || normalized.includes("floor plan")) {
    return `OMA is 97.5 sqm across two floors. The 66.7 sqm ground floor holds the main living spaces, pool and one bedroom, while the 30.8 sqm upper floor creates a quieter second bedroom.

![OMA Townhouse first-floor plan](/property-docs/floor-plan-first.webp)`;
  }

  if (normalized.includes("price") || normalized.includes("early-bird")) {
    return `The first-building early-bird allocation is 15% below standard pricing, with a 30% deposit due within 14 days.

\`\`\`pricing
\`\`\``;
  }

  if (normalized.includes("where") || normalized.includes("nearby")) {
    return `OMA is in Kaba Kaba, Tabanan. Kaba Kaba Social is 2 to 5 minutes away, Nuanu and Kedungu are 10 to 15 minutes, and Canggu is around 25 minutes.

\`\`\`chips
What's Kaba Kaba like? | How far is the beach? | How does buying work?
\`\`\``;
  }

  return "I'm having trouble reaching the live guide right now. The OMA team can still help with the property, pricing or Kaba Kaba area.";
}

export function useAskAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadCollected, setLeadCollected] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.send.useMutation();

  // The welcome message is shown statically. The earlier typewriter animation
  // pulled attention on landing; the static text keeps the chat looking ready
  // without grabbing focus.
  const displayedText =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/investors")
      ? INVESTOR_WELCOME_TEXT
      : WELCOME_TEXT;
  const isTypingComplete = true;

  // Keep the message list pinned to the latest message WITHOUT scrolling the
  // page. scrollIntoView bubbles up and hijacks the window scroll (and fired on
  // mount, jumping the page down to the chat), so instead we set the scroll
  // container's scrollTop directly. Skip the first render (no messages yet).
  useEffect(() => {
    if (messages.length === 0) return;
    const container = messagesEndRef.current?.parentElement;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  // The desktop guide sits beside the page, so only lock scrolling when the
  // drawer occupies the full mobile viewport.
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (isChatOpen && isMobile) {
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

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatMutation.mutateAsync({
        message: content,
        history: messages.map(m => ({ role: m.role, content: m.content })),
      });

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.reply,
        },
      ]);

      if (response.leadCollected) {
        setLeadCollected(true);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getInlineFallback(content),
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

  // Pricing CTA: open the mobile sheet and ask about a specific tier.
  const sendInterest = (tierName: string, price: string) => {
    setIsChatOpen(true);
    void sendContent(
      `I'm interested in the ${tierName} option at ${price}. Can you help me with the next steps?`
    );
  };

  // Starter prompts shown in the empty chat: fire a ready-made question so a
  // visitor can get going in one tap instead of having to think of what to ask.
  const askQuestion = (text: string) => {
    if (isLoading) return;
    void sendContent(text);
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
    messagesEndRef,
    handleSend,
    handleKeyPress,
    sendInterest,
    askQuestion,
    openMobile,
  };
}

export type AskAiChat = ReturnType<typeof useAskAiChat>;
