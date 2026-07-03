import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Expand,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { ExperienceHeader } from "@/components/ExperienceHeader";
import { InvestorPackDrawer } from "@/components/InvestorPackDrawer";
import {
  calculateInvestment,
  formatUsd,
  OPERATING_ASSUMPTIONS,
  OWNERSHIP_OPTIONS,
  type OwnershipKey,
} from "@/lib/investment";

const GALLERY_BASE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery";
const SCENE = (number: number) => `${GALLERY_BASE}/Scene${number}.webp`;

const GALLERY = [
  {
    src: SCENE(32),
    alt: "OMA Townhouse open living room",
    title: "Room to arrive.",
    detail: "Ground floor living",
  },
  {
    src: SCENE(39),
    alt: "OMA Townhouse kitchen and dining area",
    title: "Made to gather.",
    detail: "Kitchen and dining",
  },
  {
    src: SCENE(76),
    alt: "OMA Townhouse primary bedroom",
    title: "Quiet by design.",
    detail: "Primary bedroom",
  },
  {
    src: SCENE(26),
    alt: "OMA Townhouse private pool courtyard",
    title: "A pool of your own.",
    detail: "Private courtyard",
  },
  {
    src: SCENE(51),
    alt: "OMA Townhouse home office",
    title: "Space to focus.",
    detail: "Home office",
  },
  {
    src: SCENE(41),
    alt: "OMA Townhouse bathroom",
    title: "Calm in the details.",
    detail: "Bathroom",
  },
  {
    src: SCENE(23),
    alt: "OMA Townhouse street exterior",
    title: "A considered arrival.",
    detail: "Street view",
  },
  {
    src: SCENE(52),
    alt: "OMA Townhouse connected interior",
    title: "One connected home.",
    detail: "Living and kitchen",
  },
];

type FloorKey = "ground" | "upper";

const FLOOR_PLANS = {
  ground: {
    label: "Ground floor",
    area: "66.7 sqm",
    image: "/property-docs/floor-plan-first.webp",
    aspectRatio: "1600 / 1548",
    summary:
      "Living, kitchen, primary bedroom and bathroom open toward the private pool and courtyard.",
    rooms: [
      { label: "Living", x: 53, y: 49, gallery: 0 },
      { label: "Kitchen", x: 67, y: 50, gallery: 1 },
      { label: "Bedroom", x: 55, y: 27, gallery: 2 },
      { label: "Bathroom", x: 70, y: 29, gallery: 5 },
      { label: "Pool", x: 62, y: 71, gallery: 3 },
    ],
  },
  upper: {
    label: "Upper floor",
    area: "30.8 sqm",
    image: "/property-docs/floor-plan-second.webp",
    aspectRatio: "1202 / 1600",
    summary:
      "A second bedroom, bathroom and work area sit above the double-height living room.",
    rooms: [
      { label: "Bedroom", x: 55, y: 31, gallery: 2 },
      { label: "Bathroom", x: 70, y: 31, gallery: 5 },
      { label: "Work area", x: 35, y: 24, gallery: 4 },
    ],
  },
} as const;

const KABA_KABA_GUIDE = [
  {
    time: "2-5 min",
    category: "Village life",
    title: "Kaba Kaba Social",
    description:
      "The closest place to meet the local and international community around the village.",
    image: "/blog/blog-community-dining.webp",
    href: "https://www.instagram.com/kabakaba.social/",
  },
  {
    time: "5-10 min",
    category: "Wellness",
    title: "Ulaman Retreat",
    description:
      "A design-led eco retreat that already brings wellness travellers into Kaba Kaba.",
    image: "/blog/blog-spa-wellness.webp",
    href: "https://www.instagram.com/ulamanretreat/",
  },
  {
    time: "10-15 min",
    category: "Culture",
    title: "Tanah Lot",
    description:
      "Bali's sea temple and one of the island's defining sunset landmarks.",
    image: "/blog/tanah-lot-temple-coast.webp",
    href: "https://www.visittabananbali.com/",
  },
  {
    time: "10-15 min",
    category: "Creative coast",
    title: "Nuanu and Luna",
    description:
      "Art, education, events, restaurants and a beach club across a 44-hectare coastal campus.",
    image: "/blog/blog-nuanu-creative.webp",
    href: "https://www.nuanu.com/",
  },
  {
    time: "10-15 min",
    category: "Beach and surf",
    title: "Kedungu Beach",
    description:
      "Black sand, surf schools, local warungs and a slower alternative to the Canggu beaches.",
    image: "/blog/kedungu-beach.jpg",
    href: "/blog/where-is-kaba-kaba-bali",
  },
  {
    time: "15-20 min",
    category: "Food and coffee",
    title: "Seseh mornings",
    description:
      "Open House, Neighbourhood and the growing café scene between the rice fields and coast.",
    image: "/blog/blog-cafe-coworking.webp",
    href: "/blog/cafes-dining",
  },
] as const;

