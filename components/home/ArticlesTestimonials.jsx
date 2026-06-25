import Image from "next/image";
import { Camera, ChevronRight, MessageCircle, Star, Video } from "lucide-react";

const articles = [
  { title: "Significance of Rudrabhishek", date: "May 15, 2025", image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=260&q=80" },
  { title: "Why Visit Temples Regularly?", date: "May 12, 2025", image: "https://images.unsplash.com/photo-1604608678051-64d46d9cc0e1?auto=format&fit=crop&w=260&q=80" },
  { title: "Importance of Mantra Chanting", date: "May 10, 2025", image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=260&q=80" }
];

const testimonials = [
  { name: "Ramesh Kumar", text: "brahmatatva helped me book pooja seamlessly and the experience was divine.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80" },
  { name: "Priya Sharma", text: "Great platform for finding temples and reading mantras. Very useful.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80" },
  { name: "Anil Verma", text: "Pandit services are excellent and very professional.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" }
];

export default function ArticlesTestimonials() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div className="rounded-2xl bg-white p-5 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">Latest Articles</h2>
          <a href="#" className="flex items-center gap-1 text-xs font-bold text-maroon">View All <ChevronRight size={14} /></a>
        </div>
        <div className="space-y-4">
          {articles.map((article) => (
            <article key={article.title} className="flex gap-4 border-b border-slate-100 pb-4 last:border-0">
              <Image src={article.image} alt={article.title} width={78} height={78} className="h-[78px] w-[78px] rounded-xl object-cover" />
              <div>
                <h3 className="font-extrabold text-maroon">{article.title}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">Know the divine benefits and spiritual meaning for daily life.</p>
                <p className="mt-2 text-xs font-semibold text-slate-500">{article.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-md">
        <h2 className="mb-5 text-xl font-extrabold">What Devotees Say</h2>
        <div className="space-y-5">
          {testimonials.map((item) => (
            <article key={item.name} className="flex gap-4">
              <Image src={item.image} alt={item.name} width={58} height={58} className="h-[58px] w-[58px] rounded-full object-cover" />
              <div>
                <p className="font-bold leading-6 text-[#11162b]">"{item.text}"</p>
                <p className="mt-2 text-sm font-semibold text-slate-500">- {item.name}</p>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-7 shadow-md">
        <h2 className="text-xl font-extrabold">Newsletter</h2>
        <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
          Stay updated with our latest news, festivals and special offers.
        </p>
        <form className="mt-7 flex overflow-hidden rounded-lg border border-slate-200 bg-white">
          <input className="min-w-0 flex-1 px-4 py-3 text-sm outline-none" placeholder="Enter your email" />
          <button className="bg-maroon px-5 text-sm font-bold text-white">Subscribe</button>
        </form>
        <h3 className="mt-14 text-xl font-extrabold">Follow Us</h3>
        <div className="mt-5 flex gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600"><MessageCircle size={19} /></span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-500"><Camera size={19} /></span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600"><Video size={20} /></span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><MessageCircle size={19} /></span>
        </div>
      </div>
    </section>
  );
}
