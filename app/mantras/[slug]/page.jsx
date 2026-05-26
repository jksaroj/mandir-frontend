import SpiritualDetailPage, { generateSpiritualMetadata } from "@/components/spiritual/SpiritualDetailPage";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  return generateSpiritualMetadata({ params, variant: "mantra" });
}

export default function MantraDetailPage({ params }) {
  return <SpiritualDetailPage params={params} variant="mantra" />;
}
