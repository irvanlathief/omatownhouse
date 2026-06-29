import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Check, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "oma_investor_access_v1";

const GALLERY_BASE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery";
const SCENE = (n: number) => `${GALLERY_BASE}/Scene${n}.webp`;

interface AccessRecord {
  name: string;
  email: string;
  unlockedAt: string;
}

export default function Investors() {
  const [access, setAccess] = useState<AccessRecord | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    role: "",
    message: "",
  });

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
    onSuccess: () => {
      const record: AccessRecord = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        unlockedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      } catch {
        // private mode, fine
      }
      setAccess(record);
      toast.success(
        "Welcome. The pitch is unlocked, and the deck is on its way to your inbox."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    requestAccess.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      country: form.country.trim() || undefined,
      role: form.role.trim() || undefined,
      message: form.message.trim() || undefined,
    });
  }

  const unlocked = !!access;
  const firstName = access?.name?.split(" ")[0];

  return (
    <div className="bg-white text-gray-900">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={SCENE(22)}
          alt="OMA Townhouse exterior at twilight"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-16 text-white">
          <div className="mb-3 text-xs uppercase tracking-[0.18em] text-white/80">
            Investor Pitch · Kaba Kaba, Bali
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight max-w-3xl">
            Quiet is the luxury.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-2xl">
            Intentional living in Kaba Kaba. A townhouse product designed for
            ownership, retreat, and hands-off rental income.
          </p>
          {!unlocked && (
            <a
              href="#access"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/80"
            >
              See the pitch
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </section>

      {/* Always-public top-line */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">
              Product
            </div>
            <p className="text-gray-800 leading-relaxed">
              A 97.5 sqm two-floor townhouse with private pool. Design-led,
              repeatable, built so the owner is not also the operator.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">
              Position
            </div>
            <p className="text-gray-800 leading-relaxed">
              A quieter west-Bali entry while saturated southern districts come
              under tighter supply policy. About 25 minutes from Canggu, 10 to
              15 minutes from Nuanu Creative City and Kedungu Beach.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">
              Ownership
            </div>
            <p className="text-gray-800 leading-relaxed">
              25 or 40 year leasehold from USD 115,000. Freehold via PT PMA from
              USD 265,000. Staged 30 / 30 / 40 payments over a 10 to 14 month
              build.
            </p>
          </div>
        </div>
      </section>

      {/* Gate */}
      {!unlocked && <AccessGate form={form} setForm={setForm} onSubmit={onSubmit} submitting={requestAccess.isPending} />}

      {/* Welcome strip when unlocked */}
      {unlocked && (
        <section className="bg-gray-50 border-y border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-3 text-sm text-gray-700">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Welcome{firstName ? `, ${firstName}` : ""}. The full pitch is
              unlocked on this browser. We've sent a note to your inbox; our
              team will follow up with the deck PDF within 24 hours.
            </span>
          </div>
        </section>
      )}

      {/* Full investor content, only when unlocked */}
      {unlocked && <InvestorContent />}

      <FooterCta unlocked={unlocked} />
    </div>
  );
}

function AccessGate({
  form,
  setForm,
  onSubmit,
  submitting,
}: {
  form: { name: string; email: string; country: string; role: string; message: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; country: string; role: string; message: string }>>;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}) {
  return (
    <section id="access" className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
            <Lock className="w-3.5 h-3.5" /> Investor Access
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900">
            Unlock the full pitch.
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Tell us who you are. We'll unlock the market case, payment
            structure, rental underwriting and the hands-off operating model on
            this page, and our team will follow up within 24 hours with the
            full deck.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 space-y-5 shadow-sm"
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
              <Label htmlFor="country">Country (optional)</Label>
              <Input
                id="country"
                value={form.country}
                onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                placeholder="United States"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="role">Role or interest (optional)</Label>
              <Input
                id="role"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="Investor, second-home buyer, fund"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Anything you'd like us to know (optional)</Label>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Timeline, budget range, units of interest, questions..."
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
            {submitting ? "Unlocking..." : "Unlock the pitch"}
          </Button>
          <p className="text-xs text-gray-500">
            By submitting, you agree we may contact you about OMA Townhouse. We
            don't share your details with anyone else.
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
        <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
          The market case
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 max-w-3xl">
          Demand is strong. Saturated districts face tightening supply. The
          opening sits further west.
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8 text-gray-800">
          <div>
            <div className="text-3xl font-serif">6.33M</div>
            <p className="text-sm text-gray-600 mt-2">
              Foreign visitors to Bali in 2024 (BPS-linked reporting). 2.64M in
              the first five months of 2025.
            </p>
          </div>
          <div>
            <div className="text-3xl font-serif">~70%</div>
            <p className="text-sm text-gray-600 mt-2">
              Share of Bali's regional GDP tied to tourism, per published
              international reporting.
            </p>
          </div>
          <div>
            <div className="text-3xl font-serif">2028 →</div>
            <p className="text-sm text-gray-600 mt-2">
              The first phase of the Bali Urban Subway is targeted to connect
              Ngurah Rai Airport toward the western coast.
            </p>
          </div>
        </div>
        <p className="mt-10 text-gray-700 max-w-3xl leading-relaxed">
          Bali authorities have signalled a quality-tourism stance, including
          discussion of moratoriums on new hotels and villas in saturated
          southern zones. That combination, strong island-wide demand plus
          tighter forward supply in the busiest districts, is exactly the
          backdrop that makes a quieter western corridor look investable rather
          than late.
        </p>
      </section>

      {/* Product visual band */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
            The product
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 max-w-3xl">
            Designed for living. Structured for ownership. Ready to operate.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10">
            {[32, 39, 51, 41, 77, 26].map((n) => (
              <div key={n} className="aspect-[4/3] overflow-hidden rounded-md bg-gray-200">
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
        <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
          Ownership and pricing
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 max-w-3xl">
          Three routes, designed for foreign buyers.
        </h2>
        <p className="mt-4 text-gray-700 max-w-3xl">
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
        <p className="mt-6 text-xs text-gray-500 max-w-3xl">
          Early-bird pricing is finite by allotment. Standard pricing applies
          once the early-bird tranche is sold. First-building promotion: 15%
          off with a 30% deposit in 14 days, subject to availability.
        </p>
      </section>

      {/* Payment structure */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
            Capital deployment
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 max-w-3xl">
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
          <div className="mt-12 border-t border-gray-200 pt-8 text-sm text-gray-700 max-w-3xl">
            <strong className="text-gray-900">Estimated build duration:</strong>{" "}
            10 to 14 months from commencement. Payments are staged so capital
            deployment matches build progress, not a calendar.
          </div>
        </div>
      </section>

      {/* Returns — illustrative */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
          Illustrative returns
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 max-w-3xl">
          A working underwriting frame on a USD 250,000 purchase.
        </h2>
        <p className="mt-4 text-gray-700 max-w-3xl">
          The scenarios below are deliberately illustrative. They assume an 18%
          management fee on gross revenue, in line with the Bali market
          benchmark, plus a ~USD 4,200 annual core operating budget and a 7%
          reserve for utilities and consumables.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 font-medium">Scenario</th>
                <th className="py-3 pr-4 font-medium">ADR</th>
                <th className="py-3 pr-4 font-medium">Occupancy</th>
                <th className="py-3 pr-4 font-medium">Gross revenue</th>
                <th className="py-3 pr-4 font-medium">Est. net income</th>
                <th className="py-3 pr-4 font-medium">Net yield</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <Row scenario="Conservative" adr="USD 180" occ="55%" gross="USD 36,100" net="USD 22,900" yield="9.2%" />
              <Row scenario="Base" adr="USD 200" occ="62%" gross="USD 45,300" net="USD 29,700" yield="11.9%" highlighted />
              <Row scenario="Upside" adr="USD 220" occ="70%" gross="USD 56,200" net="USD 38,000" yield="15.2%" />
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-xs text-gray-500 max-w-3xl">
          These figures are illustrative, not financial advice. ADR and
          occupancy ranges are working assumptions drawn from public Bali
          demand data and operator commentary, not a paid vendor report. The
          full underwriting model, including a paid AirDNA / STR benchmark, is
          available on request from the OMA team.
        </p>
      </section>

      {/* Hands-off model */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-xs uppercase tracking-[0.18em] text-white/60 mb-3">
            Hands-off ownership
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl max-w-3xl">
            Sit anywhere. OMA runs the asset.
          </h2>
          <p className="mt-4 text-white/80 max-w-3xl leading-relaxed">
            OMA can operate the townhouse as a fully managed hospitality asset.
            We coordinate guest communications, pricing, check-in,
            housekeeping, maintenance, airport transfers and on-the-ground
            hospitality, so ownership stays passive.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-sm">
            <FeatureCard
              title="Operations"
              points={["Guest comms and channel setup", "Pricing strategy", "Reservation and review management"]}
            />
            <FeatureCard
              title="On the ground"
              points={["Housekeeping and linen", "Pool care and maintenance", "Airport transfers and concierge"]}
            />
            <FeatureCard
              title="Owner reporting"
              points={["Monthly statements", "Annual reconciliation", "Legal and administrative support"]}
            />
          </div>
          <p className="mt-12 text-xs text-white/60 max-w-3xl">
            Benchmarked to the Bali market standard: a leading local operator
            publishes an 18% full-management commission on gross revenue, with
            staff wages and operating costs treated separately. OMA's
            management terms are confirmed at contract.
          </p>
        </div>
      </section>

      {/* What USD 250k buys you — the comparison case */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
          The comparison
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 max-w-3xl">
          What USD 250,000 buys you around the world.
        </h2>
        <p className="mt-4 text-gray-700 max-w-3xl">
          Same money, different product. The point is not that Bali is cheaper.
          The point is what you actually get for the same outlay.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr className="border-b border-gray-200">
                <th className="py-3 pr-4 font-medium">Market</th>
                <th className="py-3 pr-4 font-medium">What ~USD 250k buys</th>
                <th className="py-3 pr-4 font-medium">Private pool</th>
                <th className="py-3 pr-4 font-medium">Foreign ownership</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr className="border-b border-gray-100 bg-gray-50 font-medium">
                <td className="py-3 pr-4">Tabanan, Bali (OMA)</td>
                <td className="py-3 pr-4">2-bed townhouse, 97.5 sqm, freehold via PT PMA</td>
                <td className="py-3 pr-4">Yes</td>
                <td className="py-3 pr-4">Yes, via PT PMA or leasehold</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4">Canggu, Bali</td>
                <td className="py-3 pr-4">Studio or compact 1-bed leasehold</td>
                <td className="py-3 pr-4">Shared, if any</td>
                <td className="py-3 pr-4">Leasehold only at this price</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4">Dubai (JVC / Business Bay)</td>
                <td className="py-3 pr-4">~35–45 sqm studio, freehold zone</td>
                <td className="py-3 pr-4">Shared building pool</td>
                <td className="py-3 pr-4">Yes, freehold</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4">Phuket, Thailand</td>
                <td className="py-3 pr-4">1-bed condo, ~40 sqm, foreign quota</td>
                <td className="py-3 pr-4">Shared</td>
                <td className="py-3 pr-4">Condo freehold via foreign quota</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4">Lisbon, Portugal</td>
                <td className="py-3 pr-4">1-bed apartment, ~45 sqm, outside the centre</td>
                <td className="py-3 pr-4">No</td>
                <td className="py-3 pr-4">Yes, freehold</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4">Tulum, Mexico</td>
                <td className="py-3 pr-4">~55 sqm 1-bed condo, shared amenities</td>
                <td className="py-3 pr-4">Shared</td>
                <td className="py-3 pr-4">Yes, via fideicomiso</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Average US Sun-belt city (1-bed)</td>
                <td className="py-3 pr-4">1-bed condo or compact townhouse</td>
                <td className="py-3 pr-4">Shared, if any</td>
                <td className="py-3 pr-4">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-xs text-gray-500 max-w-3xl">
          Comparisons reflect typical product available at roughly USD 250,000
          in each market at time of writing, drawn from public listings and
          local market reports. Spec and condition vary widely. Provided for
          relative comparison, not as a price quote.
        </p>
      </section>

      {/* Common questions, straight answers — objection handling */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
            Straight answers
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900">
            The questions a serious buyer asks.
          </h2>
          <p className="mt-4 text-gray-700">
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
        </div>
      </section>

      {/* Who's behind OMA */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-3">
          Who's behind OMA
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 max-w-3xl">
          A product person, building a product company in Bali.
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
              <img
                src={SCENE(26)}
                alt="OMA in Kaba Kaba, Bali"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4 text-sm">
              <div className="font-medium text-gray-900">Irvan Lathief</div>
              <div className="text-gray-500">Founder, OMA Townhouse</div>
              <a
                href="https://irvanlathief.com"
                data-external="true"
                className="mt-3 inline-flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 underline underline-offset-4"
              >
                irvanlathief.com
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 text-gray-800 leading-relaxed space-y-4">
            <p>
              <strong className="text-gray-900">A product designer who codes.</strong>{" "}
              Ten-plus years in product design and design leadership, with a
              bias for shipping working things over writing specs. Based in
              Bali, originally from Indonesia, has lived and worked across
              Germany, Australia and home.
            </p>
            <p>
              <strong className="text-gray-900">Track record.</strong> Built
              Fleetwise from the first line of code through its first paying
              customer, then handed it to an engineering team to scale. As
              founder of DotDesign, led product work for Asia Pacific Leaders
              Malaria Alliance, GovTech Indonesia (Kampus Merdeka, Akun
              Belajar, Merdeka Mengajar), and Orangetheory Fitness across the
              region.
            </p>
            <p>
              <strong className="text-gray-900">Why OMA is design-led.</strong>{" "}
              Most Bali off-plan is sold on land economics. OMA is built like a
              product: one floor plan, refined until every square metre earns
              its keep; one site at a time, so the build crew and operations
              team get sharper instead of stretched; finishes specified for the
              first owner and the next, not for a brochure.
            </p>
            <p>
              <strong className="text-gray-900">First project, deliberately.</strong>{" "}
              OMA Townhouse in Kaba Kaba is OMA's first development. That's a
              feature, not a footnote. The founder is on every detail; the
              land is held in his own name as freehold (SHM); staged payments,
              milestone inspections, optional escrow and direct founder
              access are built into the structure precisely because we know
              what an early-buyer position means.
            </p>
            <p>
              <strong className="text-gray-900">What we own.</strong> We are a
              small team. That means you talk to the people who actually decide
              things. If you want to dig into the build spec, the operator
              terms, or the underwriting line by line, we'll do that on a call.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Qa({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-serif text-xl text-gray-900">{q}</h3>
      <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
    </div>
  );
}

function FooterCta({ unlocked }: { unlocked: boolean }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 text-center">
      <Sparkles className="w-6 h-6 text-gray-400 mx-auto mb-4" />
      <h2 className="font-serif text-3xl sm:text-4xl text-gray-900">
        Talk to the team.
      </h2>
      <p className="mt-3 text-gray-600 max-w-xl mx-auto">
        {unlocked
          ? "We're already on our way to you. If you'd like to skip ahead, send a WhatsApp or hit reply on the email we just sent."
          : "Unlock the pitch above. We'll be in touch within 24 hours with the deck and answer anything you'd like."}
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <a
          href="https://wa.me/"
          data-external="true"
          className="inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800"
        >
          WhatsApp
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <MapPin className="w-4 h-4" />
          Back to the home page
        </a>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-gray-500">{label}</div>
      <div className="mt-1 font-serif text-2xl text-gray-900">{value}</div>
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
        highlighted ? "border-gray-900 bg-white shadow-md" : "border-gray-200 bg-white"
      }`}
    >
      <div className="text-xs uppercase tracking-[0.18em] text-gray-500">{tier}</div>
      <div className="mt-2 font-serif text-2xl text-gray-900">From {from}</div>
      <div className="text-sm text-gray-500">Standard: {standard}</div>
      <p className="mt-4 text-sm text-gray-700 leading-relaxed">{note}</p>
    </div>
  );
}

function Stage({ percent, title, body }: { percent: string; title: string; body: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="font-serif text-3xl text-gray-900">{percent}</div>
      <div className="mt-3 text-sm font-medium text-gray-900">{title}</div>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{body}</p>
    </div>
  );
}

function Row({
  scenario,
  adr,
  occ,
  gross,
  net,
  yield: yieldPct,
  highlighted,
}: {
  scenario: string;
  adr: string;
  occ: string;
  gross: string;
  net: string;
  yield: string;
  highlighted?: boolean;
}) {
  return (
    <tr
      className={`border-b border-gray-100 ${
        highlighted ? "bg-gray-50 font-medium" : ""
      }`}
    >
      <td className="py-3 pr-4">{scenario}</td>
      <td className="py-3 pr-4">{adr}</td>
      <td className="py-3 pr-4">{occ}</td>
      <td className="py-3 pr-4">{gross}</td>
      <td className="py-3 pr-4">{net}</td>
      <td className="py-3 pr-4 text-gray-900">{yieldPct}</td>
    </tr>
  );
}

function FeatureCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div>
      <div className="text-sm font-medium text-white mb-3">{title}</div>
      <ul className="space-y-2 text-white/75">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
