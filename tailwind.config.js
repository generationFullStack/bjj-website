/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 添加自訂動畫
      animation: {
        load: "load 15s ease infinite", // 定義名為 "load" 的動畫，持續 15s，平滑過渡，無限循環
      },
      // 定義 keyframes 動畫
      keyframes: {
        load: {
          "0%": { width: "2%" }, // 起始寬度 2%
          "10%": { width: "10%" }, // 10% 時間點寬度 10%
        },
      },
    },
  },
  plugins: [],
};