const TABANAN_DAY_TRIPS = [
  {
    time: "About 40-45 min",
    title: "Leke Leke Waterfall",
    description:
      "A 32-metre jungle waterfall reached by a short trail through central Tabanan.",
    image: "/blog/bali-tropical-rainforest-foliage.webp",
    href: "https://www.nirjhara.com/en/magazine/best-waterfalls-in-bali/",
  },
  {
    time: "About 30-40 min",
    title: "Jatiluwih rice terraces",
    description:
      "A wider Tabanan day out through Bali's UNESCO-listed Subak landscape and mountain views.",
    image: "/blog/rice-terraces.jpg",
    href: "https://www.visittabananbali.com/",
  },
] as const;

const FAQ = [
  {
    question: "Can a foreign buyer own at OMA?",
    answer:
      "Yes. OMA offers 25 and 40-year leasehold routes, plus a PT PMA route where the company holds HGB. Your independent notary and legal adviser should confirm the right structure for your residency, tax position and intended use.",
  },
  {
    question: "What does the purchase price include?",
    answer:
      "The current offer is for a completed 97.5 sqm, two-bedroom townhouse with two bathrooms, fitted living and kitchen spaces, a work area and private pool. The final specification, furniture package and contract inclusions are confirmed in the investor pack.",
  },
  {
    question: "Can I use the townhouse myself?",
    answer:
      "Yes. The model is built for hybrid ownership. You can reserve personal stays and place the home into OMA's managed rental operation while you are away, subject to the final management agreement.",
  },
  {
    question: "Are the returns guaranteed?",
    answer:
      "No. The calculator is an illustration based on your inputs. Occupancy, nightly rate, seasonality, commissions, taxes and operating performance all affect the real result.",
  },
  {
    question: "What happens if construction is delayed?",
    answer:
      "The proposed structure uses milestone-based 30 / 30 / 40 payments, owner inspection before the construction tranche, notarized documents and delivery remedies in the final agreement. Optional third-party escrow can be discussed with the team.",
  },
  {
    question: "How many OMA townhouses will be built?",
    answer:
      "OMA is planned as 12 homes. Units 01-03 form the founding release and use the current early-bird pricing. Units 04-12 will be released later with revised pricing.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Investors() {
  const [packOpen, setPackOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [planZoom, setPlanZoom] = useState<FloorKey | null>(null);

  useEffect(() => {
    const openPack = () => setPackOpen(true);
    window.addEventListener("oma:open-investor-pack", openPack);
    return () => window.removeEventListener("oma:open-investor-pack", openPack);
  }, []);

  return (
    <main className="overflow-hidden bg-white text-black">
      <InvestorPackDrawer open={packOpen} onClose={() => setPackOpen(false)} />
      <GalleryLightbox
        index={galleryIndex}
        onChange={setGalleryIndex}
        onClose={() => setGalleryIndex(null)}
      />
      <PlanLightbox floor={planZoom} onClose={() => setPlanZoom(null)} />

      <Hero onRequestPack={() => setPackOpen(true)} />
      <Snapshot />
      <ReleasePlan />
      <Residence onOpenGallery={setGalleryIndex} />
      <LayoutExplorer onOpenGallery={setGalleryIndex} onZoom={setPlanZoom} />
      <Ownership onRequestPack={() => setPackOpen(true)} />
      <DecisionCalculator />
      <Operations />
      <LocationCase />
      <BuyerProtection />
      <Founder />
      <Questions />
      <FinalCta onRequestPack={() => setPackOpen(true)} />

      <button
        type="button"
        onClick={() => setPackOpen(true)}
        className="fixed inset-x-3 bottom-3 z-[65] flex items-center justify-between rounded-full bg-black px-5 py-4 text-sm font-medium text-white shadow-2xl sm:hidden"
      >
        Request investor pack
        <ArrowRight className="h-4 w-4" />
      </button>
    </main>
  );
}

function Hero({ onRequestPack }: { onRequestPack: () => void }) {
  return (
    <section className="p-2.5 sm:p-4">
      <div className="relative min-h-[720px] overflow-hidden rounded-[26px] bg-black text-white sm:min-h-[760px] lg:h-[calc(100svh-32px)] lg:min-h-[700px]">
        <img
          src="/investors-hero.png"
          alt="OMA Townhouse exterior in Kaba Kaba, Bali"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/75" />

        <ExperienceHeader
          context="Investor case"
          navItems={[
            { href: "#residence", label: "Residence" },
            { href: "#layout", label: "Layout" },
            { href: "#pricing", label: "Pricing" },
            { href: "#returns", label: "Returns" },
            { href: "#kaba-kaba", label: "Kaba Kaba" },
          ]}
          action={
            <button
              type="button"
              onClick={onRequestPack}
              className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-md transition-colors hover:bg-white hover:text-black sm:text-sm"
            >
              Request pack
            </button>
          }
        />

        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-7 sm:px-8 sm:pb-9 lg:px-10 lg:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-center gap-3 text-xs text-white/65">
              <span>Kaba Kaba, Bali</span>
              <span className="h-px w-8 bg-white/45" />
              <span>For living and earning</span>
            </div>
            <h1 className="max-w-[1180px] text-[15vw] font-medium leading-[0.8] tracking-[-0.075em] sm:text-[11vw] lg:text-[8.2vw]">
              Own the calm.
              <br />
              Understand the return.
            </h1>
          </motion.div>

          <div className="mt-8 flex items-end justify-between gap-8">
            <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              A two-bedroom home with a private pool, three ownership routes and
              a model you can question before you buy.
            </p>
            <a
              href="#snapshot"
              aria-label="Explore the investor case"
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/35 transition-colors hover:bg-white hover:text-black sm:flex"
            >
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Snapshot() {
  const facts = [
    ["From USD 115,000", "Current early-bird entry"],
    ["97.5 sqm", "Across two floors"],
    ["2 bedrooms", "Each with a bathroom"],
    ["Private pool", "For owners and guests"],
    ["12 homes", "Planned across OMA"],
    ["First 3", "Founding release pricing"],
  ];

  return (
    <section id="snapshot" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1450px]">
        <Reveal className="grid gap-12 lg:grid-cols-[0.8fr_1.5fr]">
          <p className="text-sm text-black/50">The investment at a glance</p>
          <div>
            <h2 className="max-w-5xl font-editorial text-5xl leading-[0.96] tracking-[-0.04em] sm:text-7xl lg:text-[7vw]">
              A home you can use. An asset you can understand.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-black/60">
              OMA is designed for a hybrid buyer: stay when Bali calls, then
              place the townhouse into managed rental operation while you are
              away.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid border-t border-black/20 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(([value, label], index) => (
            <Reveal key={label} delay={index * 0.035}>
              <div className="border-b border-black/20 py-7 lg:px-5">
                <strong className="block text-2xl font-medium tracking-[-0.03em]">
                  {value}
                </strong>
                <span className="mt-2 block text-sm text-black/50">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReleasePlan() {
  return (
    <section className="px-2.5 pb-24 sm:px-4 lg:pb-36">
      <div className="overflow-hidden rounded-[24px] bg-black px-5 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
        <Reveal className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm text-white/50">The OMA release plan</p>
            <h2 className="mt-5 max-w-2xl font-editorial text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl lg:text-[6.4vw]">
              Twelve homes. The first three begin the story.
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-white/60">
              OMA is planned as a 12-home development. Units 01-03 are the
              founding release and the only homes offered at today&apos;s
              early-bird numbers. Units 04-12 will be released later with
              revised pricing.
            </p>
            <div className="mt-7 flex flex-wrap gap-5 text-sm">
              <span className="inline-flex items-center gap-2 text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                Founding release
              </span>
              <span className="inline-flex items-center gap-2 text-white/45">
                <span className="h-2.5 w-2.5 rounded-full border border-white/35" />
                Future release
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 12 }, (_, index) => {
            const unitNumber = index + 1;
            const founding = unitNumber <= 3;
            return (
              <Reveal key={unitNumber} delay={index * 0.025}>
                <article
                  className={`flex min-h-[150px] flex-col justify-between rounded-[18px] border p-4 ${
                    founding
                      ? "border-white bg-white text-black"
                      : "border-white/20 bg-white/[0.025] text-white"
                  }`}
                >
                  <span
                    className={`text-xs ${
                      founding ? "text-black/45" : "text-white/35"
                    }`}
                  >
                    Unit
                  </span>
                  <div>
                    <strong className="text-3xl font-medium">
                      {String(unitNumber).padStart(2, "0")}
                    </strong>
                    <span
                      className={`mt-2 block text-xs ${
                        founding ? "text-black/50" : "text-white/40"
                      }`}
                    >
                      {founding ? "Founding price" : "Future release"}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/40">
          The site plan, individual unit availability and future release pricing
          are confirmed directly with the OMA team. Future units should not be
          assumed to use the founding-release prices.
        </p>
      </div>
    </section>
  );
}

function Residence({
  onOpenGallery,
}: {
  onOpenGallery: (index: number) => void;
}) {
  return (
    <section id="residence" className="px-2.5 pb-24 sm:px-4 lg:pb-32">
      <div className="mx-auto max-w-[1520px]">
        <Reveal className="mb-8 flex items-end justify-between gap-6 px-3 sm:px-5">
          <div>
            <p className="mb-3 text-sm text-black/50">The residence</p>
            <h2 className="text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
              See what you are buying.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onOpenGallery(0)}
            className="hidden rounded-full border border-black/20 px-5 py-3 text-sm transition-colors hover:bg-black hover:text-white sm:inline-flex"
          >
            View all {GALLERY.length} renders
          </button>
        </Reveal>

        <div className="grid gap-3 lg:grid-cols-12 lg:grid-rows-2">
          <GalleryCard
            index={0}
            onOpen={onOpenGallery}
            className="min-h-[480px] lg:col-span-7 lg:row-span-2 lg:min-h-[700px]"
            featured
          />
          <GalleryCard
            index={1}
            onOpen={onOpenGallery}
            className="min-h-[300px] lg:col-span-5"
          />
          <GalleryCard
            index={2}
            onOpen={onOpenGallery}
            className="min-h-[300px] lg:col-span-5"
          />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[3, 4, 5].map(index => (
            <GalleryCard
              key={index}
              index={index}
              onOpen={onOpenGallery}
              className="min-h-[300px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  index,
  onOpen,
  className,
  featured = false,
}: {
  index: number;
  onOpen: (index: number) => void;
  className: string;
  featured?: boolean;
}) {
  const image = GALLERY[index];
  return (
    <Reveal className={className} delay={index * 0.035}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="group relative h-full w-full overflow-hidden rounded-[22px] bg-black text-left text-white"
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-7">
          <div>
            <span className="text-xs text-white/60">{image.detail}</span>
            <h3
              className={`mt-1 font-medium tracking-[-0.035em] ${
                featured ? "text-3xl sm:text-4xl" : "text-2xl"
              }`}
            >
              {image.title}
            </h3>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/15 backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
            <Plus className="h-4 w-4" />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

function LayoutExplorer({
  onOpenGallery,
  onZoom,
}: {
  onOpenGallery: (index: number) => void;
  onZoom: (floor: FloorKey) => void;
}) {
  const [floor, setFloor] = useState<FloorKey>("ground");
  const [activeRoom, setActiveRoom] = useState(0);
  const plan = FLOOR_PLANS[floor];
  const room = plan.rooms[activeRoom] ?? plan.rooms[0];
  const render = GALLERY[room.gallery];

  const changeFloor = (next: FloorKey) => {
    setFloor(next);
    setActiveRoom(0);
  };

  return (
    <section
      id="layout"
      className="bg-black px-2.5 py-2.5 text-white sm:px-4 sm:py-4"
    >
      <div className="overflow-hidden rounded-[24px] border border-white/15 px-5 py-12 sm:px-10 lg:px-14 lg:py-16">
        <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.3fr] lg:items-end">
          <div>
            <p className="text-sm text-white/50">The layout</p>
            <h2 className="mt-4 max-w-2xl font-editorial text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl lg:text-[6.5vw]">
              Walk the home before it is built.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/60">
            Switch floors, choose a room, and connect the plan to the rendered
            space. Enlarge the plan whenever you want a closer view.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="overflow-hidden rounded-[22px] bg-white text-black">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 p-4 sm:px-6">
              <div className="flex gap-2">
                {(Object.keys(FLOOR_PLANS) as FloorKey[]).map(key => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => changeFloor(key)}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      floor === key
                        ? "bg-black text-white"
                        : "bg-black/[0.05] text-black/60 hover:text-black"
                    }`}
                  >
                    {FLOOR_PLANS[key].label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onZoom(floor)}
                className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black"
              >
                <Expand className="h-4 w-4" />
                Enlarge plan
              </button>
            </div>
            <div className="bg-white p-4 sm:p-8">
              <div
                className="relative mx-auto w-full max-w-[760px]"
                style={{ aspectRatio: plan.aspectRatio }}
              >
                <img
                  src={plan.image}
                  alt={`${plan.label} architectural plan`}
                  className="absolute inset-0 h-full w-full object-contain"
                />
                {plan.rooms.map((item, index) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => setActiveRoom(index)}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-sm font-semibold shadow-lg transition-transform hover:scale-110 ${
                      activeRoom === index
                        ? "border-black bg-black text-white"
                        : "border-black/20 bg-white text-black"
                    }`}
                    aria-label={`Show ${item.label} render`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-[520px] flex-col overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.04]">
            <button
              type="button"
              onClick={() => onOpenGallery(room.gallery)}
              className="group relative min-h-[330px] flex-1 overflow-hidden text-left"
            >
              <img
                key={render.src}
                src={render.src}
                alt={render.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm text-white/60">{room.label}</p>
                <h3 className="mt-1 text-3xl font-medium tracking-[-0.04em]">
                  {render.title}
                </h3>
              </div>
            </button>
            <div className="p-6">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <strong className="text-xl font-medium">{plan.label}</strong>
                  <span className="ml-3 text-sm text-white/45">
                    {plan.area}
                  </span>
                </div>
                <span className="text-sm text-white/45">
                  {activeRoom + 1} / {plan.rooms.length}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                {plan.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {plan.rooms.map((item, index) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => setActiveRoom(index)}
                    className={`rounded-full border px-3 py-2 text-xs ${
                      activeRoom === index
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ownership({ onRequestPack }: { onRequestPack: () => void }) {
  return (
    <section id="pricing" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="mb-4 text-sm text-black/50">Ownership and pricing</p>
            <h2 className="max-w-xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-7xl">
              One home. Three ways in.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-2xl text-base leading-relaxed text-black/60">
              These are the current founding-release prices for Units 01-03.
              Every ownership route uses the same residence; what changes is the
              term, legal structure and capital required. Units 04-12 will use
              revised release pricing.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-3 lg:grid-cols-3">
          {OWNERSHIP_OPTIONS.map((option, index) => {
            const amounts = calculateInvestment({
              nightlyRate: 200,
              nightsPerMonth: 18,
              priceUsd: option.priceUsd,
            }).payments;
            return (
              <Reveal key={option.key} delay={index * 0.06}>
                <article
                  className={`flex min-h-[520px] h-full flex-col rounded-[22px] border p-6 sm:p-8 ${
                    index === 1
                      ? "border-black bg-black text-white"
                      : "border-black/15 bg-white"
                  }`}
                >
                  <div>
                    <p
                      className={`text-sm ${
                        index === 1 ? "text-white/50" : "text-black/50"
                      }`}
                    >
                      {option.term}
                    </p>
                    <strong className="mt-5 block text-3xl font-medium tracking-[-0.04em]">
                      {option.earlyBirdPrice}
                    </strong>
                    <span
                      className={`mt-2 block text-sm line-through ${
                        index === 1 ? "text-white/35" : "text-black/35"
                      }`}
                    >
                      Standard {option.standardPrice}
                    </span>
                    <p
                      className={`mt-6 text-sm leading-relaxed ${
                        index === 1 ? "text-white/60" : "text-black/60"
                      }`}
                    >
                      {option.description}
                    </p>
                  </div>

                  <div
                    className={`mt-8 space-y-4 border-t pt-6 ${
                      index === 1 ? "border-white/20" : "border-black/15"
                    }`}
                  >
                    {amounts.map(payment => (
                      <div key={payment.key}>
                        <div className="flex items-baseline justify-between gap-4 text-sm">
                          <span
                            className={
                              index === 1 ? "text-white/50" : "text-black/50"
                            }
                          >
                            {payment.percent * 100}% {payment.label}
                          </span>
                          <strong>{formatUsd(payment.amountUsd)}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={onRequestPack}
                    className={`mt-auto flex items-center justify-between rounded-full px-5 py-3.5 text-sm font-medium ${
                      index === 1
                        ? "bg-white text-black"
                        : "border border-black/20 hover:bg-black hover:text-white"
                    }`}
                  >
                    Ask about this route
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-black/45">
          Current promotional pricing is subject to allocation and contract. The
          30 / 30 / 40 schedule follows construction milestones; confirm
          availability, inclusions and dates with the OMA team before making a
          decision.
        </p>
      </div>
    </section>
  );
}

function DecisionCalculator() {
  const [nightlyRate, setNightlyRate] = useState(200);
  const [nightsPerMonth, setNightsPerMonth] = useState(18);
  const [ownershipKey, setOwnershipKey] = useState<OwnershipKey>("lease25");
  const ownership =
    OWNERSHIP_OPTIONS.find(option => option.key === ownershipKey) ??
    OWNERSHIP_OPTIONS[0];
  const result = calculateInvestment({
    nightlyRate,
    nightsPerMonth,
    priceUsd: ownership.priceUsd,
  });

  return (
    <section
      id="returns"
      className="bg-black px-2.5 py-2.5 text-white sm:px-4 sm:py-4"
    >
      <div className="overflow-hidden rounded-[24px] border border-white/15 px-5 py-12 sm:px-10 lg:px-14 lg:py-16">
        <Reveal className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm text-white/50">The decision model</p>
            <h2 className="mt-5 max-w-2xl font-editorial text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl lg:text-[6.2vw]">
              Put your assumptions to work.
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-white/60">
              Change the nightly rate, occupancy and ownership route. The
              revenue, operating costs, yield and simple payback update
              together.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/20 pt-6 sm:grid-cols-4">
              <Metric
                label="Occupancy"
                value={`${(result.occupancyRate * 100).toFixed(0)}%`}
              />
              <Metric
                label="Annual gross"
                value={formatUsd(result.grossAnnual)}
              />
              <Metric label="Annual net" value={formatUsd(result.netAnnual)} />
              <Metric
                label="Simple payback"
                value={
                  result.paybackYears
                    ? `${result.paybackYears.toFixed(1)} years`
                    : "Not reached"
                }
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[22px] bg-white p-6 text-black sm:p-8">
            <h3 className="text-xl font-medium">Your assumptions</h3>
            <div className="mt-8 space-y-8">
              <RangeInput
                label="Nightly rate"
                value={nightlyRate}
                display={formatUsd(nightlyRate)}
                min={80}
                max={320}
                step={5}
                minLabel="USD 80"
                maxLabel="USD 320"
                onChange={setNightlyRate}
              />
              <RangeInput
                label="Nights booked per month"
                value={nightsPerMonth}
                display={`${nightsPerMonth} nights`}
                min={8}
                max={28}
                step={1}
                minLabel="8 nights"
                maxLabel="28 nights"
                onChange={setNightsPerMonth}
              />
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium">Ownership route</p>
              <div className="mt-3 grid gap-2">
                {OWNERSHIP_OPTIONS.map(option => (
                  <button
                    type="button"
                    key={option.key}
                    onClick={() => setOwnershipKey(option.key)}
                    className={`flex items-center justify-between rounded-[14px] border px-4 py-3 text-left text-sm ${
                      ownershipKey === option.key
                        ? "border-black bg-black text-white"
                        : "border-black/15"
                    }`}
                  >
                    <span>{option.term}</span>
                    <strong>{option.earlyBirdPrice}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-white/15 bg-white/[0.04] p-6 sm:p-8">
              <p className="text-sm text-white/50">Annual operating case</p>
              <div className="mt-7 space-y-4">
                <BreakdownRow
                  label="Gross rental revenue"
                  value={formatUsd(result.grossAnnual)}
                />
                <BreakdownRow
                  label={`Management at ${Math.round(
                    OPERATING_ASSUMPTIONS.managementRate * 100
                  )}%`}
                  value={`- ${formatUsd(result.managementCost)}`}
                  muted
                />
                <BreakdownRow
                  label={`Utilities reserve at ${Math.round(
                    OPERATING_ASSUMPTIONS.utilitiesRate * 100
                  )}%`}
                  value={`- ${formatUsd(result.utilitiesReserve)}`}
                  muted
                />
                <BreakdownRow
                  label="Core staffing and operations"
                  value={`- ${formatUsd(result.fixedOperations)}`}
                  muted
                />
                <BreakdownRow
                  label="Net after operations"
                  value={formatUsd(result.netAnnual)}
                  strong
                />
                <BreakdownRow
                  label="Monthly net"
                  value={formatUsd(result.monthlyNet)}
                />
                <BreakdownRow
                  label="Net yield on purchase price"
                  value={`${(result.netYield * 100).toFixed(1)}%`}
                />
              </div>
            </div>

            <div className="rounded-[22px] bg-white p-6 text-black sm:p-8">
              <p className="text-sm text-black/50">Capital deployment</p>
              <strong className="mt-3 block text-2xl font-medium">
                {ownership.term}
              </strong>
              <p className="mt-2 text-sm text-black/50">
                {ownership.earlyBirdPrice}
              </p>
              <div className="mt-7 space-y-5">
                {result.payments.map((payment, index) => (
                  <div
                    key={payment.key}
                    className="border-t border-black/15 pt-4"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm text-black/50">
                        0{index + 1} · {payment.percent * 100}%
                      </span>
                      <strong>{formatUsd(payment.amountUsd)}</strong>
                    </div>
                    <p className="mt-2 text-sm font-medium">{payment.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-black/45">
                      {payment.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-7 max-w-4xl text-xs leading-relaxed text-white/40">
          Illustration only, not financial advice or a guaranteed return. Taxes,
          financing costs, OTA commissions, changing seasonality and your legal
          structure are outside this quick model. Confirm the after-tax case
          with your adviser and the OMA team.
        </p>
      </div>
    </section>
  );
}

function Operations() {
  const items = [
    {
      title: "Revenue operation",
      description:
        "Channel setup, pricing, booking management, guest communication and review follow-up.",
    },
    {
      title: "Care on the ground",
      description:
        "Housekeeping, linen, pool care, routine maintenance and guest arrival coordination.",
    },
    {
      title: "Owner visibility",
      description:
        "Monthly operating statements, expense visibility and an annual reconciliation.",
    },
    {
      title: "Time for yourself",
      description:
        "Reserve owner stays, then return the home to managed rental operation while you are away.",
    },
  ];

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <Reveal className="grid gap-12 lg:grid-cols-[0.8fr_1.5fr]">
          <p className="text-sm text-black/50">How ownership works</p>
          <div>
            <h2 className="max-w-5xl font-editorial text-5xl leading-[0.96] tracking-[-0.04em] sm:text-7xl lg:text-[7vw]">
              Use it when you are here. Let it work when you are not.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-black/60">
              OMA is being structured as a managed hospitality product, not a
              key handover followed by a list of vendors for you to coordinate.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid border-t border-black/20 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <article className="min-h-[230px] border-b border-black/20 p-6 sm:p-8">
                <span className="text-sm text-black/35">0{index + 1}</span>
                <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-black/55">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationCase() {
  const places = [
    ["2-5 min", "Kaba Kaba village and local community"],
    ["10-15 min", "Nuanu, Kedungu and the coast"],
    ["15-20 min", "Seseh dining and wellness"],
    ["About 25 min", "Canggu and Pererenan"],
  ];

  return (
    <section id="kaba-kaba" className="px-2.5 pb-24 sm:px-4 lg:pb-36">
      <div className="grid overflow-hidden rounded-[24px] bg-black text-white lg:grid-cols-2">
        <div className="flex min-h-[640px] flex-col justify-between p-6 sm:p-10 lg:p-14">
          <Reveal>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <MapPin className="h-4 w-4" />
              Kaba Kaba, Tabanan
            </div>
          </Reveal>
          <Reveal>
            <h2 className="max-w-xl font-editorial text-6xl leading-[0.9] tracking-[-0.045em] sm:text-8xl">
              Close enough. Quiet enough.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
              The investment case is not that Kaba Kaba will become Canggu. It
              is that buyers and guests can reach the coast without living in
              its traffic.
            </p>
          </Reveal>
          <Reveal className="grid gap-5 border-t border-white/20 pt-7 sm:grid-cols-2">
            {places.map(([time, place]) => (
              <div key={place}>
                <strong className="block text-xl font-medium">{time}</strong>
                <span className="mt-1 block text-xs leading-relaxed text-white/45">
                  {place}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
        <div className="relative min-h-[520px] lg:min-h-[640px]">
          <img
            src={SCENE(26)}
            alt="OMA Townhouse private pool in Kaba Kaba"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1450px] px-3 pt-24 sm:px-5 lg:pt-32">
        <Reveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-sm text-black/50">The everyday radius</p>
          <div>
            <h3 className="max-w-4xl font-editorial text-5xl leading-[0.96] tracking-[-0.04em] sm:text-7xl">
              What is actually around Kaba Kaba.
            </h3>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-black/60">
              Start in the village, reach the coast in fifteen minutes, and keep
              Canggu close enough for the days you want it. This is the
              buyer&apos;s map, not a list of anonymous attractions.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KABA_KABA_GUIDE.map((place, index) => (
            <Reveal key={place.title} delay={index * 0.04}>
              <a
                href={place.href}
                data-external={
                  place.href.startsWith("http") ? "true" : undefined
                }
                className="group flex h-full min-h-[480px] flex-col overflow-hidden rounded-[22px] border border-black/15 bg-white"
              >
                <div className="relative min-h-[280px] overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-2 text-xs font-medium text-black shadow-sm">
                    {place.time} from OMA
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="text-xs text-black/40">
                    {place.category}
                  </span>
                  <h4 className="mt-2 text-2xl font-medium tracking-[-0.035em]">
                    {place.title}
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-black/55">
                    {place.description}
                  </p>
                  <span className="mt-auto flex items-center justify-between pt-7 text-sm font-medium">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 grid gap-10 border-t border-black/20 pt-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm text-black/50">The longer nature day</p>
            <h3 className="mt-4 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl">
              Waterfalls and the wider Tabanan landscape.
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {TABANAN_DAY_TRIPS.map(trip => (
              <a
                key={trip.title}
                href={trip.href}
                data-external="true"
                className="group overflow-hidden rounded-[22px] bg-black text-white"
              >
                <div className="relative min-h-[260px] overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/25 px-3 py-2 text-xs backdrop-blur-md">
                    {trip.time} from OMA
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h4 className="text-2xl font-medium tracking-[-0.035em]">
                      {trip.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {trip.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-5 flex max-w-[1450px] flex-wrap items-center justify-between gap-4 px-3 text-xs text-black/45">
        <span>
          Drive times are approximate and vary with route and traffic. Context
          reviewed July 2026.
        </span>
        <div className="flex gap-5">
          <a
            href="https://www.nuanu.com/"
            data-external="true"
            className="underline underline-offset-4 hover:text-black"
          >
            Nuanu
          </a>
          <a
            href="https://bali.bps.go.id/"
            data-external="true"
            className="underline underline-offset-4 hover:text-black"
          >
            BPS Bali
          </a>
        </div>
      </div>
    </section>
  );
}

function BuyerProtection() {
  const items = [
    {
      title: "Title and legal structure",
      body: "The underlying land title, chain of ownership and buyer structure are reviewed through a licensed Indonesian notary. Independent legal review is welcome before any deposit.",
    },
    {
      title: "Milestone-based payments",
      body: "Capital is staged 30 / 30 / 40 against reservation, inspected construction progress and completion rather than paid entirely at the beginning.",
    },
    {
      title: "Inspection and delivery",
      body: "The construction tranche follows an owner inspection. Delivery dates, specification, snagging and late-delivery remedies belong in the final notarized agreements.",
    },
    {
      title: "Exit routes",
      body: "Leasehold interests can be assigned with the remaining term, while a PT PMA owner may sell company shares or transfer the HGB asset, subject to legal and tax advice.",
    },
  ];

  return (
    <section className="bg-black px-2.5 py-2.5 text-white sm:px-4 sm:py-4">
      <div className="rounded-[24px] border border-white/15 px-5 py-12 sm:px-10 lg:px-14 lg:py-16">
        <Reveal className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <ShieldCheck className="h-4 w-4" />
              Before you commit
            </div>
            <h2 className="mt-5 max-w-xl font-editorial text-6xl leading-[0.9] tracking-[-0.045em] sm:text-7xl">
              The questions serious buyers should ask.
            </h2>
          </div>
          <div className="border-t border-white/20">
            {items.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-4 border-b border-white/20 py-7 sm:grid-cols-[auto_1fr]"
              >
                <span className="text-sm text-white/35">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <div className="overflow-hidden rounded-[22px] bg-black">
            <img
              src="/founder/irvan-lathief.webp"
              alt="Irvan Lathief, founder of OMA Townhouse"
              loading="lazy"
              className="aspect-square w-full object-cover grayscale"
            />
          </div>
          <div className="mt-5 grid gap-5 border-t border-black/20 pt-5 sm:grid-cols-2">
            <div>
              <strong className="text-lg font-medium">Irvan Lathief</strong>
              <span className="mt-1 block text-sm text-black/45">
                Founder, OMA Townhouse
              </span>
            </div>
            <div>
              <strong className="text-lg font-medium">Derek</strong>
              <span className="mt-1 block text-sm text-black/45">
                OMA development team
              </span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-sm text-black/50">Who is behind OMA</p>
          <h2 className="mt-5 max-w-4xl font-editorial text-5xl leading-[0.96] tracking-[-0.04em] sm:text-7xl">
            Irvan and Derek, building OMA with founder-level attention.
          </h2>
          <div className="mt-10 grid gap-8 border-t border-black/20 pt-8 sm:grid-cols-2">
            <p className="text-base leading-relaxed text-black/60">
              Irvan brings more than a decade in product design and delivery to
              OMA&apos;s first development. One site, one repeatable floor plan,
              and close attention to the decisions that affect owners.
            </p>
            <p className="text-base leading-relaxed text-black/60">
              Irvan and Derek are keeping the first 12 homes intentionally
              focused. Being early should come with more visibility, which is
              why milestone payments, owner inspections and direct team access
              are part of the buyer conversation.
            </p>
          </div>
          <a
            href="https://irvanlathief.com"
            data-external="true"
            className="mt-9 inline-flex items-center gap-5 rounded-full border border-black/20 px-5 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white"
          >
            Meet the founder
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Questions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <p className="text-sm text-black/50">Common buyer questions</p>
          <h2 className="mt-4 max-w-lg text-5xl font-medium leading-[0.96] tracking-[-0.05em] sm:text-6xl">
            Read the direct answer.
          </h2>
        </Reveal>
        <div className="border-t border-black/20">
          {FAQ.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.question} className="border-b border-black/20">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-8 py-6 text-left"
                  aria-expanded={open}
                >
                  <span className="text-lg font-medium sm:text-xl">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-sm leading-relaxed text-black/55 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onRequestPack }: { onRequestPack: () => void }) {
  return (
    <section className="px-2.5 pb-24 sm:px-4 sm:pb-4">
      <div className="overflow-hidden rounded-[24px] bg-black px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-20">
        <Reveal className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm text-white/45">Your next step</p>
            <h2 className="mt-6 max-w-4xl font-editorial text-6xl leading-[0.88] tracking-[-0.045em] sm:text-8xl lg:text-[8vw]">
              Take OMA into the serious conversation.
            </h2>
          </div>
          <div>
            <p className="max-w-lg text-base leading-relaxed text-white/55">
              Request the current floor plans, price list, payment structure and
              operating assumptions. The team will send the pack and follow up
              within 24 hours.
            </p>
            <button
              type="button"
              onClick={onRequestPack}
              className="mt-8 inline-flex items-center gap-6 rounded-full bg-white px-6 py-4 text-sm font-medium text-black"
            >
              Request investor pack
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-6 text-xs text-white/35">
          <span>OMA Townhouse, Kaba Kaba, Bali</span>
          <Link href="/" className="hover:text-white">
            Return to the main experience
          </Link>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-sm text-white/45">{label}</span>
      <strong className="mt-1 block text-xl font-medium">{value}</strong>
    </div>
  );
}

function RangeInput({
  label,
  value,
  display,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-4 text-sm">
        <span>{label}</span>
        <strong>{display}</strong>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onInput={event => onChange(Number(event.currentTarget.value))}
        className="mt-4 w-full accent-black"
      />
      <span className="mt-2 flex justify-between text-xs text-black/40">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </span>
    </label>
  );
}

function BreakdownRow({
  label,
  value,
  muted = false,
  strong = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-5 ${
        strong ? "border-t border-white/20 pt-4" : ""
      }`}
    >
      <span className={`text-sm ${muted ? "text-white/40" : "text-white/60"}`}>
        {label}
      </span>
      <strong className={strong ? "text-xl" : "text-sm"}>{value}</strong>
    </div>
  );
}

function GalleryLightbox({
  index,
  onChange,
  onClose,
}: {
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % GALLERY.length);
      if (event.key === "ArrowLeft")
        onChange((index - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onChange, onClose]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between p-5 sm:px-8">
            <div>
              <p className="text-xs text-white/45">
                {index + 1} / {GALLERY.length}
              </p>
              <h2 className="mt-1 text-xl font-medium">
                {GALLERY[index].title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 hover:bg-white hover:text-black"
              aria-label="Close gallery"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 pb-5 sm:px-8">
            <img
              src={GALLERY[index].src}
              alt={GALLERY[index].alt}
              className="h-full max-h-[78vh] w-full rounded-[18px] object-contain"
            />
            <button
              type="button"
              onClick={() =>
                onChange((index - 1 + GALLERY.length) % GALLERY.length)
              }
              className="absolute left-7 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black"
              aria-label="Previous image"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => onChange((index + 1) % GALLERY.length)}
              className="absolute right-7 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black"
              aria-label="Next image"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PlanLightbox({
  floor,
  onClose,
}: {
  floor: FloorKey | null;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (floor === null) setZoom(1);
  }, [floor]);

  return (
    <AnimatePresence>
      {floor && (
        <motion.div
          className="fixed inset-0 z-[115] flex flex-col bg-white text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between gap-5 border-b border-black/10 p-5 sm:px-8">
            <div>
              <p className="text-sm text-black/45">{FLOOR_PLANS[floor].area}</p>
              <h2 className="mt-1 text-2xl font-medium">
                {FLOOR_PLANS[floor].label}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom(value => Math.max(1, value - 0.25))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15"
                aria-label="Zoom out"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(value => Math.min(2.5, value + 0.25))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15"
                aria-label="Zoom in"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-2 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white"
                aria-label="Close floor plan"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-6 sm:p-10">
            <img
              src={FLOOR_PLANS[floor].image}
              alt={`${FLOOR_PLANS[floor].label} architectural plan`}
              style={{ transform: `scale(${zoom})` }}
              className="mx-auto h-full max-h-[calc(100vh-150px)] w-full origin-top object-contain transition-transform duration-300"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
