/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn-ray.zain.sa"],
  },
  env: {
    TOKEN: "sbbs76bgsyegfyrbfyue",
    // base_url: "https://api.next-ecmrc.com",
    base_url: "http://localhost:5000",
  },
};

export default nextConfig;
