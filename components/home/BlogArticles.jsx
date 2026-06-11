import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import { blogArticles } from "@/lib/homeContent";

function ArticleCard({ article }) {
  return (
    <article className="group card-lift flex h-full w-[min(100%,300px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#f1e4d6] bg-white shadow-sm sm:w-[280px]">
      <Link href={article.href} className="block">
        <div className="relative h-44 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="280px"
            className="img-zoom object-cover"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-extrabold leading-snug text-[#11162b]">
          <Link href={article.href} className="hover:text-maroon">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-500">{article.excerpt}</p>
        <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-400">
          <Clock size={13} aria-hidden />
          {article.readTime}
        </p>
        <Link
          href={article.href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-maroon hover:underline"
        >
          View Details <ChevronRight size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export default function BlogArticles() {
  return (
    <section id="blog" className="bg-gradient-to-b from-cream to-[#fff9f0] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-[#11162b] sm:text-3xl">
          Spiritual Blogs &amp; Articles
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Devotional guides, temple travel tips and mantra meanings for daily practice.
        </p>
        <div className="mt-6">
          <HorizontalScroll ariaLabel="Blog articles carousel">
            {blogArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </section>
  );
}
