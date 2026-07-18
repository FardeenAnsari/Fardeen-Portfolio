/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Navigation } from "@/components/navigation/Navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://fardeenansari.dev"),
  title: {
    default: "Fardeen Ansari — Full Stack Engineer & Product Builder",
    template: "%s | Fardeen Ansari",
  },
  description:
    "Full Stack Software Engineer, Product Engineer, and AI Enthusiast. Building scalable web applications, mobile interfaces, and data-driven systems. SIH 2023 National Finalist.",
  keywords: [
    "Fardeen Ansari",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Software Engineer",
    "Product Engineer",
    "India",
    "Portfolio",
    "Machine Learning",
    "Backend Developer",
    "Frontend Developer",
    "Vercel",
    "AWS",
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
      "Full Stack Software Engineer, Product Engineer, and AI Enthusiast. Building scalable web applications, mobile interfaces, and data-driven systems.",
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
    description: "Building scalable web applications, mobile interfaces, and data-driven systems.",
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
  verification: {
    google: "", // TODO: Add Google Search Console verification code
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fardeen Ansari",
  jobTitle: "Full Stack Software Engineer",
  description: "Full Stack Software Engineer, Product Engineer, and AI Enthusiast",
  url: "https://fardeenansari.dev",
  email: "imailfard@gmail.com",
  telephone: "+91-9123881320",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
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
    "Python",
    "Machine Learning",
    "IoT",
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
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@100;200;300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap"
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
          {/* Aurora background */}
          <div className="aurora-bg" aria-hidden="true">
            <div className="aurora-orb aurora-orb-1" />
            <div className="aurora-orb aurora-orb-2" />
            <div className="aurora-orb aurora-orb-3" />
          </div>

          {/* Noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Custom cursor */}
          <CustomCursor />

          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <main id="main-content">{children}</main>

          {/* Analytics */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
