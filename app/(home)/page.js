"use client";

import BjjGymBanner from "@/components/BjjGymBanner";
import VideoTextSlider from "@/components/VideoTextSlider"; // 引入抽離的 VideoTextSlider 組件

// 歡迎標題組件
const WelcomeHeader = () => (
  <h1 className="text-5xl md:text-6xl font-bold text-center">
    Welcome to <br /> BJJ-JPG
  </h1>
);

// 主頁組件
export default function Home() {
  return (
    <>
      <section className="home flex items-center justify-center">
        <WelcomeHeader />
      </section>
      <div></div>
      <section className="banner-section py-10 bg-[#151414] flex flex-col items-center gap-10 w-full">
        <div className="w-[98%] max-w-[1400px] flex justify-center items-center">
          <VideoTextSlider />
        </div>
        <div className="banner-container w-full">
          <BjjGymBanner />
        </div>
      </section>
    </>
  );
}
