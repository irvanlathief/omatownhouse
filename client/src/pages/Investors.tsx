import { useState, useEffect, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Check, ArrowRight, Info } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "oma_investor_access_v1";

const GALLERY_BASE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery";
const SCENE = (n: number) => `${GALLERY_BASE}/Scene${n}.webp`;
const INVESTOR_HERO_IMAGE = "/investors-hero.png";

// Defaults calibrated for OMA's premium two-bed pool townhouse spec.
// Airbnb's area estimate for a generic Kaba-Kaba 2BR is about USD 83/night;
// OMA is positioned above that on design, pool and 97.5 sqm. The slider lets
// a visitor dial it down to area-average or up to upside without us hand-waving.
const DEFAULT_NIGHTLY = 200;
const DEFAULT_NIGHTS = 18; // ~60% occupancy

// Three ownership tiers, matching the homepage chat pricing.
const TIERS = [
  {
    key: "lease25",
    label: "25-year leasehold",
    priceUsd: 115_000,
    note: "Simplest entry",
  },
  {
    key: "lease40",
    label: "40-year leasehold",
    priceUsd: 161_000,
    note: "Lower per-year hold cost",
  },
  {
    key: "freehold",
    label: "Freehold (PT PMA)",
    priceUsd: 265_000,
    note: "Asset held by your PT PMA",
  },
] as const;

interface AccessRecord {
  name: string;
  email: string;
  whatsapp: string;
  unlockedAt: string;
}

function formatUsd(n: number): string {
  return "USD " + Math.round(n).toLocaleString("en-US");
}

export default function Investors() {
  const [access, setAccess] = useState<AccessRecord | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    accessCode: "",
    message: "",
  });
  const [waitingForCode, setWaitingForCode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAccess(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
  }, []);

  const requestAccess = trpc.investor.requestAccess.useMutation({
    onSuccess: (data) => {
      if (data.accessGranted) {
        const record: AccessRecord = {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          whatsapp: form.whatsapp.trim(),
          unlockedAt: new Date().toISOString(),
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
        } catch {
          // private mode, fine
        }
        setAccess(record);
        toast.success(
          "Welcome. The full pitch is unlocked, and we've messaged you on the email you provided."
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setWaitingForCode(true);
        toast.success(
          "Got it. The team will WhatsApp you the access code shortly."
        );
      }
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.whatsapp.trim()) return;
    requestAccess.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      country: form.country.trim() || undefined,
      accessCode: form.accessCode.trim() || undefined,
      message: form.message.trim() || undefined,
    });
  }

  const unlocked = !!access;
  const firstName = access?.name?.split(" ")[0];

  return (
    <div className="relative bg-white text-gray-900">
      <SiteHeader overlay inverted />

      <EarningsHero />
      <MethodologyDisclosure />
      <PaybackCalculator />
      <BrandBand />

      {!unlocked && (
        <AccessGate
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          submitting={requestAccess.isPending}
          waitingForCode={waitingForCode}
        />
      )}

      {unlocked && (
        <section className="bg-stone-50 border-y border-stone-200">
          <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-3 text-sm text-stone-700">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Welcome{firstName ? `, ${firstName}` : ""}. The full pitch is
              unlocked on this browser. Our team will follow up over WhatsApp
              within 24 hours.
            </span>
          </div>
        </section>
      )}

      {unlocked && <InvestorContent />}

      <FooterCta unlocked={unlocked} />
    </div>
  );
}

