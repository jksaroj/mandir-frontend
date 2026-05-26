import { Filter, Search } from "lucide-react";
import I18n from "@/components/i18n/I18n";
import { getMessage } from "@/lib/i18n/getMessage";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

const filterFields = [
  { labelKey: "temples.state", optionKey: "temples.allStates" },
  { labelKey: "temples.city", optionKey: "temples.allCities" },
  { labelKey: "temples.deity", optionKey: "temples.allDeities" }
];

export default function TempleFilters() {
  const searchPlaceholder = getMessage(DEFAULT_LOCALE, "temples.searchPlaceholder");

  return (
    <section className="relative z-10 -mt-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 rounded-2xl border border-[#f1e7dc] bg-white p-6 shadow-temple lg:grid-cols-[1.4fr_repeat(3,1fr)_auto_auto]">
        <label className="flex h-12 items-center gap-3 rounded-lg border border-[#eadfd3] px-4">
          <input
            className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none"
            placeholder={searchPlaceholder}
            data-i18n-placeholder="temples.searchPlaceholder"
          />
          <Search size={18} className="text-[#9b5252]" />
        </label>
        {filterFields.map(({ labelKey, optionKey }) => (
          <label key={labelKey} className="block">
            <I18n k={labelKey} as="span" className="mb-1 block text-xs font-bold text-slate-500" />
            <select className="h-12 w-full rounded-lg border border-[#eadfd3] bg-white px-3 text-sm font-semibold text-slate-700 outline-none">
              <option data-i18n={optionKey}>{getMessage(DEFAULT_LOCALE, optionKey)}</option>
            </select>
          </label>
        ))}
        <button type="button" className="h-12 self-end rounded-lg bg-[#6b2323] px-8 text-sm font-extrabold text-white">
          <I18n k="common.search" />
        </button>
        <button
          type="button"
          className="flex h-12 w-12 self-end items-center justify-center rounded-lg border border-[#e5c9ad] bg-[#fff7ed] text-[#9b5252]"
          data-i18n-aria-label="common.search"
          aria-label={searchPlaceholder}
        >
          <Filter size={18} />
        </button>
      </div>
    </section>
  );
}
