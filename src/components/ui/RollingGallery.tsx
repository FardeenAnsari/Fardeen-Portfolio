"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import Image from "next/image";
import { Eye, ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react";
import { PreviewItem } from "./PreviewModal";

interface RollingGalleryProps {
  items: PreviewItem[];
  autoplay?: boolean;
  autoplaySpeed?: number; // degrees per second
  pauseOnHover?: boolean;
  onItemClick?: (item: PreviewItem) => void;
  className?: string;
}

/**
 * RollingGallery — Inspired by React Bits (David Haz).
 * 
 * Interactive 3D cylindrical image gallery with:
 * - Landscape 4:3 card geometry ensuring full certificate and photo visibility
 * - Generous 3D viewport height avoiding any container overflow clipping
 * - Physics-driven horizontal drag with inertia throw damping
 * - Continuous 60fps autoplay with pause-on-hover & reduced-motion support
 * - Step navigation (prev/next) snapping to facet angles
 * - Active front-item detection and live captioning
 * - Full-featured touch support and responsive scaling for mobile viewports
 */
export function RollingGallery({
  items,
  autoplay = true,
  autoplaySpeed = 9,
  pauseOnHover = true,
  onItemClick,
  className = "",
}: RollingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isDragging, setIsDragging] = useState(false);
  const [dimensions, setDimensions] = useState({
    cardWidth: 200,
    cardHeight: 140,
    radius: 260,
    perspective: 1200,
  });
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // Framer Motion reactive rotation value
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (val) => `rotateY(${val}deg)`);

  const count = Math.max(items.length, 1);
  const anglePerItem = 360 / count;

  // Responsive dimensions calculation — 4:3 landscape ratio so certificates & event photos never cut off
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let cardW = 200;
      let cardH = 140;
      let pers = 1200;

      if (width < 640) {
        // Mobile screens: compact, landscape card
        cardW = 145;
        cardH = 105;
        pers = 800;
      } else if (width < 1024) {
        // Tablet screens
        cardW = 175;
        cardH = 125;
        pers = 1000;
      } else {
        // Desktop
        cardW = 205;
        cardH = 145;
        pers = 1200;
      }

      // Calculate cylinder radius so cards fit comfortably around circumference
      // R = (cardWidth / 2) / tan(PI / count)
      const calculatedRadius = Math.round((cardW / 2) / Math.tan(Math.PI / count));
      const finalRadius = Math.max(cardW * 1.2, calculatedRadius + 28);

      setDimensions({
        cardWidth: cardW,
        cardHeight: cardH,
        radius: finalRadius,
        perspective: pers,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [count]);

  // Autoplay loop using requestAnimationFrame
  useEffect(() => {
    if (!isPlaying || isDragging || (pauseOnHover && isHovered)) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const current = rotation.get();
      const next = current - autoplaySpeed * delta;
      rotation.set(next);

      // Compute active front index
      const normalizedAngle = ((-next % 360) + 360) % 360;
      const index = Math.round(normalizedAngle / anglePerItem) % count;
      setActiveItemIndex(index);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isDragging, pauseOnHover, isHovered, autoplaySpeed, rotation, anglePerItem, count]);

  // Manual Drag Handlers
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const current = rotation.get();
    const sensitivity = 0.35;
    const next = current + info.delta.x * sensitivity;
    rotation.set(next);

    const normalizedAngle = ((-next % 360) + 360) % 360;
    const index = Math.round(normalizedAngle / anglePerItem) % count;
    setActiveItemIndex(index);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const velocity = info.velocity.x * 0.12;
    const current = rotation.get();
    const target = current + velocity;

    animate(rotation, target, {
      type: "spring",
      stiffness: 80,
      damping: 24,
      onUpdate: (latest) => {
        const normalizedAngle = ((-latest % 360) + 360) % 360;
        const index = Math.round(normalizedAngle / anglePerItem) % count;
        setActiveItemIndex(index);
      },
    });
  };

  // Step Navigation: previous & next facet
  const handleStep = useCallback((direction: "prev" | "next") => {
    const current = rotation.get();
    const stepAngle = direction === "next" ? -anglePerItem : anglePerItem;
    const target = Math.round((current + stepAngle) / anglePerItem) * anglePerItem;

    animate(rotation, target, {
      type: "spring",
      stiffness: 140,
      damping: 22,
      onUpdate: (latest) => {
        const normalizedAngle = ((-latest % 360) + 360) % 360;
        const index = Math.round(normalizedAngle / anglePerItem) % count;
        setActiveItemIndex(index);
      },
    });
  }, [anglePerItem, count, rotation]);

  const activeItem = items[activeItemIndex] || items[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 sm:p-6 lg:p-8 space-y-5 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="3D Rolling Gallery"
    >
      {/* Gallery Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-rule)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] font-semibold">
            <Sparkles size={13} />
            <span>3D CYLINDER GALLERY</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-ink-2)]">
            Drag horizontally to spin the 3D cylinder. Click any card to inspect full high-resolution details.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-3)] hover:border-[var(--color-accent)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors text-xs font-mono flex items-center gap-1.5 touch-manipulation"
            aria-label={isPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
            title={isPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={() => handleStep("prev")}
            className="p-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-3)] hover:border-[var(--color-accent)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors touch-manipulation"
            aria-label="Rotate to previous item"
            title="Previous item"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => handleStep("next")}
            className="p-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-3)] hover:border-[var(--color-accent)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors touch-manipulation"
            aria-label="Rotate to next item"
            title="Next item"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 3D Scene Viewport — Generous headroom & footroom so cards never clip */}
      <div
        className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden py-4"
        style={{
          height: dimensions.cardHeight + 90,
          perspective: `${dimensions.perspective}px`,
        }}
      >
        {/* Left & Right Soft Edge Fade Masks */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-20 bg-gradient-to-r from-[var(--color-paper-2)] to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-20 bg-gradient-to-l from-[var(--color-paper-2)] to-transparent"
          aria-hidden="true"
        />

        {/* 3D Rotating Cylinder Stage */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{
            transform,
            transformStyle: "preserve-3d",
            position: "relative",
            width: dimensions.cardWidth,
            height: dimensions.cardHeight,
          }}
          className="flex items-center justify-center"
        >
          {items.map((item, index) => {
            const angle = index * anglePerItem;
            const isCurrent = index === activeItemIndex;

            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  width: dimensions.cardWidth,
                  height: dimensions.cardHeight,
                  transform: `rotateY(${angle}deg) translateZ(${dimensions.radius}px)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                className="group select-none"
              >
                <div
                  onClick={() => onItemClick && onItemClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onItemClick && onItemClick(item);
                    }
                  }}
                  className={`relative w-full h-full rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-xl bg-[var(--color-paper-3)] flex flex-col justify-end p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] ${
                    isCurrent
                      ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/40 shadow-2xl scale-[1.02]"
                      : "border-[var(--color-rule)] hover:border-[var(--color-ink-3)] opacity-90 hover:opacity-100"
                  }`}
                  aria-label={`Inspect ${item.title}`}
                >
                  {/* Image with object-cover and subtle padding to ensure complete visibility */}
                  <div className="absolute inset-0 bg-[var(--color-paper-3)] flex items-center justify-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 150px, 220px"
                      className="object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      priority={index < 3}
                    />
                  </div>

                  {/* Gentle gradient vignette — low opacity so full image remains legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Card Content Footer — Compact, sleek text */}
                  <div className="relative z-10 space-y-1 pointer-events-none">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-[var(--color-accent)] border border-white/10 font-semibold truncate max-w-[130px]">
                        {item.category || "Credential"}
                      </span>
                      {item.date && (
                        <span className="text-[9px] font-mono text-zinc-300">
                          {item.date}
                        </span>
                      )}
                    </div>

                    <h4 className="text-[11px] sm:text-xs font-bold text-white font-display line-clamp-1 leading-tight">
                      {item.title}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300 group-hover:text-white transition-colors">
                      <span className="flex items-center gap-1">
                        <Eye size={11} className="text-[var(--color-accent)]" />
                        <span>Inspect</span>
                      </span>
                      <span className="text-[9px] opacity-60">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Active Item Caption Bar & Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[var(--color-rule)] text-xs font-mono">
        {/* Active Item Details */}
        <div className="flex items-center gap-2.5 truncate max-w-full">
          <span className="px-2 py-0.5 rounded border border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-accent)] font-semibold flex-shrink-0">
            {activeItemIndex + 1} / {count}
          </span>
          <span className="text-[var(--color-ink)] font-semibold truncate">
            {activeItem?.title}
          </span>
          {activeItem?.subtitle && (
            <span className="text-[var(--color-ink-3)] hidden md:inline truncate">
              &mdash; {activeItem.subtitle}
            </span>
          )}
        </div>

        {/* Mobile/Desktop drag gesture tip */}
        <div className="text-[11px] text-[var(--color-ink-3)] flex items-center gap-1.5 flex-shrink-0">
          <span>&larr; Drag to spin &rarr;</span>
        </div>
      </div>
    </div>
  );
}
