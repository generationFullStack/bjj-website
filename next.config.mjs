// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"], // 允許來自 images.unsplash.com 的圖片
  },
};

export default nextConfig; // 使用 export default 替代 module.exports
