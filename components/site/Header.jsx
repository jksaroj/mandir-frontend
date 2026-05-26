import Link from "next/link";
import { Bell, ChevronDown, Landmark, Search, UserRound } from "lucide-react";
import I18n from "@/components/i18n/I18n";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";

const navItems = [
  { key: "nav.home", activeKey: "home", href: "/" },
  { key: "nav.temples", activeKey: "temples", href: "/temples" },
  { key: "nav.mantra", activeKey: "mantra", href: "/mantras" },
  { key: "nav.chalisa", activeKey: "chalisa", href: "/chalisa" },
  { key: "nav.festivals", activeKey: "festivals", href: "#" },
  { key: "nav.panditServices", activeKey: "pandit", href: "/pandit-services" }
];

export default function Header({ active = "home" }) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1f1515] via-[#2b1717] to-[#3b1111] text-white shadow-md silk-wave-bg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-[#ffc65e] to-[#d77719] text-white shadow">
            <Landmark size={29} strokeWidth={1.8} />
          </span>
          <span>
            <I18n k="brand.name" className="block text-lg font-bold leading-tight" />
            <I18n k="brand.tagline" className="block text-xs font-medium text-white/75" />
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`relative flex items-center gap-1 py-7 transition hover:text-[#d9a441] ${
                active === item.activeKey ? "text-[#d9a441]" : "text-white"
              }`}
            >
              <I18n k={item.key} />
              {item.activeKey === "temples" && <ChevronDown size={13} />}
              {active === item.activeKey && (
                <span className="gold-underline absolute bottom-4 left-0 h-0.5 w-full rounded" />
              )}
            </Link>
          ))}
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
            href="/login"
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#6b2323] shadow-sm transition hover:bg-[#fff7f0]"
          >
            <UserRound size={17} />
            <I18n k="nav.loginRegister" />
          </Link>
        </div>
      </div>
    </header>
  );
}
