"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Tag,
  CheckCircle,
  Leaf,
  Briefcase,
  Utensils,
  Link as LinkIcon,
  Target,
  ShieldCheck,
  Scale,
  Layers,
  AlertTriangle,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS } from "@/lib/data";

type Project = (typeof PROJECTS)[0];

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  trashium: <Leaf className="text-emerald-400" size={28} />,
  vetanflow: <Briefcase className="text-[var(--color-accent)]" size={28} />,
  restaurantpos: <Utensils className="text-amber-400" size={28} />,
  meneu: <Utensils className="text-amber-400" size={28} />,
  "tiny-link": <LinkIcon className="text-sky-400" size={28} />,
};

export function ProjectPageClient({ project }: { project: Project }) {
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 2);
  const caseStudy = "caseStudy" in project ? project.caseStudy : undefined;

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24 text-[var(--color-ink)] bg-[var(--color-paper)]">
      <div className="container space-y-12 sm:space-y-16">
        
        {/* Back Button */}
        <div>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors py-2"
          >
            <ArrowLeft size={14} />
            <span>&larr; Back to Selected Work</span>
          </Link>
        </div>

        {/* Project Hero Header */}
        <div className="space-y-8">
          
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="section-label">{project.category}</span>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium">
              {project.status}
            </span>
            <span className="text-xs text-[var(--color-ink-3)] font-mono flex items-center gap-1">
              <Calendar size={12} /> {project.year}
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Title & Long Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] flex-shrink-0">
                  {PROJECT_ICONS[project.id] || PROJECT_ICONS["restaurantpos"]}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] font-display tracking-tight">
                    {project.title}
                  </h1>
                  <p className="text-[var(--color-accent)] font-mono text-xs sm:text-sm mt-1">
                    {project.tagline}
                  </p>
                </div>
              </div>

              <p className="text-[var(--color-ink-2)] leading-relaxed text-base sm:text-lg">
                {project.longDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap pt-2">
                {project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink size={15} />
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2"
                >
                  <FaGithub size={15} />
                  <span>Inspect Codebase</span>
                </a>
              </div>
            </div>

            {/* Architecture & Tech Spec Card */}
            <div className="lg:col-span-5 rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 space-y-5">
              <div className="flex items-center gap-2 border-b border-[var(--color-rule)] pb-3">
                <Tag size={15} className="text-[var(--color-accent)]" />
                <h2 className="text-sm font-bold text-[var(--color-ink)] font-display uppercase tracking-wider">
                  Technology Stack
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* Architecture Key-Value */}
              <div className="pt-4 border-t border-[var(--color-rule)] space-y-3 font-mono text-xs">
                <div className="text-[var(--color-ink-3)] uppercase tracking-wider">System Architecture</div>
                {Object.entries(project.architecture).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <span className="text-[var(--color-ink-3)] capitalize min-w-[90px]">{key}:</span>
                    <span className="text-[var(--color-ink)] font-sans">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Case Study Section (if available) */}
        {caseStudy && (
          <div className="space-y-12 sm:space-y-16 pt-8 border-t border-[var(--color-rule)]">
            
            {/* Problem & Solution Split */}
            <div className="space-y-6">
              <div className="section-label">Case Study Context</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] font-display">
                Operational Problem &amp; Architecture Solution
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Problem Statement */}
                <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
                    <AlertTriangle size={15} />
                    <span>The Problem Context</span>
                  </div>
                  <p className="text-[var(--color-ink-2)] text-sm sm:text-base leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>

                {/* Solution Architecture */}
                <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                    <CheckCircle size={15} />
                    <span>The Engineered Solution</span>
                  </div>
                  <p className="text-[var(--color-ink-2)] text-sm sm:text-base leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Subsystems Deep Dive */}
            {caseStudy.subsystems && caseStudy.subsystems.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="section-label">Subsystem Decomposition</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] font-display">
                    Architectural Modules &amp; Data Flow
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {caseStudy.subsystems.map((sub, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-[var(--color-accent)] font-mono text-xs font-semibold">
                        <Layers size={14} />
                        <span>Module {String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="text-base font-bold text-[var(--color-ink)] font-display">
                        {sub.name}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engineering Trade-Offs */}
            {caseStudy.tradeOffs && caseStudy.tradeOffs.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="section-label">Design Rationale</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] font-display">
                    Key Technical Trade-Offs
                  </h2>
                </div>

                <div className="space-y-4">
                  {caseStudy.tradeOffs.map((t, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-7 space-y-2.5"
                    >
                      <div className="flex items-center gap-2 text-[var(--color-accent)] font-mono text-xs font-semibold">
                        <Scale size={14} />
                        <span>Trade-Off Decision {i + 1}</span>
                      </div>
                      <h3 className="text-base font-bold text-[var(--color-ink)] font-display">
                        {t.decision}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                        <span className="text-[var(--color-ink)] font-semibold">Rationale: </span>
                        {t.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Data Integrity & Security Controls */}
            {caseStudy.integrityAndSecurity && caseStudy.integrityAndSecurity.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="section-label">Security &amp; Defenses</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] font-display">
                    Data Integrity &amp; Failure Modes
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {caseStudy.integrityAndSecurity.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5 space-y-2"
                    >
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                        <ShieldCheck size={14} />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--color-ink-2)] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Key Features & Highlights */}
        <div className="space-y-6 pt-6 border-t border-[var(--color-rule)]">
          <div className="space-y-1">
            <div className="section-label">Capabilities Matrix</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] font-display">
              Core Capabilities &amp; Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5 flex items-start gap-3"
              >
                <CheckCircle size={17} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-[var(--color-ink-2)] text-sm leading-relaxed">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Challenges Solved */}
        <div className="space-y-6 pt-6 border-t border-[var(--color-rule)]">
          <div className="space-y-1">
            <div className="section-label">System Hardening</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] font-display">
              Technical Hurdles Overcome
            </h2>
          </div>

          <div className="space-y-4">
            {project.challenges.map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5 flex items-start gap-4"
              >
                <span className="text-base font-bold text-[var(--color-accent)] font-mono flex-shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[var(--color-ink-2)] text-sm leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Demonstrated Impact */}
        <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-[var(--color-accent)] font-display text-lg font-bold">
            <Target size={18} />
            <span>Demonstrated Impact</span>
          </div>
          <p className="text-[var(--color-ink-2)] text-sm leading-relaxed">{project.impact}</p>
        </div>

        {/* Related Projects Navigation */}
        <div className="space-y-6 pt-6 border-t border-[var(--color-rule)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] font-display">
            Explore Other Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {relatedProjects.map((rp) => (
              <Link
                key={rp.id}
                href={`/work/${rp.id}`}
                className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 hover:border-[var(--color-accent)]/50 transition-colors block group space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-3)]">
                    {PROJECT_ICONS[rp.id] || PROJECT_ICONS["restaurantpos"]}
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors font-display">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-[var(--color-ink-3)] font-mono">{rp.subtitle}</p>
                  </div>
                </div>
                <p className="text-[var(--color-ink-2)] text-sm line-clamp-2 leading-relaxed">
                  {rp.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
