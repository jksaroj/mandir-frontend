import EventsCollectionPage from "@/components/events/EventsCollectionPage";
import { fetchEvents } from "@/lib/events";
import { buildMetadata, DEFAULT_OG_IMAGE, seoKeywords } from "@/lib/seo";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const events = await fetchEvents();
  return buildMetadata({
    title: "Upcoming Festivals & Events",
    description: "Explore upcoming Hindu festivals, sacred celebrations and special temple events arranged by date.",
    path: "/events",
    image: events[0]?.imageUrl || DEFAULT_OG_IMAGE,
    keywords: seoKeywords("upcoming Hindu festivals", "temple events", "festival calendar", events.slice(0, 5).map((event) => event.name)),
  });
}

export default async function EventsPage() {
  const events = await fetchEvents();
  return <EventsCollectionPage events={events} now={new Date().toISOString()} />;
}
