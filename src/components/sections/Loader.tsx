"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 30) setPhase(1);
    if (progress > 60) setPhase(2);
    if (progress > 85) setPhase(3);
  }, [progress]);

  const phases = [
    "Initializing...",
    "Loading projects...",
    "Preparing experience...",
    "Almost ready...",
  ];

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="loader-overlay"
      aria-label="Loading portfolio"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,111,255,0.2) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-12">
        {/* Logo mark */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(79,111,255,0.3)",
              "0 0 60px rgba(79,111,255,0.6)",
              "0 0 20px rgba(79,111,255,0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black"
        >
          FA
        </motion.div>

        {/* Name */}
        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-primary tracking-tight"
          >
            Fardeen Ansari
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted text-sm font-mono"
          >
            {phases[phase]}
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="w-48">
          <div className="h-0.5 bg-border-subtle rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted font-mono">Loading</span>
            <span className="text-xs text-muted font-mono">{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
