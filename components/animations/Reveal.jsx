"use client";

import { motion, useReducedMotion } from "framer-motion";

const offsets = {
  up: { y: 48, x: 0 },
  down: { y: -48, x: 0 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none: { x: 0, y: 0 }
};

/**
 * Elegant scroll-reveal wrapper.
 * direction: "up" | "down" | "left" | "right" | "none"
 * blur: adds a soft blur-to-sharp effect
 * scale: starts slightly zoomed out
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  blur = true,
  scale = false,
  once = true,
  amount = 0.15,
  className = "",
  as = "div"
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const off = offsets[direction] || offsets.up;

  return (
    <MotionTag
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: off.x,
              y: off.y,
              scale: scale ? 0.94 : 1,
              filter: blur ? "blur(8px)" : "blur(0px)"
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
