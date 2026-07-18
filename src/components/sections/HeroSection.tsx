"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail, FileText, BadgeCheck, Code, Star, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import { PERSONAL } from "@/lib/data";

const ROLES = [
  "Full Stack Engineer",
  "Product Builder",
  "AI Enthusiast",
  "IoT Developer",
  "System Designer",
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.substring(0, displayText.length + 1));
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(current.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] flex items-start justify-center overflow-hidden lg:items-center"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 pointer-events-none radial-blur" />

      <motion.div
        style={{ y, opacity }}
        className="container-portfolio relative z-10 w-full pt-28 pb-16 sm:pt-24"
      >
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] gap-12 lg:gap-20 items-center lg:min-h-[82svh]">
          {/* Left — Text content */}
          <div className="flex min-w-0 flex-col gap-7 sm:gap-8">
            {/* Top badge */}
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-border-subtle w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-mono text-muted">
                  Open to opportunities · 2026 Graduate
                </span>
              </div>
            </div>

            {/* Main headline */}
            <div className="space-y-3">
              <h1
                className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-balance"
                style={{ fontStyle: "italic" }}
              >
                Fardeen
                <br />
                <span className="text-accent-blue not-italic" style={{ fontFamily: "var(--font-sans)", fontStyle: "normal", fontWeight: 800 }}>
                  Ansari
                </span>
              </h1>

              {/* Typewriter role */}
              <div className="min-h-8 flex items-center">
                <span className="font-mono text-base sm:text-lg text-secondary">
                  <span className="text-accent-blue">&gt;</span>{" "}
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="max-w-[34ch] text-pretty text-base leading-relaxed text-secondary sm:max-w-xl sm:text-lg">
              Building scalable products with{" "}
              <span className="text-primary font-medium">engineering craft</span> —
              from ML-powered waste management platforms to enterprise payroll systems.
              <span className="text-primary font-medium"> SIH 2023 National Finalist</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#work"
                className="btn-primary magnetic-btn"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                data-cursor-label="View"
              >
                View My Work
                <ArrowDown size={16} />
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-ghost magnetic-btn"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="/assets/cv/Fardeen-Ansari-CV.pdf"
                download
                className="btn-ghost magnetic-btn flex items-center gap-2 text-accent-blue"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <FileText size={16} />
                Download CV
              </motion.a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              <SocialLink href={PERSONAL.github} icon={<FaGithub size={16} />} label="GitHub" />
              <SocialLink href={PERSONAL.linkedin} icon={<FaLinkedinIn size={14} />} label="LinkedIn" />
              <SocialLink href={`mailto:${PERSONAL.email}`} icon={<Mail size={16} />} label="Email" />
              <div className="w-px h-4 bg-border-default mx-2" />
              <span className="text-xs text-muted font-mono">Kolkata, India</span>
            </div>

            <div className="lg:hidden w-full h-[420px] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#C08552]/10 blur-3xl rounded-full" />
              <div className="absolute inset-0 bg-[#8C5A3C]/8 blur-2xl rounded-full translate-x-4" />
              <motion.div 
                className="relative w-64 aspect-[3/4] rounded-[2rem] border-[6px] border-[#FFF8F0]/40 mx-auto shadow-2xl overflow-hidden bg-surface-mid/30"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/images/fardeen-hero.png" alt="Fardeen Ansari" fill className="object-cover object-[center_15%] scale-125 origin-[center_15%]" priority />
                
                {/* Frosted glass overlay at bottom with smooth blur fade */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#2A1B14]/90 via-[#2A1B14]/40 to-transparent backdrop-blur-[6px]" 
                  style={{ WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 100%)", maskImage: "linear-gradient(to top, black 50%, transparent 100%)" }}
                />
                
                {/* Content overlaid */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-lg font-bold text-white tracking-wide font-serif">Fardeen Ansari</h3>
                      <BadgeCheck size={16} className="text-white fill-[#C08552]" />
                    </div>
                    <a href="#contact" className="bg-white text-[#2A1B14] px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1 hover:bg-[#FFF8F0] transition-colors">
                      Hire Me <ArrowUpRight size={10} />
                    </a>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed font-sans">
                    A Full Stack Engineer focused on scalable systems & ML integration.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right — Portrait + floating elements */}
          <div className="relative hidden lg:flex items-center justify-center w-full h-[600px]">
            <div className="absolute inset-0 bg-[#C08552]/10 blur-3xl rounded-full max-w-sm mx-auto" />
            <div className="absolute inset-0 bg-[#8C5A3C]/8 blur-2xl rounded-full translate-x-12 max-w-sm mx-auto" />
            <motion.div 
              className="relative w-[340px] aspect-[3/4] rounded-[2.5rem] border-[8px] border-[#FFF8F0]/40 mx-auto shadow-2xl overflow-hidden bg-surface-mid/30"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/images/fardeen-hero.png" alt="Fardeen Ansari" fill className="object-cover object-[center_15%] scale-125 origin-[center_15%]" priority />
              
              {/* Frosted glass overlay at bottom with smooth blur fade */}
              <div 
                className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#2A1B14]/90 via-[#2A1B14]/50 to-transparent backdrop-blur-[8px]"
                style={{ WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)", maskImage: "linear-gradient(to top, black 60%, transparent 100%)" }} 
              />
              
              {/* Content overlaid */}
              <div className="absolute inset-x-0 bottom-0 p-7 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white tracking-wide font-serif">Fardeen Ansari</h3>
                    <BadgeCheck size={20} className="text-white fill-[#C08552]" />
                  </div>
                  <a href="#contact" className="bg-white text-[#2A1B14] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-[#FFF8F0] transition-colors shadow-lg">
                    Hire Me <ArrowUpRight size={14} />
                  </a>
                </div>
                <p className="text-sm text-white/90 leading-relaxed font-sans">
                  A Full Stack Engineer focused on scalable systems & ML integration.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden flex-col items-center gap-2 lg:flex"
        >
          <span className="text-xs text-muted font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-border-default to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-9 h-9 rounded-xl glass border border-border-subtle flex items-center justify-center text-secondary hover:text-primary hover:border-border-default transition-colors"
      data-cursor-label={label}
    >
      {icon}
    </motion.a>
  );
}
