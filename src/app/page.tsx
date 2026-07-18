"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection, MindSection } from "@/components/sections/AboutSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  useEffect(() => {
    // Developer Easter Egg — Console Message
    console.log(
      `%c
 ███████╗ █████╗ ██████╗ ██████╗ ███████╗███████╗███╗   ██╗
 ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝████╗  ██║
 █████╗  ███████║██████╔╝██║  ██║█████╗  █████╗  ██╔██╗ ██║
 ██╔══╝  ██╔══██║██╔══██╗██║  ██║██╔══╝  ██╔══╝  ██║╚██╗██║
 ██║     ██║  ██║██║  ██║██████╔╝███████╗███████╗██║ ╚████║
 ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═══╝
      `,
      "color: #4f6fff; font-family: monospace; font-size: 10px;"
    );
    console.log(
      "%cHey there, fellow developer! You found a secret.",
      "color: #8b5cf6; font-size: 14px; font-weight: bold;"
    );
    console.log(
      "%cI see you're inspecting the code. That's exactly the kind of curiosity I admire.\nIf you're interested in working together, drop me a line at imailfard@gmail.com",
      "color: #888; font-size: 12px;"
    );
    console.log(
      "%c> Try: window.konami() for a secret mode",
      "color: #4f6fff; font-family: monospace; font-size: 11px;"
    );

    // Konami Code Easter Egg
    let keys: string[] = [];
    const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    const handleKeydown = (e: KeyboardEvent) => {
      keys = [...keys, e.key].slice(-10);
      if (JSON.stringify(keys) === JSON.stringify(KONAMI)) {
        document.body.style.filter = "hue-rotate(180deg)";
        setTimeout(() => {
          document.body.style.filter = "none";
        }, 3000);
        console.log("%cKonami Code activated! You're a legend.", "color: #f59e0b; font-size: 16px; font-weight: bold;");
      }
    };

    // Secret terminal mode
    (window as typeof window & { konami: () => void }).konami = () => {
      document.body.classList.toggle("terminal-mode");
      document.body.style.fontFamily = "monospace";
      document.body.style.filter = "sepia(100%) hue-rotate(60deg)";
      setTimeout(() => {
        document.body.style.fontFamily = "";
        document.body.style.filter = "";
      }, 4000);
      console.log("%cTerminal mode: active for 4 seconds", "color: #10b981; font-family: monospace;");
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <MindSection />
      <JourneySection />
      <WorkSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
