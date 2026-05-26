import SpiritualListingPage from "@/components/spiritual/SpiritualListingPage";

export const metadata = {
  title: "Mantras | Sri Devasthanam",
  description: "Discover powerful mantras for peace, positivity, strength and spiritual growth."
};

export const revalidate = 60;

export default function MantrasPage() {
  return <SpiritualListingPage variant="mantra" />;
}
