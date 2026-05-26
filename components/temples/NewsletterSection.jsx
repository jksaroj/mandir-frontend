export default function NewsletterSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-[#f1e7dc] bg-[#fff2df] px-6 py-10 text-center shadow-sm">
        <h2 className="font-serif text-4xl font-bold text-[#351112]">Stay Connected with Divine</h2>
        <p className="mt-3 text-sm font-medium text-slate-600">Subscribe to get updates on temples, festivals, events and special offers.</p>
        <form className="mx-auto mt-7 flex max-w-lg overflow-hidden rounded-lg border border-[#eadfd3] bg-white">
          <input className="min-w-0 flex-1 px-5 py-3 text-sm outline-none" placeholder="Enter your email" />
          <button className="bg-[#6b2323] px-7 text-sm font-extrabold text-white">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
