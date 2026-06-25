import Footer from "@/components/temples/Footer";
import Header from "@/components/temples/Header";

export const metadata = {
  title: "Template | brahmatatva",
  description: "brahmatatva template route."
};

export default function TemplatePage() {
  return (
    <main className="min-h-screen bg-[#fffaf6] text-[#15172b]">
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#f1e7dc] bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#d89b2b]">
            brahmatatva
          </p>
          <h1 className="mt-4 font-serif text-5xl font-bold text-[#5b1f1f]">
            Template
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">
            This route is ready for your temple management template content.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
