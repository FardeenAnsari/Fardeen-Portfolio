"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, Award, Eye } from "lucide-react";
import { PreviewModal, PreviewItem } from "@/components/ui/PreviewModal";

const JU_CERTIFICATE_ITEM: PreviewItem = {
  id: "jadavpur-esiot-cert",
  title: "Summer Internship — Embedded Systems & IoT",
  subtitle: "Jadavpur University — Grade A Honors",
  imageUrl: "/images/certificates/esiot.jpeg",
  category: "Research Internship",
  date: "Summer 2024",
  description: "Official credential awarded by Jadavpur University for 5-week intensive research internship in Embedded Systems and IoT, completing Smart Bee Hive signal analysis with highest Grade A.",
};

const MILESTONES = [
  {
    period: "2022 — 2026",
    badge: "GRADUATED",
    title: "Bachelor of Technology — Computer Science & Engineering",
    institution: "Supreme Knowledge Foundation Group of Institutions (MAKAUT)",
    description:
      "Graduated in July 2026 with a cumulative 7.52 CGPA and zero academic backlogs across 8 semesters. Rigorous coursework spanning Data Structures, DBMS, Computer Networks, and Software Engineering. Built Trashium (waste mgmt ML platform) and VetanFlow (payroll RBAC platform) as capstone software systems.",
    metric: "CGPA 7.52",
    hasCert: false,
  },
  {
    period: "2024 (5 Weeks)",
    badge: "RESEARCH INTERNSHIP",
    title: "Summer Intern — Embedded Systems & IoT",
    institution: "Jadavpur University",
    description:
      "Selected for an intensive research internship in Embedded Systems & IoT. Contributed to a Smart Bee Hive environmental monitoring system, developing signal analysis routines with Python and MATLAB, and gaining hands-on exposure to FPGA, Verilog, Arduino, and micro-sensor networks. Completed with highest honors.",
    metric: "Grade A",
    hasCert: true,
  },
  {
    period: "2020 — 2022",
    badge: "HIGHER SECONDARY",
    title: "Higher Secondary Examination (Class XII)",
    institution: "WBCHSE — Jagatdal Chasma-I Rahamat High School",
    description:
      "Completed higher secondary education in the Science stream with a strong foundation in Mathematics, Physics, and analytical problem solving.",
    metric: "77.2%",
    hasCert: false,
  },
  {
    period: "2018 — 2020",
    badge: "SECONDARY",
    title: "Secondary Examination (Class X)",
    institution: "WBBSE — Jagatdal Sri Hari Uchcha Vidyalaya",
    description:
      "Completed foundational schooling covering general sciences, mathematics, and regional languages.",
    metric: "69.0%",
    hasCert: false,
  },
];

export function JourneySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="journey" className="section border-t border-[var(--color-rule)]" aria-label="Academic and Practical Journey">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 lg:mb-16">
          <div className="space-y-3">
            <div className="section-label">Academic &amp; Professional Trajectory</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
              Journey &amp; Education
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--color-ink-2)] max-w-[42ch]">
            Solid computer science foundation backed by research, competitive engineering, and rigorous academics.
          </p>
        </div>

        {/* Rows Composition */}
        <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {MILESTONES.map((item, index) => (
            <div
              key={index}
              className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start hover:bg-[var(--color-paper-2)]/50 transition-colors px-2 sm:px-4 rounded-xl"
            >
              {/* Col 1: Timeline & Badge */}
              <div className="lg:col-span-3 space-y-2">
                <div className="font-mono text-sm font-semibold text-[var(--color-ink)]">
                  {item.period}
                </div>
                <div className="inline-block px-2 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink-3)]">
                  {item.badge}
                </div>
              </div>

              {/* Col 2: Degree/Role + Description */}
              <div className="lg:col-span-7 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--color-ink)] font-display">
                  {item.title}
                </h3>
                <div className="text-sm font-medium text-[var(--color-accent)]">
                  {item.institution}
                </div>
                <p className="text-sm text-[var(--color-ink-2)] leading-relaxed pt-1">
                  {item.description}
                </p>

                {item.hasCert && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-ink-2)] hover:text-[var(--color-ink)] underline underline-offset-4"
                      aria-label="Preview Jadavpur University Certificate"
                    >
                      <Eye size={13} />
                      <span>Preview Jadavpur University Certificate</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Col 3: Highlight Metric */}
              <div className="lg:col-span-2 lg:text-right">
                <div className="font-mono text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                  {item.metric}
                </div>
                <div className="text-[11px] font-mono text-[var(--color-ink-3)] uppercase">
                  Verified Score
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* In-app Certificate Modal */}
      <PreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentItem={JU_CERTIFICATE_ITEM}
      />
    </section>
  );
}
