"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const PROJECT_GRADIENT: Record<string, string> = {
  trashium: "from-emerald-500/20 via-teal-500/10 to-transparent",
  vetanflow: "from-blue-500/20 via-indigo-500/10 to-transparent",
  restaurantpos: "from-orange-500/20 via-amber-500/10 to-transparent",
  "tiny-link": "from-cyan-500/20 via-blue-500/10 to-transparent",
};

const PROJECT_ICONS: Record<string, string> = {
  trashium: "♻️",
  vetanflow: "💼",
  restaurantpos: "🍽️",
  "tiny-link": "🔗",
};

export function WorkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section
      id="work"
      ref={ref}
      className="section-padding relative"
      aria-label="Featured projects"
    >
      <div className="container-portfolio">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="section-label">Featured Work</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4">
                Products I&apos;ve{" "}
                <span className="font-serif italic text-gradient">built</span>
              </h2>
              <p className="text-secondary max-w-lg">
                Each project is a story of problem-solving, engineering depth, and design craft.
              </p>
            </div>
            <Link
              href="/work"
              className="btn-ghost flex items-center gap-2 self-start sm:self-end whitespace-nowrap"
              data-cursor-label="All"
            >
              View All Projects
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Trashium — Hero Feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <TrashiumHeroCard />
          </motion.div>

          {/* Other projects grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.filter((p) => p.id !== "trashium").map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              >
                <ProjectCard
                  project={project}
                  isHovered={hoveredProject === project.id}
                  onHover={() => setHoveredProject(project.id)}
                  onLeave={() => setHoveredProject(null)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrashiumHeroCard() {
  const trashium = PROJECTS.find((p) => p.id === "trashium")!;

  return (
    <Link href={`/work/${trashium.id}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="relative glass-card overflow-hidden border border-border-subtle hover:border-emerald-500/30 transition-colors duration-500 p-0"
        style={{ padding: 0 }}
      >
        {/* Background gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            PROJECT_GRADIENT[trashium.id]
          )}
        />

        <div className="relative p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{PROJECT_ICONS[trashium.id]}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="section-label text-xs">Flagship Project</span>
                  <span className="tech-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
                    {trashium.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:text-gradient transition-all">
                {trashium.title}
              </h3>
              <p className="text-accent-blue font-mono text-sm mb-4">{trashium.tagline}</p>
              <p className="text-secondary leading-relaxed">{trashium.description}</p>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              {trashium.highlights.slice(0, 3).map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-secondary text-sm">{h}</span>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {trashium.tech.slice(0, 6).map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              <a
                href={trashium.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-primary flex items-center gap-2 text-xs px-4 py-2"
                data-cursor-label="Visit"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
              <a
                href={trashium.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-ghost flex items-center gap-2 text-xs px-4 py-2"
                data-cursor-label="Code"
              >
                <FaGithub size={14} /> Source
              </a>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden md:block">
            <div className="glass rounded-2xl p-6 border border-emerald-500/20 space-y-4">
              {/* Mock UI */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
                <div className="ml-2 flex-1 h-5 rounded glass border border-border-subtle flex items-center px-2">
                  <span className="text-xs text-muted font-mono">trashium.com</span>
                </div>
              </div>

              {/* Stats */}
              {[
                { label: "Green Credits Earned", value: "12,450", trend: "+18%" },
                { label: "KG Recycled", value: "8,920 kg", trend: "+24%" },
                { label: "CO₂ Saved", value: "2.4 tons", trend: "+31%" },
                { label: "Active Households", value: "847", trend: "+15%" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border-subtle">
                  <span className="text-xs text-muted">{stat.label}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary block">{stat.value}</span>
                    <span className="text-xs text-emerald-400">{stat.trend}</span>
                  </div>
                </div>
              ))}

              {/* Eco tier badge */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-2xl">🌿</span>
                <div>
                  <p className="text-xs text-emerald-400 font-semibold">Eco Level 12</p>
                  <p className="text-xs text-muted">Forest Guardian</p>
                </div>
              </div>
            </div>

            {/* Floating label */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 border border-border-subtle"
            >
              <span className="text-xs font-mono text-accent-blue">ML Pricing Engine</span>
            </motion.div>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="absolute top-6 right-6">
          <motion.div
            whileHover={{ x: 2, y: -2 }}
            className="w-9 h-9 rounded-xl glass border border-border-subtle flex items-center justify-center text-secondary group-hover:text-primary group-hover:border-accent-blue/30 transition-all"
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

function ProjectCard({
  project,
  isHovered,
  onHover,
  onLeave,
}: {
  project: (typeof PROJECTS)[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <Link href={`/work/${project.id}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        onHoverStart={onHover}
        onHoverEnd={onLeave}
        className="relative h-full glass-card overflow-hidden border border-border-subtle hover:border-border-default p-6 space-y-5"
      >
        {/* Background */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            PROJECT_GRADIENT[project.id]
          )}
        />

        <div className="relative space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{PROJECT_ICONS[project.id]}</span>
              <div>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-semibold",
                  project.status === "Live" ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" :
                  project.status === "Released" ? "text-blue-400 bg-blue-500/10 border border-blue-500/20" :
                  "text-muted bg-border-subtle border border-border-subtle"
                )}>
                  {project.status}
                </span>
              </div>
            </div>
            <motion.div
              whileHover={{ x: 2, y: -2 }}
              className="w-8 h-8 rounded-lg glass border border-border-subtle flex items-center justify-center text-muted group-hover:text-primary transition-colors"
            >
              <ArrowUpRight size={14} />
            </motion.div>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-gradient transition-all duration-300">
              {project.title}
            </h3>
            <p className="text-xs text-muted font-mono">{project.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-secondary text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="tech-badge text-xs py-1 px-2">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="tech-badge text-xs py-1 px-2 text-muted">+{project.tech.length - 4}</span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2 pt-2 border-t border-border-subtle">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors"
            >
              <FaGithub size={12} /> Code
            </a>
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs text-accent-blue hover:underline"
              >
                <ExternalLink size={12} /> Live
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
