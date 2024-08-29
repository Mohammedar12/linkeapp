/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn-ray.zain.sa"],
  },
  env: {
    TOKEN: "sbbs76bgsyegfyrbfyue",
    OPEN_AI_SEC_KEY: "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",
    // base_url: "https://f3c8-176-224-83-230.ngrok-free.app",
    base_url: "http://localhost:5000",
  },
};

export default nextConfig;
