// src/app/page.js
import BjjGymBanner from "@/components/BjjGymBanner";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="home flex items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold text-center">
          Welcome to <br /> Brazilian Jiu-Jitsu
        </h1>
      </section>
      <div></div>
      {/* 視頻同圖片並排區塊 */}
      <section className="banner-section py-10 bg-[#111] flex flex-row justify-between items-center gap-10">
        {/* 改動：將 gap-10 改為 gap-5，減少視頻同圖片之間嘅間距，讓內容更緊湊 */}
        {/* 左邊視頻 */}
        <div className="video-container flex-1 max-w-4xl">
          <iframe
            className="w-full rounded-lg aspect-video"
            src="https://www.youtube.com/embed/SXtu_8K2osk?autoplay=1&mute=1&loop=1&playlist=SXtu_8K2osk&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* 右邊圖片同文字 */}
        <div className="banner-container flex-1">
          <BjjGymBanner />
        </div>
      </section>
    </>
  );
}
