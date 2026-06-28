/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produce a fully static site in ./out (no Node server needed to host).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
