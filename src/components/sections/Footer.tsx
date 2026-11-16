"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Mail, ArrowUp } from "lucide-react";
import { PERSONAL } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--color-rule)] bg-[var(--color-paper)] py-14 sm:py-16 text-[var(--color-ink-2)]" aria-label="Site Footer">
      <div className="container space-y-12">
        
        {/* Top Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Identity */}
          <div className="md:col-span-5 space-y-2">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
              Fardeen Ansari
            </h3>
            <p className="text-sm text-[var(--color-ink-2)] leading-relaxed max-w-[38ch]">
              Full Stack Software Engineer based in Bengaluru, India. 
              Engineering scalable web applications, distributed APIs, and database workflows.
            </p>
          </div>

          {/* Quick Section Nav */}
          <div className="md:col-span-4 space-y-2 font-mono text-xs">
            <div className="text-[var(--color-ink-3)] uppercase tracking-wider mb-2">INDEX NAVIGATION</div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href="/#work" className="hover:text-[var(--color-ink)] transition-colors">01. Work</a>
              <a href="/#github-status" className="hover:text-[var(--color-ink)] transition-colors">02. GitHub</a>
              <a href="/#about" className="hover:text-[var(--color-ink)] transition-colors">03. About</a>
              <a href="/#journey" className="hover:text-[var(--color-ink)] transition-colors">04. Journey</a>
              <a href="/#achievements" className="hover:text-[var(--color-ink)] transition-colors">05. Recognition</a>
              <a href="/blog" className="hover:text-[var(--color-ink)] transition-colors">06. Arcade</a>
              <a href="/#contact" className="hover:text-[var(--color-ink)] transition-colors">07. Contact</a>
            </div>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3 space-y-2 font-mono text-xs md:text-right">
            <div className="text-[var(--color-ink-3)] uppercase tracking-wider mb-2">CONNECT</div>
            <div className="flex md:justify-end items-center gap-3">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={14} />
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="p-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
                aria-label="Email"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 border-t border-[var(--color-rule)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--color-ink-3)]">
          <div>
            <span>© {currentYear} Fardeen Ansari. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Built with Next.js &amp; TypeScript · Deployed on Vercel</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-[var(--color-ink)] transition-colors"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