function EarningsHero() {
  return (
    <section className="relative h-[600px] overflow-hidden bg-stone-950 text-white">
      <img
        src={INVESTOR_HERO_IMAGE}
        alt="OMA Townhouse exterior hero"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/62 via-black/34 to-black/12" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-black/12" />

      <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-16 pt-32 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/78 backdrop-blur-sm">
            <span>Investor Page</span>
            <span className="text-white/35">·</span>
            <span>Kaba Kaba, Bali</span>
          </div>
          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            One of Bali&apos;s last true pockets of peace, with the right kind of ROI behind it.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            OMA Townhouse is designed for buyers who want calm, scarcity and a
            return profile that still feels grounded in the place itself.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.2em] text-white/76">
            <span className="rounded-full border border-white/18 bg-black/18 px-3 py-2 backdrop-blur-sm">
              Kaba Kaba
            </span>
            <span className="rounded-full border border-white/18 bg-black/18 px-3 py-2 backdrop-blur-sm">
              Modern Tropical Townhouse
            </span>
            <span className="rounded-full border border-white/18 bg-black/18 px-3 py-2 backdrop-blur-sm">
              Investor Preview
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodologyDisclosure() {
  const [open, setOpen] = useState(false);
  return (
    <section className="border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900"
        >
          <Info className="w-4 h-4" />
          How this is estimated
          <ArrowRight
            className={`w-3.5 h-3.5 transition-transform ${
              open ? "rotate-90" : ""
            }`}
          />
        </button>
        {open && (
          <div className="mt-6 max-w-3xl text-sm text-stone-700 leading-relaxed space-y-4">
            <p className="italic text-stone-500">
              From Airbnb's host earnings estimator (used unchanged for the
              area-wide figure; OMA's per-night uplift is described after):
            </p>
            <p>
              "To estimate your earnings, we review the past 12 months of
              booking data from similar Airbnb listings. We choose these
              listings based on the information you share about your place. If
              you enter an address, you'll get a more specific estimate based
              on the listings closest to you. If you enter an area, we look at
              the top 50% of similar listings in that area, based on their
              earnings."
            </p>
            <p>
              "Based on these similar listings, we estimate the average nightly
              earnings and multiply that number by the number of nights you
              indicate you will host. We also provide the average number of
              nights booked per month in your area, assuming places are
              available on Airbnb every night of the month. Nightly earnings
              are the price set by each Host minus the Airbnb Host service
              fee. We don't subtract taxes or hosting expenses."
            </p>
            <p>
              "Your actual earnings will depend on several factors, including
              your availability, price, and the demand in your area. Your
              ability to host may also depend on local laws. These earning
              estimates are not an appraisal or estimate of property value."
            </p>
            <div className="border-t border-stone-200 pt-4 text-stone-700">
              <strong className="text-stone-900">OMA's adjustment.</strong>{" "}
              Airbnb's area estimate for a generic Kaba-Kaba 2-bed sits around
              USD 83 per night. OMA is positioned above that on design,
              private pool and 97.5 sqm, which is why our default rate of USD
              200 per night reflects what comparable design-led villas with a
              pool achieve in the western corridor. Slide it down toward the
              area average if you want to see the conservative case.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PaybackCalculator() {
  const [nightly, setNightly] = useState(DEFAULT_NIGHTLY);
  const [nights, setNights] = useState(DEFAULT_NIGHTS);

  const grossAnnual = nightly * nights * 12;
  // Net of: 18% management benchmark, USD 4,200 fixed core ops,
  // 7% reserve for utilities and consumables. Indonesian tax sits below this.
  const FIXED_OPS_USD = 4_200;
  const netAnnual = useMemo(() => {
    const mgmt = grossAnnual * 0.18;
    const reserve = grossAnnual * 0.07;
    return Math.max(0, grossAnnual - mgmt - FIXED_OPS_USD - reserve);
  }, [grossAnnual]);

  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
      <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
        Your money back
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 max-w-3xl">
        How long until OMA pays itself off.
      </h2>
      <p className="mt-4 text-stone-700 max-w-3xl">
        Move the rate and the nights. The three cards update with annual gross,
        annual net of operations, and how many years to break even on each
        ownership tier.
      </p>

      <div className="mt-10 grid lg:grid-cols-3 gap-10">
        {/* Inputs */}
        <div className="lg:col-span-1 bg-white border border-stone-200 rounded-lg p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-4">
            Your assumptions
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-stone-700">Nightly rate</span>
                <span className="font-medium text-stone-900">
                  {formatUsd(nightly)}
                </span>
              </div>
              <input
                type="range"
                min={80}
                max={320}
                step={5}
                value={nightly}
                onChange={(e) => setNightly(Number(e.target.value))}
                className="mt-2 w-full accent-stone-900"
                aria-label="Nightly rate in USD"
              />
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-stone-500 mt-1">
                <span>USD 80</span>
                <span>USD 320</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-stone-700">Nights booked per month</span>
                <span className="font-medium text-stone-900">{nights}</span>
              </div>
              <input
                type="range"
                min={8}
                max={28}
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="mt-2 w-full accent-stone-900"
                aria-label="Nights per month"
              />
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-stone-500 mt-1">
                <span>8 nights</span>
                <span>28 nights</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-stone-200 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Annual gross</span>
              <span className="text-stone-900 font-medium">
                {formatUsd(grossAnnual)}
              </span>
            </div>
            <div className="flex justify-between text-stone-600 mt-2">
              <span>Annual net of ops</span>
              <span className="text-stone-900 font-medium">
                {formatUsd(netAnnual)}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 mt-3 leading-relaxed">
              Net subtracts 18% management, about USD 4,200 fixed core ops and
              7% utilities reserve. Indonesian tax (PT PMA 22% on profit, or 20%
              PPh 26 on gross for own-name) sits below this.
            </div>
          </div>
        </div>

        {/* Tier cards */}
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          {TIERS.map((tier) => {
            const paybackYears = netAnnual > 0 ? tier.priceUsd / netAnnual : Infinity;
            const grossYield = (netAnnual / tier.priceUsd) * 100;
            const highlighted = tier.key === "lease40";
            return (
              <div
                key={tier.key}
                className={`rounded-lg p-6 ${
                  highlighted
                    ? "bg-stone-900 text-white border border-stone-900"
                    : "bg-white border border-stone-200"
                }`}
              >
                <div
                  className={`text-xs uppercase tracking-[0.18em] ${
                    highlighted ? "text-white/70" : "text-stone-500"
                  }`}
                >
                  {tier.label}
                </div>
                <div className="mt-3 font-serif text-2xl">
                  {formatUsd(tier.priceUsd)}
                </div>
                <div
                  className={`text-xs ${
                    highlighted ? "text-white/60" : "text-stone-500"
                  } mt-0.5`}
                >
                  {tier.note}
                </div>

                <div
                  className={`mt-6 pt-6 border-t ${
                    highlighted ? "border-white/15" : "border-stone-200"
                  }`}
                >
                  <div
                    className={`text-[11px] uppercase tracking-wider ${
                      highlighted ? "text-white/60" : "text-stone-500"
                    }`}
                  >
                    Years to break even
                  </div>
                  <div className="font-serif text-4xl mt-1">
                    {isFinite(paybackYears) ? paybackYears.toFixed(1) : "—"}
                  </div>
                  <div
                    className={`text-xs ${
                      highlighted ? "text-white/60" : "text-stone-500"
                    } mt-2`}
                  >
                    Net yield {isFinite(grossYield) ? grossYield.toFixed(1) : "0"}% / yr
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-8 text-xs text-stone-500 max-w-3xl">
        Illustrative, not financial advice. Payback uses constant annual net at
        your chosen inputs, before Indonesian tax and treaty effects. Real
        timelines depend on occupancy, seasonality, OTA commissions and your
        structure. We walk through the after-tax figure for your structure on
        a call.
      </p>
    </section>
  );
}

function BrandBand() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="font-serif text-2xl sm:text-3xl text-stone-900 leading-snug">
          Quiet is the luxury. Intentional living in Kaba Kaba,
          designed for ownership and for rental income.
        </p>
      </div>
    </section>
  );
}

function AccessGate({
  form,
  setForm,
  onSubmit,
  submitting,
  waitingForCode,
}: {
  form: {
    name: string;
    email: string;
    whatsapp: string;
    country: string;
    accessCode: string;
    message: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      whatsapp: string;
      country: string;
      accessCode: string;
      message: string;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  waitingForCode: boolean;
}) {
  return (
    <section id="access" className="bg-stone-50 border-y border-stone-200">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
            <Lock className="w-3.5 h-3.5" /> Investor access
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
            Continue to the full pitch.
          </h2>
          <p className="mt-3 text-stone-600 max-w-xl mx-auto">
            Drop your details and the access code we sent you. The market
            case, the title structure, the operating model and the founder
            section all unlock on this browser. Don't have a code yet?
            Submit your details and we'll WhatsApp it to you.
          </p>
        </div>

        {waitingForCode && (
          <div className="mb-6 rounded-md bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
            We've received your details. Watch your WhatsApp — the access code
            is on its way. Return to this page on the same browser to unlock.
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-5 shadow-sm"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@email.com"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                required
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((f) => ({ ...f, whatsapp: e.target.value }))
                }
                placeholder="+1 555 123 4567"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="country">Country (optional)</Label>
              <Input
                id="country"
                value={form.country}
                onChange={(e) =>
                  setForm((f) => ({ ...f, country: e.target.value }))
                }
                placeholder="United States"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="accessCode">Access code</Label>
            <Input
              id="accessCode"
              value={form.accessCode}
              onChange={(e) =>
                setForm((f) => ({ ...f, accessCode: e.target.value }))
              }
              placeholder="Enter the code we sent you"
              className="mt-1"
            />
            <p className="mt-1 text-xs text-stone-500">
              Don't have one yet? Leave it blank and submit — we'll WhatsApp
              you the code within minutes.
            </p>
          </div>
          <div>
            <Label htmlFor="message">Anything we should know (optional)</Label>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              placeholder="Timeline, budget range, units of interest, questions..."
              className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            {submitting ? "Sending..." : "Continue"}
          </Button>
          <p className="text-xs text-stone-500">
            By submitting, you agree we may contact you about OMA Townhouse.
            We don't share your details with anyone else.
          </p>
        </form>
      </div>
    </section>
  );
}

function InvestorContent() {
  return (
    <>
      {/* The market case */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
          The market case
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 max-w-3xl">
          Demand is strong. Saturated districts face tightening supply. The
          opening sits further west.
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8 text-stone-800">
          <div>
            <div className="text-3xl font-serif">6.33M</div>
            <p className="text-sm text-stone-600 mt-2">
              Foreign visitors to Bali in 2024 (BPS-linked reporting). 2.64M in
              the first five months of 2025.
            </p>
          </div>
          <div>
            <div className="text-3xl font-serif">~70%</div>
            <p className="text-sm text-stone-600 mt-2">
              Share of Bali's regional GDP tied to tourism, per published
              international reporting.
            </p>
          </div>
          <div>
            <div className="text-3xl font-serif">2028 →</div>
            <p className="text-sm text-stone-600 mt-2">
              The first phase of the Bali Urban Subway is targeted to connect
              Ngurah Rai Airport toward the western coast.
            </p>
          </div>
        </div>
        <p className="mt-10 text-stone-700 max-w-3xl leading-relaxed">
          Bali authorities have signalled a quality-tourism stance, including
          discussion of moratoriums on new hotels and villas in saturated
          southern zones. That combination, strong island-wide demand plus
          tighter forward supply in the busiest districts, is exactly the
          backdrop that makes a quieter western corridor look investable
          rather than late.
        </p>
      </section>

      {/* Product visuals */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
            The product
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 max-w-3xl">
            Designed for living. Structured for ownership. Ready to operate.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10">
            {[32, 39, 51, 41, 77, 26].map((n) => (
              <div
                key={n}
                className="aspect-[4/3] overflow-hidden rounded-md bg-stone-200"
              >
                <img
                  src={SCENE(n)}
                  alt={`OMA Townhouse interior, scene ${n}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <Stat label="Total floor area" value="97.5 sqm" />
            <Stat label="Ground floor" value="66.7 sqm" />
            <Stat label="Upper floor" value="30.8 sqm" />
            <Stat label="Private pool" value="Yes" />
          </div>
        </div>
      </section>

      {/* Ownership + pricing */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
          Ownership and pricing
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 max-w-3xl">
          Three routes, designed for foreign buyers.
        </h2>
        <p className="mt-4 text-stone-700 max-w-3xl">
          Indonesian law does not allow foreign individuals to hold freehold
          (Hak Milik). OMA offers leasehold for a simpler entry, and freehold
          through a PT PMA company for buyers who want freehold-style control.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <PriceCard
            tier="25-year leasehold"
            from="USD 115,000"
            standard="USD 135,000"
            note="Simplest entry. Renewal clauses negotiated up front."
          />
          <PriceCard
            tier="40-year leasehold"
            from="USD 161,000"
            standard="USD 189,000"
            note="Longer effective term, lower per-year holding cost."
            highlighted
          />
          <PriceCard
            tier="Freehold (PT PMA)"
            from="USD 265,000"
            standard="USD 310,000"
            note="HGB held by a foreign-owned company. Suits rental as a business."
          />
        </div>
        <p className="mt-6 text-xs text-stone-500 max-w-3xl">
          Early-bird pricing is finite by allotment. Standard pricing applies
          once the early-bird tranche is sold. First-building promotion: 15%
          off with a 30% deposit in 14 days, subject to availability.
        </p>
      </section>

      {/* Payment structure */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
            Capital deployment
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 max-w-3xl">
            Staged payments tied to construction.
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Stage
              percent="30%"
              title="Reservation and contract"
              body="Secure the unit and execute legal documents through a licensed Indonesian notary."
            />
            <Stage
              percent="30%"
              title="Mid-construction inspection"
              body="Progress payment after the build milestone and owner inspection."
            />
            <Stage
              percent="40%"
              title="Pre-handover and completion"
              body="Final payment before practical completion and handover."
            />
          </div>
          <div className="mt-12 border-t border-stone-200 pt-8 text-sm text-stone-700 max-w-3xl">
            <strong className="text-stone-900">
              Estimated build duration:
            </strong>{" "}
            10 to 14 months from commencement. Payments are staged so capital
            deployment matches build progress, not a calendar.
          </div>
        </div>
      </section>

      {/* Hands-off model — lighter version, no dark slab */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
          Hands-off ownership
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 max-w-3xl">
          Sit anywhere. OMA runs the asset.
        </h2>
        <p className="mt-4 text-stone-700 max-w-3xl leading-relaxed">
          OMA can operate the townhouse as a fully managed hospitality asset.
          We coordinate guest communications, pricing, check-in,
          housekeeping, maintenance, airport transfers and on-the-ground
          hospitality, so ownership stays passive.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-sm">
          <FeatureCard
            title="Operations"
            points={[
              "Guest comms and channel setup",
              "Pricing strategy",
              "Reservation and review management",
            ]}
          />
          <FeatureCard
            title="On the ground"
            points={[
              "Housekeeping and linen",
              "Pool care and maintenance",
              "Airport transfers and concierge",
            ]}
          />
          <FeatureCard
            title="Owner reporting"
            points={[
              "Monthly statements",
              "Annual reconciliation",
              "Legal and administrative support",
            ]}
          />
        </div>
        <p className="mt-10 text-xs text-stone-500 max-w-3xl">
          Benchmarked to the Bali market standard: a leading local operator
          publishes an 18% full-management commission on gross revenue, with
          staff wages and operating costs treated separately. OMA's management
          terms are confirmed at contract.
        </p>
      </section>

      {/* What USD 250k buys you */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
            The comparison
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 max-w-3xl">
            What USD 250,000 buys you around the world.
          </h2>
          <p className="mt-4 text-stone-700 max-w-3xl">
            Same money, different product. The point is not that Bali is
            cheaper. The point is what you actually get for the same outlay.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-stone-500">
                <tr className="border-b border-stone-200">
                  <th className="py-3 pr-4 font-medium">Market</th>
                  <th className="py-3 pr-4 font-medium">
                    What ~USD 250k buys
                  </th>
                  <th className="py-3 pr-4 font-medium">Private pool</th>
                  <th className="py-3 pr-4 font-medium">Foreign ownership</th>
                </tr>
              </thead>
              <tbody className="text-stone-800">
                <tr className="border-b border-stone-100 bg-white font-medium">
                  <td className="py-3 pr-4">Tabanan, Bali (OMA)</td>
                  <td className="py-3 pr-4">
                    2-bed townhouse, 97.5 sqm, freehold via PT PMA
                  </td>
                  <td className="py-3 pr-4">Yes</td>
                  <td className="py-3 pr-4">Yes, via PT PMA or leasehold</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-3 pr-4">Canggu, Bali</td>
                  <td className="py-3 pr-4">
                    Studio or compact 1-bed leasehold
                  </td>
                  <td className="py-3 pr-4">Shared, if any</td>
                  <td className="py-3 pr-4">Leasehold only at this price</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-3 pr-4">Dubai (JVC / Business Bay)</td>
                  <td className="py-3 pr-4">
                    ~35–45 sqm studio, freehold zone
                  </td>
                  <td className="py-3 pr-4">Shared building pool</td>
                  <td className="py-3 pr-4">Yes, freehold</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-3 pr-4">Phuket, Thailand</td>
                  <td className="py-3 pr-4">
                    1-bed condo, ~40 sqm, foreign quota
                  </td>
                  <td className="py-3 pr-4">Shared</td>
                  <td className="py-3 pr-4">Condo freehold via foreign quota</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-3 pr-4">Lisbon, Portugal</td>
                  <td className="py-3 pr-4">
                    1-bed apartment, ~45 sqm, outside the centre
                  </td>
                  <td className="py-3 pr-4">No</td>
                  <td className="py-3 pr-4">Yes, freehold</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-3 pr-4">Tulum, Mexico</td>
                  <td className="py-3 pr-4">
                    ~55 sqm 1-bed condo, shared amenities
                  </td>
                  <td className="py-3 pr-4">Shared</td>
                  <td className="py-3 pr-4">Yes, via fideicomiso</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">
                    Average US Sun-belt city (1-bed)
                  </td>
                  <td className="py-3 pr-4">
                    1-bed condo or compact townhouse
                  </td>
                  <td className="py-3 pr-4">Shared, if any</td>
                  <td className="py-3 pr-4">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-xs text-stone-500 max-w-3xl">
            Comparisons reflect typical product available at roughly USD
            250,000 in each market at time of writing, drawn from public
            listings and local market reports. Spec and condition vary
            widely.
          </p>
        </div>
      </section>

      {/* Straight answers */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
          Straight answers
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
          The questions a serious buyer asks.
        </h2>
        <p className="mt-4 text-stone-700">
          Off-plan in Indonesia carries real risks. The honest answers below
          are how we think about them. If any are unresolved for you, raise
          them with us directly.
        </p>

        <div className="mt-12 space-y-10">
          <Qa
            q="What if you don't deliver on time, or at all?"
            a="Payments are staged 30 / 30 / 40 against build milestones, not a calendar. The 30% mid-construction tranche is only released after an owner inspection. Optional third-party escrow at roughly 1 to 2% of the deal is available; we recommend it, particularly for buyers who cannot visit during the build. Contracts are notarized through a licensed PPAT, with delivery dates and late-delivery remedies set in the PPJB."
          />
          <Qa
            q="How safe is the title and the legal structure?"
            a="The land is freehold. Sertifikat Hak Milik (SHM), Indonesia's strongest title, registered at BPN in the founder's own name as an Indonesian citizen. That is the cleanest position the land can sit in; foreign buyers then layer on top via either a notarized lease from the SHM holder or PT PMA holding Hak Guna Bangunan under PP 18/2021. We don't post the certificate publicly because land-title screenshots are a known vector for impersonation fraud in Bali, but the SHM, the parent title chain, the PPAT engagement and any company documents are shared directly in a serious conversation, and independent legal review is welcome before any deposit."
          />
          <Qa
            q="What about Bali oversupply? Aren't there already too many villas?"
            a="Kaba Kaba is not for everyone. That's the point. Canggu is busier, faster, more crowded, and the rate compression on weak villa product reflects that. OMA isn't built to compete in that fight. It is built for buyers who specifically want the slower end of Bali, with Canggu still 25 minutes away when they want it. The audience self-selects, and Bali Governor's Instruction 5 of 2025, which prohibits new rice-field conversion across six regencies including Tabanan, caps future competing supply on agricultural land. The quieter corridor stays quieter."
          />
          <Qa
            q="What's the realistic net yield after tax, not the slide?"
            a="The scenarios on this page are already net of the 18% management benchmark, fixed core ops and a 7% utilities reserve. Indonesian tax sits below that. A PT PMA pays 22% corporate income tax on net profit, then dividends to a foreign shareholder carry 20% PPh 26 withholding, often reduced to 10 to 15% under a tax treaty with a Certificate of Domicile. A non-resident holding in own name faces 20% PPh 26 on gross rent under Article 26. On the base case of ~USD 29,700 net of operations, that lands in roughly the USD 18,500 to USD 23,000 range in your home account after Indonesian withholding, depending on structure and treaty. Still a meaningful after-tax yield on USD 250,000, but not the headline number. We walk through the exact figure for your structure on a call."
          />
          <Qa
            q="How do I exit when the time comes?"
            a="Two routes, both well-trodden. A leasehold owner transfers the remaining term via a notarized assignment, the same mechanism used to sell freehold here, and because Tabanan land values have been moving with the corridor's policy and infrastructure story, mid-term leasehold transfers in this area have typically traded inline with the underlying land, often profitably. A PT PMA freehold owner can sell the company shares (transferring the underlying HGB cleanly) or transfer the HGB out and sell as an Indonesian asset. Comparable resale data shared on request."
          />
          <Qa
            q="Why isn't a bigger Bali developer doing this?"
            a="The Tabanan corridor only became investable on the policy and infrastructure shifts of the last 12 to 18 months: the rice-field conversion ban, the Nuanu Creative City build-out, and the published transit planning. Most established Bali developers are anchored in saturated south markets, where they are now defending price rather than chasing a quieter corridor. OMA is small on purpose: one site, design-led, repeatable. The product is the differentiation, not the inventory volume."
          />
        </div>
      </section>

      {/* Who's behind OMA */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-3">
            Who's behind OMA
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 max-w-3xl">
            A product person, building a product company in Bali.
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <div className="aspect-square overflow-hidden rounded-lg bg-stone-100 border border-stone-200">
                <img
                  src="/founder/irvan-lathief.webp"
                  alt="Irvan Lathief, founder of OMA Townhouse"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 text-sm">
                <div className="font-medium text-stone-900">Irvan Lathief</div>
                <div className="text-stone-500">Founder, OMA Townhouse</div>
                <a
                  href="https://irvanlathief.com"
                  data-external="true"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-stone-700 hover:text-stone-900 underline underline-offset-4"
                >
                  irvanlathief.com
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="md:col-span-2 text-stone-800 leading-relaxed space-y-4">
              <p>
                <strong className="text-stone-900">
                  A product designer who codes.
                </strong>{" "}
                Ten-plus years in product design and design leadership, with a
                bias for shipping working things over writing specs. Based in
                Bali, originally from Indonesia, has lived and worked across
                Germany, Australia and home.
              </p>
              <p>
                <strong className="text-stone-900">Track record.</strong> Built
                Fleetwise from the first line of code through its first paying
                customer, then handed it to an engineering team to scale. As
                founder of DotDesign, led product work for Asia Pacific
                Leaders Malaria Alliance, GovTech Indonesia (Kampus Merdeka,
                Akun Belajar, Merdeka Mengajar), and Orangetheory Fitness
                across the region.
              </p>
              <p>
                <strong className="text-stone-900">
                  Why OMA is design-led.
                </strong>{" "}
                Most Bali off-plan is sold on land economics. OMA is built like
                a product: one floor plan, refined until every square metre
                earns its keep; one site at a time, so the build crew gets
                sharper instead of stretched; finishes specified for the first
                owner and the next, not for a brochure.
              </p>
              <p>
                <strong className="text-stone-900">
                  First project, deliberately.
                </strong>{" "}
                OMA Townhouse in Kaba Kaba is OMA's first development. That's
                a feature, not a footnote. The founder is on every detail; the
                land is held in his own name as freehold (SHM); staged
                payments, milestone inspections, optional escrow and direct
                founder access are built into the structure precisely because
                we know what an early-buyer position means.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FooterCta({ unlocked }: { unlocked: boolean }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 text-center">
      <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
        Talk to the team.
      </h2>
      <p className="mt-3 text-stone-600 max-w-xl mx-auto">
        {unlocked
          ? "We're already on our way to you. If you'd like to move faster, WhatsApp us or reply to the email we just sent."
          : "Unlock the pitch above, or message us on WhatsApp and we'll walk you through it personally."}
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <a
          href="https://wa.me/"
          data-external="true"
          className="inline-flex items-center gap-2 rounded-md bg-stone-900 text-white px-4 py-2 text-sm font-medium hover:bg-stone-800"
        >
          WhatsApp
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-50 text-stone-700"
        >
          Back to the home page
        </a>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-stone-500">
        {label}
      </div>
      <div className="mt-1 font-serif text-2xl text-stone-900">{value}</div>
    </div>
  );
}

function PriceCard({
  tier,
  from,
  standard,
  note,
  highlighted,
}: {
  tier: string;
  from: string;
  standard: string;
  note: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-6 ${
        highlighted
          ? "border-stone-900 bg-white shadow-md"
          : "border-stone-200 bg-white"
      }`}
    >
      <div className="text-xs uppercase tracking-[0.18em] text-stone-500">
        {tier}
      </div>
      <div className="mt-2 font-serif text-2xl text-stone-900">From {from}</div>
      <div className="text-sm text-stone-500">Standard: {standard}</div>
      <p className="mt-4 text-sm text-stone-700 leading-relaxed">{note}</p>
    </div>
  );
}

function Stage({
  percent,
  title,
  body,
}: {
  percent: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6">
      <div className="font-serif text-3xl text-stone-900">{percent}</div>
      <div className="mt-3 text-sm font-medium text-stone-900">{title}</div>
      <p className="mt-2 text-sm text-stone-600 leading-relaxed">{body}</p>
    </div>
  );
}

function FeatureCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div>
      <div className="text-sm font-medium text-stone-900 mb-3">{title}</div>
      <ul className="space-y-2 text-stone-700">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Qa({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-serif text-xl text-stone-900">{q}</h3>
      <p className="mt-3 text-stone-700 leading-relaxed">{a}</p>
    </div>
  );
}
