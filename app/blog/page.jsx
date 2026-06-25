import Image from "next/image";
import Link from "next/link";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { fetchBlogs } from "@/lib/blogs";
import { buildMetadata, DEFAULT_OG_IMAGE, itemListSchema, seoKeywords } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
  const blogs = await fetchBlogs();
  return buildMetadata({
    title: "Blog",
    description: "Read BrahmaTatva articles on Hindu temples, mantras, festivals, bhakti, pilgrimage, pooja rituals and spiritual living.",
    path: "/blog",
    image: blogs[0]?.imageUrl || DEFAULT_OG_IMAGE,
    keywords: seoKeywords("Hindu blog", "spiritual articles", "bhakti articles", "temple guide", "mantra meaning", blogs.slice(0, 5).map((blog) => blog.title))
  });
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" }
  ];

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#1f2937]">
      <JsonLd data={itemListSchema(blogs, "/blog")} />
      <Header active="blog" />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-7" />
        <h1 className="font-serif text-5xl font-bold text-[#351112]">Spiritual Blog</h1>
        <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600">
          Read articles on temples, mantras, festivals, bhakti, Hindu rituals and spiritual practice.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.slug} className="overflow-hidden rounded-lg border border-[#f1e4d6] bg-white shadow-sm">
              <Link href={`/blog/${blog.slug}`} className="block">
                <Image src={blog.imageUrl} alt={`${blog.title} article image`} width={480} height={252} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#9b5252]">{blog.category}</p>
                  <h2 className="mt-2 text-xl font-extrabold text-[#351112]">{blog.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">{blog.shortDescription || blog.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
