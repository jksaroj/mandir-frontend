"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Animated counter that respects formatted strings like "20,000+" or "1,00,000+".
 * Counts from 0 to the number while preserving separators and suffix.
 */
export default function CountUp({ value, duration = 1.8, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduceMotion) return;
    const match = String(value).match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr.replace(/,/g, ""), 10);
    if (!Number.isFinite(target)) return;

    // Capture comma positions (Indian or western grouping)
    const formatLike = (n) => {
      const raw = String(n);
      const tmpl = numStr;
      // rebuild grouping from template right-to-left
      let out = "";
      let ri = raw.length - 1;
      for (let ti = tmpl.length - 1; ti >= 0 && ri >= 0; ti--) {
        if (tmpl[ti] === ",") {
          out = "," + out;
        } else {
          out = raw[ri] + out;
          ri--;
        }
      }
      if (ri >= 0) out = raw.slice(0, ri + 1) + out;
      return out;
    };

    if (!inView) {
      setDisplay(prefix + formatLike(0) + suffix);
      return;
    }

    let frame;
    const start = performance.now();
    const ms = duration * 1000;
    const tick = (now) => {
      const t = Math.min((now - start) / ms, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(prefix + formatLike(Math.round(target * eased)) + suffix);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
