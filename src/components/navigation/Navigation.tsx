"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Gamepad2 } from "lucide-react";

const NAV_ITEMS = [
  { label: "Work",        href: "/#work" },
  { label: "GitHub",      href: "/#github-status" },
  { label: "About",       href: "/#about" },
  { label: "Journey",     href: "/#journey" },
  { label: "Recognition", href: "/#achievements" },
  { label: "Arcade",      href: "/blog" },
  { label: "Contact",     href: "/#contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ── Detect prefers-reduced-motion ─────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── IntersectionObserver – active section ──────────────────── */
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = NAV_ITEMS.map((item) => item.href.split("#")[1]).filter(Boolean) as string[];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pathname]);

  /* ── Close mobile menu on resize to desktop ─────────────────── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Framer-motion entry variants ───────────────────────────── */
  const pillVariants = {
    initial: reducedMotion ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <>
      {/* ── Floating Pill ──────────────────────────────────────── */}
      <motion.div
        variants={pillVariants}
        initial="initial"
        animate="animate"
        transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "max-content",
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "56px",
            borderRadius: "9999px",
            paddingInline: "20px",
            gap: "16px",
            background: "var(--color-paper-2)",
            border: "1px solid var(--color-rule)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Fardeen Ansari — home"
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--color-ink)",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            FA
          </Link>

          {/* ── Desktop nav links ─────────────────────────────── */}
          <nav
            className="hidden lg:flex"
            style={{
              alignItems: "center",
              gap: "4px",
            }}
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isBlog = item.href === "/blog";
              const sectionId = item.href.split("#")[1];
              const isActive = isBlog
                ? pathname.startsWith("/blog")
                : sectionId
                ? activeSection === sectionId && pathname === "/"
                : pathname === item.href;

              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={isActive}
                />
              );
            })}
          </nav>

          {/* ── Right side CTA + mobile toggle ────────────────── */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              href="/#contact"
              className="btn-primary hidden sm:inline-flex"
              style={{
                fontSize: "12px",
                paddingInline: "16px",
                paddingBlock: "7px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                border: "1px solid var(--color-rule)",
              }}
            >
              Let&apos;s talk
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "9999px",
                background: "var(--color-paper-3)",
                border: "1px solid var(--color-rule)",
                color: "var(--color-ink)",
                cursor: "pointer",
              }}
            >
              {mobileOpen ? <X size={15} aria-hidden /> : <Menu size={15} aria-hidden />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
              style={{
                marginTop: "8px",
                borderRadius: "16px",
                padding: "8px",
                background: "var(--color-paper-2)",
                border: "1px solid var(--color-rule)",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
              role="menu"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isBlog = item.href === "/blog";
                const sectionId = item.href.split("#")[1];
                const isActive = isBlog
                  ? pathname.startsWith("/blog")
                  : sectionId
                  ? activeSection === sectionId && pathname === "/"
                  : pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                      color: isActive ? "var(--color-accent)" : "var(--color-ink-2)",
                      background: isActive ? "var(--color-paper-3)" : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile CTA */}
              <Link
                href="/#contact"
                role="menuitem"
                tabIndex={0}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  margin: "4px 0 2px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "var(--color-ink)",
                  background: "var(--color-paper-3)",
                  border: "1px solid var(--color-rule)",
                  textAlign: "center",
                }}
              >
                Let&apos;s talk
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ── NavLink sub-component ──────────────────────────────────────── */
function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 12px",
        borderRadius: "9999px",
        fontSize: "13px",
        fontWeight: 500,
        textDecoration: "none",
        color: isActive ? "var(--color-ink)" : "var(--color-ink-2)",
        background: isActive ? "var(--color-paper-3)" : "transparent",
      }}
    >
      {label}
    </Link>
  );
}
