"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { TIMELINE } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Star } from "lucide-react";

const CATEGORY_STYLES: Record<string, { color: string; bg: string; label: string }> = {
  education: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", label: "Education" },
  achievement: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "Achievement" },
  experience: { color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", label: "Experience" },
  project: { color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", label: "Project" },
};

export function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"]
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      ref={ref}
      className="section-padding relative"
      aria-label="Engineering journey timeline"
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
          <div className="space-y-4">
            <span className="section-label">Engineering Journey</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">
              A story told in{" "}
              <span className="font-serif italic text-gradient">milestones</span>
            </h2>
            <p className="text-secondary max-w-xl">
              From classrooms to conference halls — every achievement that shaped who I am.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Background line track */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border-subtle/50" />
            
            {/* Scroll-filling Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px">
              <motion.div
                className="h-full w-[2px] -ml-[0.5px] bg-gradient-to-b from-accent-blue via-[#C08552] to-transparent origin-top"
                style={{ scaleY }}
              />
            </div>

            {/* Timeline items */}
            <div className="space-y-8 md:space-y-0">
              {TIMELINE.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                const style = CATEGORY_STYLES[item.category];
                const isActive = activeIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "relative md:grid md:grid-cols-2 md:gap-8 items-center",
                      "pl-14 sm:pl-16 md:pl-0"
                    )}
                  >
                    {/* Content */}
                    <div className={cn("md:pr-12", isLeft ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12")}>
                      <motion.button
                        onClick={() => setActiveIndex(isActive ? null : idx)}
                        whileHover={{ scale: 1.02 }}
                        className={cn(
                          "w-full text-left glass-card p-4 sm:p-5 border transition-all duration-300",
                          isActive ? "border-accent-blue/40 shadow-glow-sm" : "border-border-subtle"
                        )}
                      >
                        <div className={cn("flex items-center gap-2 mb-2", isLeft && "md:flex-row-reverse")}>
                          <span className={cn("text-xs font-semibold px-2 py-1 rounded-full border", style.bg, style.color)}>
                            {style.label}
                          </span>
                          <span className="text-xs text-muted font-mono">{item.year}</span>
                          {item.highlight && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-semibold">
                              <Star size={11} fill="currentColor" />
                              Highlight
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                        <p className="text-secondary text-sm leading-relaxed">{item.description}</p>

                        {/* Gallery preview */}
                        {item.gallery && item.gallery.length > 0 && isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 grid grid-cols-2 gap-2"
                          >
                            {item.gallery.slice(0, 4).map((img, i) => (
                              <div
                                key={i}
                                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewImage(img);
                                }}
                              >
                                <Image
                                  src={img}
                                  alt={`${item.title} photo ${i + 1}`}
                                  fill
                                  className="object-contain"
                                  sizes="200px"
                                />
                              </div>
                            ))}
                          </motion.div>
                        )}

                        {/* Certificate preview */}
                        {item.certificate && isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4"
                          >
                            <div
                              className="relative h-40 rounded-xl overflow-hidden border border-border-subtle cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewImage(item.certificate!);
                              }}
                            >
                              <Image
                                src={item.certificate}
                                alt={`${item.title} certificate`}
                                fill
                                className="object-contain"
                                sizes="400px"
                              />
                            </div>
                          </motion.div>
                        )}
                      </motion.button>
                    </div>

                    {/* Center dot */}
                    <div
                      className={cn(
                        "absolute left-8 top-5 md:left-1/2 md:top-1/2",
                        "w-5 h-5 rounded-full border-2 border-accent-blue bg-bg-primary",
                        "-translate-x-1/2 -translate-y-0 md:-translate-y-1/2",
                        "flex items-center justify-center text-sm z-10"
                      )}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-accent-blue"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      />
                    </div>

                    {/* Year label — mobile */}
                    <div className="absolute left-12 top-5 md:hidden">
                      <span className="text-xs text-muted font-mono">{item.year}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 md:p-12 cursor-pointer"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative w-full h-full max-w-5xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-border-subtle">
              <Image src={previewImage} alt="Preview" fill className="object-contain" />
            </div>
            <div className="absolute top-6 right-6 text-primary/50 hover:text-primary transition-colors text-sm font-mono tracking-widest uppercase">
              Click anywhere to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
