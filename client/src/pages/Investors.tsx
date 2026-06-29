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
    </>
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
