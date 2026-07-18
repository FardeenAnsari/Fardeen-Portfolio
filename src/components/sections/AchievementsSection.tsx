"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ACHIEVEMENTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { X, Download, Award } from "lucide-react";

export function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

  const selected = ACHIEVEMENTS.find((a) => a.id === selectedAchievement);

  return (
    <section
      id="achievements"
      ref={ref}
      className="section-padding relative"
      aria-label="Achievements and credentials"
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
            <span className="section-label mx-auto">Achievements</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">
              The{" "}
              <span className="font-serif italic text-gradient">Trophy Room</span>
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              From national hackathon stages to international research forums — each milestone tells a story.
            </p>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Hackathons", value: "5+", icon: "🏆" },
              { label: "International Events", value: "2", icon: "🌍" },
              { label: "Research Presentations", value: "2", icon: "🔬" },
              { label: "Certifications", value: "4+", icon: "📜" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-5 text-center"
              >
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="text-xs text-muted mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Achievements masonry grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACHIEVEMENTS.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.6 }}
              >
                <AchievementCard
                  achievement={achievement}
                  onClick={() => setSelectedAchievement(achievement.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievement Modal */}
      <AnimatePresence>
        {selected && (
          <AchievementModal
            achievement={selected}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function AchievementCard({
  achievement,
  onClick,
}: {
  achievement: (typeof ACHIEVEMENTS)[0];
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.3 }}
      className="group w-full text-left glass-card p-6 space-y-4 border border-border-subtle hover:border-border-default cursor-pointer"
      data-cursor-label="View"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl flex-shrink-0", achievement.color)}>
          {achievement.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-border-subtle border border-border-default text-muted font-mono">
              {achievement.category}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
              {achievement.level}
            </span>
            {achievement.highlight && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-semibold">
                ★
              </span>
            )}
          </div>
          <span className="text-xs text-muted font-mono">{achievement.year}</span>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-primary mb-1 group-hover:text-gradient transition-all">
          {achievement.title}
        </h3>
        <p className="text-xs text-secondary mb-2">{achievement.subtitle}</p>
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {achievement.description}
        </p>
      </div>

      {/* Certificate indicator */}
      {achievement.certificate && (
        <div className="flex items-center gap-2 text-xs text-accent-blue">
          <Award size={12} />
          <span>Certificate available</span>
        </div>
      )}
    </motion.button>
  );
}

function AchievementModal({
  achievement,
  onClose,
}: {
  achievement: (typeof ACHIEVEMENTS)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", bounce: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-card border border-border-default max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-6"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl glass border border-border-subtle flex items-center justify-center text-secondary hover:text-primary"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-5">
          <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl flex-shrink-0", achievement.color)}>
            {achievement.icon}
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="tech-badge">{achievement.category}</span>
              <span className="tech-badge">{achievement.level} · {achievement.year}</span>
            </div>
            <h2 className="text-2xl font-bold text-primary">{achievement.title}</h2>
            <p className="text-secondary text-sm">{achievement.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-secondary leading-relaxed">{achievement.description}</p>

        {/* Certificate */}
        {achievement.certificate && (
          <div className="space-y-3">
            <h3 className="font-semibold text-primary">Certificate</h3>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border-default">
              <Image
                src={achievement.certificate}
                alt={`${achievement.title} certificate`}
                fill
                className="object-contain bg-white/5"
                sizes="600px"
              />
            </div>
          </div>
        )}

        {/* Gallery */}
        {achievement.gallery && achievement.gallery.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-primary">Event Gallery</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievement.gallery.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border-subtle">
                  <Image
                    src={img}
                    alt={`Event photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
