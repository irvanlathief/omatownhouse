import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText, Home, DollarSign, MapPin, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

// CDN base used by the homepage gallery. The 3D renders below are the same
// optimized webp assets that drive the homepage gallery, sourced from the OMA
// build set in Google Drive (HiRes/Scene*.png) and resized for web delivery.
const RENDER_CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028072074/9CYr97KDESPC7xac2RnExU/oma-townhouse/gallery";

type DocPage =
  | { kind: "image"; image: string; caption: string; alt?: string }
  | { kind: "card"; title: string; lines: string[]; note?: string };

interface Document {
  id: string;
  name: string;
  description: string;
  icon: typeof FileText;
  type: "layout" | "render" | "pricing" | "location";
  pages: DocPage[];
}

const DOCUMENTS: Document[] = [
  {
    id: "layout",
    name: "Floor Plans",
    description: "Plot 1 first and second floor layouts",
    icon: Home,
    type: "layout",
    pages: [
      {
        kind: "image",
        image: "/property-docs/floor-plan-first.webp",
        caption: "First floor: living, kitchen, pool deck and one bedroom",
        alt: "OMA Townhouse first floor plan",
      },
      {
        kind: "image",
        image: "/property-docs/floor-plan-second.webp",
        caption: "Second floor: master bedroom suite and guest room",
        alt: "OMA Townhouse second floor plan",
      },
    ],
  },
  {
    id: "renders",
    name: "3D Renders",
    description: "Photorealistic views of the townhouse",
    icon: ImageIcon,
    type: "render",
    // Captions and ordering match the GALLERY_IMAGES list in client/src/pages/Home.tsx
    // so the chat shows the same scene labels the homepage gallery uses.
    pages: [
      { kind: "image", image: `${RENDER_CDN}/Scene22.webp`, caption: "Exterior", alt: "OMA Townhouse exterior" },
      { kind: "image", image: `${RENDER_CDN}/Scene23.webp`, caption: "Living room", alt: "Living room interior" },
      { kind: "image", image: `${RENDER_CDN}/Scene26.webp`, caption: "Pool area", alt: "Pool area" },
      { kind: "image", image: `${RENDER_CDN}/Scene32.webp`, caption: "Bedroom", alt: "Bedroom view" },
      { kind: "image", image: `${RENDER_CDN}/Scene33.webp`, caption: "Kitchen", alt: "Kitchen area" },
      { kind: "image", image: `${RENDER_CDN}/Scene39.webp`, caption: "Outdoor space", alt: "Outdoor space" },
      { kind: "image", image: `${RENDER_CDN}/Scene41.webp`, caption: "Terrace", alt: "Terrace view" },
      { kind: "image", image: `${RENDER_CDN}/Scene51.webp`, caption: "Bathroom", alt: "Bathroom" },
      { kind: "image", image: `${RENDER_CDN}/Scene52.webp`, caption: "Garden", alt: "Garden view" },
      { kind: "image", image: `${RENDER_CDN}/Scene76.webp`, caption: "Night view", alt: "Night view" },
      { kind: "image", image: `${RENDER_CDN}/Scene77.webp`, caption: "Aerial view", alt: "Aerial view" },
    ],
  },
  {
    id: "pricing",
    name: "Pricing & Ownership",
    description: "Leasehold and freehold entry points",
    icon: DollarSign,
    type: "pricing",
    pages: [
      {
        kind: "card",
        title: "25 year leasehold",
        lines: [
          "From 115,000 USD",
          "Right to use the property for a 25 year term",
          "Lowest entry point and simplest paperwork",
          "Available to any foreign buyer, no Indonesian residency required",
        ],
      },
      {
        kind: "card",
        title: "40 year leasehold",
        lines: [
          "Mid tier leasehold term",
          "Same simple foreign buyer route as 25 year",
          "Often combined with an agreed extension at expiry",
        ],
      },
      {
        kind: "card",
        title: "Freehold via PT PMA",
        lines: [
          "From 265,000 USD, standard pricing up to 310,000 USD",
          "Held through a foreign owned PT PMA company",
          "Closest equivalent to direct freehold for an overseas buyer",
          "Suited to investors who want to run the property as a rental business",
        ],
        note: "All figures are guide pricing. Confirm current numbers with the OMA Townhouse team. Not financial or legal advice.",
      },
    ],
  },
  {
    id: "location",
    name: "Location",
    description: "Kaba Kaba village, Tabanan, Bali",
    icon: MapPin,
    type: "location",
    pages: [
      { kind: "image", image: "/blog/blog-rice-field.webp", caption: "Rice fields surrounding the project in Kaba Kaba", alt: "Rice fields near OMA Townhouse" },
      { kind: "image", image: "/blog/kedungu-beach.jpg", caption: "Kedungu Beach, 10 to 15 minutes from OMA", alt: "Kedungu Beach near Tabanan" },
      { kind: "image", image: "/blog/blog-nuanu-creative.webp", caption: "Nuanu Creative City, 10 to 15 minutes away", alt: "Nuanu Creative City" },
      { kind: "image", image: "/blog/rice-terraces.jpg", caption: "Tabanan rice terraces near the village", alt: "Tabanan rice terraces" },
      {
        kind: "card",
        title: "Distances by car",
        lines: [
          "Kaba Kaba Social: 2 to 5 min",
          "Ulaman Resort: 5 to 10 min",
          "Nuanu / Luna Beach Club: 10 to 15 min",
          "Kedungu Beach: 10 to 15 min",
          "Open House Seseh: 15 to 20 min",
          "Pererenan (gyms, cafes): 20 to 25 min",
          "Canggu (Batu Bolong): 25 to 30 min",
          "Seminyak: 35 to 40 min",
        ],
      },
    ],
  },
];

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentId?: string;
}

