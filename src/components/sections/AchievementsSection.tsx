"use client";

import { useState } from "react";
import { Award, Eye, Globe2, Medal, Waves, Images, Sparkles } from "lucide-react";
import Image from "next/image";
import { PreviewModal, PreviewItem } from "@/components/ui/PreviewModal";

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

const EVENT_GALLERY: PreviewItem[] = [
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
    id: "gic-presentation",
    title: "Technical Defence & Presentation",
    subtitle: "Geo Innovation Challenge Summit",
    imageUrl: "/images/events/gic-1.jpg",
    category: "Summit Presentation",
    date: "2024",
    description: "Delivering the live system demonstration and telemetry dashboard for regional flood prediction.",
  },
  {
    id: "gic-summit",
    title: "Innovation Summit Stage",
    subtitle: "NGP-DST National Challenge",
    imageUrl: "/images/events/gic-3.jpg",
    category: "National Summit",
    date: "2024",
    description: "On-stage event capture at the National Geospatial Challenge proceedings.",
  },
  {
    id: "gic-team-group",
    title: "Finalist Cohort & Mentors",
    subtitle: "Geo Innovation Challenge 2024",
    imageUrl: "/images/events/gic-group.jpg",
    category: "Team & Cohort",
    date: "2024",
    description: "With fellow engineering innovators and jury members at the conclusion of the Geo Innovation Challenge.",
  },
  {
    id: "sih-event-team",
    title: "Smart India Hackathon Team",
    subtitle: "National Hackathon Arena",
    imageUrl: "/images/events/sih2024.jpeg",
    category: "Hackathon Arena",
    date: "SIH Finals",
    description: "Collaborative 36-hour sprint at the Smart India Hackathon solving municipal workflow bottlenecks.",
  },
];

const ALL_PREVIEW_ITEMS = [...CERTIFICATES, ...EVENT_GALLERY];

export function AchievementsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PreviewItem | null>(null);

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

        {/* 3-Across Cards Grid */}
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

        {/* Event Photo Gallery Strip — In-app visual proof */}
        <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-rule)] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-accent)]">
                <Images size={13} />
                <span>INNOVATION SUMMIT GALLERY</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-ink)] font-display">
                National Stage &amp; Technical Defences
              </h3>
            </div>
            <span className="text-xs font-mono text-[var(--color-ink-3)]">
              Click any frame to inspect full-size
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {EVENT_GALLERY.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => handleOpenPreview(photo)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-3)] hover:border-[var(--color-accent)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] text-left"
                aria-label={`View photo: ${photo.title}`}
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                  <span className="text-[11px] font-mono text-white truncate font-medium">
                    {photo.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Universal In-App Preview Modal */}
      <PreviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentItem={selectedItem}
        items={ALL_PREVIEW_ITEMS}
        onNavigate={(item) => setSelectedItem(item)}
      />
    </section>
  );
}
