/**
 * BrahmaTatva SVG Logo
 * variant="light"  — dark text (cream/white background headers)
 * variant="dark"   — white + gold text (dark maroon background headers)
 */
export default function BrahmaTatvaLogo({ className = "", height = 44, variant = "light" }) {
  return (
    <img
      src="/images/BrahmaTatvaLogo.png"
      alt="BrahmaTatva"
      height={height}
      className={`h-auto w-auto ${variant === "dark" ? "brightness-0 invert" : ""} ${className}`}
      style={{ maxHeight: height }}
    />
  );
}
