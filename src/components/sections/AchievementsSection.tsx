"use client";

import { useState, useMemo } from "react";
import { Eye, Images, Sparkles, LayoutGrid, Rotate3d, Filter } from "lucide-react";
import Image from "next/image";
import { PreviewModal, PreviewItem } from "@/components/ui/PreviewModal";
import { RollingGallery } from "@/components/ui/RollingGallery";

const CERTIFICATES: PreviewItem[] = [
  {
    id: "sih2023-cert",
    title: "Smart India Hackathon 2023 — National Finalist",
    subtitle: "Ministry of Education, AICTE & Govt. of India",
    imageUrl: "/images/certificates/sih2023.jpeg",
    category: "National Finalist",
    date: "December 2023",
    description: "Official credential awarded for qualifying as a National Finalist in Smart India Hackathon 2023 for engineering an automated civic complaint routing platform.",
  },
  {
    id: "gic2024-cert",
    title: "NGP-DST Geo Innovation Challenge 2024 — Presenter",
    subtitle: "National Geospatial Programme, Department of Science & Technology, Govt. of India",
    imageUrl: "/images/certificates/gic-cert.jpg",
    category: "National Level Innovation",
    date: "2024",
    description: "Official certificate of presentation at the national level Geo Innovation Challenge for designing a flood-risk management and early-warning telemetry framework.",
  },
  {
    id: "rtet2024-cert",
    title: "RTET 2024 — International Seminar Presenter",
    subtitle: "Recent Trends in Engineering & Technology",
    imageUrl: "/images/certificates/rtet2024.png",
    category: "International Conference",
    date: "2024",
    description: "Presented a research framework on natural language processing (NLP) model evaluation standards at the international conference on Recent Trends in Engineering & Technology.",
  },
];

/**
 * Authentic visual assets for summits, hackathons, and research credentials.
 * The attached SIH 2024 problem statement screenshot (sih2024.jpeg) has been cleanly removed.
 */
const SUMMIT_EVENT_ITEMS: PreviewItem[] = [
  {
    id: "gic-presentation",
    title: "Technical Defence & Live Demonstration",
    subtitle: "Geo Innovation Challenge — National Summit",
    imageUrl: "/images/events/gic-1.jpg",
    category: "Live Telemetry",
    date: "2024",
    description: "Delivering the live system demonstration and telemetry dashboard for regional flood prediction before the expert evaluation jury.",
  },
  {
    id: "gic-fardeen-pic",
    title: "Fardeen at Geo Innovation Challenge",
    subtitle: "National Geospatial Programme — Final Summit",
    imageUrl: "/images/events/gic-fardeen.jpg",
    category: "Summit Presentation",
    date: "2024",
    description: "Fardeen presenting the flood-risk telemetry architecture before the evaluation panel at the national Geo Innovation Challenge.",
  },
  {
    id: "gic-summit",
    title: "Innovation Summit Proceedings",
    subtitle: "NGP-DST National Challenge Stage",
    imageUrl: "/images/events/gic-3.jpg",
    category: "National Summit",
    date: "2024",
    description: "On-stage event capture during the proceedings of the National Geospatial Challenge finals.",
  },
  {
    id: "gic-team-group",
    title: "Finalist Cohort & Mentors",
    subtitle: "Geo Innovation Challenge 2024",
    imageUrl: "/images/events/gic-group.jpg",
    category: "Team & Cohort",
    date: "2024",
    description: "With fellow engineering innovators and jury panel members following the technical defense and project adjudication.",
  },
];

const CREDENTIAL_GALLERY_ITEMS: PreviewItem[] = [
  {
    id: "sih2023-credential",
    title: "Smart India Hackathon 2023 National Finalist",
    subtitle: "Ministry of Education & AICTE",
    imageUrl: "/images/certificates/sih2023.jpeg",
    category: "National Credential",
    date: "2023",
    description: "Official credential awarded for qualifying as a National Finalist in Smart India Hackathon 2023 for civic workflow automation.",
  },
  {
    id: "gic2024-credential",
    title: "Geo Innovation Challenge 2024 Presenter",
    subtitle: "NGP-DST Government of India",
    imageUrl: "/images/certificates/gic-cert.jpg",
    category: "National Credential",
    date: "2024",
    description: "Official certificate of presentation at the national level Geo Innovation Challenge for flood-risk mitigation telemetry.",
  },
  {
    id: "rtet2024-credential",
    title: "RTET 2024 International Conference Presenter",
    subtitle: "Recent Trends in Engineering & Tech",
    imageUrl: "/images/certificates/rtet2024.png",
    category: "Conference Paper",
    date: "2024",
    description: "Presented research framework on NLP evaluation benchmarks at the international RTET conference proceedings.",
  },
  {
    id: "ju-esiot-credential",
    title: "Jadavpur University Research Internship (Grade A)",
    subtitle: "Embedded Systems & IoT",
    imageUrl: "/images/certificates/esiot.jpeg",
    category: "Research Credential",
    date: "2024",
    description: "Official Grade A honors certificate awarded by Jadavpur University for smart sensor signal analysis and IoT hardware research.",
  },
];

