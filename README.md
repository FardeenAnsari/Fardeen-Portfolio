<div align="center">

# `FARDEEN ANSARI`
### **FULL-STACK SOFTWARE ENGINEER &bull; PRODUCT ARCHITECT**
*Bengaluru, Karnataka, India &bull; B.Tech CSE (July 2026 &bull; CGPA 7.52)*

[![Live Portfolio](https://img.shields.io/badge/LIVE_PORTFOLIO-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=111111)](https://fardeen-portfolio-puce.vercel.app/)
[![GitHub](https://img.shields.io/badge/GITHUB-FardeenAnsari-000000?style=for-the-badge&logo=github&logoColor=white&labelColor=111111)](https://github.com/FardeenAnsari)
[![LinkedIn](https://img.shields.io/badge/LINKEDIN-itsfardeen-000000?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=111111)](https://linkedin.com/in/itsfardeen)
[![Email](https://img.shields.io/badge/EMAIL-imailfard%40gmail.com-000000?style=for-the-badge&logo=gmail&logoColor=white&labelColor=111111)](mailto:imailfard@gmail.com)

```
┌────────────────────────────────────────────────────────────────────────┐
│  SYSTEM ARCHITECTURE: NEXT.JS 14 · REACT 19 · TYPESCRIPT · TAILWIND   │
│  DESIGN SPEC: OKLCH CARBON MATTE-BLACK · HALLMARK VERIFIED · 60FPS UI  │
└────────────────────────────────────────────────────────────────────────┘
```

</div>

---

## &sect; Overview

A production-grade personal portfolio engineered with a focus on raw performance, strict typographic discipline, and zero template clichés. Designed with a bespoke **OKLCH matte-black carbon palette**, real-time **GitHub commit telemetry**, an interactive **React Bits 3D RollingGallery**, high-resolution **in-app credential previews**, and deep architectural case studies.

Built for high-end technical evaluation by senior engineering leaders, founders, and recruiters.

---

## &sect; System Manifest

```bash
$ identity --inspect fardeen.ansari

  NAME          : Fardeen Ansari
  LOCATION      : Bengaluru, Karnataka, India
  EDUCATION     : B.Tech in Computer Science & Engineering (SKFGI, MAKAUT)
  GRADUATION    : July 2026 (CGPA 7.52 / 10.0 · Zero Active Backlogs)
  PRIMARY FOCUS : Full-Stack Architecture, Distributed APIs, Offline-First Mobile
  CONTACT       : imailfard@gmail.com · +91 91238 81320
  AVAILABILITY  : Open for Full-Time Software Engineering Roles
```

---

## &sect; Key Architectural Capabilities

### 1. **OKLCH Carbon Matte-Black Design System**
- Zero generic purple-to-blue AI gradients, synthetic glows, or unstyled neon templates.
- Strict tokenized palette configured entirely in CSS custom properties using modern `oklch()` color science for deep, ink-rich contrast ratios.
- Audited against the **Hallmark Design System Linter (`sloplint.mjs`)**: `0 FAIL, 0 REFLEX, 0 WARN`.

### 2. **React Bits 3D RollingGallery**
- Inspired by [React Bits](https://reactbits.dev) by David Haz.
- A true 3D cylinder carousel powered by continuous 60fps trigonometric transforms:
  $$\theta_i = i \times \frac{360^\circ}{N}, \quad R = \max\left(W \times 1.2, \frac{W / 2}{\tan(\pi / N)} + 28\right)$$
- Features physics-driven drag with inertia spring damping, auto-rotation with hover pause, step navigation, and landscape $4:3$ cards ensuring full credential visibility.
- Toggleable into a responsive Bento Grid mode with category filters (*All / Summits / Credentials*).

### 3. **Universal In-App Preview Engine (Zero External Redirects)**
- No user is ever kicked out to Google Drive or external tabs to view qualifications.
- Built-in accessible modal with keyboard shortcuts (`Esc`, `←`, `→`), fullscreen image inspection, and direct download triggers for:
  - **Smart India Hackathon 2023** National Finalist Credential
  - **NGP-DST Geo Innovation Challenge 2024** National Summit Presentation Credential
  - **RTET 2024 International Conference** Research Presentation Credential
  - **Jadavpur University 2024** Embedded Systems & IoT Grade A Research Credential
  - High-resolution 200 DPI **Curriculum Vitae Preview** with instant PDF download

### 4. **Live GitHub Telemetry Module**
- Interactive developer dashboard featuring live stats, pinned repositories (`Trashium`, `VetanFlow`, `RestaurantPOS`, `Tiny-Link`), language breakdown, and an interactive 44-week activity matrix with commit density mapping.

### 5. **Retro Space Invaders Arcade**
- Accessible via `/blog` — an arcade experience with canvas rendering, high-score persistence in `localStorage`, sound effects, and dedicated mobile on-screen controls (`<`, `>`, `FIRE`).

---

## &sect; Flagship Projects & Case Studies

| Project | Subsystem & Highlights | Tech Stack | Status |
| :--- | :--- | :--- | :---: |
| **[Trashium](https://www.trashium.com)** | **Incentivized Waste Management Platform**<br>&bull; Field survey of 16 scrap dealers across 4 municipalities.<br>&bull; Leak-free ML pricing engine (Linear Regression on log market value, **MAPE = 6.11%**, $R^2 = 0.9988$).<br>&bull; Nearest-neighbor + 2-opt Leaflet fleet routing.<br>&bull; 20-tier gamification with atomic PostgreSQL credit deposit trigger. | Next.js 16, React 19, Supabase, Python, scikit-learn, Leaflet | `Production` |
| **[VetanFlow](https://vetanflow.vercel.app/)** | **Role-Based Payroll Operations Platform**<br>&bull; 6 strictly isolated role workspaces with zero UI crossover.<br>&bull; Maker-checker state machine enforced at API and DB levels.<br>&bull; PostgreSQL `BEFORE UPDATE/DELETE` triggers locking finalized payroll runs.<br>&bull; Ephemeral signed URLs delivering dynamically rendered PDF payslips. | React 19, Vite, Express 5, PostgreSQL, Supabase RLS, Zod | `Production` |
| **[Meneu](https://github.com/FardeenAnsari/RestaurantPOS)** | **Offline-First Restaurant Point of Sale**<br>&bull; 100% offline-first architecture powered by embedded SQLite on Android.<br>&bull; Reactive floor plan managing table states (Available / Occupied / Bill).<br>&bull; Direct ESC/POS driver integration for 80mm GST thermal receipts.<br>&bull; Designed for landscape 10-inch Android counter tablets. | React Native, Expo SDK 57, SQLite, Zustand, ESC/POS | `Released` |
| **Tiny-Link** | **High-Throughput URL Shortener**<br>&bull; Type-safe database queries via Prisma ORM on PostgreSQL.<br>&bull; Sub-millisecond redirect middleware with click timestamp telemetry.<br>&bull; One-command Docker Compose local infrastructure. | Next.js App Router, TypeScript, Prisma, PostgreSQL, Docker | `Built` |

---

## &sect; Technology Stack

```
Frontend Architecture   : Next.js 14/16 (App Router), React 19, TypeScript, Tailwind CSS v4
Animation & Motion      : Framer Motion (useMotionValue, 3D preserve-3d), GSAP
Mobile Engineering      : React Native, Expo SDK 57, SQLite, Zustand
Backend & Distributed   : Node.js, Express.js 5, Next.js Server Actions, REST APIs
Database & Storage      : PostgreSQL, Supabase (RLS, Triggers, Realtime), SQLite
Machine Learning / Data : Python 3.11, scikit-learn (Ensembles, Log-LR, MAPE), Pandas
Tooling & DevOps        : Git, GitHub Actions, Vercel, Docker Compose, LaTeX (pdflatex)
```

---

## &sect; Repository Structure

```
├── public/
│   ├── assets/
│   │   └── cv/
│   │       ├── Fardeen-Ansari-CV.tex     # ATS-optimized LaTeX source
│   │       ├── Fardeen-Ansari-CV.pdf     # Production compiled PDF
│   │       └── cv-preview.png            # 200 DPI modal preview
│   └── images/
│       ├── certificates/                 # SIH, GIC, RTET, ESIOT credentials
│       └── events/                       # High-res summit presentation captures
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/route.ts          # Resilient multi-tier contact dispatcher
│   │   ├── blog/page.tsx                 # Technical writing & Space Invaders game
│   │   ├── work/[slug]/
│   │   │   ├── page.tsx                  # Static generation for project case studies
│   │   │   └── ProjectPageClient.tsx     # Deep architectural case study renderer
│   │   ├── globals.css                   # OKLCH Carbon theme & Hallmark styling
│   │   ├── layout.tsx                    # SEO metadata, OpenGraph, JSON-LD schema
│   │   └── page.tsx                      # Main landing page orchestrator
│   ├── components/
│   │   ├── game/
│   │   │   └── SpaceInvaders.tsx         # Playable retro arcade with touch controls
│   │   ├── navigation/
│   │   │   └── Navigation.tsx            # Floating pill navigation bar
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx           # Monolithic display headline & terminal card
│   │   │   ├── WorkSection.tsx           # Bento grid for flagship projects
│   │   │   ├── GitHubStatusSection.tsx   # Live telemetry & 44-week commit matrix
│   │   │   ├── AboutSection.tsx          # Engineering philosophy & categorized stack
│   │   │   ├── JourneySection.tsx        # Academic timeline & Jadavpur internship
│   │   │   ├── AchievementsSection.tsx   # National honors, dual-mode 3D gallery
│   │   │   ├── ContactSection.tsx        # Direct contact & resilient message form
│   │   │   └── Footer.tsx                # Colophon & architectural acknowledgments
│   │   └── ui/
│   │       ├── PreviewModal.tsx          # In-app credential viewer
│   │       └── RollingGallery.tsx        # React Bits 3D cylindrical carousel
│   └── lib/
│       ├── data/index.ts                 # Single source of truth for projects & stats
│       └── utils.ts                      # Tailwind merging & utility functions
└── package.json
```

---

## &sect; Getting Started

### Prerequisites
- Node.js `18.18.0` or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/FardeenAnsari/Fardeen-Portfolio.git

# Enter workspace
cd Fardeen-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production Test

```bash
# Lint and typecheck
npm run typecheck

# Compile production bundle
npm run build

# Start production server
npm run start
```

---

## &sect; Deployment

Configured for zero-config deployment on **Vercel**:

```bash
# Deploy with Vercel CLI
vercel --prod
```

### Optional Contact Form Environment Variables (on Vercel):
For direct Gmail SMTP delivery (bypassing the automatic FormSubmit forwarder):
- `SMTP_USER`: `imailfard@gmail.com`
- `SMTP_PASS`: `your-16-char-gmail-app-password`
- `SMTP_HOST`: `smtp.gmail.com`
- `SMTP_PORT`: `587`

---

## &sect; License

This repository is open source and available under the [MIT License](LICENSE).

<div align="center">
<sub>Designed and developed with craft by <strong>Fardeen Ansari</strong> &bull; Bengaluru, India</sub>
</div>
