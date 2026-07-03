export const OPERATING_ASSUMPTIONS = {
  managementRate: 0.18,
  utilitiesRate: 0.07,
  fixedAnnualUsd: 4_200,
} as const;

export const PAYMENT_MILESTONES = [
  {
    key: "contract",
    percent: 0.3,
    label: "Reservation and contract",
    detail: "Secures the unit and starts the legal documentation.",
  },
  {
    key: "construction",
    percent: 0.3,
    label: "Construction milestone",
    detail: "Released after progress review and owner inspection.",
  },
  {
    key: "handover",
    percent: 0.4,
    label: "Completion and handover",
    detail: "Due before practical completion and key handover.",
  },
] as const;

export const OWNERSHIP_OPTIONS = [
  {
    key: "lease25",
    term: "25-year leasehold",
    priceUsd: 115_000,
    earlyBirdPrice: "USD 115,000",
    standardPrice: "USD 135,000",
    note: "The simplest way in",
    description:
      "A lower entry point with renewal language agreed in the legal documents.",
  },
  {
    key: "lease40",
    term: "40-year leasehold",
    priceUsd: 161_000,
    earlyBirdPrice: "USD 161,000",
    standardPrice: "USD 189,000",
    note: "A longer horizon",
    description:
      "More time in the asset and a lower effective holding cost per year.",
  },
  {
    key: "freehold",
    term: "Freehold via PT PMA",
    priceUsd: 265_000,
    earlyBirdPrice: "USD 265,000",
    standardPrice: "USD 310,000",
    note: "Built for permanence",
    description:
      "HGB held by a foreign-owned company for long-term control and operation.",
  },
] as const;

export type OwnershipKey = (typeof OWNERSHIP_OPTIONS)[number]["key"];

export function formatUsd(value: number) {
  return `USD ${Math.round(value).toLocaleString("en-US")}`;
}

export function calculateInvestment({
  nightlyRate,
  nightsPerMonth,
  priceUsd,
}: {
  nightlyRate: number;
  nightsPerMonth: number;
  priceUsd: number;
}) {
  const grossAnnual =
    Math.max(0, nightlyRate) * Math.max(0, nightsPerMonth) * 12;
  const managementCost = grossAnnual * OPERATING_ASSUMPTIONS.managementRate;
  const utilitiesReserve = grossAnnual * OPERATING_ASSUMPTIONS.utilitiesRate;
  const fixedOperations = OPERATING_ASSUMPTIONS.fixedAnnualUsd;
  const netAnnual = Math.max(
    0,
    grossAnnual - managementCost - utilitiesReserve - fixedOperations
  );
  const monthlyNet = netAnnual / 12;
  const occupancyRate = Math.min(1, Math.max(0, nightsPerMonth) / 30);
  const netYield = priceUsd > 0 ? netAnnual / priceUsd : 0;
  const paybackYears =
    priceUsd > 0 && netAnnual > 0 ? priceUsd / netAnnual : null;

  const payments = PAYMENT_MILESTONES.map(milestone => ({
    ...milestone,
    amountUsd: priceUsd * milestone.percent,
  }));

  return {
    grossAnnual,
    managementCost,
    utilitiesReserve,
    fixedOperations,
    netAnnual,
    monthlyNet,
    occupancyRate,
    netYield,
    paybackYears,
    payments,
  };
}
