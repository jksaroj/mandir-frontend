/**
 * BrahmaTatva SVG Logo
 * variant="light"  — dark text (cream/white background headers)
 * variant="dark"   — white + gold text (dark maroon background headers)
 */
export default function BrahmaTatvaLogo({ className = "", height = 44, variant = "light" }) {
  if (variant === "dark") {
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`} style={{ height }}>
        <img
          src="/images/favicon.png"
          alt=""
          aria-hidden="true"
          className="h-full w-auto shrink-0 rounded-full object-contain"
        />
        <span className="whitespace-nowrap font-serif text-xl font-bold leading-none text-white">
          Brahma<span className="text-[#e0ad48]">Tatva</span>
        </span>
      </span>
    );
  }

  return (
    <img
      src="/images/BrahmaTatvaLogo.png"
      alt="BrahmaTatva"
      height={height}
      className={`h-auto w-auto ${className}`}
      style={{ maxHeight: height }}
    />
  );
}
