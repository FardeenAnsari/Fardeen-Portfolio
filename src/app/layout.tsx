/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navigation } from "@/components/navigation/Navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://fardeenansari.dev"),
  title: {
    default: "Fardeen Ansari — Full Stack Engineer",
    template: "%s | Fardeen Ansari",
  },
  description:
    "Fardeen Ansari — Full Stack Software Engineer based in Bengaluru, India. Building high-integrity web applications, distributed systems, and database workflows. SIH National Finalist.",
  keywords: [
    "Fardeen Ansari",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Bengaluru",
    "Portfolio",
    "System Design",
  ],
  authors: [{ name: "Fardeen Ansari" }],
  creator: "Fardeen Ansari",
  publisher: "Fardeen Ansari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fardeenansari.dev",
    title: "Fardeen Ansari — Full Stack Engineer",
    description:
      "Full Stack Software Engineer based in Bengaluru, India. Building high-integrity web applications, distributed systems, and database workflows.",
    siteName: "Fardeen Ansari",
    images: [
      {
        url: "/images/fardeen-hero.png",
        width: 1200,
        height: 630,
        alt: "Fardeen Ansari Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fardeen Ansari — Full Stack Engineer",
    description: "Building high-integrity web applications and scalable database workflows.",
    images: ["/images/fardeen-hero.png"],
  },
  icons: {
    icon: [
      { url: "/images/fardeen-hero.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/images/fardeen-hero.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fardeen Ansari",
  jobTitle: "Full Stack Software Engineer",
  description: "Full Stack Software Engineer and Product Builder based in Bengaluru, India.",
  url: "https://fardeenansari.dev",
  email: "imailfard@gmail.com",
  telephone: "+91-9123881320",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Supreme Knowledge Foundation Group of Institutions",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Maulana Abul Kalam Azad University of Technology, West Bengal",
      alternateName: "West Bengal University of Technology (WBUT)",
    },
  ],
  sameAs: [
    "https://linkedin.com/in/itsfardeen",
    "https://github.com/FardeenAnsari",
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Python",
    "System Design",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Subtle noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Minimal Floating Navigation */}
          <Navigation />

          {/* Main Content Landmark */}
          <main id="main-content">{children}</main>

          {/* Telemetry */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