// Complete set for the 8-facet 3D cylinder
const ALL_GALLERY_ITEMS: PreviewItem[] = [
  ...SUMMIT_EVENT_ITEMS,
  ...CREDENTIAL_GALLERY_ITEMS,
];

type GalleryFilter = "all" | "summits" | "credentials";
type GalleryViewMode = "cylinder" | "grid";

export function AchievementsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PreviewItem | null>(null);
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [viewMode, setViewMode] = useState<GalleryViewMode>("cylinder");

  const filteredItems = useMemo(() => {
    if (filter === "summits") return SUMMIT_EVENT_ITEMS;
    if (filter === "credentials") return CREDENTIAL_GALLERY_ITEMS;
    return ALL_GALLERY_ITEMS;
  }, [filter]);

  const handleOpenPreview = (item: PreviewItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <section id="achievements" className="section border-t border-[var(--color-rule)]" aria-label="Honors and Awards">
      <div className="container space-y-12 lg:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="section-label">Verified Honors &amp; Summits</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
              Competitive Recognition
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--color-ink-2)] max-w-[42ch]">
            Official credentials from national hackathons, innovation challenges, and international conferences. Click any credential to preview instantly.
          </p>
        </div>

        {/* 3-Across Key Honors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: SIH 2023 */}
          <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[var(--color-accent)]/50 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">
                  2023
                </span>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink-3)] uppercase tracking-wider">
                  National Level
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-ink)] font-display">
                  Smart India Hackathon
                </h3>
                <div className="text-sm font-semibold text-[var(--color-ink-2)] pt-0.5">
                  National Finalist
                </div>
                <div className="text-xs font-mono text-[var(--color-ink-3)] pt-1">
                  Ministry of Education &amp; AICTE
                </div>
              </div>

              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                Selected as a National Finalist in India&apos;s flagship hackathon. Engineered a collaborative civic-routing platform to automate municipal complaint triage and accountability.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--color-rule)]">
              <button
                type="button"
                onClick={() => handleOpenPreview(CERTIFICATES[0])}
                className="btn-ghost py-2 px-3 text-xs flex items-center gap-2 w-full justify-center"
                aria-label="Preview Smart India Hackathon Certificate"
              >
                <Eye size={13} />
                <span>Preview Verified Certificate</span>
              </button>
            </div>
          </div>

          {/* Card 2: Geo Innovation Challenge 2024 */}
          <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[var(--color-accent)]/50 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">
                  2024
                </span>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink-3)] uppercase tracking-wider">
                  National Level
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-ink)] font-display">
                  Geo Innovation Challenge
                </h3>
                <div className="text-sm font-semibold text-[var(--color-ink-2)] pt-0.5">
                  Presenter &amp; Innovator
                </div>
                <div className="text-xs font-mono text-[var(--color-ink-3)] pt-1">
                  NGP-DST Government of India
                </div>
              </div>

              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                Presented an integrated flood-risk telemetry and early-warning management system at a national geospatial innovation summit, addressing regional disaster mitigation.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--color-rule)]">
              <button
                type="button"
                onClick={() => handleOpenPreview(CERTIFICATES[1])}
                className="btn-ghost py-2 px-3 text-xs flex items-center gap-2 w-full justify-center"
                aria-label="Preview Geo Innovation Challenge Certificate"
              >
                <Eye size={13} />
                <span>Preview Verified Certificate</span>
              </button>
            </div>
          </div>

          {/* Card 3: RTET 2024 International Seminar */}
          <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[var(--color-accent)]/50 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">
                  2024
                </span>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink-3)] uppercase tracking-wider">
                  International Level
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[var(--color-ink)] font-display">
                  RTET International Seminar
                </h3>
                <div className="text-sm font-semibold text-[var(--color-ink-2)] pt-0.5">
                  Research Framework Presenter
                </div>
                <div className="text-xs font-mono text-[var(--color-ink-3)] pt-1">
                  Recent Trends in Engineering &amp; Tech
                </div>
              </div>

              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                Presented a structured evaluation framework analyzing NLP model benchmarking standards at an international peer-reviewed conference.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--color-rule)]">
              <button
                type="button"
                onClick={() => handleOpenPreview(CERTIFICATES[2])}
                className="btn-ghost py-2 px-3 text-xs flex items-center gap-2 w-full justify-center"
                aria-label="Preview RTET Conference Certificate"
              >
                <Eye size={13} />
                <span>Preview Verified Certificate</span>
              </button>
            </div>
          </div>

        </div>

        {/* Enhanced Gallery Section — React Bits 3D RollingGallery & Curated Grid */}
        <div className="space-y-6">
          
          {/* Gallery Subheader & Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] font-semibold">
                <Images size={14} />
                <span>INNOVATION SUMMIT &amp; CREDENTIAL GALLERY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] font-display">
                National Stage, Technical Defences &amp; Proofs
              </h3>
            </div>

            {/* Filter Chips & View Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              
              {/* Category Filter Pills */}
              <div className="flex items-center rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    filter === "all"
                      ? "bg-[var(--color-accent)] text-[var(--color-paper)] font-bold shadow-sm"
                      : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  All ({ALL_GALLERY_ITEMS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("summits")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    filter === "summits"
                      ? "bg-[var(--color-accent)] text-[var(--color-paper)] font-bold shadow-sm"
                      : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  Summits ({SUMMIT_EVENT_ITEMS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("credentials")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    filter === "credentials"
                      ? "bg-[var(--color-accent)] text-[var(--color-paper)] font-bold shadow-sm"
                      : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  Credentials ({CREDENTIAL_GALLERY_ITEMS.length})
                </button>
              </div>

              {/* View Mode Toggle: 3D Cylinder vs Grid */}
              <div className="flex items-center rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode("cylinder")}
                  className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                    viewMode === "cylinder"
                      ? "bg-[var(--color-paper-3)] text-[var(--color-ink)] border border-[var(--color-rule)] font-semibold"
                      : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                  }`}
                  aria-label="3D Cylinder View"
                  title="3D Cylinder View"
                >
                  <Rotate3d size={14} className="text-[var(--color-accent)]" />
                  <span className="hidden sm:inline">3D Cylinder</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-[var(--color-paper-3)] text-[var(--color-ink)] border border-[var(--color-rule)] font-semibold"
                      : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                  }`}
                  aria-label="Grid View"
                  title="Grid View"
                >
                  <LayoutGrid size={14} className="text-[var(--color-accent)]" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>

            </div>
          </div>

          {/* Interactive Visual Presentation */}
          {viewMode === "cylinder" ? (
            /* React Bits 3D RollingGallery Component */
            <RollingGallery
              items={filteredItems}
              autoplay={true}
              autoplaySpeed={9}
              pauseOnHover={true}
              onItemClick={(item) => handleOpenPreview(item)}
            />
          ) : (
            /* Curated Bento Grid View */
            <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 sm:p-6 lg:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredItems.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => handleOpenPreview(photo)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-3)] hover:border-[var(--color-accent)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-left flex flex-col justify-end p-3.5 shadow-md"
                    aria-label={`View photo: ${photo.title}`}
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Dark gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-[var(--color-paper)]/80 text-[var(--color-accent)] border border-[var(--color-rule)] font-semibold truncate max-w-[120px]">
                          {photo.category || "Event"}
                        </span>
                        {photo.date && (
                          <span className="text-[var(--color-ink-3)]">{photo.date}</span>
                        )}
                      </div>
                      
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display line-clamp-2 leading-snug">
                        {photo.title}
                      </h4>
                      
                      <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[var(--color-ink-2)] group-hover:text-white transition-colors">
                        <span className="flex items-center gap-1">
                          <Eye size={12} className="text-[var(--color-accent)]" />
                          <span>Inspect Full Size</span>
                        </span>
                        <span className="text-[10px] opacity-60">#{index + 1}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Universal In-App Preview Modal */}
      <PreviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentItem={selectedItem}
        items={ALL_GALLERY_ITEMS}
        onNavigate={(item) => setSelectedItem(item)}
      />
    </section>
  );
}
