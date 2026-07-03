import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { sendEmail } from "./_core/email";

vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
}));

vi.mock("./_core/email", () => ({
  sendEmail: vi.fn().mockResolvedValue(true),
}));

let contextCounter = 0;

function createPublicContext(): TrpcContext {
  contextCounter += 1;
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {
        "x-forwarded-for": `203.0.113.${contextCounter}`,
      },
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("investor.requestPack", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts a qualified pack request and sends both emails", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    const result = await caller.investor.requestPack({
      name: "Sample Buyer",
      email: "buyer@example.com",
      whatsapp: "+1 555 123 4567",
      country: "United States",
      budgetRange: "USD 150k-250k",
      purchaseTimeline: "Within 3 months",
      ownershipInterest: "40-year leasehold",
      message: "I plan to use it for part of the year.",
    });

    expect(result).toEqual({ ok: true });
    expect(sendEmail).toHaveBeenCalledTimes(2);
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "buyer@example.com",
        subject: "OMA Townhouse - your investor pack request",
      })
    );
  });

  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.investor.requestPack({
        name: "Sample Buyer",
        email: "not-an-email",
        whatsapp: "+1 555 123 4567",
      })
    ).rejects.toThrow();
  });

  it("requires a usable WhatsApp number", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.investor.requestPack({
        name: "Sample Buyer",
        email: "buyer@example.com",
        whatsapp: "1",
      })
    ).rejects.toThrow();
  });
});
