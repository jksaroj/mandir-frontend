import SpiritualListingPage from "@/components/spiritual/SpiritualListingPage";

export const metadata = {
  title: "Mantras | brahmatatva",
  description: "Discover powerful mantras for peace, positivity, strength and spiritual growth."
};

export const revalidate = 60;

export default function MantrasPage() {
  return <SpiritualListingPage variant="mantra" />;
}
