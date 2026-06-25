export default function TempleHistory({ temple }) {
  const paragraphs = [temple.history, !temple.history ? temple.description : ""].filter(Boolean);

  if (!paragraphs.length) return null;

  return (
    <section className="mt-8 rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
      <h2 className="text-xl font-extrabold">History</h2>
      <div className="mt-5 space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 24)}`} className="text-sm font-medium leading-7 text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
