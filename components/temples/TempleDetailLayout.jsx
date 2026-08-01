import TempleDetailsHero from "./TempleDetailsHero";
import TempleInfoTabs from "./TempleInfoTabs";
import TempleTimings from "./TempleTimings";
import TempleScheduleGrid from "./TempleScheduleGrid";
import TemplePoojaSeva from "./TemplePoojaSeva";
import TempleHistory from "./TempleHistory";
import TempleGallery from "./TempleGallery";
import TempleFacilities from "./TempleFacilities";
import TempleLocation from "./TempleLocation";
import TempleNearbyPlaces from "./TempleNearbyPlaces";
import TempleReviews from "./TempleReviews";
import TempleDetailSidebar from "./TempleDetailSidebar";
import TempleCard from "./TempleCard";
import NewsletterSection from "./NewsletterSection";
import FaqSection from "@/components/seo/FaqSection";

export default function TempleDetailLayout({ temple, faqs, relatedTemples }) {
  return <>
    <section id="overview"><TempleDetailsHero temple={temple}/></section>
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"><TempleInfoTabs/></div>
    <div className="mx-auto grid max-w-7xl gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-[1fr_330px] lg:px-8">
      <div>
        <section id="darshan-timings" className="scroll-mt-24"><TempleTimings temple={temple}/><TempleScheduleGrid scheduleTimings={temple.scheduleTimings}/></section>
        <section id="pooja-seva" className="scroll-mt-24"><TemplePoojaSeva poojas={temple.poojas}/></section>
        <TempleHistory temple={temple}/>
        <section id="gallery" className="scroll-mt-24"><TempleGallery temple={temple}/></section>
        <section id="facilities" className="scroll-mt-24"><TempleFacilities facilities={temple.facilities}/></section>
      </div>
      <TempleDetailSidebar temple={temple}/>
    </div>
    <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <section id="how-to-reach" className="scroll-mt-24"><TempleLocation temple={temple}/></section>
      <TempleNearbyPlaces temple={temple}/>
      <section id="reviews" className="scroll-mt-24"><TempleReviews temple={temple}/></section>
      <FaqSection title={`${temple.name} FAQs`} description="Helpful answers for devotees planning darshan, timings, facilities and temple visits." items={faqs}/>
      <section className="mt-10"><h2 className="font-serif text-2xl font-bold text-[#3d1717]">You May Also Like</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{relatedTemples.map(item=><TempleCard key={item.slug} temple={item}/>)}</div></section>
    </div>
    <NewsletterSection/>
  </>;
}
