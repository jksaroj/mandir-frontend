import { redirect } from "next/navigation";
import { fetchSpiritualItemBySlug, getMantraHref } from "@/lib/mantras";

export default async function MantraChalisaSlugRedirectPage({ params }) {
  const { slug } = await params;
  const item = await fetchSpiritualItemBySlug(slug);

  if (item) {
    redirect(getMantraHref(item));
  }

  redirect("/mantras");
}
