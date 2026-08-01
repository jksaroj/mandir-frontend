export default function NewsletterSection() {
  return (
    <section className="bg-gradient-to-r from-[#4a1114] via-[#681b20] to-[#421012] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-serif text-3xl font-bold">Stay Connected with the Divine</h2>
        <p className="mt-3 text-sm text-white/75">Subscribe to get updates on temples, festivals, travel guides and special offers.</p>
        <form className="mx-auto mt-7 flex max-w-lg overflow-hidden rounded-lg border border-[#eadfd3] bg-white">
          <input className="min-w-0 flex-1 px-5 py-3 text-sm outline-none" placeholder="Enter your email" />
          <button className="bg-[#d89b2b] px-7 text-sm font-extrabold text-white">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
