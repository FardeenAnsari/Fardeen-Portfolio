"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Tag, CheckCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { PROJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";

type Project = (typeof PROJECTS)[0];

const PROJECT_ICONS: Record<string, string> = {
  trashium: "♻️",
  vetanflow: "💼",
  restaurantpos: "🍽️",
  "tiny-link": "🔗",
};

export function ProjectPageClient({ project }: { project: Project }) {
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container-portfolio space-y-16">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Work
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="space-y-8"
        >
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="section-label">{project.category}</span>
            <span className={cn(
              "text-xs px-3 py-1 rounded-full font-semibold border",
              project.status === "Live" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
              "text-blue-400 bg-blue-500/10 border-blue-500/20"
            )}>
              {project.status}
            </span>
            <span className="text-xs text-muted font-mono flex items-center gap-1">
              <Calendar size={11} /> {project.year}
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{PROJECT_ICONS[project.id]}</span>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-primary">{project.title}</h1>
                  <p className="text-accent-blue font-mono text-sm mt-1">{project.tagline}</p>
                </div>
              </div>

              <p className="text-secondary leading-relaxed text-lg">{project.longDescription}</p>

              {/* Links */}
              <div className="flex gap-3 flex-wrap">
                {project.live !== "#" && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost flex items-center gap-2">
                  <FaGithub size={16} /> Source Code
                </a>
              </div>
            </div>

            {/* Tech stack */}
            <div className="glass-card p-6 space-y-4">
              <h2 className="font-semibold text-primary flex items-center gap-2">
                <Tag size={16} className="text-accent-blue" />
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>

              {/* Architecture */}
              <div className="pt-4 border-t border-border-subtle space-y-3">
                <h3 className="text-sm font-semibold text-secondary">Architecture</h3>
                {Object.entries(project.architecture).map(([key, value]) => (
                  <div key={key} className="flex gap-3">
                    <span className="text-xs text-muted font-mono capitalize min-w-[80px] pt-0.5">{key}:</span>
                    <span className="text-xs text-secondary">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-primary">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="glass rounded-xl p-4 border border-border-subtle flex items-start gap-3"
              >
                <CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-secondary text-sm">{h}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-primary">Engineering Challenges</h2>
          <div className="space-y-4">
            {project.challenges.map((c, i) => (
              <div key={i} className="glass-card p-5 border border-border-subtle flex items-start gap-4">
                <span className="text-lg font-bold text-gradient font-mono flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-secondary">{c}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass-card p-8 border border-accent-blue/20 bg-accent-blue/5"
        >
          <h2 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
            <span>🎯</span> Impact
          </h2>
          <p className="text-secondary">{project.impact}</p>
        </motion.div>

        {/* Related projects */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">More Projects</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {relatedProjects.map((rp) => (
              <Link
                key={rp.id}
                href={`/work/${rp.id}`}
                className="glass-card p-6 border border-border-subtle hover:border-border-default group block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{PROJECT_ICONS[rp.id]}</span>
                  <div>
                    <h3 className="font-bold text-primary group-hover:text-gradient transition-all">{rp.title}</h3>
                    <p className="text-xs text-muted">{rp.subtitle}</p>
                  </div>
                </div>
                <p className="text-secondary text-sm line-clamp-2">{rp.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
