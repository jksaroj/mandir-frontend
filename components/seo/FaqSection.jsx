export default function FaqSection({ title = "Frequently Asked Questions", description, items = [] }) {
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section className="mt-10 rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl font-bold text-[#3d1717]">{title}</h2>
        {description && (
          <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{description}</p>
        )}
      </div>
      <div className="mt-7 grid gap-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-[#f1e7dc] bg-[#fffaf6] px-5 py-4"
          >
            <summary className="cursor-pointer list-none text-sm font-extrabold text-[#351112] marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="text-xl leading-none text-[#d89b2b] transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
