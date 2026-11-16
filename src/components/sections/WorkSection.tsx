"use client";

import { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, Layers, Database, Cpu, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function WorkSection() {
  return (
    <section id="work" className="section border-t border-[var(--color-rule)]" aria-label="Selected Projects">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 lg:mb-16">
          <div className="space-y-3">
            <div className="section-label">Selected Engineering</div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-ink)]">
              Featured Work
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--color-ink-2)] max-w-[42ch]">
            Real-world systems with strict data modeling, scalable APIs, and performance-first interfaces.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* ── CARD 1: Trashium (Full 12 cols flagship) ── */}
          <div className="lg:col-span-12 rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-10 transition-colors hover:border-[var(--color-accent)]/40 relative overflow-hidden group">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-ink-3)] mb-3">
                    <span>FLAGSHIP SYSTEM</span>
                    <span>·</span>
                    <span>COLLABORATIVE</span>
                    <span>·</span>
                    <span>2024</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-ink)] mb-3">
                    Trashium
                  </h3>

                  <p className="text-base text-[var(--color-ink-2)] leading-relaxed mb-6">
                    Incentivized waste-management platform designed to drive community recycling. 
                    Integrates a Python machine learning pricing model (Linear Regression &amp; Random Forest) 
                    for dynamic recyclable valuation, interactive Leaflet route optimization for waste pickup crews, 
                    and a 20-tier gamification loyalty engine.
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="tech-tag">Next.js</span>
                    <span className="tech-tag">React.js</span>
                    <span className="tech-tag">Supabase</span>
                    <span className="tech-tag">Python (scikit-learn)</span>
                    <span className="tech-tag">Leaflet Maps</span>
                    <span className="tech-tag">Dynamic Pricing ML</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--color-rule)]">
                  <a
                    href="https://www.trashium.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    aria-label="Visit Trashium live website"
                  >
                    <span>Live Platform</span>
                    <ExternalLink size={15} />
                  </a>

                  <a
                    href="https://github.com/AmartyaSingh07/Trashium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    aria-label="View Trashium GitHub repository"
                  >
                    <FaGithub size={15} />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>

              {/* Architectural Feature Box */}
              <div className="lg:col-span-5 rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-6 space-y-4 font-mono text-xs">
                <div className="text-[var(--color-ink-3)] border-b border-[var(--color-rule)] pb-2 flex items-center justify-between">
                  <span>SUBSYSTEM ARCHITECTURE</span>
                  <span className="text-emerald-400">STATUS: PROD</span>
                </div>

                <div className="space-y-3 text-[var(--color-ink-2)]">
                  <div>
                    <span className="text-zinc-500">&#47;&#47; Dynamic Valuation Engine</span>
                    <p className="text-[var(--color-ink)] font-sans text-xs pt-1">
                      scikit-learn Linear Regression + Random Forest models predicting fair-market rates for segregated plastics and metals.
                    </p>
                  </div>

                  <div>
                    <span className="text-zinc-500">&#47;&#47; Geospatial Dispatch</span>
                    <p className="text-[var(--color-ink)] font-sans text-xs pt-1">
                      Route optimization algorithm minimizing collection vehicle mileage across municipal pickup zones.
                    </p>
                  </div>

                  <div>
                    <span className="text-zinc-500">&#47;&#47; Gamification Tier Logic</span>
                    <p className="text-[var(--color-ink)] font-sans text-xs pt-1">
                      20 ecological status levels driving sustained household participation via tokenized Green Credits.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── CARD 2: VetanFlow (6 cols) ── */}
          <div className="lg:col-span-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-[var(--color-accent)]/40 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
                <span>ENTERPRISE BACKEND</span>
                <span>2024</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                VetanFlow
              </h3>

              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                Role-based payroll operations platform built with architectural security at its center. 
                Features granular Row-Level Security (RLS) for 5 distinct roles (Owners, HR, Finance, Managers, Employees), 
                month-locking workflows, and database-enforced immutability to eliminate payroll discrepancies.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="tech-tag">React 19</span>
                <span className="tech-tag">Express 5</span>
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">Supabase RLS</span>
                <span className="tech-tag">REST APIs</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[var(--color-rule)]">
              <a
                href="https://vetanflow.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="Open VetanFlow live application"
              >
                <span>Live App</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://github.com/FardeenAnsari/vetanflow"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                aria-label="View VetanFlow repository on GitHub"
              >
                <FaGithub size={14} />
                <span>Code</span>
              </a>
            </div>
          </div>

          {/* ── CARD 3: Meneu / RestaurantPOS (6 cols) ── */}
          <div className="lg:col-span-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-[var(--color-accent)]/40 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
                <span>MOBILE / OFFLINE-FIRST</span>
                <span>2024</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                Meneu / RestaurantPOS
              </h3>

              <p className="text-sm text-[var(--color-ink-2)] leading-relaxed">
                Offline-first mobile restaurant point-of-sale built for high-throughput hospitality environments. 
                Powered by React Native and Expo with an embedded local SQLite engine for zero-latency table management, 
                order dispatching, split billing, discount calculations, and GST-compliant receipt generation.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="tech-tag">React Native</span>
                <span className="tech-tag">Expo SDK 57</span>
                <span className="tech-tag">SQLite</span>
                <span className="tech-tag">Offline-First</span>
                <span className="tech-tag">GST Receipts</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[var(--color-rule)]">
              <a
                href="https://github.com/FardeenAnsari/RestaurantPOS"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="View RestaurantPOS repository on GitHub"
              >
                <FaGithub size={14} />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* ── CARD 4: Tiny-Link & AgriSense Architecture Note ── */}
          <div className="lg:col-span-12 rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[var(--color-ink)]">Tiny-Link</h4>
                  <span className="tech-tag">Utility Service</span>
                </div>
                <p className="text-sm text-[var(--color-ink-2)] max-w-[65ch]">
                  High-throughput URL shortener built on Node.js, Express, and PostgreSQL with atomic redirection counters and cryptographic short hash collision handling.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink-3)]">
                <span>Node.js</span>
                <span>·</span>
                <span>Express</span>
                <span>·</span>
                <span>PostgreSQL</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
