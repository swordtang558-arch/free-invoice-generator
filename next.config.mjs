/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The invoice tool runs entirely in the browser; no server runtime needed.
  // SSG-first so every page ships fully crawlable HTML.
};

export default nextConfig;
