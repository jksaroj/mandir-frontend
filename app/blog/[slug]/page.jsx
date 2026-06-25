import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { fetchBlogBySlug, fetchBlogs } from "@/lib/blogs";
import { absoluteUrl, buildMetadata, seoKeywords, stripHtml } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const blogs = await fetchBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return buildMetadata({
      title: "Article Not Found",
      description: "The requested BrahmaTatva article could not be found.",
      path: `/blog/${slug}`,
      keywords: ["BrahmaTatva", "spiritual article"]
    });
  }

  return buildMetadata({
    title: blog.title,
    description: blog.shortDescription || blog.description,
    path: `/blog/${slug}`,
    image: blog.imageUrl,
    type: "article",
    keywords: seoKeywords(blog.title, blog.category, "Hindu article", "bhakti", "spiritual blog")
  });
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: blog.title, href: `/blog/${slug}` }
  ];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.shortDescription || blog.description,
    image: blog.imageUrl,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: { "@type": "Organization", name: blog.author || "BrahmaTatva" },
    publisher: {
      "@type": "Organization",
      name: "BrahmaTatva",
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/BrahmaTatvaLogo.png") }
    },
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`)
  };

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#1f2937]">
      <JsonLd data={articleSchema} />
      <Header active="blog" />
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-7" />
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#9b5252]">{blog.category}</p>
        <h1 className="mt-3 font-serif text-5xl font-bold leading-tight text-[#351112]">{blog.title}</h1>
        <p className="mt-4 text-sm font-semibold text-slate-500">
          By {blog.author} · {new Date(blog.publishedAt).toLocaleDateString("en-IN")}
        </p>
        <Image src={blog.imageUrl} alt={`${blog.title} featured image`} width={1200} height={630} priority className="mt-8 aspect-[1200/630] w-full rounded-lg object-cover" />
        <div className="prose prose-slate mt-8 max-w-none">
          <p>{stripHtml(blog.content || blog.description)}</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/temples" className="rounded-lg border border-[#9b5252] px-4 py-2 text-sm font-extrabold text-[#6b2323]">Explore Temples</Link>
          <Link href="/mantras" className="rounded-lg border border-[#9b5252] px-4 py-2 text-sm font-extrabold text-[#6b2323]">Read Mantras</Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
