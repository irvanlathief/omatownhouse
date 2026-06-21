import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Home, DollarSign, MapPin, Image, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Document {
  id: string;
  name: string;
  description: string;
  icon: typeof FileText;
  type: "layout" | "render" | "pricing" | "location";
  pages: string[];
}

const DOCUMENTS: Document[] = [
  {
    id: "layout",
    name: "Property Layout",
    description: "Detailed floor plans and unit configurations",
    icon: Home,
    type: "layout",
    pages: [
      "Ground Floor Plan - Living areas, kitchen, and outdoor spaces",
      "First Floor Plan - Master bedroom and en-suite bathroom",
      "Second Floor Plan - Guest bedrooms and shared facilities",
      "Site Plan - Property boundaries and landscaping",
    ],
  },
  {
    id: "renders",
    name: "3D Renders",
    description: "Photorealistic visualizations of the property",
    icon: Image,
    type: "render",
    pages: [
      "Exterior View - Front facade with tropical landscaping",
      "Living Room - Open-plan design with rice field views",
      "Master Bedroom - Spacious suite with private balcony",
      "Pool Area - Infinity pool overlooking the valley",
      "Kitchen - Modern tropical design with premium finishes",
    ],
  },
  {
    id: "pricing",
    name: "Pricing Guide",
    description: "Investment options and payment terms",
    icon: DollarSign,
    type: "pricing",
    pages: [
      "Unit Types & Base Pricing",
      "Payment Schedule Options",
      "Additional Packages & Upgrades",
      "ROI Projections & Rental Estimates",
    ],
  },
  {
    id: "location",
    name: "Location Overview",
    description: "Kaba Kaba area and nearby amenities",
    icon: MapPin,
    type: "location",
    pages: [
      "Regional Map - Kaba Kaba in context of Bali",
      "Local Amenities - Restaurants, shops, and services",
      "Beach Access - Nearby coastal areas",
      "Cultural Sites - Temples and traditional villages",
      "Travel Times - Distances to key destinations",
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

  // Update selected doc when documentId changes
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl h-[70vh] flex flex-col bg-white border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
        {/* Header */}
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
            // Document list view
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
            // Document viewer
            <div className="h-full flex flex-col">
              {/* Page content */}
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full h-full rounded-xl bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                    <selectedDoc.icon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    Page {currentPage + 1} of {selectedDoc.pages.length}
                  </p>
                  <p className="text-gray-700 text-lg max-w-sm leading-relaxed">
                    {selectedDoc.pages[currentPage]}
                  </p>
                  <div className="mt-8 px-4 py-2 rounded-full bg-gray-100">
                    <p className="text-gray-500 text-xs">
                      Placeholder • Actual document coming soon
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-6 border-t border-gray-100">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

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
