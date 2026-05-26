"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedCard({ children, className = "", as = "div", ...props }) {
  const reduceMotion = useReducedMotion();
  const MotionTag = typeof as === "string" ? motion[as] || motion.div : motion.create(as);

  return (
    <MotionTag
      {...props}
      className={className}
      whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01, boxShadow: "0 18px 45px rgba(91, 31, 31, 0.14)" }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
