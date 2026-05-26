import { Heart } from "lucide-react";

export default function DonationCTA() {
  return (
    <section id="donate" className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4a1617] via-[#6b2323] to-[#4a1617] px-6 py-12 text-center text-white shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(216,155,43,0.28),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_22%)]" />
        <div className="absolute bottom-0 left-0 h-28 w-full bg-[linear-gradient(to_top,rgba(0,0,0,0.28),transparent)]" />
        <div className="relative">
          <h2 className="font-serif text-4xl font-bold">Be a Part of Our Divine Mission</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-white/85">
            Your contribution supports temple development, daily rituals, and spiritual activities.
          </p>
          <a href="#" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#ffd875] px-8 py-3 text-sm font-extrabold text-maroon shadow-lg">
            <Heart size={18} /> Donate Now
          </a>
        </div>
      </div>
    </section>
  );
}
