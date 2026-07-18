"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { PERSONAL, SKILLS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";

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
  language: "from-accent-blue to-accent-purple",
  frontend: "from-accent-blue to-accent-purple",
  backend: "from-accent-blue to-accent-purple",
  database: "from-accent-blue to-accent-purple",
  tools: "from-accent-blue to-accent-purple",
  ai: "from-accent-blue to-accent-purple",
  iot: "from-accent-blue to-accent-purple",
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
                  className="relative aspect-[4/5] rounded-[32px] overflow-hidden"
                >
                  <Image
                    src="/images/fardeen-about.png"
                    alt="Fardeen Ansari"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/20 to-transparent" />
                </motion.div>

                {/* Stats cards */}
                <motion.div
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute -right-8 top-16 bg-white/90 dark:bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-4 min-w-[120px]"
                >
                  <p className="text-3xl font-black text-black">7.35</p>
                  <p className="text-xs text-black/50 font-medium mt-0.5">CGPA · SKFGI</p>
                </motion.div>

                <motion.div
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="absolute -left-6 bottom-20 bg-white/90 dark:bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-4 min-w-[140px]"
                >
                  <p className="text-3xl font-black text-accent-blue">9+</p>
                  <p className="text-xs text-black/50 font-medium mt-0.5">Events & Achievements</p>
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
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white text-lg flex-shrink-0">
                      <GraduationCap size={20} />
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
                {["English", "Hindi", "Bengali"].map((lang) => (
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
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

          {/* Skills Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, catIdx) => {
              const skills = SKILLS.filter((s) => s.category === cat.key);
              if (skills.length === 0) return null;

              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: catIdx * 0.1, duration: 0.5 }}
                  className="glass-card p-6 flex flex-col h-full border border-border-subtle hover:border-accent-blue/30 transition-colors shadow-lg hover:shadow-accent-blue/5"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className={cn("w-3 h-3 rounded-full bg-gradient-to-r", CATEGORY_COLORS[cat.key])} />
                    <h3 className="text-sm font-semibold text-muted uppercase tracking-wider font-mono">
                      {cat.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-5 mt-auto">
                    {skills.map((skill, i) => {
                      const IconComponent = (SiIcons as any)[skill.icon] || (FaIcons as any)[skill.icon];
                      return (
                        <div
                          key={skill.name}
                          className="flex flex-col items-center justify-center gap-2 group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-surface-mid/30 border border-border-subtle/50 flex items-center justify-center group-hover:bg-surface-mid/80 group-hover:border-border-strong group-hover:shadow-glow-sm transition-all duration-300">
                            {IconComponent ? (
                              <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" style={{ color: skill.color }} />
                            ) : (
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: skill.color }}
                              />
                            )}
                          </div>
                          <span className="text-[10px] font-medium text-secondary group-hover:text-primary transition-colors text-center w-full max-w-[60px] truncate">{skill.name}</span>
                        </div>
                      );
                    })}
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
