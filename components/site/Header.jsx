"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, Search, UserRound } from "lucide-react";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { useTranslation } from "@/components/providers/LanguageProvider";
import BrahmaTatvaLogo from "@/components/ui/BrahmaTatvaLogo";
import { localizePath } from "@/lib/i18n/paths";
import { fetchHeaderMenu } from "@/lib/menus";

function MenuLink({ item, locale }) {
  const hasChildren = item.children?.length > 0;
  return (
    <div className="group relative">
      <Link
        href={localizePath(item.url || "#", locale)}
        className="relative flex items-center gap-1 py-7 text-white transition hover:text-[#d9a441]"
      >
        {item.label}
        {hasChildren && <ChevronDown size={13} />}
      </Link>
      {hasChildren && (
        <div className="invisible absolute left-0 top-full z-50 min-w-52 rounded-lg border border-white/10 bg-[#321010] py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
          {item.children.map((child) => (
            <MenuLink key={child.id} item={child} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ active = "home" }) {
  const { locale } = useTranslation();
  const [navItems, setNavItems] = useState([]);

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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1f1515] via-[#2b1717] to-[#3b1111] text-white shadow-md silk-wave-bg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={localizePath("/", locale)} className="flex items-center">
          <BrahmaTatvaLogo height={40} variant="dark" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold lg:flex">
          {navItems.length ? navItems.map((item) => (
            <MenuLink key={item.id} item={item} locale={locale} />
          )) : <span className="py-7 text-white">comming</span>}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 sm:flex"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 sm:flex"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <Link
            href={localizePath("/login", locale)}
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#6b2323] shadow-sm transition hover:bg-[#fff7f0]"
          >
            <UserRound size={17} />
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
