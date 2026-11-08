import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Agen chat membaca kartu pengetahuan dan system prompt dari content/ saat berjalan di Vercel.
  outputFileTracingIncludes: {
    "/api/chat": ["./content/**/*"],
  },
  images: {
    // Foto arsip di halaman Galeri diambil langsung dari Wikimedia Commons (lisensi dicantumkan per foto).
    remotePatterns: [new URL("https://upload.wikimedia.org/**"), new URL("https://thumb.wikimedia.org/**")],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
