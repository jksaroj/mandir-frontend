import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import CreateShareGallery from '@/components/create-share/CreateShareGallery';
import { fetchCreateShareMediaById } from '@/lib/createShareMedia';

export const dynamic = 'force-dynamic';
export default async function CreateShareDetailPage({ params }) {
  const { id } = await params;
  const item = await fetchCreateShareMediaById(id);
  if (!item) return <main className="min-h-screen bg-[#fffaf5]"><Header/><div className="mx-auto max-w-xl px-4 py-28 text-center"><h1 className="font-serif text-3xl font-bold text-[#351112]">Media unavailable</h1><p className="mt-3 text-slate-500">This media is inactive, deleted, or no longer available.</p><Link href="/create-and-share" className="mt-6 inline-block rounded-lg bg-[#6b2323] px-5 py-3 font-bold text-white">Back to gallery</Link></div><Footer/></main>;
  return <main className="min-h-screen bg-[#fffaf5]"><Header/><section className="mx-auto max-w-2xl px-4 py-10"><CreateShareGallery initialItems={[item]}/></section><Footer/></main>;
}
