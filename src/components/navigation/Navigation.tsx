"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#mind" },
  { label: "Journey", href: "/#journey" },
  { label: "Work", href: "/#work" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    // Intersection observer for active section
    const sections = NAV_ITEMS
      .map((item) => item.href.split("#")[1])
      .filter(Boolean) as string[];
      
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.add("transitioning");
    setTimeout(() => document.documentElement.classList.remove("transitioning"), 600);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (pathname.startsWith("/blog")) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed z-50 transition-all duration-500",
          pathname.startsWith("/blog") ? "top-6 right-4 sm:right-8" : "top-0 left-0 right-0",
          !pathname.startsWith("/blog") && (scrolled ? "py-3" : "py-6")
        )}
      >
        <div className={cn(!pathname.startsWith("/blog") && "container-portfolio")}>
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl transition-all duration-500",
              pathname.startsWith("/blog") 
                ? "glass px-4 sm:px-5 py-2 sm:py-3 shadow-lg gap-4 sm:gap-6" 
                : (scrolled ? "glass px-5 py-3 shadow-lg" : "px-0 py-0")
            )}
          >
            {/* Logo */}
            <Link
              href="#"
              className="group flex items-center gap-3 font-mono text-sm font-semibold"
              aria-label="Fardeen Ansari"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C08552] to-[#8C5A3C]" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                  FA
                </span>
              </div>
              <span className="text-gradient hidden sm:block">Fardeen Ansari</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={
                    item.href.startsWith("/#")
                      ? activeSection === item.href.split("#")[1] && pathname === "/"
                      : pathname === item.href
                  }
                />
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-secondary border border-border-subtle hover:border-border-default transition-colors"
                  aria-label="Toggle theme"
                  data-cursor-label={theme === "dark" ? "Light" : "Dark"}
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun size={15} className="text-yellow-400" />
                    ) : (
                      <Moon size={15} className="text-indigo-400" />
                    )}
                  </motion.div>
                </motion.button>
              )}

              {/* Contact button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:flex bg-[#8C5A3C] hover:bg-[#4B2E2B] text-[#FFF8F0] rounded-full transition-colors font-medium text-xs px-4 py-2"
                data-cursor-label="Say hi"
              >
                Let&apos;s Talk
              </motion.a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-xl glass flex items-center justify-center border border-border-subtle"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden container-portfolio mt-3"
            >
              <div className="glass rounded-2xl p-4 border border-border-default">
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        activeSection === item.href.slice(1)
                          ? "bg-blue-500/10 text-accent-blue"
                          : "text-secondary hover:text-primary hover:bg-white/5"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

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
    <a
      href={href}
      className={cn(
        "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
        isActive
          ? "text-accent-blue"
          : "text-secondary hover:text-primary"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-0 rounded-xl bg-blue-500/10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </a>
  );
}
