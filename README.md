# Fardeen Ansari — Portfolio

Modern, production-ready personal portfolio for Fardeen Ansari. Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Nodemailer, and MongoDB. Deploy-ready for Vercel.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Contact:** Nodemailer (API route)
- **Blog:** MongoDB, Markdown (react-markdown + remark-gfm), slug-based routing
- **Deploy:** Vercel

## Design

- Clean, minimal, premium
- Professional dark theme with soft accent (purple)
- Strong typography (Inter, JetBrains Mono)
- Smooth scroll navigation, mobile-first responsive

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── blog/
│   │   │   ├── route.ts          # GET list of posts
│   │   │   ├── admin/route.ts    # POST create/update (admin-only)
│   │   │   └── [slug]/route.ts  # GET single post
│   │   └── contact/route.ts     # POST contact form (Nodemailer)
│   ├── blog/
│   │   ├── page.tsx             # Blog index
│   │   └── [slug]/page.tsx      # Blog post (Markdown, SEO)
│   ├── layout.tsx               # Root layout, SEO, fonts
│   ├── page.tsx                 # Home (all sections)
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── Button.tsx
│   ├── Section.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Achievements.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   └── mongodb.ts               # MongoDB client (server-only)
└── types/
    └── blog.ts
```

## Setup

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and fill in:

   - `MONGODB_URI` — MongoDB connection string (for blog)
   - `BLOG_ADMIN_SECRET` — Secret token for creating posts via `POST /api/blog/admin`
   - `SMTP_*` and `CONTACT_TO_EMAIL` — For contact form emails (e.g. Gmail App Password)

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Contact Form

- **Endpoint:** `POST /api/contact`
- **Body:** `{ name, email, phone?, message }`
- **Validation:** Name (min 2), email format, message (min 10)
- **Anti-spam:** Honeypot field (`website`) + rate limit (3 requests per minute per IP)
- **Delivery:** Nodemailer to `CONTACT_TO_EMAIL` (default: imailfard@gmail.com)

## Blog

- **Storage:** MongoDB collection `posts` (or name from `MONGODB_DB_NAME`)
- **Fields:** `slug`, `title`, `excerpt`, `content` (Markdown), `publishedAt`, `author`
- **Admin:** Create/update posts with:

  ```bash
  curl -X POST https://your-site.com/api/blog/admin \
    -H "Authorization: Bearer YOUR_BLOG_ADMIN_SECRET" \
    -H "Content-Type: application/json" \
    -d '{"slug":"my-post","title":"My Post","excerpt":"Short summary","content":"# Hello\n\nMarkdown here."}'
  ```

- **Initial examples:** Add via the admin API with slugs like:
  - `what-i-learned-from-smart-india-hackathon`
  - `why-clean-architecture-matters-in-student-projects`
  - `from-iot-to-full-stack-my-engineering-journey`

## SEO & Production

- Meta tags, Open Graph, Twitter card in `layout.tsx`
- Optional `NEXT_PUBLIC_SITE_URL` and `/og.png` (1200×630) for OG image
- Lighthouse-friendly: semantic HTML, focus states, responsive images ready

## Deploy (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Add environment variables (same as `.env.local`).
3. Deploy. No extra config needed.

## CV and OG Image

- Place your **CV PDF** at `public/cv.pdf` so “Download CV” points to `/cv.pdf`.
- Place **OG image** at `public/og.png` (1200×630) for social previews.
