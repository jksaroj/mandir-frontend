"use client";

import { useState } from "react";

export default function ChalisaLyricsReader({ title, hindi, english, meaning }) {
  const [tab, setTab] = useState("hindi");
  const tabs = [
    ["hindi", "हिंदी"],
    ["english", "English Transliteration"],
    ["meaning", "Meaning"],
  ];
  const content = tab === "hindi" ? hindi : tab === "english" ? english : meaning;

  return (
    <section id="lyrics" className="overflow-hidden rounded-xl border border-[#e4cdae] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ead8c6] px-5 py-4">
        <h2 className="font-serif text-2xl font-bold">{title} पाठ</h2>
        <div className="flex flex-wrap gap-2">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-md px-5 py-2 text-xs font-bold transition ${
                tab === id
                  ? "bg-[#711c22] text-white shadow-sm"
                  : "border border-[#e4d3c2] bg-white text-[#4b3a3a] hover:bg-[#fff7ed]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[620px] bg-[#fff8ec] px-5 py-10 sm:px-10 sm:py-12">
        <div className="text-center text-5xl font-bold leading-none text-[#d59a27]">ॐ</div>
        <div className="mx-auto mt-7 h-px max-w-xs bg-gradient-to-r from-transparent via-[#dfb96d] to-transparent" />
        <p
          className={`mx-auto mt-7 max-w-3xl whitespace-pre-line text-center font-serif font-semibold text-[#781e24] ${
            tab === "english"
              ? "text-base leading-9 sm:text-lg sm:leading-10"
              : "text-lg leading-10 sm:text-xl sm:leading-[2.85rem]"
          }`}
        >
          {content || "Content will be available after it is added from the admin panel."}
        </p>
        <div className="mx-auto mt-9 h-px max-w-xs bg-gradient-to-r from-transparent via-[#dfb96d] to-transparent" />
        <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#b57a2a]">
          ॥ श्री {title} सम्पूर्ण ॥
        </p>
      </div>
    </section>
  );
}
