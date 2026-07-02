import {
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const IMAGES = {
  exterior:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene22.webp",
  pool: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene26.webp",
  living:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene32.webp",
  kitchen:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene39.webp",
  bedroom:
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene76.webp",
};

const GALLERY_IMAGES = [
  {
    src: IMAGES.living,
    alt: "OMA Townhouse open living room",
    title: "Room to arrive.",
    detail: "Ground floor · 66.7 sqm",
    bentoClass: "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  },
  {
    src: IMAGES.kitchen,
    alt: "OMA Townhouse kitchen and dining area",
    title: "Made to gather.",
    detail: "Kitchen and dining",
    bentoClass: "lg:col-span-5",
  },
  {
    src: IMAGES.bedroom,
    alt: "OMA Townhouse primary bedroom",
    title: "Quiet by design.",
    detail: "Primary bedroom",
    bentoClass: "lg:col-span-5",
  },
  {
    src: IMAGES.pool,
    alt: "OMA Townhouse private pool",
    title: "A pool of your own.",
    detail: "Private courtyard",
    bentoClass: "lg:col-span-4",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene51.webp",
    alt: "OMA Townhouse home office",
    title: "Space to focus.",
    detail: "Home office",
    bentoClass: "lg:col-span-4",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene41.webp",
    alt: "OMA Townhouse bathroom",
    title: "Calm in the details.",
    detail: "Bathroom",
    bentoClass: "lg:col-span-4",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene23.webp",
    alt: "OMA Townhouse street view",
    title: "Arrive at OMA.",
    detail: "Street view",
    bentoClass: "",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene52.webp",
    alt: "OMA Townhouse living and kitchen",
    title: "One connected home.",
    detail: "Living and kitchen",
    bentoClass: "",
  },
];

const OWNERSHIP = [
  {
    term: "25-year leasehold",
    priceUsd: 115_000,
    earlyBirdPrice: "USD 115,000",
    standardPrice: "USD 135,000",
    note: "The simplest way in",
  },
  {
    term: "40-year leasehold",
    priceUsd: 161_000,
    earlyBirdPrice: "USD 161,000",
    standardPrice: "USD 189,000",
    note: "A longer horizon",
  },
  {
    term: "Freehold via PT PMA",
    priceUsd: 265_000,
    earlyBirdPrice: "USD 265,000",
    standardPrice: "USD 310,000",
    note: "Built for permanence",
  },
];

const NEARBY_LINKS = [
  {
    slug: "local-community",
    distance: "2-5 min",
    title: "Start in the village",
    detail: "Kaba Kaba Social and the local community",
  },
  {
    slug: "spas-wellness",
    distance: "5-10 min",
    title: "Reset close to home",
    detail: "Ulaman Retreat and nearby wellness",
  },
  {
    slug: "beach-clubs",
    distance: "10-15 min",
    title: "Reach the coast",
    detail: "Nuanu and Luna Beach Club",
  },
  {
    slug: "cafes-dining",
    distance: "15-20 min",
    title: "Eat around Seseh",
    detail: "Open House, Neighbourhood and more",
  },
  {
    slug: "gyms-fitness",
    distance: "20-30 min",
    title: "Keep your routine",
    detail: "Pererenan and Canggu fitness",
  },
];

const FAQ = [
  {
    question: "Where is OMA Townhouse?",
    answer:
      "OMA is in Kaba Kaba, Tabanan, around 25 minutes from Canggu and 10 to 15 minutes from Nuanu, Luna Beach Club and Kedungu Beach.",
  },
  {
    question: "Can foreigners buy at OMA?",
    answer:
      "Yes. OMA offers 25 and 40-year leasehold options, plus freehold ownership through a PT PMA company structure.",
  },
  {
    question: "What is included?",
    answer:
      "Each 97.5 sqm townhouse spans two floors with two bedrooms, contemporary living spaces and a private pool. Ask OMA for the current specification and floor plans.",
  },
  {
    question: "Is the return guaranteed?",
    answer:
      "No. Any rental or appreciation figure is an illustration, not a guarantee. The investor page lets you test different nightly rates and occupancy assumptions.",
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ArrowLink({
  href,
  children,
  inverted = false,
}: {
  href: string;
  children: ReactNode;
  inverted?: boolean;
}) {
  const className = inverted
    ? "border-white/35 text-white hover:bg-white hover:text-stone-950"
    : "border-stone-900/30 text-stone-950 hover:bg-stone-950 hover:text-white";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-5 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function openGuide() {
  window.dispatchEvent(new Event("oma:open-chat"));
}

function formatArticleDate(value: string | null) {
  if (!value) return "OMA insight";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function formatUsd(value: number) {
  return `USD ${Math.round(value).toLocaleString("en-US")}`;
}

function RailControls({
  railRef,
  label,
  inverted = false,
}: {
  railRef: RefObject<HTMLDivElement | null>;
  label: string;
  inverted?: boolean;
}) {
  const scroll = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.max(rail.clientWidth * 0.82, 320),
      behavior: "smooth",
    });
  };

  const buttonClass = inverted
    ? "border-white/35 text-white hover:bg-white hover:text-black"
    : "border-black/25 text-black hover:bg-black hover:text-white";

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label={`Scroll ${label} backward`}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${buttonClass}`}
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label={`Scroll ${label} forward`}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${buttonClass}`}
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function GalleryLightbox({
  activeIndex,
  onClose,
  onChange,
}: {
  activeIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const isOpen = activeIndex !== null;
  const currentIndex = activeIndex ?? 0;
  const image = GALLERY_IMAGES[currentIndex];

  const move = (direction: number) => {
    onChange(
      (currentIndex + direction + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, currentIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="OMA photo gallery"
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <div>
              <strong className="text-sm font-medium">{image.title}</strong>
              <span className="ml-3 text-xs text-white/50">
                {currentIndex + 1} / {GALLERY_IMAGES.length}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-black"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20">
            <button
              type="button"
              onClick={() => move(-1)}
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/35 backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:left-8"
              aria-label="Previous photo"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <motion.img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="max-h-full max-w-full rounded-[18px] object-contain"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <button
              type="button"
              onClick={() => move(1)}
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/35 backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:right-8"
              aria-label="Next photo"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-5 pt-2 sm:px-8">
            {GALLERY_IMAGES.map((item, index) => (
              <button
                type="button"
                key={item.src}
                onClick={() => onChange(index)}
                className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-opacity ${
                  index === currentIndex
                    ? "border-white opacity-100"
                    : "border-transparent opacity-45 hover:opacity-80"
                }`}
                aria-label={`View photo ${index + 1}: ${item.title}`}
              >
                <img
                  src={item.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ResidenceGalleryCard({
  image,
  index,
  className = "",
  featured = false,
  onOpen,
}: {
  image: (typeof GALLERY_IMAGES)[number];
  index: number;
  className?: string;
  featured?: boolean;
  onOpen: (index: number) => void;
}) {
  return (
    <Reveal delay={index * 0.035} className={className}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="group relative h-full min-h-[280px] w-full overflow-hidden rounded-[22px] bg-black text-left text-white"
        aria-label={`Open gallery at ${image.title}`}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-6">
          <div className="max-w-[75%]">
            <p className="mb-1 text-xs text-white/60">{image.detail}</p>
            <h3
              className={`font-medium tracking-[-0.03em] ${
                featured ? "text-3xl sm:text-[2.2rem]" : "text-xl sm:text-2xl"
              }`}
            >
              {image.title}
            </h3>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/35 bg-black/15 text-lg backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
            +
          </span>
        </div>
      </button>
    </Reveal>
  );
}

function EntranceOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] overflow-hidden bg-black text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={IMAGES.exterior}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            initial={{ scale: 1.12, filter: "blur(14px)" }}
            animate={{ scale: 1.02, filter: "blur(8px)" }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0.88))]" />

          <div className="relative flex h-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <div className="flex items-center justify-between gap-6">
              <div className="text-sm text-white/60">
                OMA Townhouse, Kaba Kaba
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/45 hover:text-white"
              >
                Skip intro
              </button>
            </div>

            <div className="max-w-3xl">
              <motion.p
                className="text-sm text-white/55"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                Loading the OMA experience
              </motion.p>
              <motion.h1
                className="mt-6 max-w-4xl font-editorial text-6xl leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-[6.2vw]"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.85 }}
              >
                Relax. You&apos;re in Bali soon.
              </motion.h1>
              <motion.p
                className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
              >
                Kaba Kaba is quieter by nature. Let the place arrive before the
                details do.
              </motion.p>
            </div>

            <motion.div
              className="max-w-md"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="h-px overflow-hidden rounded-full bg-white/12">
                <motion.div
                  className="h-full origin-left bg-[linear-gradient(90deg,rgba(255,255,255,0.15),rgba(143,208,255,0.9),rgba(255,255,255,0.15))]"
                  initial={{ scaleX: 0.15, x: "-18%" }}
                  animate={{ scaleX: 1, x: "0%" }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-white/45">
                <span>Previewing residence, returns and ownership</span>
                <span>Take your time</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PaybackSection() {
  const [nightlyRate, setNightlyRate] = useState(200);
  const [nightsPerMonth, setNightsPerMonth] = useState(18);
  const managementRate = 0.18;
  const utilitiesRate = 0.07;
  const fixedOps = 4_200;
  const grossAnnual = nightlyRate * nightsPerMonth * 12;
  const occupancyRate = Math.min(100, (nightsPerMonth / 30) * 100);
  const managementCost = grossAnnual * managementRate;
  const utilitiesReserve = grossAnnual * utilitiesRate;
  const netAnnual = Math.max(
    0,
    grossAnnual - managementCost - utilitiesReserve - fixedOps
  );
  const monthlyNet = netAnnual / 12;

  return (
    <section
      id="payback"
      className="bg-black px-2.5 py-2.5 text-white sm:px-4 sm:py-4"
    >
      <div className="overflow-hidden rounded-[24px] border border-white/15 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <Reveal>
            <p className="text-sm text-white/55">Your money back</p>
            <h2 className="mt-5 max-w-2xl font-editorial text-6xl leading-[0.92] tracking-[-0.045em] sm:text-7xl lg:text-[6.3vw]">
              How long until OMA pays itself off.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xl text-base leading-relaxed text-white/65">
              Move the nightly rate and booked nights. We&apos;ll show the
              occupancy assumption, what operations take out, and how the staged
              purchase can still be paid back over time.
            </p>
            <div className="mt-8 grid gap-8 border-t border-white/20 pt-6 sm:grid-cols-3">
              <div>
                <span className="block text-sm text-white/50">
                  Annual gross
                </span>
                <strong className="mt-1 block text-2xl font-medium">
                  {formatUsd(grossAnnual)}
                </strong>
              </div>
              <div>
                <span className="block text-sm text-white/50">
                  Annual net of ops
                </span>
                <strong className="mt-1 block text-2xl font-medium">
                  {formatUsd(netAnnual)}
                </strong>
              </div>
              <div>
                <span className="block text-sm text-white/50">
                  Occupancy assumption
                </span>
                <strong className="mt-1 block text-2xl font-medium">
                  {occupancyRate.toFixed(0)}%
                </strong>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[20px] bg-white p-6 text-black sm:p-8">
            <h3 className="text-xl font-medium">Your assumptions</h3>
            <div className="mt-8 space-y-8">
              <label className="block">
                <span className="flex items-center justify-between gap-4 text-sm">
                  <span>Nightly rate</span>
                  <strong>{formatUsd(nightlyRate)}</strong>
                </span>
                <input
                  type="range"
                  min={80}
                  max={320}
                  step={5}
                  value={nightlyRate}
                  onInput={event =>
                    setNightlyRate(Number(event.currentTarget.value))
                  }
                  className="mt-4 w-full accent-black"
                />
                <span className="mt-2 flex justify-between text-xs text-black/50">
                  <span>USD 80</span>
                  <span>USD 320</span>
                </span>
              </label>
              <label className="block">
                <span className="flex items-center justify-between gap-4 text-sm">
                  <span>Nights booked per month</span>
                  <strong>{nightsPerMonth}</strong>
                </span>
                <input
                  type="range"
                  min={8}
                  max={28}
                  value={nightsPerMonth}
                  onInput={event =>
                    setNightsPerMonth(Number(event.currentTarget.value))
                  }
                  className="mt-4 w-full accent-black"
                />
                <span className="mt-2 flex justify-between text-xs text-black/50">
                  <span>8 nights</span>
                  <span>28 nights</span>
                </span>
              </label>
            </div>
            <div className="mt-8 rounded-[18px] border border-black/10 bg-black/[0.03] p-4">
              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/60">Booked nights</span>
                  <strong>
                    {nightsPerMonth} per month, about {occupancyRate.toFixed(0)}
                    % occupancy
                  </strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/60">
                    Management fee at {managementRate * 100}%
                  </span>
                  <strong>{formatUsd(managementCost)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/60">
                    Utilities reserve at {utilitiesRate * 100}%
                  </span>
                  <strong>{formatUsd(utilitiesReserve)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/60">
                    Core operations, staffing and upkeep
                  </span>
                  <strong>{formatUsd(fixedOps)}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-3">
                  <span className="text-black/60">Monthly net after ops</span>
                  <strong>{formatUsd(monthlyNet)}</strong>
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-black/55">
              Illustration only. Taxes, financing, construction milestones and
              the final legal schedule sit outside this quick model.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {OWNERSHIP.map((option, index) => {
              const payback =
                netAnnual > 0 ? option.priceUsd / netAnnual : Infinity;
              const deposit = option.priceUsd * 0.3;
              const stageTwo = option.priceUsd * 0.4;
              const finalStage = option.priceUsd * 0.3;
              const depositRecoveryMonths =
                monthlyNet > 0 ? deposit / monthlyNet : Infinity;
              return (
                <div
                  key={option.term}
                  className={`flex min-h-[360px] flex-col justify-between rounded-[20px] border p-6 ${
                    index === 1
                      ? "border-white bg-white text-black"
                      : "border-white/20 bg-white/[0.04] text-white"
                  }`}
                >
                  <div>
                    <span
                      className={`text-xs ${
                        index === 1 ? "text-black/50" : "text-white/50"
                      }`}
                    >
                      {option.term}
                    </span>
                    <strong className="mt-3 block text-xl font-medium">
                      {option.earlyBirdPrice}
                    </strong>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        index === 1 ? "text-black/60" : "text-white/60"
                      }`}
                    >
                      {option.note}. At today&apos;s settings, the staged entry
                      can be recovered gradually instead of all at once.
                    </p>
                  </div>

                  <div
                    className={`mt-5 space-y-3 rounded-[16px] p-4 ${
                      index === 1 ? "bg-black/[0.04]" : "bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span
                        className={
                          index === 1 ? "text-black/55" : "text-white/55"
                        }
                      >
                        30% to secure
                      </span>
                      <strong>{formatUsd(deposit)}</strong>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span
                        className={
                          index === 1 ? "text-black/55" : "text-white/55"
                        }
                      >
                        40% during build
                      </span>
                      <strong>{formatUsd(stageTwo)}</strong>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span
                        className={
                          index === 1 ? "text-black/55" : "text-white/55"
                        }
                      >
                        Final 30% at handover
                      </span>
                      <strong>{formatUsd(finalStage)}</strong>
                    </div>
                  </div>
                  <div
                    className={`mt-5 border-t pt-5 ${
                      index === 1 ? "border-black/15" : "border-white/20"
                    }`}
                  >
                    <div className="flex items-end justify-between gap-5">
                      <div>
                        <span
                          className={`text-xs ${
                            index === 1 ? "text-black/50" : "text-white/50"
                          }`}
                        >
                          Years to break even
                        </span>
                        <strong className="mt-1 block font-editorial text-5xl font-medium">
                          {Number.isFinite(payback) ? payback.toFixed(1) : "—"}
                        </strong>
                      </div>
                      <div className="text-right">
                        <span
                          className={`block text-xs ${
                            index === 1 ? "text-black/50" : "text-white/50"
                          }`}
                        >
                          Deposit recovered in
                        </span>
                        <strong className="mt-1 block text-lg font-medium">
                          {Number.isFinite(depositRecoveryMonths)
                            ? `${depositRecoveryMonths.toFixed(1)} mo`
                            : "—"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-2xl text-xs leading-relaxed text-white/45">
            Illustrative, not financial advice. Results depend on occupancy,
            seasonality, commissions, tax and ownership structure.
          </p>
          <ArrowLink href="/investors" inverted>
            See the full investor case
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { data: articles = [] } = trpc.lifestyle.list.useQuery();
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(
    null
  );
  const [showEntranceOverlay, setShowEntranceOverlay] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem("oma-home-intro-seen") !== "1";
  });
  const nearbyRailRef = useRef<HTMLDivElement>(null);
  const insightsRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showEntranceOverlay) return;

    let isActive = true;
    const openedAt = Date.now();
    const minimumDuration = 1800;
    const heroImage = new window.Image();

    const finish = () => {
      const elapsed = Date.now() - openedAt;
      const remaining = Math.max(0, minimumDuration - elapsed);

      window.setTimeout(() => {
        if (!isActive) return;
        window.sessionStorage.setItem("oma-home-intro-seen", "1");
        setShowEntranceOverlay(false);
      }, remaining);
    };

    heroImage.onload = finish;
    heroImage.onerror = finish;
    heroImage.src = IMAGES.exterior;

    return () => {
      isActive = false;
    };
  }, [showEntranceOverlay]);

  const nearbyCards = NEARBY_LINKS.flatMap(item => {
    const article = articles.find(candidate => candidate.slug === item.slug);
    return article ? [{ ...item, article }] : [];
  });

  const insightArticles = articles
    .filter(article => article.isInsight)
    .sort(
      (a, b) =>
        (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "") ||
        b.sortOrder - a.sortOrder
    )
    .slice(0, 8);

  return (
    <main className="overflow-hidden bg-white text-black">
      <EntranceOverlay
        isOpen={showEntranceOverlay}
        onClose={() => {
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem("oma-home-intro-seen", "1");
          }
          setShowEntranceOverlay(false);
        }}
      />

      <section className="p-2.5 sm:p-4">
        <div className="relative min-h-[720px] overflow-hidden rounded-[26px] bg-black sm:min-h-[760px] lg:h-[calc(100svh-32px)] lg:min-h-[700px]">
          <img
            src="/investors-hero.png"
            alt="OMA Townhouse exterior in Kaba Kaba, Bali"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-black/65" />

          <header className="relative z-10 flex items-center justify-between px-5 py-5 text-white sm:px-8 lg:px-10">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-lg font-semibold tracking-tight">OMA</span>
              <span className="h-4 w-px bg-white/45" />
              <span className="text-xs text-white/75">Kaba Kaba, Bali</span>
            </Link>

            <nav className="hidden items-center gap-8 text-sm lg:flex">
              <a
                href="#residence"
                className="text-white/80 transition-colors hover:text-white"
              >
                Residence
              </a>
              <a
                href="#payback"
                className="text-white/80 transition-colors hover:text-white"
              >
                Payback
              </a>
              <a
                href="#ownership"
                className="text-white/80 transition-colors hover:text-white"
              >
                Ownership
              </a>
            </nav>

            <Link
              href="/investors"
              className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-md transition-colors hover:bg-white hover:text-stone-950 sm:text-sm"
            >
              Investor preview
            </Link>
          </header>

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-7 text-white sm:px-8 sm:pb-9 lg:px-10 lg:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 flex items-center gap-3 text-xs text-white/70">
                <span>Modern tropical townhouse</span>
                <span className="h-px w-8 bg-white/45" />
                <span>Now previewing</span>
              </div>
              <h1 className="max-w-[1100px] text-[18vw] font-medium leading-[0.76] tracking-[-0.075em] sm:text-[14vw] lg:text-[10.2vw]">
                Live.
                <br />
                Own.
                <br />
                Belong.
              </h1>
            </motion.div>

            <div className="mt-8 flex items-end justify-between gap-8">
              <p className="max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                A considered home in one of Bali&apos;s last true pockets of
                peace, designed for living well and owning wisely.
              </p>
              <a
                href="#introduction"
                aria-label="Explore OMA Townhouse"
                className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/35 transition-colors hover:bg-white hover:text-stone-950 sm:flex"
              >
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="introduction"
        className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
      >
        <div className="mx-auto grid max-w-[1450px] gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:items-start">
          <Reveal>
            <p className="text-sm text-stone-500">A different side of Bali</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="max-w-5xl font-editorial text-5xl leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[7.4vw]">
              A home that makes space for the life you want, and the future you
              are building.
            </h2>
            <div className="mt-10 grid max-w-4xl gap-8 border-t border-stone-900/20 pt-7 sm:grid-cols-2">
              <p className="text-base leading-relaxed text-stone-600">
                OMA pairs quiet village living with a contemporary two-bedroom
                townhouse, a private pool and considered spaces across 97.5 sqm.
              </p>
              <p className="text-base leading-relaxed text-stone-600">
                Close enough to Canggu, Nuanu and the coast, but far enough away
                to still feel like Bali.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="residence"
        className="px-2.5 pb-16 sm:px-4 sm:pb-20 lg:pb-24"
      >
        <div className="mx-auto max-w-[1520px]">
          <Reveal className="mb-8 flex items-end justify-between gap-8 px-3 sm:px-5">
            <div>
              <p className="mb-3 text-sm text-stone-500">The residence</p>
              <h2 className="text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
                Built for every day.
              </h2>
            </div>
            <button
              type="button"
              onClick={openGuide}
              className="hidden text-sm underline decoration-stone-400 underline-offset-8 transition-colors hover:decoration-stone-950 sm:block"
            >
              Ask for floor plans
            </button>
          </Reveal>

          <div className="space-y-3">
            <div className="grid gap-3 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
              <ResidenceGalleryCard
                image={GALLERY_IMAGES[0]}
                index={0}
                featured
                onOpen={setActiveGalleryIndex}
                className="min-h-[380px] md:min-h-[520px] xl:min-h-[560px]"
              />

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 xl:grid-rows-2">
                <ResidenceGalleryCard
                  image={GALLERY_IMAGES[1]}
                  index={1}
                  onOpen={setActiveGalleryIndex}
                  className="min-h-[240px] md:min-h-[280px]"
                />
                <ResidenceGalleryCard
                  image={GALLERY_IMAGES[2]}
                  index={2}
                  onOpen={setActiveGalleryIndex}
                  className="min-h-[240px] md:min-h-[280px]"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <ResidenceGalleryCard
                image={GALLERY_IMAGES[3]}
                index={3}
                onOpen={setActiveGalleryIndex}
                className="min-h-[240px] md:min-h-[280px]"
              />
              <ResidenceGalleryCard
                image={GALLERY_IMAGES[4]}
                index={4}
                onOpen={setActiveGalleryIndex}
                className="min-h-[240px] md:min-h-[280px]"
              />
              <ResidenceGalleryCard
                image={GALLERY_IMAGES[5]}
                index={5}
                onOpen={setActiveGalleryIndex}
                className="min-h-[240px] md:min-h-[280px]"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end px-3 sm:px-5">
            <button
              type="button"
              onClick={() => setActiveGalleryIndex(0)}
              className="inline-flex items-center gap-4 rounded-full border border-black/25 px-5 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white"
            >
              View all {GALLERY_IMAGES.length} photos
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <PaybackSection />

      <section id="ownership" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1450px]">
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="mb-4 text-sm text-stone-500">Ownership</p>
              <h2 className="max-w-xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-7xl">
                One home. Three ways in.
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <div className="w-fit rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white">
                First-building early bird: 15% off
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-stone-600">
                The highlighted prices are the limited early-bird allocation for
                OMA&apos;s first building. They sit 15% below standard pricing
                and require a 30% deposit within 14 days, with full payment due
                before handover. Availability and the promotional window should
                be confirmed with the OMA team. All prices are in USD.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 border-t border-stone-900/25">
            {OWNERSHIP.map((option, index) => (
              <Reveal key={option.term} delay={index * 0.05}>
                <div className="group grid gap-3 border-b border-stone-900/25 py-7 transition-colors hover:bg-stone-100 sm:grid-cols-[1.2fr_0.7fr_auto] sm:items-center sm:px-4">
                  <div>
                    <span className="mr-5 text-xs text-stone-400">
                      0{index + 1}
                    </span>
                    <span className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                      {option.term}
                    </span>
                  </div>
                  <span className="pl-8 text-sm text-stone-500 sm:pl-0">
                    {option.note}
                  </span>
                  <div className="pl-8 text-left sm:pl-0 sm:text-right">
                    <span className="block text-xs text-stone-500">
                      Early-bird price
                    </span>
                    <strong className="block text-lg font-medium">
                      {option.earlyBirdPrice}
                    </strong>
                    <span className="mt-1 block text-xs text-stone-400 line-through">
                      Standard {option.standardPrice}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-wrap gap-4">
            <ArrowLink href="/investors">Explore the investor case</ArrowLink>
            <button
              type="button"
              onClick={openGuide}
              className="inline-flex items-center gap-5 rounded-full border border-stone-900/30 px-5 py-3 text-sm font-medium transition-colors hover:bg-stone-950 hover:text-white"
            >
              Ask about ownership
              <MessageCircle className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </section>

      <section className="px-2.5 pb-24 sm:px-4 lg:pb-36">
        <div className="relative min-h-[680px] overflow-hidden rounded-[24px] bg-stone-900">
          <img
            src={IMAGES.exterior}
            alt="OMA Townhouse street exterior"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex min-h-[680px] flex-col justify-between p-6 text-white sm:p-10 lg:p-14">
            <Reveal>
              <p className="text-sm text-white/60">The OMA snapshot</p>
            </Reveal>
            <Reveal>
              <h2 className="max-w-5xl font-editorial text-6xl leading-[0.9] tracking-[-0.04em] sm:text-8xl lg:text-[8vw]">
                Small in number.
                <br />
                Big in intention.
              </h2>
            </Reveal>
            <Reveal className="grid gap-5 border-t border-white/25 pt-7 sm:grid-cols-4">
              {[
                ["97.5 sqm", "Total floor area"],
                ["2", "Bedrooms"],
                ["2", "Floors"],
                ["Private", "Pool and garden"],
              ].map(([value, label]) => (
                <div key={label}>
                  <strong className="block text-2xl font-medium">
                    {value}
                  </strong>
                  <span className="mt-1 block text-xs text-white/55">
                    {label}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {nearbyCards.length > 0 && (
        <section id="nearby" className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
          <div className="mx-auto max-w-[1450px]">
            <Reveal className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-sm text-stone-500">Around OMA</p>
                <h2 className="text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
                  What is actually nearby.
                </h2>
              </div>
              <RailControls railRef={nearbyRailRef} label="nearby places" />
            </Reveal>
            <div
              ref={nearbyRailRef}
              data-rail="nearby"
              className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-3"
            >
              {nearbyCards.map((item, index) => (
                <Reveal
                  key={item.slug}
                  delay={index * 0.04}
                  className="w-[78vw] max-w-[390px] shrink-0 snap-start"
                >
                  <Link
                    href={`/blog/${item.article.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-stone-200">
                      <img
                        src={
                          item.article.heroImage ||
                          item.article.imageUrl ||
                          IMAGES.pool
                        }
                        alt={item.detail}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                        loading="lazy"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-black shadow-sm">
                        {item.distance} from OMA
                      </span>
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-5">
                      <div>
                        <h3 className="text-xl font-medium leading-tight tracking-[-0.025em]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-stone-500">
                          {item.detail}
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        id="insights"
        className="border-y border-black/10 bg-[#f3f3f3] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[1450px]">
          <Reveal className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:items-end">
            <p className="text-sm text-stone-500">Property intelligence</p>
            <div>
              <h2 className="max-w-5xl font-editorial text-5xl leading-[0.96] tracking-[-0.04em] sm:text-7xl">
                The questions worth asking before you buy in Bali.
              </h2>
              <p className="mt-7 max-w-2xl leading-relaxed text-stone-600">
                Clear guides on foreign ownership, taxes, off-plan buying and
                the changing Tabanan market.
              </p>
              <div className="mt-7 flex justify-end">
                <RailControls
                  railRef={insightsRailRef}
                  label="property insights"
                />
              </div>
            </div>
          </Reveal>

          <div
            ref={insightsRailRef}
            data-rail="insights"
            className="no-scrollbar mt-12 flex snap-x gap-3 overflow-x-auto pb-3"
          >
            {insightArticles.map((article, index) => (
              <Reveal
                key={article.id}
                delay={index * 0.04}
                className="w-[82vw] max-w-[410px] shrink-0 snap-start"
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block overflow-hidden rounded-[20px] bg-white transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-stone-200">
                    <img
                      src={
                        article.heroImage || article.imageUrl || IMAGES.living
                      }
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex min-h-[220px] flex-col justify-between p-6">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>
                        {index === 0
                          ? `Latest, ${formatArticleDate(article.publishedAt)}`
                          : formatArticleDate(article.publishedAt)}
                      </span>
                      {article.readingTime ? (
                        <span>{article.readingTime} min read</span>
                      ) : null}
                    </div>
                    <h3 className="text-2xl font-medium leading-[1.08] tracking-[-0.035em]">
                      {article.title}
                    </h3>
                    <ArrowRight className="mt-6 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 text-black sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.8fr_1.6fr]">
          <Reveal>
            <p className="text-sm font-medium text-black">Common questions</p>
          </Reveal>
          <div className="border-t border-black">
            {FAQ.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.04}>
                <details className="group border-b border-black py-6">
                  <summary className="flex list-none cursor-pointer items-center justify-between gap-6 text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                    {item.question}
                    <span className="text-2xl font-light transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pt-5 text-base leading-relaxed text-black">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-2.5 pb-2.5 sm:px-4 sm:pb-4">
        <div className="overflow-hidden rounded-[24px] bg-black px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <Reveal className="grid min-h-[480px] gap-14 lg:grid-cols-[1.5fr_0.7fr]">
            <div className="flex flex-col justify-between">
              <p className="text-sm text-white/50">Your next move</p>
              <h2 className="my-16 max-w-5xl text-6xl font-medium leading-[0.88] tracking-[-0.06em] sm:text-8xl lg:text-[8vw]">
                Find your way
                <br />
                into OMA.
              </h2>
              <button
                type="button"
                onClick={openGuide}
                className="group flex w-fit items-center gap-5 rounded-full border border-white/30 px-5 py-3 text-sm transition-colors hover:bg-white hover:text-stone-950"
              >
                Start with the OMA guide
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="flex flex-col justify-between border-t border-white/20 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="max-w-sm text-base leading-relaxed text-white/60">
                Ask about availability, ownership, pricing, the floor plan or
                what everyday life in Kaba Kaba actually feels like.
              </p>
              <div className="space-y-3 text-sm text-white/60">
                <a
                  href="https://wa.me/"
                  data-external="true"
                  className="block hover:text-white"
                >
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/omatownhouse"
                  data-external="true"
                  className="block hover:text-white"
                >
                  Instagram
                </a>
                <Link href="/investors" className="block hover:text-white">
                  Investor page
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-6 text-xs text-white/40">
            <span>OMA Townhouse, Kaba Kaba, Bali</span>
            <span>© {new Date().getFullYear()} OMA</span>
          </div>
        </div>
      </section>
      <GalleryLightbox
        activeIndex={activeGalleryIndex}
        onClose={() => setActiveGalleryIndex(null)}
        onChange={setActiveGalleryIndex}
      />
    </main>
  );
}
