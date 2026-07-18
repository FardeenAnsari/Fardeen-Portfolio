"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Heart } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { PERSONAL, CONTACT } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle py-16">
      <div className="container-portfolio">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/fardeen-hero.png"
                  alt="Fardeen Ansari"
                  fill
                  className="object-cover object-top"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="font-bold text-primary">{PERSONAL.name}</p>
                <p className="text-xs text-muted">Full Stack Engineer</p>
              </div>
            </div>
            <p className="text-secondary text-sm leading-relaxed max-w-sm">
              Building products that matter — with engineering craft and design precision.
            </p>
            <p className="text-xs text-muted font-mono">{PERSONAL.location}</p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary">Navigation</h3>
            <nav className="grid grid-cols-2 gap-2">
              {[
                { label: "About", href: "#about" },
                { label: "Skills", href: "#mind" },
                { label: "Journey", href: "#journey" },
                { label: "Work", href: "#work" },
                { label: "Achievements", href: "#achievements" },
                { label: "Contact", href: "#contact" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary">Get In Touch</h3>
            <div className="space-y-2">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
                <Mail size={14} />
                {CONTACT.email}
              </a>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
                <FaLinkedinIn size={14} />
                linkedin.com/in/itsfardeen
              </a>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors">
                <FaGithub size={14} />
                github.com/FardeenAnsari
              </a>
            </div>

            {/* Open to work badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-green-400 font-medium">Open to opportunities</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border-subtle">
          <p className="text-xs text-muted">
            © {currentYear} Fardeen Ansari. All rights reserved.
          </p>
          <p className="text-xs text-muted flex items-center gap-1">
            Crafted with <Heart size={11} className="text-red-400 fill-red-400" /> using Next.js & Framer Motion
          </p>
          <div className="flex items-center gap-3">
            {[
              { href: CONTACT.github, icon: <FaGithub size={14} />, label: "GitHub" },
              { href: `mailto:${CONTACT.email}`, icon: <Mail size={14} />, label: "Email" },
              { href: CONTACT.linkedin, icon: <FaLinkedinIn size={14} />, label: "LinkedIn" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ y: -2 }}
                className="text-muted hover:text-primary transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
