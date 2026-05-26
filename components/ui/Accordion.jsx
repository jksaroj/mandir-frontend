"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Accordion({ items, className = "" }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const active = open === index;
        return (
          <div key={item.title} className="rounded-2xl border border-[#f1e4d6] bg-white shadow-sm">
            <button
              aria-expanded={active}
              onClick={() => setOpen(active ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-extrabold text-[#351112]"
            >
              {item.title}
              <motion.span animate={{ rotate: active ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="overflow-hidden">
                  <div className="px-5 pb-5 text-sm font-medium leading-7 text-slate-600">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
