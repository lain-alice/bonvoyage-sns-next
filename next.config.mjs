/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "firebasestorage.googleapis.com", "*"],
  },
  reactStrictMode: true,
};

export default nextConfig;
