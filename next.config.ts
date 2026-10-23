import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
// Vercel preview deployments load the Vercel Toolbar from vercel.live.
const isPreview = process.env.VERCEL_ENV === "preview";
const toolbar = isPreview ? " https://vercel.live" : "";
const BEEWHAT_URL = (process.env.NEXT_PUBLIC_BEEWHAT_URL ?? "https://beewhat.vrindabsolution.com").replace(/\/$/, "");

// Pages are statically generated, so the policy uses 'unsafe-inline' for Next.js's inline bootstrap
// scripts rather than per-request nonces (which would force every page to render dynamically).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${toolbar}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${toolbar}`,
  "font-src 'self' data:",
  `connect-src 'self'${toolbar}${isPreview ? " wss://ws-us3.pusher.com" : ""}`,
  `frame-src ${isPreview ? "https://vercel.live" : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    // BeeWhat runs as its own app on its subdomain.
    return [
      { source: "/products/beewhat", destination: `${BEEWHAT_URL}/`, permanent: true },
      { source: "/beewhat-site/:path*", destination: `${BEEWHAT_URL}/:path*`, permanent: true },
    ];
  },
};

export default nextConfig;
