import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { SiteHeader } from "@/components/SiteHeader";
import { useAskAiChat } from "@/hooks/useAskAiChat";
import { ChatPanel, ChatSheet, ChatDocViewer } from "@/components/AskAiChat";
import {
  ChevronLeft, ChevronRight,
  MapPin, Wifi, Car, Waves,
  TreePine, Shield, Star, Check, MessageCircle,
  ExternalLink, Navigation
} from "lucide-react";

// Custom WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Custom Instagram Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const GALLERY_IMAGES = [
  { id: 1, alt: "OMA Townhouse Exterior", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene22.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene22_thumb.webp" },
  { id: 2, alt: "Living Room Interior", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene23.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene23_thumb.webp" },
  { id: 3, alt: "Pool Area", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene26.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene26_thumb.webp" },
  { id: 4, alt: "Bedroom View", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene32.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene32_thumb.webp" },
  { id: 5, alt: "Kitchen Area", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene33.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene33_thumb.webp" },
  { id: 6, alt: "Outdoor Space", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene39.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene39_thumb.webp" },
  { id: 7, alt: "Terrace View", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene41.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene41_thumb.webp" },
  { id: 8, alt: "Bathroom", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene51.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene51_thumb.webp" },
  { id: 9, alt: "Garden View", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene52.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene52_thumb.webp" },
  { id: 10, alt: "Night View", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene76.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene76_thumb.webp" },
  { id: 11, alt: "Aerial View", url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene77.webp", thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery/Scene77_thumb.webp" },
];

const AMENITIES = [
  { icon: Waves, name: "Private Pool" },
  { icon: Wifi, name: "High-Speed WiFi" },
  { icon: Car, name: "Parking" },
  { icon: MapPin, name: "Premium Location" },
  { icon: TreePine, name: "Garden" },
  { icon: Shield, name: "24/7 Security" },
];

const HIGHLIGHTS = [
  { icon: MapPin, title: "Prime Location", desc: "25 min to Canggu, 15 min to Tanah Lot" },
  { icon: Star, title: "Investment Ready", desc: "Strong rental yield potential" },
  { icon: Shield, title: "Freehold Available", desc: "Secure ownership options" },
];

// OMA coordinates for Google Maps directions
const OMA_COORDS = "-8.576677,115.145663";

// Distance data with Google Maps coordinates
const DISTANCE_DATA = [
  { name: "Kaba Kaba Social", distance: "2-5 min", coords: "-8.5780,115.1480", url: "https://www.instagram.com/kabakaba.social/" },
  { name: "Ulaman Resort", distance: "5-10 min", coords: "-8.5800,115.1500", url: "https://www.instagram.com/ulamanretreat/" },
  { name: "Nuanu / Luna Beach Club", distance: "10-15 min", coords: "-8.5950,115.1100", url: "https://www.nuanu.com" },
  { name: "Kedungu Beach", distance: "10-15 min", coords: "-8.5900,115.1050" },
  { name: "Open House Seseh", distance: "15-20 min", coords: "-8.6200,115.1250", url: "https://www.instagram.com/openhouseseseh/" },
  { name: "Pererenan (gyms, cafes)", distance: "20-25 min", coords: "-8.6395,115.1290" },
  { name: "Yuki / Batu Bolong", distance: "25-30 min", coords: "-8.6510,115.1380", url: "https://www.instagram.com/yukicanggu/" },
  { name: "Finns Beach Club", distance: "25-30 min", coords: "-8.6560,115.1350", url: "https://www.instagram.com/finnsbeachclub/" },
  { name: "Reload Sanctuary", distance: "25-30 min", coords: "-8.6478,115.1385", url: "https://www.instagram.com/reloadsanctuary/" },
  { name: "Chotto Matto", distance: "25-30 min", coords: "-8.6500,115.1370", url: "https://www.instagram.com/chottomatto.bali/" },
  { name: "Seminyak", distance: "35-40 min", coords: "-8.6900,115.1680" },
];

function getDirectionsUrl(destCoords: string) {
  return `https://www.google.com/maps/dir/${OMA_COORDS}/${destCoords}`;
}

// Blog image placeholders using gallery images
const BLOG_IMAGES = [
  GALLERY_IMAGES[0].url,
  GALLERY_IMAGES[1].url,
  GALLERY_IMAGES[2].url,
  GALLERY_IMAGES[3].url,
  GALLERY_IMAGES[4].url,
  GALLERY_IMAGES[5].url,
  GALLERY_IMAGES[6].url,
];

// Homepage FAQ. These mirror the FAQPage JSON-LD in client/index.html exactly;
// keep both in sync so structured data matches visible content.
const FAQ_ITEMS = [
  {
    question: "Where is OMA Townhouse located?",
    answer:
      "OMA Townhouse is in Kaba Kaba, Tabanan, Bali, about 25 minutes from Canggu and 10 to 15 minutes from Nuanu, Luna Beach Club and Kedungu Beach.",
  },
  {
    question: "Can foreigners buy property at OMA Townhouse?",
    answer:
      "Yes. OMA Townhouse offers freehold through a PT PMA company structure as well as 25 and 40 year leasehold options, the routes foreign buyers commonly use in Bali.",
  },
  {
    question: "How much does OMA Townhouse cost?",
    answer:
      "Pricing ranges from 115,000 USD for a 25 year leasehold to 265,000 USD for freehold, with standard prices up to 310,000 USD. Treat these as a guide and confirm current pricing with the team.",
  },
  {
    question: "Is Kaba Kaba a good place to buy off-plan property in Bali?",
    answer:
      "Land in Kaba Kaba is priced up to 70 percent below Canggu while major projects like the 44 hectare Nuanu Creative City and incoming hotel brands reshape the area. Returns are never guaranteed, so treat projections as ranges.",
  },
  {
    question: "What is the difference between freehold and leasehold here?",
    answer:
      "Freehold via PT PMA gives long term ownership through an Indonesian company, while leasehold gives the right to use the property for a fixed 25 or 40 year term at a lower entry price.",
  },
  {
    question: "How far is OMA Townhouse from the beach and Canggu?",
    answer:
      "Kedungu Beach and Luna Beach Club at Nuanu are 10 to 15 minutes away, and central Canggu is about 25 minutes by car.",
  },
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const chat = useAskAiChat();
  const { data: lifestyleArticles } = trpc.lifestyle.list.useQuery();
  // Investor-focused posts surfaced in the Insights row (links to /blog/:slug).
  const insightArticles = useMemo(
    () =>
      (lifestyleArticles ?? [])
        .filter((a) => a.isInsight)
        .sort(
          (a, b) =>
            (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "") ||
            b.sortOrder - a.sortOrder,
        ),
    [lifestyleArticles],
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  // Property content rendered via a helper function (NOT a component) so that
  // page re-renders (e.g. while typing in the chat) never remount it.
  const renderPropertyContent = (isMobile = false) => (
    <>
      {/* Title Section */}
      <div className={`${isMobile ? 'px-4 pt-4' : ''} pb-6 border-b border-gray-200`}>
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-gray-900 mb-2`}>
          Modern Tropical Townhouse in Kaba Kaba, Bali
        </h2>
        <p className="text-gray-600 text-sm">
          Tabanan, Bali, Indonesia • 25 min to Canggu • Rice field views
        </p>
      </div>

      {/* Highlights */}
      <div className={`${isMobile ? 'px-4' : ''} py-6 border-b border-gray-200 space-y-4`}>
        {HIGHLIGHTS.map((highlight, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <highlight.icon className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{highlight.title}</h4>
              <p className="text-gray-500 text-sm">{highlight.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className={`${isMobile ? 'px-4' : ''} py-6 border-b border-gray-200`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About this property</h3>
        <div className="text-gray-600 space-y-4 leading-relaxed text-sm">
          <p>
            Discover OMA Townhouse, a stunning modern tropical residence nestled in the serene village of Kaba Kaba, Tabanan. This property offers the perfect blend of Balinese tranquility and contemporary luxury.
          </p>
          <p>
            Wake up to breathtaking rice field views and mountain vistas, yet remain just 25 minutes from Canggu's world-class restaurants, beaches, and nightlife. Kaba Kaba represents Bali's best-kept secret, where land prices are up to 70% lower than Canggu, but the area is rapidly developing.
          </p>
          <p>
            Whether you're looking for a personal retreat or a high-yield investment property, OMA Townhouse offers exceptional value with premium finishes, private pool options, and professional rental management available.
          </p>
        </div>
      </div>

      {/* Amenities */}
      <div className={`${isMobile ? 'px-4' : ''} py-6 border-b border-gray-200`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What this place offers</h3>
        <div className="grid grid-cols-2 gap-4">
          {AMENITIES.map((amenity, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <amenity.icon className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 text-sm">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className={`${isMobile ? 'px-4' : ''} py-6 border-b border-gray-200`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
        <div className="rounded-xl overflow-hidden aspect-video mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.8!2d115.145663!3d-8.576677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzQnMzYuMCJTIDExNcKwMDgnNDQuNCJF!5e0!3m2!1sen!2sid!4v1706000000000!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="OMA Townhouse Location"
          />
        </div>
        <h4 className="font-medium text-gray-900 mb-2">Kaba Kaba, Tabanan</h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Located in the peaceful Tabanan regency, Kaba Kaba offers authentic Balinese village life while being conveniently close to Bali's popular destinations.
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-gray-400" />
            <span>25-30 min to Seminyak & Canggu</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-gray-400" />
            <span>15 min to Tanah Lot Temple</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-gray-400" />
            <span>35-40 min to Ngurah Rai Airport</span>
          </div>
        </div>
      </div>

      {/* Investment Info */}
      <div className={`${isMobile ? 'px-4' : ''} py-6`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Why invest in Kaba Kaba?</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</div>
            <p className="text-gray-600 text-sm">Land prices up to 70% lower than Canggu/Seminyak with similar growth potential</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</div>
            <p className="text-gray-600 text-sm">Government focus on developing Tabanan as the next tourism hub</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</div>
            <p className="text-gray-600 text-sm">Growing demand from travelers seeking authentic Bali experiences</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">4</div>
            <p className="text-gray-600 text-sm">Rapidly improving infrastructure with new roads and amenities</p>
          </div>
        </div>
      </div>

      {/* Property Specifications */}
      <div className={`${isMobile ? 'px-4' : ''} py-6 border-t border-gray-200`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Specifications</h3>
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 text-sm">Total Building Size</span>
            <span className="font-medium text-gray-900">97.5 sqm</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 text-sm">Ground Floor (excl. pool)</span>
            <span className="font-medium text-gray-900">66.7 sqm (8.78 × 7.6m)</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 text-sm">Upper Floor</span>
            <span className="font-medium text-gray-900">30.8 sqm (4.06 × 7.6m)</span>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className={`${isMobile ? 'px-4' : ''} py-6 border-t border-gray-200`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Options</h3>
        <p className="text-gray-500 text-sm mb-4">First building promo: 15% off all ownership types</p>
        
        {/* 25-Year Leasehold */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded">25-Year Leasehold</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Early Bird (First Building)</span>
              <span className="font-semibold text-gray-900">$115,000</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">Standard Price</span>
              <span className="text-gray-500">$135,000</span>
            </div>
            <button
              onClick={() => chat.sendInterest('25-Year Leasehold', '$115,000')}
              className="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              I'm Interested
            </button>
          </div>
        </div>

        {/* 40-Year Leasehold */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded">40-Year Leasehold</span>
            <span className="text-xs text-gray-500">+40% premium</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Early Bird (First Building)</span>
              <span className="font-semibold text-gray-900">$161,000</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">Standard Price</span>
              <span className="text-gray-500">$189,000</span>
            </div>
            <button
              onClick={() => chat.sendInterest('40-Year Leasehold', '$161,000')}
              className="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              I'm Interested
            </button>
          </div>
        </div>

        {/* Freehold */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">Freehold (PT PMA)</span>
            <span className="text-xs text-gray-500">Perpetual ownership</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Early Bird (First Building)</span>
              <span className="font-semibold text-gray-900">$265,000</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">Standard Price</span>
              <span className="text-gray-500">$310,000</span>
            </div>
            <button
              onClick={() => chat.sendInterest('Freehold (PT PMA)', '$265,000')}
              className="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              I'm Interested
            </button>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-xl p-4 text-sm">
          <p className="font-medium mb-2">Promo Conditions</p>
          <ul className="space-y-1 text-gray-300 text-xs">
            <li>• Limited to first building only</li>
            <li>• 30% deposit required within 14 days</li>
            <li>• Full payment before handover</li>
            <li>• Valid for 30-60 days from launch</li>
          </ul>
        </div>
      </div>

      {/* Dynamic Blog Section */}
      <div className={`${isMobile ? 'px-4' : ''} py-6 border-t border-gray-200`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Living in Kaba Kaba</h3>
        <p className="text-gray-600 text-sm mb-6">All the best of Canggu lifestyle, without the crowds. Here's what's nearby.</p>
        
        {/* Distance Summary - Stacks vertically on mobile */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <h4 className="font-medium text-gray-900 mb-3">Distance from OMA Townhouse</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {DISTANCE_DATA.map((item, idx) => (
              <a
                key={idx}
                href={getDirectionsUrl(item.coords)}
                data-external="true"
                className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <span className="text-gray-600 flex items-center gap-2">
                  <Navigation className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  {item.url ? (
                    <span className="underline underline-offset-2 decoration-gray-300 group-hover:decoration-gray-600">{item.name}</span>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </span>
                <span className="text-gray-900 font-medium flex items-center gap-1">
                  {item.distance}
                  <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {lifestyleArticles && lifestyleArticles.length > 0 ? (
            lifestyleArticles.map((article, idx) => (
              <article key={article.id} className="group">
                <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <img 
                    src={article.imageUrl || BLOG_IMAGES[idx % BLOG_IMAGES.length]} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    loading="lazy"
                  />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
                <div 
                  className="text-gray-600 text-sm leading-relaxed [&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-gray-300 hover:[&_a]:decoration-gray-900 [&_a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: article.content.body }}
                />
                
                {/* Venue distance chips */}
                {article.content.venues && article.content.venues.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.content.venues.map((venue: { name: string; distance: string; coords: string; url?: string }, vIdx: number) => (
                      <a
                        key={vIdx}
                        href={getDirectionsUrl(venue.coords)}
                        data-external="true"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors"
                      >
                        <Navigation className="w-3 h-3" />
                        <span className="font-medium text-gray-800">{venue.name}</span>
                        <span className="text-gray-400">•</span>
                        <span>{venue.distance}</span>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))
          ) : (
            // Fallback static content while loading
            <div className="text-gray-400 text-sm">Loading lifestyle content...</div>
          )}
        </div>

        {/* FAQ - mirrors the FAQPage JSON-LD in index.html for search and AI engines */}
        <div className="mt-10">
          <h4 className="font-medium text-gray-900 mb-3">Frequently asked questions</h4>
          <div className="border-t border-gray-200">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{item.question}</p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Insights / Blog - investor-focused posts in a horizontal scroll row,
            each linking to its prerendered /blog/:slug page. Sits directly
            below the FAQ; the lifestyle cards above are unchanged. */}
        {insightArticles.length > 0 && (
          <div className="mt-10 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Insights</h3>
            <p className="text-gray-600 text-sm mb-5">
              Guides for foreign investors looking at Bali off-plan property.
            </p>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
              {insightArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group shrink-0 w-64 snap-start"
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-gray-100">
                    <img
                      src={article.heroImage || article.imageUrl || BLOG_IMAGES[0]}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm leading-snug group-hover:underline underline-offset-2 decoration-gray-300">
                    {article.title}
                  </h4>
                  {article.readingTime ? (
                    <p className="text-gray-400 text-xs mt-1">{article.readingTime} min read</p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile View - Airbnb Style */}
      <div className="lg:hidden min-h-screen bg-white pb-24">
        {/* Photo Gallery - Full width */}
        <div className="relative bg-gray-100 aspect-[4/3]">
          <img 
            src={GALLERY_IMAGES[currentImageIndex].url} 
            alt={GALLERY_IMAGES[currentImageIndex].alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* WhatsApp & Instagram */}
          <div className="absolute top-4 right-4 flex gap-2">
            <a href="https://wa.me/" data-external="true" className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/omatownhouse" data-external="true" className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Navigation arrows */}
          <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2.5 py-1 rounded-md text-xs">
            {currentImageIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>

        {/* Property Content */}
        {renderPropertyContent(true)}

        {/* Footer spacer */}
        <div className="h-8" />

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between z-40">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="font-semibold text-gray-900">Contact for pricing</p>
          </div>
          <button
            onClick={() => chat.openMobile()}
            className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Ask AI
          </button>
        </div>

        {/* Mobile chat sheet (opened by the Ask AI bar above) */}
        <ChatSheet chat={chat} />
      </div>

      {/* Desktop View - Airbnb Style */}
      <div className="hidden lg:block min-h-screen bg-white">
        {/* Header */}
        <SiteHeader />

        {/* Photo Gallery */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[2/1] group">
            <img 
              src={GALLERY_IMAGES[currentImageIndex].url} 
              alt={GALLERY_IMAGES[currentImageIndex].alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm">
              {currentImageIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex gap-12">
            {/* Left Column - Property Content */}
            <div className="flex-1 max-w-2xl">
              {renderPropertyContent(false)}
            </div>

            {/* Right Column - Sticky Chat */}
            <div className="w-[380px] flex-shrink-0">
              <div className="sticky top-24">
                <ChatPanel chat={chat} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} OMA Townhouse. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Document Viewer Modal (driven by chat state) */}
      <ChatDocViewer chat={chat} />
    </>
  );
}
