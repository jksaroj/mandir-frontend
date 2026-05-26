"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Tabs({ tabs, panels, className = "", sticky = false, scrollable = false, sectionIds = [] }) {
  const [active, setActive] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const wrapperRef = useRef(null);
  const tabsBarRef = useRef(null);
  const initialTopRef = useRef(null);

  useEffect(() => {
    if (!sticky) return undefined;

    const setInitialPosition = () => {
      if (!wrapperRef.current) return;
      initialTopRef.current = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
    };

    const updatePinnedState = () => {
      if (initialTopRef.current === null) setInitialPosition();
      setIsPinned(window.scrollY >= (initialTopRef.current ?? 0));
    };

    setInitialPosition();
    updatePinnedState();
    window.addEventListener("scroll", updatePinnedState, { passive: true });
    window.addEventListener("resize", setInitialPosition);

    return () => {
      window.removeEventListener("scroll", updatePinnedState);
      window.removeEventListener("resize", setInitialPosition);
    };
  }, [sticky]);

  const handleTabClick = (index) => {
    setActive(index);

    const sectionId = sectionIds[index];
    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const offset = tabsBarRef.current?.offsetHeight ?? 0;
    const top = section.getBoundingClientRect().top + window.scrollY - offset - 16;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={sticky && isPinned ? { height: tabsBarRef.current?.offsetHeight } : undefined}
    >
      <div
        ref={tabsBarRef}
        className={
          sticky && isPinned
            ? "fixed inset-x-0 top-0 z-[60] bg-gradient-to-r from-[#1f1515] via-[#2b1717] to-[#3b1111] px-4 py-2 shadow-lg transition-all duration-300 silk-wave-bg sm:px-6 lg:px-8"
            : "transition-all duration-300"
        }
      >
        <div className="mx-auto max-w-7xl">
          <div className={scrollable ? "overflow-x-auto pb-1" : ""}>
            <div
              role="tablist"
              className={`${
                scrollable
                  ? isPinned
                    ? "mx-auto flex w-max min-w-max gap-2"
                    : "flex min-w-max gap-2 lg:w-full lg:min-w-0 lg:justify-between"
                  : "grid gap-2 sm:grid-cols-3 lg:grid-cols-7"
              } ${
                isPinned
                  ? "rounded-none border border-transparent bg-transparent p-0 shadow-none"
                  : "rounded-2xl border border-[#f1e4d6] bg-white p-3 shadow-sm"
              } transition-all duration-300`}
            >
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active === index}
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => handleTabClick(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") setActive((index + 1) % tabs.length);
                    if (event.key === "ArrowLeft") setActive((index - 1 + tabs.length) % tabs.length);
                  }}
                  className={`relative rounded-xl px-4 py-3 text-center text-sm font-extrabold outline-none transition ${
                    isPinned
                      ? active === index
                        ? "text-[#d9a441]"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                      : active === index
                        ? "text-[#6b2323]"
                        : "text-slate-500 hover:bg-[#fff7ed]"
                  } ${scrollable ? "shrink-0 whitespace-nowrap" : ""}`}
                >
                  {tab}
                  {active === index && <motion.span layoutId="tab-underline" className="absolute inset-x-4 bottom-1 h-0.5 rounded bg-[#d9a441]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {panels?.[active] && <div className="mt-6">{panels[active]}</div>}
    </div>
  );
}
