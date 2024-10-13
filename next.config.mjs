/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn-ray.zain.sa"],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "http://localhost:5000",
  },
};

export default nextConfig;
