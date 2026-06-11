"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Staggered reveal for grids/lists of cards.
 * Usage:
 *   <Stagger className="grid ...">
 *     <StaggerItem>...</StaggerItem>
 *   </Stagger>
 */
export function Stagger({
  children,
  className = "",
  stagger = 0.09,
  delay = 0,
  amount = 0.12,
  once = true,
  as = "div"
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } }
      }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({ children, className = "", as = "div", y = 36 }) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      variants={
        reduceMotion
          ? {}
          : {
              hidden: { opacity: 0, y, scale: 0.97, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
            }
      }
    >
      {children}
    </MotionTag>
  );
}

export default Stagger;
