import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { fetchBlogs } from "@/lib/blogs";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { blogArticles } from "@/lib/homeContent";

function estimateReadTime(article) {
  const text = `${article.description || ""} ${article.content || ""}`.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 180))} min read`;
}

function ArticleCard({ article }) {
  return (
    <article className="group card-lift flex h-full flex-col overflow-hidden rounded-xl border border-[#eaded2] bg-white shadow-sm">
      <Link href={article.href} className="block">
        <div className="relative h-44 overflow-hidden">
          <OptimizedImage
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

export default async function BlogArticles() {
  const blogs = await fetchBlogs();
  const articles = blogs.length > 0
    ? blogs.slice(0, 8).map((blog) => ({
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.shortDescription || blog.description,
        readTime: estimateReadTime(blog),
        image: blog.imageUrl,
        href: `/blog/${blog.slug}`,
      }))
    : blogArticles;

  return (
    <section id="blog" className="py-7">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between"><h2 className="font-serif text-2xl font-bold text-[#2d2020]">♨ Mantras, Aartis &amp; Spiritual Guides</h2><Link href="/blog" className="text-xs font-bold text-maroon">View All Articles ›</Link></div>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Devotional guides, temple travel tips and mantra meanings for daily practice.
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            )).slice(0, 3)}
        </div>
      </div>
    </section>
  );
}
