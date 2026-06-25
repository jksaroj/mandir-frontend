"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { HomeSearchInline, HomeSearchOverlay } from "@/components/home/HomeSearch";
import BrahmaTatvaLogo from "@/components/ui/BrahmaTatvaLogo";
import { localizePath } from "@/lib/i18n/paths";
import { fetchHeaderMenu } from "@/lib/menus";

function MenuLink({ item, locale, mobile = false, onClick }) {
  const hasChildren = item.children?.length > 0;
  const href = localizePath(item.url || "#", locale);

  if (mobile) {
    return (
      <li>
        <Link href={href} onClick={onClick} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[#351112] hover:bg-white">
          {item.label}
          {hasChildren && <ChevronDown size={14} />}
        </Link>
        {hasChildren && (
          <ul className="ml-4 border-l border-[#ead8c7] pl-2">
            {item.children.map((child) => <MenuLink key={child.id} item={child} locale={locale} mobile onClick={onClick} />)}
          </ul>
        )}
      </li>
    );
  }

  return (
    <div className="group relative">
      <Link href={href} className="flex whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-bold text-[#4a3030] transition hover:bg-white hover:text-[#c48a2a] lg:text-[13px]">
        {item.label}
        {hasChildren && <ChevronDown size={13} className="ml-1 mt-0.5" />}
      </Link>
      {hasChildren && (
        <div className="invisible absolute left-0 top-full z-50 min-w-52 rounded-lg border border-[#f1e4d6] bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
          {item.children.map((child) => (
            <MenuLink key={child.id} item={child} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomeSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const { locale } = useTranslation();

  useEffect(() => {
    let mounted = true;
    fetchHeaderMenu().then((items) => {
      if (mounted) setNavItems(items);
    });
    return () => {
      mounted = false;
    };
  }, [locale]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#f1e4d6]/80 bg-cream/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:gap-6 lg:px-8">
          <Link href={localizePath("/", locale)} className="flex shrink-0 items-center">
            <BrahmaTatvaLogo height={40} variant="light" />
          </Link>

          <HomeSearchInline className="mx-auto hidden max-w-md flex-1 lg:block" />

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            {navItems.length ? navItems.map((item) => <MenuLink key={item.id} item={item} locale={locale} />) : (
              <span className="rounded-lg px-2.5 py-2 text-xs font-bold text-[#4a3030]">comming</span>
            )}
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
              {navItems.length ? navItems.map((item) => <MenuLink key={item.id} item={item} locale={locale} mobile onClick={() => setMenuOpen(false)} />) : (
                <li className="rounded-xl px-4 py-3 text-sm font-bold text-[#351112]">comming</li>
              )}
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