export function DocumentViewer({ isOpen, onClose, documentId }: DocumentViewerProps) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (documentId) {
      const doc = DOCUMENTS.find((d) => d.id === documentId);
      if (doc) {
        setSelectedDoc(doc);
        setCurrentPage(0);
      }
    }
  }, [documentId]);

  const handleDocSelect = (doc: Document) => {
    setSelectedDoc(doc);
    setCurrentPage(0);
  };

  const handleBack = () => {
    setSelectedDoc(null);
    setCurrentPage(0);
  };

  const handleClose = () => {
    setSelectedDoc(null);
    setCurrentPage(0);
    onClose();
  };

  const nextPage = () => {
    if (selectedDoc && currentPage < selectedDoc.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const page = selectedDoc?.pages[currentPage];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl h-[70vh] flex flex-col bg-white border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
        <div className="flex-shrink-0 p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedDoc ? selectedDoc.name : "Property Documents"}
              </h2>
              {selectedDoc && (
                <p className="text-sm text-gray-500 mt-0.5">{selectedDoc.description}</p>
              )}
            </div>
            {selectedDoc && (
              <button
                onClick={handleBack}
                className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                All docs
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {!selectedDoc ? (
            <div className="p-6 space-y-3 overflow-y-auto h-full">
              {DOCUMENTS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => handleDocSelect(doc)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <doc.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden flex flex-col items-center justify-center p-6 bg-gray-50">
                {page?.kind === "image" ? (
                  <>
                    <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                      <img
                        src={page.image}
                        alt={page.alt ?? page.caption}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-sm bg-white"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-gray-700 text-sm mt-4 text-center max-w-md">{page.caption}</p>
                  </>
                ) : page?.kind === "card" ? (
                  <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">{page.title}</h3>
                    <ul className="space-y-2">
                      {page.lines.map((line, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                          <span className="text-gray-400 mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    {page.note ? (
                      <p className="text-xs text-gray-400 mt-4 leading-relaxed">{page.note}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between p-6 border-t border-gray-100">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  <p className="text-xs text-gray-400">
                    {currentPage + 1} / {selectedDoc.pages.length}
                  </p>
                  <div className="flex gap-1.5">
                    {selectedDoc.pages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentPage ? "bg-gray-900" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === selectedDoc.pages.length - 1}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { DOCUMENTS };
export type { Document };
