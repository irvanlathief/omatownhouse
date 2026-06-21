import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: "Thank you for your interest in OMA Townhouse! Kaba Kaba is indeed a wonderful investment opportunity. The area offers tranquility while being just 25-30 minutes from Seminyak and Canggu.",
        },
      },
    ],
  }),
}));

// Mock the database
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
}));

// Mock notifications
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("chat.send", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should respond to a simple message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.send({
      message: "Tell me about Kaba Kaba",
      history: [],
    });

    expect(result).toHaveProperty("reply");
    expect(result.reply).toContain("OMA Townhouse");
    expect(result).toHaveProperty("leadCollected");
    expect(result.leadCollected).toBe(false);
  });

  it("should accept message with conversation history", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.send({
      message: "What are the prices?",
      history: [
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Welcome to OMA Townhouse!" },
      ],
    });

    expect(result).toHaveProperty("reply");
    expect(typeof result.reply).toBe("string");
  });

  it("should handle empty history array", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.send({
      message: "I want to invest",
      history: [],
    });

    expect(result).toHaveProperty("reply");
    expect(result.leadCollected).toBe(false);
  });
});

describe("chat input validation", () => {
  it("should reject empty messages", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.chat.send({
        message: "",
        history: [],
      })
    ).rejects.toThrow();
  });
});
