"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Atom, Braces, Database, Mail, Server, Trophy } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
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
      {/* Floating particles */}
      <Particles />

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
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              <SocialLink href={PERSONAL.github} icon={<FaGithub size={16} />} label="GitHub" />
              <SocialLink href={PERSONAL.linkedin} icon={<FaLinkedinIn size={14} />} label="LinkedIn" />
              <SocialLink href={`mailto:${PERSONAL.email}`} icon={<Mail size={16} />} label="Email" />
              <div className="w-px h-4 bg-border-default mx-2" />
              <span className="text-xs text-muted font-mono">Kolkata, India</span>
            </div>

            <div className="lg:hidden">
              <MobilePortrait />
            </div>
          </div>

          {/* Right — Portrait + floating elements */}
          <div className="relative hidden lg:flex items-center justify-center">
            <PortraitCard />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-8 hidden flex-col items-center gap-2 lg:flex"
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

function MobilePortrait() {
  return (
    <div className="relative max-w-[calc(100vw-40px)] overflow-hidden rounded-2xl border border-border-default bg-bg-surface shadow-lg">
      <div className="relative h-64 xs:h-72">
        <Image
          src="/images/fardeen-hero.png"
          alt="Fardeen Ansari"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="rounded-xl border border-border-subtle bg-[var(--bg-glass)] px-4 py-3 backdrop-blur-md">
          <div>
            <p className="text-xs text-muted font-mono">Currently building</p>
            <p className="text-sm font-semibold text-primary">Trashium</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortraitCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full max-w-[440px]"
    >
      {/* Main portrait */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <div className="relative mx-auto h-[25rem] w-[21rem] rounded-3xl overflow-hidden border border-border-default shadow-2xl">
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent z-10" />
          <Image
            src="/images/fardeen-hero.png"
            alt="Fardeen Ansari — Full Stack Engineer"
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 768px) 100vw, 320px"
          />
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 z-20" />

          {/* Bottom info card */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
            <div className="glass rounded-2xl p-4 border border-border-subtle">
              <p className="text-xs text-muted font-mono mb-1">Currently building</p>
              <p className="text-sm font-semibold text-primary">Trashium</p>
              <p className="text-xs text-secondary">Incentivized Waste Management</p>
            </div>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-accent-blue/10 to-accent-purple/10 blur-3xl -z-10 scale-110" />
      </motion.div>

      {/* Floating badge 1 — SIH */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-44 top-20 glass rounded-2xl px-4 py-3 border border-border-subtle shadow-lg"
      >
        <p className="text-xs text-muted font-mono">Achievement</p>
        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-primary">
          <Trophy size={16} className="text-yellow-400" />
          SIH Finalist
        </p>
        <p className="text-xs text-secondary">National Level · 2023</p>
      </motion.div>

      {/* Floating badge 2 — Tech */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-16 top-12 glass rounded-2xl px-4 py-3 border border-border-subtle shadow-lg"
      >
        <p className="text-xs text-muted font-mono">Stack</p>
        <div className="mt-2 flex gap-2">
          {[Atom, Braces, Server, Database].map((Icon, i) => (
            <span key={i} className="flex h-7 w-7 items-center justify-center rounded-lg border border-border-subtle bg-white/5 text-accent-blue">
              <Icon size={15} />
            </span>
          ))}
        </div>
      </motion.div>

      {/* Floating badge 3 — Live */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute -right-24 bottom-28 glass rounded-2xl px-4 py-3 border border-green-500/20 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-semibold text-green-400">2 Projects Live</span>
        </div>
        <p className="text-xs text-muted mt-1">Trashium · VetanFlow</p>
      </motion.div>
    </motion.div>
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

function Particles() {
  const prefersReducedMotion = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: (i * 37 + 11) % 100,
        y: (i * 53 + 19) % 100,
        size: ((i * 7) % 25) / 10 + 1,
        duration: ((i * 13) % 10) + 8,
        delay: ((i * 17) % 50) / 10,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {!prefersReducedMotion &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-accent-blue/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.6, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
    </div>
  );
}
