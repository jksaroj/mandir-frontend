/** @type {import('next').NextConfig} */
const uploadHost = process.env.NEXT_PUBLIC_UPLOAD_HOST;

const remotePatterns = [
  { protocol: "https", hostname: "images.unsplash.com" },
  { protocol: "https", hostname: "images.pexels.com" },
  { protocol: "http", hostname: "localhost", port: "5000", pathname: "/**" },
  { protocol: "http", hostname: "127.0.0.1", port: "5000", pathname: "/**" },
];

if (uploadHost) {
  remotePatterns.push(
    { protocol: "https", hostname: uploadHost, pathname: "/**" },
    { protocol: "http", hostname: uploadHost, pathname: "/**" }
  );
}

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns,
    // Backend uploads on localhost — direct URL (optimizer cannot fetch reliably in dev)
    dangerouslyAllowSVG: false,
  },
};

module.exports = nextConfig;
