"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { HomeSearchInline, HomeSearchOverlay } from "@/components/home/HomeSearch";
import BrahmaTatvaLogo from "@/components/ui/BrahmaTatvaLogo";

const navItems = [
  { label: "Home", href: "/", key: "home" },
  { label: "Temples", href: "/temples", key: "temples" },
  { label: "Mantras", href: "/mantras", key: "mantra" },
  { label: "Chalisas", href: "/chalisa", key: "chalisa" },
  { label: "Upcoming Events", href: "#events", key: "events" },
  { label: "Spiritual Reels", href: "/reels", key: "reels" },
  { label: "Pandit Services", href: "/pandit-services", key: "pandit", badge: "Soon" },
  { label: "Blog / Articles", href: "#blog", key: "blog" }
];

export default function HomeSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#f1e4d6]/80 bg-cream/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:gap-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <BrahmaTatvaLogo height={40} variant="light" />
          </Link>

          <HomeSearchInline className="mx-auto hidden max-w-md flex-1 lg:block" />

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-bold text-[#4a3030] transition hover:bg-white hover:text-[#c48a2a] lg:text-[13px]"
              >
                {item.label}
                {item.badge && (
                  <span className="ml-1 rounded bg-[#fff0d6] px-1.5 py-0.5 text-[10px] font-extrabold text-[#b86b12]">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            <LanguageSwitcher variant="light" />
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f1e4d6] bg-white text-maroon lg:hidden"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>
            <div className="hidden sm:block xl:hidden">
              <LanguageSwitcher variant="light" />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f1e4d6] bg-white text-maroon xl:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <HomeSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {menuOpen && (
        <div className="fixed inset-0 z-[55] xl:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            type="button"
            className="absolute inset-0 bg-[#351112]/40"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-cream shadow-2xl transition-transform duration-300">
            <div className="flex items-center justify-between border-b border-[#f1e4d6] px-5 py-4">
              <BrahmaTatvaLogo height={40} variant="light" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-maroon"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <ul className="flex-1 space-y-1 overflow-y-auto p-4">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[#351112] hover:bg-white"
                  >
                    {item.label}
                    {item.badge && (
                      <span className="rounded bg-[#fff0d6] px-2 py-0.5 text-[10px] font-extrabold text-[#b86b12]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#f1e4d6] p-4">
              <LanguageSwitcher variant="light" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
