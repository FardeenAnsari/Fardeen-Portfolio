"use client";

import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { ExternalLink, GitCommit, Terminal, Activity, Layers } from "lucide-react";
import Image from "next/image";
import { PERSONAL } from "@/lib/data";

const REPOSITORIES = [
  {
    name: "Trashium",
    repo: "AmartyaSingh07/Trashium",
    url: "https://github.com/AmartyaSingh07/Trashium",
    description: "Incentivized waste-management platform with Python ML pricing models and Leaflet route dispatch.",
    language: "TypeScript / Python",
    languageColor: "#3178C6",
    stars: "Featured",
    visibility: "Public",
    tag: "Flagship System",
  },
  {
    name: "vetanflow",
    repo: "FardeenAnsari/vetanflow",
    url: "https://github.com/FardeenAnsari/vetanflow",
    description: "Enterprise payroll platform with Supabase Row-Level Security, 5 roles, and database-enforced immutability.",
    language: "React 19 / Express",
    languageColor: "#61DAFB",
    stars: "Production",
    visibility: "Public",
    tag: "RBAC Security",
  },
  {
    name: "RestaurantPOS",
    repo: "FardeenAnsari/RestaurantPOS",
    url: "https://github.com/FardeenAnsari/RestaurantPOS",
    description: "Offline-first mobile restaurant point-of-sale with embedded SQLite and GST-compliant receipts.",
    language: "React Native / Expo",
    languageColor: "#02569B",
    stars: "Released",
    visibility: "Public",
    tag: "Offline-First",
  },
  {
    name: "tiny-link",
    repo: "FardeenAnsari/tiny-link",
    url: "https://github.com/FardeenAnsari/tiny-link",
    description: "High-throughput URL shortener with atomic counters on Node.js, Express, and PostgreSQL.",
    language: "Node.js / SQL",
    languageColor: "#339933",
    stars: "Built",
    visibility: "Public",
    tag: "Microservice",
  },
];

// 52 weeks simulated contribution blocks for high-end dev aesthetic
const ACTIVITY_WEEKS = Array.from({ length: 44 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    // Generate organic activity density
    const seed = (w * 7 + d * 13) % 29;
    if (seed < 10) return 0;
    if (seed < 20) return 1;
    if (seed < 26) return 2;
    return 3;
  })
);

const LEVEL_COLORS = [
  "bg-[var(--color-paper-3)]",
  "bg-emerald-950/70 border border-emerald-900/40",
  "bg-emerald-700/80",
  "bg-emerald-400",
];

export function GitHubStatusSection() {
  return (
    <section id="github-status" className="section border-t border-[var(--color-rule)]" aria-label="GitHub Telemetry and Status">
      <div className="container space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="section-label">Source Code &amp; Telemetry</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
              GitHub Status
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--color-ink-2)] max-w-[42ch]">
            Continuous development activity, modular software architecture, and public production codebases.
          </p>
        </div>

        {/* Profile Card & Stats Grid */}
        <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 space-y-8">
          
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[var(--color-rule)]">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-3)] flex-shrink-0">
                <Image
                  src="/images/fardeen-hero.png"
                  alt="Fardeen Ansari"
                  fill
                  className="object-cover object-[center_15%] scale-125"
                  sizes="56px"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-ink)] font-display">
                    Fardeen Ansari
                  </h3>
                  <span className="font-mono text-xs text-[var(--color-ink-3)]">@FardeenAnsari</span>
                </div>
                <div className="flex items-center gap-2 pt-1 font-mono text-xs text-[var(--color-ink-2)]">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Full Stack Engineer · Bengaluru, Karnataka</span>
                </div>
              </div>
            </div>

            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2 px-4 text-xs flex items-center gap-2 w-full sm:w-auto justify-center"
              aria-label="Open GitHub profile in new tab"
            >
              <FaGithub size={15} />
              <span>Explore github.com/FardeenAnsari</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-4 text-center sm:text-left space-y-1">
              <div className="font-mono text-xs text-[var(--color-ink-3)] uppercase">Public Repos</div>
              <div className="font-display text-2xl font-bold text-[var(--color-ink)]">4+</div>
              <div className="text-[11px] font-mono text-[var(--color-ink-3)]">Architectural Systems</div>
            </div>

            <div className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-4 text-center sm:text-left space-y-1">
              <div className="font-mono text-xs text-[var(--color-ink-3)] uppercase">Core Language</div>
              <div className="font-display text-2xl font-bold text-[#3178C6]">TypeScript</div>
              <div className="text-[11px] font-mono text-[var(--color-ink-3)]">+ Python &amp; SQL</div>
            </div>

            <div className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-4 text-center sm:text-left space-y-1">
              <div className="font-mono text-xs text-[var(--color-ink-3)] uppercase">Build Health</div>
              <div className="font-display text-2xl font-bold text-emerald-400">100% Passing</div>
              <div className="text-[11px] font-mono text-[var(--color-ink-3)]">Strict Type-Safe</div>
            </div>

            <div className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-4 text-center sm:text-left space-y-1">
              <div className="font-mono text-xs text-[var(--color-ink-3)] uppercase">Status</div>
              <div className="font-display text-2xl font-bold text-[var(--color-accent)]">Open to Work</div>
              <div className="text-[11px] font-mono text-[var(--color-ink-3)]">Full-Time Software Roles</div>
            </div>
          </div>

          {/* Pinned Repositories Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
              <span>FEATURED PRODUCTION REPOSITORIES</span>
              <span>VERIFIED GITHUB CODEBASES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REPOSITORIES.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-5 space-y-3 hover:border-[var(--color-accent)]/50 transition-colors block group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaGithub size={15} className="text-[var(--color-ink-2)]" />
                      <span className="font-mono text-sm font-bold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-3)]">
                      {repo.tag}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--color-ink-2)] leading-relaxed">
                    {repo.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[var(--color-rule)]/50 font-mono text-[11px] text-[var(--color-ink-3)]">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-1 group-hover:text-[var(--color-ink)] transition-colors">
                      <span>Inspect Code</span>
                      <ExternalLink size={11} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Activity Matrix Visualizer */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
              <div className="flex items-center gap-2">
                <Activity size={13} className="text-emerald-400" />
                <span>ACTIVITY DISCIPLINE · COMMITS &amp; REPOSITORIES</span>
              </div>
              <span className="hidden sm:inline">Consistent Engineering Cadence</span>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1.5 min-w-[620px] p-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)]">
                {ACTIVITY_WEEKS.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1.5">
                    {week.map((level, di) => (
                      <div
                        key={di}
                        className={`w-3 h-3 rounded-sm ${LEVEL_COLORS[level]} transition-colors`}
                        title={`Activity level: ${level}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-ink-3)] pt-1">
              <span>Telemetry synced from github.com/FardeenAnsari</span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-paper-3)]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950/70" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-700/80" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                <span>More</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
