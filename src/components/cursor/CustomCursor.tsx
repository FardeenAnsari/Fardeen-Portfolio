"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);

  const ringSpringConfig = { damping: 20, stiffness: 200 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(hover: none)").matches) return;

    const updateCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnterLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      setIsHovering(true);
      const label = target.getAttribute("data-cursor-label") || "";
      setCursorLabel(label);
    };

    const handleMouseLeaveLink = () => {
      setIsHovering(false);
      setCursorLabel("");
    };

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover listeners to interactive elements
    const addListeners = () => {
      const interactables = document.querySelectorAll(
        "a, button, [data-cursor], input, textarea, [role='button']"
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterLink);
        el.addEventListener("mouseleave", handleMouseLeaveLink);
      });
    };

    addListeners();

    // Re-add on DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
    };
  }, [isVisible, mouseX, mouseY]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        ref={cursorRef}
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.6 : isHovering ? 1.5 : 1,
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "white",
          }}
        />
      </motion.div>

      {/* Ring cursor */}
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 255, 255, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          fontWeight: "600",
          color: "white",
          letterSpacing: "0.05em",
          fontFamily: "var(--font-mono)",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.8 : isClicking ? 0.8 : 1,
          borderColor: isHovering ? "rgba(79, 111, 255, 0.8)" : "rgba(255, 255, 255, 0.5)",
          background: isHovering ? "rgba(79, 111, 255, 0.1)" : "transparent",
        }}
        transition={{ duration: 0.25 }}
      >
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
