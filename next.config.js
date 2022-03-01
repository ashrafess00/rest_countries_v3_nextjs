/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["flagcdn.com"],
    domains: ["flagcdn.com", "upload.wikimedia.org"],
    // formats: ["image/png"],
  },
};

module.exports = nextConfig;
