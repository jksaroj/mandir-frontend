import { generateSpiritualMetadata } from "@/components/spiritual/SpiritualDetailPage";
import ChalisaDetailDesign from "@/components/spiritual/ChalisaDetailDesign";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  return generateSpiritualMetadata({ params, variant: "chalisa" });
}

export default function ChalisaDetailPage({ params }) {
  return <ChalisaDetailDesign params={params} />;
}
