"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Mail, FileText, ArrowUpRight, Terminal, Check, Copy } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { PERSONAL } from "@/lib/data";
import { PreviewModal, PreviewItem } from "@/components/ui/PreviewModal";

const CV_PREVIEW_ITEM: PreviewItem = {
  id: "fardeen-cv-2026",
  title: "Fardeen Ansari — Curriculum Vitae (Updated 2026)",
  subtitle: "Computer Science & Engineering Graduate · Bengaluru, Karnataka",
  imageUrl: "/assets/cv/cv-preview.png",
  downloadUrl: "/assets/cv/Fardeen-Ansari-CV.pdf",
  category: "Official CV",
  date: "July 2026 Batch",
  description: "Updated CV featuring full-stack engineering experience across React, Next.js, Node.js, PostgreSQL, ML pricing models, and Jadavpur University research.",
};

const ROLES = [
  "Full Stack Engineer",
  "React & Next.js Architect",
  "PostgreSQL & System Designer",
  "IoT & Embedded Systems Researcher",
  "Product Builder",
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(ROLES[0]);
      return;
    }
    const current = ROLES[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.substring(0, displayText.length + 1));
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2400);
          }
        } else {
          setDisplayText(current.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, reducedMotion]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 pb-12 sm:pt-36 sm:pb-16"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(14% 0.010 258 / 0.5), transparent 70%)",
      }}
      aria-label="Hero section"
    >
      <div className="container relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bold Typographic Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            
            {/* Live Availability Pill */}
            <div className="inline-flex items-center gap-3 w-fit px-3.5 py-1.5 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-medium tracking-wide text-[var(--color-ink-2)]">
                Available for Engineering Roles · Bengaluru, IN
              </span>
            </div>

            {/* Headline: Space Grotesk, massive, monolithic */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--color-ink)] leading-[0.95]">
                Fardeen<br />Ansari
              </h1>

              {/* Dynamic Typewriter terminal line */}
              <div className="min-h-7 flex items-center pt-2">
                <p className="font-mono text-sm sm:text-base text-[var(--color-ink-2)] flex items-center gap-2">
                  <span className="text-[var(--color-accent)] font-bold">&gt;</span>
                  <span>{displayText}</span>
                  <span className="inline-block w-2 h-4 bg-[var(--color-accent)] animate-pulse" />
                </p>
              </div>
            </div>

            {/* Purpose-driven statement */}
            <p className="text-base sm:text-lg text-[var(--color-ink-2)] max-w-[54ch] leading-relaxed">
              B.Tech Computer Science graduate engineering high-integrity full-stack systems, 
              scalable APIs, and data workflows. Building software with architectural rigor 
              and zero compromises.
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                className="btn-primary"
                aria-label="View selected projects"
              >
                <span>View Selected Work</span>
                <ArrowDown size={15} />
              </a>

              <a
                href="#contact"
                className="btn-ghost"
                aria-label="Navigate to contact section"
              >
                <span>Get in touch</span>
              </a>

              <button
                type="button"
                onClick={() => setIsCvOpen(true)}
                className="btn-ghost flex items-center gap-2"
                aria-label="Preview and Download Curriculum Vitae"
              >
                <FileText size={15} />
                <span>Preview CV</span>
              </button>
            </div>

            {/* Social & Contact Strip */}
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-rule)]">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fardeen's GitHub"
                className="p-2.5 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
              >
                <FaGithub size={16} />
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fardeen's LinkedIn"
                className="p-2.5 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
              >
                <FaLinkedinIn size={16} />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)] font-mono text-xs text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? "Copied to clipboard" : PERSONAL.email}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Terminal Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] shadow-2xl overflow-hidden">
              
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-rule)] bg-[var(--color-paper)]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--color-rule)]" />
                  <span className="w-3 h-3 rounded-full bg-[var(--color-rule)]" />
                  <span className="w-3 h-3 rounded-full bg-[var(--color-rule)]" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-ink-3)]">
                  <Terminal size={12} />
                  <span>fardeen@system-spec.ts</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Terminal Code Body */}
              <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--color-ink-2)] overflow-x-auto">
                <div className="text-[var(--color-ink-3)] pb-2">&#47;&#47; System Manifest: Fardeen Ansari</div>
                
                <div>
                  <span className="text-zinc-500">export const</span>{" "}
                  <span className="text-[var(--color-ink)] font-semibold">engineer</span> = &#123;
                </div>

                <div className="pl-4">
                  <span className="text-zinc-500">status:</span>{" "}
                  <span className="text-emerald-400">&quot;B.Tech CSE Graduate&quot;</span>,
                </div>

                <div className="pl-4">
                  <span className="text-zinc-500">graduated:</span>{" "}
                  <span className="text-zinc-300">&quot;July 2026&quot;</span>,
                </div>

                <div className="pl-4">
                  <span className="text-zinc-500">cgpa:</span>{" "}
                  <span className="text-amber-300">7.52</span>,
                </div>

                <div className="pl-4">
                  <span className="text-zinc-500">backlogs:</span>{" "}
                  <span className="text-emerald-400">0</span>,
                </div>

                <div className="pl-4">
                  <span className="text-zinc-500">location:</span>{" "}
                  <span className="text-zinc-300">&quot;Bengaluru, Karnataka&quot;</span>,
                </div>

                <div className="pl-4">
                  <span className="text-zinc-500">coreStack:</span> [
                  <span className="text-zinc-300">&quot;Next.js&quot;</span>,{" "}
                  <span className="text-zinc-300">&quot;Node.js&quot;</span>,{" "}
                  <span className="text-zinc-300">&quot;PostgreSQL&quot;</span>,{" "}
                  <span className="text-zinc-300">&quot;Python&quot;</span>],
                </div>

                <div className="pl-4">
                  <span className="text-zinc-500">research:</span> &#123;
                </div>
                <div className="pl-8">
                  <span className="text-zinc-500">lab:</span> <span className="text-zinc-300">&quot;Jadavpur University ESIoT&quot;</span>,
                </div>
                <div className="pl-8">
                  <span className="text-zinc-500">grade:</span> <span className="text-emerald-400">&quot;Grade A&quot;</span>,
                </div>
                <div className="pl-4">&#125;,</div>

                <div className="pl-4">
                  <span className="text-zinc-500">nationalFinalist:</span> &#123;
                </div>
                <div className="pl-8">
                  <span className="text-zinc-500">hackathon:</span> <span className="text-zinc-300">&quot;Smart India Hackathon 2023&quot;</span>,
                </div>
                <div className="pl-4">&#125;,</div>

                <div>&#125;;</div>
              </div>

              {/* Bottom Quick-Telemetry Bar */}
              <div className="grid grid-cols-3 border-t border-[var(--color-rule)] bg-[var(--color-paper-3)] divide-x divide-[var(--color-rule)] text-center py-3">
                <div>
                  <div className="font-display font-bold text-sm text-[var(--color-ink)]">3+</div>
                  <div className="font-mono text-[11px] text-[var(--color-ink-3)]">Full-Stack Apps</div>
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-[var(--color-ink)]">7.52</div>
                  <div className="font-mono text-[11px] text-[var(--color-ink-3)]">Final CGPA</div>
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-emerald-400">Zero</div>
                  <div className="font-mono text-[11px] text-[var(--color-ink-3)]">Academic Backlogs</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div className="container relative z-10 w-full pt-8 flex items-center justify-end text-xs font-mono text-[var(--color-ink-3)]">
        <div className="flex items-center gap-2">
          <span>EXPLORE ARCHITECTURE</span>
          <ArrowDown size={12} className="animate-bounce" />
        </div>
      </div>

      {/* In-app CV Preview Modal */}
      <PreviewModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        currentItem={CV_PREVIEW_ITEM}
      />
    </section>
  );
}
