import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Flame,
  Heart,
  Landmark,
  UsersRound
} from "lucide-react";
import AnimatedCard from "@/components/animations/AnimatedCard";
import WaveGrid, { WaveGridItem } from "@/components/animations/WaveGrid";
import I18n from "@/components/i18n/I18n";

const services = [
  {
    titleKey: "home.services.temples.title",
    textKey: "home.services.temples.text",
    href: "/temples",
    icon: Landmark,
    color: "bg-amber-100 text-[#d77a12]"
  },
  {
    titleKey: "home.services.mantras.title",
    textKey: "home.services.mantras.text",
    href: "/mantras",
    icon: BookOpen,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    titleKey: "home.services.chalisa.title",
    textKey: "home.services.chalisa.text",
    href: "/chalisa",
    icon: Flame,
    color: "bg-red-100 text-red-600"
  },
  {
    titleKey: "home.services.festivals.title",
    textKey: "home.services.festivals.text",
    href: "#",
    icon: CalendarDays,
    color: "bg-orange-100 text-orange-600"
  },
  {
    titleKey: "home.services.donate.title",
    textKey: "home.services.donate.text",
    href: "#donate",
    icon: Heart,
    color: "bg-red-100 text-red-500"
  },
  {
    titleKey: "home.services.pandit.title",
    textKey: "home.services.pandit.text",
    href: "/pandit-services",
    icon: UsersRound,
    color: "bg-emerald-100 text-emerald-600"
  }
];

export default function QuickServices() {
  return (
    <section className="relative z-20 -mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="sr-only">
        <I18n k="home.quickServices" />
      </h2>
      <WaveGrid className="mx-auto grid max-w-7xl gap-4 rounded-2xl bg-white p-5 shadow-temple sm:grid-cols-2 lg:grid-cols-6">
        {services.map(({ titleKey, textKey, href, icon: Icon, color }) => (
          <WaveGridItem key={titleKey} className="min-w-0">
            <Link
              href={href}
              className="block h-full min-w-0 rounded-xl transition hover:bg-cream"
            >
              <AnimatedCard className="flex h-full min-w-0 items-center gap-4 p-3">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${color}`}>
                  <Icon size={25} />
                </span>
                <div>
                  <I18n k={titleKey} as="h3" className="block text-sm font-extrabold text-[#11162b]" />
                  <I18n k={textKey} as="span" className="mt-1 block text-xs font-medium leading-5 text-slate-500" />
                </div>
              </AnimatedCard>
            </Link>
          </WaveGridItem>
        ))}
      </WaveGrid>
    </section>
  );
}
