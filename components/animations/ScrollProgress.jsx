"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/** Thin golden progress bar fixed to the top of the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-[#9F3F21] via-[#d89b2b] to-[#f6d680]"
    />
  );
}
