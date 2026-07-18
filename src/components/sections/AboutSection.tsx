"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { PERSONAL, SKILLS } from "@/lib/data";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = [
  { key: "language", label: "Languages" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Databases" },
  { key: "tool", label: "DevOps & Tools" },
  { key: "ai", label: "AI / ML" },
  { key: "iot", label: "IoT" },
];

const CATEGORY_COLORS: Record<string, string> = {
  language: "from-yellow-500 to-orange-500",
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-teal-500",
  database: "from-indigo-500 to-blue-600",
  tool: "from-red-500 to-rose-500",
  ai: "from-purple-500 to-pink-500",
  iot: "from-amber-500 to-yellow-500",
};

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative"
      aria-label="About Fardeen Ansari"
    >
      <div className="container-portfolio">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-20"
        >
          {/* Section label */}
          <motion.div variants={itemVariants}>
            <span className="section-label">About Me</span>
          </motion.div>

          {/* Main about grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Portrait */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border-default"
                >
                  <Image
                    src="/images/fardeen-about.jpeg"
                    alt="Fardeen Ansari"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 to-transparent" />
                </motion.div>

                {/* Stats cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 top-12 glass rounded-2xl p-4 border border-border-subtle"
                >
                  <p className="text-2xl font-bold text-primary">7.35</p>
                  <p className="text-xs text-muted">CGPA · SKFGI</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-6 bottom-20 glass rounded-2xl p-4 border border-border-subtle"
                >
                  <p className="text-2xl font-bold text-gradient">9+</p>
                  <p className="text-xs text-muted">Events & Achievements</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right — Content */}
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Engineering products with{" "}
                  <span className="font-serif italic text-gradient">craft</span>{" "}
                  and purpose.
                </h2>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4 text-secondary leading-relaxed">
                <p>
                  I&apos;m a B.Tech Computer Science student at SKFGI (2022–2026), deeply passionate
                  about building products that solve real problems. My work spans full-stack web
                  development, mobile applications, IoT systems, and machine learning integration.
                </p>
                <p>
                  What sets me apart isn&apos;t just writing code — it&apos;s thinking deeply about
                  <span className="text-primary font-medium"> architecture, security, UX, and performance</span>{" "}
                  simultaneously. From a gamified waste-management ML system to a bank-grade payroll
                  platform, I build for correctness first, then elegance.
                </p>
                <p>
                  Outside the IDE: I&apos;ve presented research at international conferences,
                  reached the National Finals of Smart India Hackathon, and interned at
                  Jadavpur University&apos;s IoT lab — emerging with a Grade A.
                </p>
              </motion.div>

              {/* Education card */}
              <motion.div variants={itemVariants}>
                <div className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg flex-shrink-0">
                      🎓
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{PERSONAL.education.degree}</p>
                      <p className="text-secondary text-sm">{PERSONAL.education.institution}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="tech-badge">{PERSONAL.education.period}</span>
                        <span className="tech-badge">CGPA: {PERSONAL.education.cgpa}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Languages spoken */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                {["🇬🇧 English", "🇮🇳 Hindi", "🇧🇩 Bengali"].map((lang) => (
                  <span key={lang} className="tech-badge">{lang}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function MindSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="mind"
      ref={ref}
      className="section-padding relative"
      aria-label="Technical skills"
    >
      <div className="container-portfolio">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="section-label mx-auto">The Mind</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">
              Technology I work with
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              From frontend frameworks to ML pipelines — a curated view of my engineering toolkit.
            </p>
          </div>

          {/* Skills grid */}
          <div className="space-y-10">
            {SKILL_CATEGORIES.map((cat, catIdx) => {
              const skills = SKILLS.filter((s) => s.category === cat.key);
              if (skills.length === 0) return null;

              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: catIdx * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn("w-2 h-2 rounded-full bg-gradient-to-r", CATEGORY_COLORS[cat.key])} />
                    <h3 className="text-sm font-semibold text-muted uppercase tracking-wider font-mono">
                      {cat.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: catIdx * 0.1 + i * 0.05, duration: 0.4 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="glass-card px-4 py-3 flex items-center gap-3 cursor-default"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: skill.color }}
                        />
                        <span className="text-sm font-medium text-primary">{skill.name}</span>
                        <div className="flex gap-0.5 ml-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-1 h-3 rounded-full",
                                i < Math.round(skill.level / 20)
                                  ? "bg-accent-blue"
                                  : "bg-border-default"
                              )}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
