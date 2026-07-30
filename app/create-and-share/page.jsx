import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import CreateShareGallery from '@/components/create-share/CreateShareGallery';
import { fetchCreateShareMedia } from '@/lib/createShareMedia';

export const dynamic = 'force-dynamic';
export default async function CreateAndSharePage() {
  const { items } = await fetchCreateShareMedia({ limit: 50 });
  return <main className="min-h-screen bg-[#fffaf5]"><Header/><section className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><div className="mx-auto mb-9 max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#c48a2a]">BrahmaTatva</p><h1 className="mt-2 font-serif text-4xl font-bold text-[#351112]">Create & Share</h1><p className="mt-3 text-sm leading-7 text-slate-600">Add your photo locally to devotional media, download and share blessings.</p></div><CreateShareGallery initialItems={items}/></section><Footer/></main>;
}
