/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "cdn-ray.zain.sa"],
  },
  env: {
    NEXT_PUBLIC_OPEN_AI_SEC_KEY:
      "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",
    NEXT_PUBLIC_BASE_URL: "http://165.227.119.249",
    NEXT_PUBLIC_CLIENT_URL: "http://165.227.119.249:3000",
    NEXT_PUBLIC_IFRAME_URL: "165.227.119.249:3000",
  },
};

export default nextConfig;
