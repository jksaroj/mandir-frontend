"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Plane, TrainFront, Bus } from "lucide-react";

const TABS = [
  { id: "air", label: "By Air", icon: Plane },
  { id: "train", label: "By Train", icon: TrainFront },
  { id: "bus", label: "By Bus", icon: Bus },
];

function mapEmbed(lat, lng, place) {
  const q = lat && lng ? `${lat},${lng}` : encodeURIComponent(place || "India");
  return `https://maps.google.com/maps?q=${q}&z=14&output=embed`;
}

function getReach(location, mode) {
  const block = location?.[mode];
  if (block && typeof block === "object") {
    return {
      description: block.description || "",
      placeName: block.placeName || "",
      lat: block.lat || "",
      lng: block.lng || "",
    };
  }
  if (mode === "air") {
    return {
      description: location?.airText || "",
      placeName: location?.airport || "",
      lat: "",
      lng: "",
    };
  }
  if (mode === "train") {
    return {
      description: location?.trainText || "",
      placeName: location?.railway || "",
      lat: "",
      lng: "",
    };
  }
  return {
    description: location?.roadText || "",
    placeName: "",
    lat: "",
    lng: "",
  };
}

export default function TempleLocation({ temple }) {
  const { location } = temple;
  const [tab, setTab] = useState("air");
  const reach = getReach(location, tab);
  const TabIcon = TABS.find((t) => t.id === tab)?.icon ?? MapPin;

  const directionsUrl =
    reach.lat && reach.lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${reach.lat},${reach.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          reach.placeName || location?.address || temple.name
        )}`;

  return (
    <section className="mt-8 grid gap-7 lg:grid-cols-[1.35fr_1fr]">
      <div className="rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
        <h2 className="text-xl font-extrabold">How to Reach</h2>
        <div className="mt-5 flex gap-8 border-b border-[#f1e7dc] text-sm font-extrabold">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`pb-3 transition-colors ${
                tab === id
                  ? "border-b-2 border-[#6b2323] text-[#6b2323]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            {reach.placeName ? (
              <p className="flex items-center gap-2 text-sm font-extrabold text-slate-700 mb-3">
                <TabIcon size={17} /> {reach.placeName}
              </p>
            ) : null}
            <p className="text-sm font-medium leading-7 text-slate-600 whitespace-pre-line">
              {reach.description || "Directions will be updated soon."}
            </p>
          </div>
          <div className="relative h-44 overflow-hidden rounded-xl border border-[#f1e7dc] bg-[#eef0ef]">
            {(reach.lat && reach.lng) || reach.placeName ? (
              <iframe
                title={`${temple.name} map`}
                src={mapEmbed(reach.lat, reach.lng, reach.placeName)}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <Image
                src={temple.image}
                alt={`${temple.name} location`}
                fill
                sizes="50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
      <aside className="rounded-2xl border border-[#f1e7dc] bg-white p-7 shadow-sm">
        <h2 className="text-xl font-extrabold">Location</h2>
        <div className="relative mt-5 h-40 overflow-hidden rounded-xl bg-[#eef0ef]">
          {location?.latitude && location?.longitude ? (
            <iframe
              title="Temple location"
              src={mapEmbed(location.latitude, location.longitude, location.address)}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
          ) : (
            <>
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=700&q=80"
                alt="Map location"
                fill
                sizes="40vw"
                className="object-cover opacity-70"
              />
              <MapPin className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-red-500 text-red-500" size={42} />
            </>
          )}
        </div>
        <p className="mt-5 text-sm font-semibold text-slate-500">{location?.address}</p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block w-full rounded-lg bg-[#f7eee6] py-3 text-center text-sm font-extrabold text-[#6b2323]"
        >
          Get Directions
        </a>
      </aside>
    </section>
  );
}
