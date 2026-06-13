/** @type {import('next').NextConfig} */
const uploadHost = process.env.NEXT_PUBLIC_UPLOAD_HOST;

// Also parse NEXT_PUBLIC_UPLOAD_BASE directly for cases where only that is set
let uploadBaseHost = "";
try {
  if (process.env.NEXT_PUBLIC_UPLOAD_BASE) {
    uploadBaseHost = new URL(process.env.NEXT_PUBLIC_UPLOAD_BASE).hostname;
  }
} catch {}

const remotePatterns = [
  { protocol: "https", hostname: "images.unsplash.com" },
  { protocol: "https", hostname: "images.pexels.com" },
  { protocol: "https", hostname: "commons.wikimedia.org" },
  // YouTube thumbnails (auto-generated when admin doesn't upload custom thumbnail)
  { protocol: "https", hostname: "img.youtube.com" },
  { protocol: "https", hostname: "i.ytimg.com" },
  // Production server
  { protocol: "https", hostname: "brahmatatva.com", pathname: "/**" },
  { protocol: "http", hostname: "brahmatatva.com", pathname: "/**" },
  { protocol: "https", hostname: "backend.brahmatatva.com", pathname: "/**" },
  { protocol: "http", hostname: "backend.brahmatatva.com", pathname: "/**" },
  // Local dev
  { protocol: "http", hostname: "localhost", port: "5000", pathname: "/**" },
  { protocol: "http", hostname: "127.0.0.1", port: "5000", pathname: "/**" },
];

// Add production upload host from NEXT_PUBLIC_UPLOAD_HOST
if (uploadHost && uploadHost !== "localhost" && uploadHost !== "127.0.0.1") {
  remotePatterns.push(
    { protocol: "https", hostname: uploadHost, pathname: "/**" },
    { protocol: "http", hostname: uploadHost, pathname: "/**" }
  );
}

// Also add from NEXT_PUBLIC_UPLOAD_BASE if different
if (uploadBaseHost && uploadBaseHost !== "localhost" && uploadBaseHost !== "127.0.0.1" && uploadBaseHost !== uploadHost) {
  remotePatterns.push(
    { protocol: "https", hostname: uploadBaseHost, pathname: "/**" },
    { protocol: "http", hostname: uploadBaseHost, pathname: "/**" }
  );
}

const BACKEND_URL = "https://backend.brahmatatva.com";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns,
    dangerouslyAllowSVG: false,
  },

  // Proxy — browser localhost:3000/api/* → backend.brahmatatva.com/api/*
  // CORS bypass: request server-to-server hoti hai, browser block nahi karta
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
