import { describe, expect, it } from "vitest";
import {
  calculateInvestment,
  formatUsd,
  OWNERSHIP_OPTIONS,
} from "./investment";

describe("calculateInvestment", () => {
  it("calculates the default operating case", () => {
    const result = calculateInvestment({
      nightlyRate: 200,
      nightsPerMonth: 18,
      priceUsd: OWNERSHIP_OPTIONS[0].priceUsd,
    });

    expect(result.grossAnnual).toBe(43_200);
    expect(result.managementCost).toBeCloseTo(7_776, 6);
    expect(result.utilitiesReserve).toBeCloseTo(3_024, 6);
    expect(result.fixedOperations).toBe(4_200);
    expect(result.netAnnual).toBeCloseTo(28_200, 6);
    expect(result.occupancyRate).toBe(0.6);
    expect(result.paybackYears).toBeCloseTo(5.638, 3);
  });

  it("returns no payback when operations produce no net income", () => {
    const result = calculateInvestment({
      nightlyRate: 80,
      nightsPerMonth: 0,
      priceUsd: OWNERSHIP_OPTIONS[1].priceUsd,
    });

    expect(result.netAnnual).toBe(0);
    expect(result.netYield).toBe(0);
    expect(result.paybackYears).toBeNull();
  });

  it("uses the agreed 30 / 30 / 40 payment schedule", () => {
    const result = calculateInvestment({
      nightlyRate: 200,
      nightsPerMonth: 18,
      priceUsd: OWNERSHIP_OPTIONS[2].priceUsd,
    });

    expect(result.payments.map(payment => payment.amountUsd)).toEqual([
      89_700, 89_700, 119_600,
    ]);
    expect(
      result.payments.reduce((sum, payment) => sum + payment.amountUsd, 0)
    ).toBe(299_000);
  });

  it("changes yield and payback with the ownership tier price", () => {
    const lease = calculateInvestment({
      nightlyRate: 200,
      nightsPerMonth: 18,
      priceUsd: OWNERSHIP_OPTIONS[0].priceUsd,
    });
    const freehold = calculateInvestment({
      nightlyRate: 200,
      nightsPerMonth: 18,
      priceUsd: OWNERSHIP_OPTIONS[2].priceUsd,
    });

    expect(lease.netYield).toBeGreaterThan(freehold.netYield);
    expect(lease.paybackYears!).toBeLessThan(freehold.paybackYears!);
  });
});

describe("formatUsd", () => {
  it("formats rounded USD values consistently", () => {
    expect(formatUsd(79_499.6)).toBe("USD 79,500");
  });
});

describe("ownership pricing", () => {
  it("keeps the 2026 founding-release ladder in one shared source", () => {
    expect(OWNERSHIP_OPTIONS.map(option => option.priceUsd)).toEqual([
      159_000, 219_000, 299_000,
    ]);
    expect(OWNERSHIP_OPTIONS.map(option => option.standardPrice)).toEqual([
      "USD 189,000",
      "USD 259,000",
      "USD 349,000",
    ]);
  });
});
