import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.108'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mldaczwvxawbzapgrwda.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },

  async headers() {
    // Skip security headers in dev so LAN/phone testing works without CSP blocking
    if (isDev) return [];

    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co",
              "media-src 'self' https://*.supabase.co",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://accounts.google.com",
              "frame-src https://accounts.google.com https://open.spotify.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

