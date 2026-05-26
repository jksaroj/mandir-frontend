import Link from "next/link";
import { Landmark } from "lucide-react";
import I18n from "@/components/i18n/I18n";

function SocialIcon({ children, label }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#d9a441] hover:text-[#351112]">
      <span className="sr-only">{label}</span>
      {children}
    </span>
  );
}

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Temples", href: "/temples" },
  { label: "Mantras", href: "/mantras" },
  { label: "Chalisas", href: "/chalisa" },
  { label: "Events", href: "#events" },
  { label: "Spiritual Reels", href: "#reels" },
  { label: "Blog", href: "#blog" },
  { label: "Pandit Services", href: "/pandit-services" }
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" }
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Disclaimer", href: "#" }
];

const social = [
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.6 15.5V8.5L15.8 12l-6.2 3.5z" />
      </svg>
    )
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12a12 12 0 1 0-13.9 11.8v-8.4H7.9V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.9 0 1.9.2 1.9.2v2.1h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.4l-.4 2.4h-2v8.4A12 12 0 0 0 24 12z" />
      </svg>
    )
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.3A1.8 1.8 0 1 1 8.3 6.5 1.8 1.8 0 0 1 6.5 8.3zM19 19h-3v-4.6c0-1.1-.02-2.5-1.5-2.5-1.5 0-1.7 1.2-1.7 2.4V19h-3v-9h2.9v1.2h.04c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19z" />
      </svg>
    )
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.6 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    )
  }
];

export default function HomeFooter() {
  return (
    <footer className="mt-4 border-t border-[#f1e4d6] bg-gradient-to-b from-[#4a2020] to-[#351112] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-[#ffc65e] to-[#d77719]">
              <Landmark size={26} aria-hidden />
            </span>
            <div>
              <I18n k="brand.name" className="font-bold" />
              <p className="text-xs text-white/70">Temples · Mantras · Bhakti</p>
            </div>
          </div>
          <I18n
            k="brand.footerAbout"
            as="p"
            className="mt-4 max-w-xs text-sm leading-6 text-white/75"
          />
          <div className="mt-6 flex gap-2">
            {social.map(({ label, href, icon }) => (
              <a key={label} href={href} aria-label={label}>
                <SocialIcon label={label}>{icon}</SocialIcon>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#d9a441]">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            {exploreLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#d9a441]">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-sm font-extrabold uppercase tracking-wide text-[#d9a441]">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#d9a441]">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>support@sridevasthanam.com</li>
            <li>+91 98765 43210</li>
            <li>123 Temple Street, Spiritual City, Bharat</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-center text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <I18n k="footer.rights" />
          <p>Made with devotion for devotees across Bharat</p>
        </div>
      </div>
    </footer>
  );
}
