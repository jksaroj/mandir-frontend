import OptimizedImage from "@/components/ui/OptimizedImage";
import { IMAGE_SIZES, templeImageAlt } from "@/lib/images";
import { getDefaultGallery } from "@/lib/temples";

export default function TempleGallery({ temple }) {
  const gallery = getDefaultGallery(temple);

  if (!gallery.length) return null;

  return (
    <section className="mt-8 rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Gallery</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((image, index) => (
          <div key={`${image}-${index}`} className="relative h-36 overflow-hidden rounded-xl">
            <OptimizedImage
              src={image}
              alt={templeImageAlt(temple.name, { context: "gallery", index, total: gallery.length })}
              fill
              sizes={IMAGE_SIZES.gallery}
              className="object-cover"
              quality={80}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
