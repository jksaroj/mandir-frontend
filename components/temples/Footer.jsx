import Link from "next/link";
import { Camera, Landmark, Mail, MapPin, MessageCircle, Phone, Video } from "lucide-react";

const quickLinks = ["Home", "Temples", "Mantra & Chalisa", "Festival & Events", "Pooja & Seva"];
const supportLinks = ["Help Center", "FAQ", "Terms & Conditions", "Privacy Policy", "Refund Policy"];

export default function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-r from-[#401112] via-[#5b1f1f] to-[#321010] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-[#ffc65e] to-[#d77719]">
              <Landmark size={28} />
            </span>
            <div>
              <p className="font-bold">brahmatatva</p>
              <p className="text-xs text-white/75">Temple Management System</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">
            A complete platform for temples, devotees, mantras, poojas and spiritual services.
          </p>
          <div className="mt-6 flex gap-3">
            {[MessageCircle, Camera, Video, MessageCircle].map((Icon, index) => (
              <span key={index} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12">
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            {quickLinks.map((link) => (
              <li key={link}><Link href={link === "Home" ? "/" : "#"}>{link}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-extrabold">Help & Support</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            {supportLinks.map((link) => <li key={link}><a href="#">{link}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-extrabold">Contact Us</h3>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-white/75">
            <li className="flex gap-3"><Mail size={17} /> support@brahmatatva.com</li>
            <li className="flex gap-3"><Phone size={17} /> +91 98765 43210</li>
            <li className="flex gap-3"><MapPin size={17} /> 123 Temple Street, Spiritual City, Bharat, 560001</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2025 brahmatatva. All rights reserved.</p>
          <div className="flex gap-8"><a href="#">Terms & Conditions</a><a href="#">Privacy Policy</a></div>
        </div>
      </div>
    </footer>
  );
}
