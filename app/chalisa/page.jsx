import SpiritualListingPage from "@/components/spiritual/SpiritualListingPage";

export const metadata = {
  title: "Chalisa | Sri Devasthanam",
  description: "Read and chant sacred chalisas for devotion, courage, and spiritual upliftment."
};

export const revalidate = 60;

export default function ChalisaPage() {
  return <SpiritualListingPage variant="chalisa" />;
}
