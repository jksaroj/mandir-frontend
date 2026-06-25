import { CalendarDays, Landmark, TrainFront } from "lucide-react";

const infoIcons = [CalendarDays, Landmark, CalendarDays, Landmark, CalendarDays, TrainFront];

export default function TempleTimings({ temple }) {
  const about = temple.about ?? {};
  const paragraphs = about.paragraphs?.length
    ? about.paragraphs
    : [temple.description, temple.excerpt, temple.history].filter(Boolean);
  const info = about.info ?? [];

  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm lg:p-8">
        <h2 className="text-2xl font-extrabold leading-tight text-[#14172b]">
          About {temple.name}
        </h2>

        {temple.descriptionHtml ? (
          <div
            className="mt-6 max-w-none text-slate-600 [&_a]:font-bold [&_a]:text-[#6b2323] [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#d89b2b] [&_blockquote]:bg-[#fff7ec] [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-slate-700 [&_h1]:mb-5 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:leading-tight [&_h1]:text-[#351112] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-[#351112] [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:leading-tight [&_h3]:text-[#3b2430] [&_li]:mt-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-4 [&_p]:text-sm [&_p]:font-medium [&_p]:leading-7 [&_p]:text-slate-600 [&_strong]:font-extrabold [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[#f1e7dc] [&_td]:p-3 [&_th]:border [&_th]:border-[#f1e7dc] [&_th]:bg-[#fff7ec] [&_th]:p-3 [&_th]:text-left [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: temple.descriptionHtml }}
          />
        ) : (
          <div className="mt-6 space-y-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm font-medium leading-7 text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {info.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {info.map(([label, value], index) => {
            const Icon = infoIcons[index] ?? Landmark;
            return (
              <div key={label} className="flex gap-3 rounded-xl border border-[#f1e7dc] bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff1df] text-[#d89b2b]">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-extrabold">{value}</p>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
}
