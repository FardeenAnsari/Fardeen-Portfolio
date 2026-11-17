"use client";

import { CheckCircle2, MapPin, Award, Terminal } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="section border-t border-[var(--color-rule)]" aria-label="About Fardeen Ansari">
      <div className="container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Philosophy & Bio */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="section-label">Engineering Discipline</div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
                  Grounding &amp; Philosophy
                </h2>
              </div>

              <div className="space-y-4 text-base text-[var(--color-ink-2)] leading-relaxed">
                <p>
                  I am a full stack software engineer with a completed B.Tech in Computer Science &amp; Engineering 
                  from Supreme Knowledge Foundation Group of Institutions, affiliated with Maulana Abul Kalam Azad 
                  University of Technology (MAKAUT, formerly WBUT), graduated in July 2026 with a cumulative 7.52 CGPA. 
                  Based in Bengaluru, I build systems end-to-end — from normalized database schemas and access 
                  control layers to high-performance, accessible user interfaces.
                </p>

                <p>
                  My engineering philosophy prioritizes clarity and constraint over hype. Whether developing 
                  role-based payroll infrastructure with database-enforced immutability, building offline-first 
                  mobile POS applications with local SQLite persistence, or conducting IoT research at Jadavpur 
                  University, I build for deterministic behavior and real-world reliability.
                </p>

                <p>
                  I care deeply about software craft: readable codebases, reasoned architectural trade-offs, and 
                  uncluttered user experiences. I am actively seeking full-time software engineering roles where 
                  architectural integrity and product ownership are core values.
                </p>
              </div>
            </div>

            {/* Quick Context Card */}
            <div className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink-3)] uppercase tracking-wider">
                <MapPin size={13} className="text-[var(--color-accent)]" />
                <span>Current Base: Bengaluru, Karnataka</span>
              </div>
              <p className="text-xs text-[var(--color-ink-2)]">
                2026 Graduate · Open to on-site and hybrid engineering roles across India.
              </p>
            </div>
          </div>

          {/* Right Column: Categorized Technical Competencies */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="border-b border-[var(--color-rule)] pb-4">
              <h3 className="text-xl font-bold text-[var(--color-ink)] font-display">
                Technical Capabilities
              </h3>
              <p className="text-xs text-[var(--color-ink-3)] font-mono mt-1">
                Verified hands-on exposure across academic and production projects
              </p>
            </div>

            {/* Stack Category 1: Languages */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
                <span>01 / PROGRAMMING &amp; QUERY LANGUAGES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C", "SQL"].map((skill) => (
                  <span key={skill} className="tech-tag text-[var(--color-ink)] bg-[var(--color-paper-2)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="hairline" />

            {/* Stack Category 2: Frontend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
                <span>02 / FRONTEND &amp; MOBILE ENGINEERING</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["React.js", "Next.js", "React Native", "Expo", "Tailwind CSS", "HTML5 & CSS3"].map((skill) => (
                  <span key={skill} className="tech-tag text-[var(--color-ink)] bg-[var(--color-paper-2)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="hairline" />

            {/* Stack Category 3: Backend & Architecture */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
                <span>03 / BACKEND &amp; APPLICATION SERVICES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express.js", "RESTful APIs", "Supabase", "Role-Based Access (RBAC)", "JSON Services"].map((skill) => (
                  <span key={skill} className="tech-tag text-[var(--color-ink)] bg-[var(--color-paper-2)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="hairline" />

            {/* Stack Category 4: Databases */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
                <span>04 / DATA MANAGEMENT &amp; STORAGE</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["PostgreSQL", "SQLite", "Supabase RLS", "Relational Modeling", "Database Immutability", "Oracle DB"].map((skill) => (
                  <span key={skill} className="tech-tag text-[var(--color-ink)] bg-[var(--color-paper-2)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="hairline" />

            {/* Stack Category 5: Embedded Systems & Applied ML */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
                <span>05 / HARDWARE, IOT &amp; APPLIED ML</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Arduino", "ESP32", "FPGA / Verilog", "scikit-learn (Regression & Random Forest)", "MATLAB", "Linux"].map((skill) => (
                  <span key={skill} className="tech-tag text-[var(--color-ink)] bg-[var(--color-paper-2)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="hairline" />

            {/* Stack Category 6: Developer Workflow */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-3)]">
                <span>06 / TOOLING &amp; DEPLOYMENT</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Git", "GitHub", "VS Code", "Postman", "Chrome DevTools", "Vercel", "Homebrew", "psql CLI"].map((skill) => (
                  <span key={skill} className="tech-tag text-[var(--color-ink)] bg-[var(--color-paper-2)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// Backward-compatibility export in case any route references MindSection
export function MindSection() {
  return null;
}
