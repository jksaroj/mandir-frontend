import SpiritualDetailPage, { generateSpiritualMetadata } from "@/components/spiritual/SpiritualDetailPage";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  return generateSpiritualMetadata({ params, variant: "chalisa" });
}

export default function ChalisaDetailPage({ params }) {
  return <SpiritualDetailPage params={params} variant="chalisa" />;
}
