"use client";

import BjjGymBanner from "@/components/BjjGymBanner";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// 歡迎標題組件
const WelcomeHeader = () => (
  <h1 className="text-5xl md:text-6xl font-bold text-center">
    Welcome to <br /> BJJ.JPG
  </h1>
);

const VideoTextSlider = () => {
  const slides = [
    {
      videoSrc: "/video/BJJNo-Gi_home.mp4",
      text: "Its techniques and strategies are based on in-depth research into ground fighting. Jiu-jitsu practitioners excel at bringing opponents to the ground and then gaining dominant positions. Brazilian Jiu-Jitsu techniques primarily focus on positional control and various submission holds.",
    },
    {
      img: "/bjj_gihome.jpg",
      text: "Gi-based attacks depend on using the fabric to either control or support an attack. As the Gi provides additional control points, establishing, stripping, and re-establishing grips are of primary importance in Gi BJJ.",
    },
    {
      img: "/bjj_nogihome.jpg",
      text: "No-Gi BJJ, on the other hand, has a much more dynamic feel. The pace is usually faster due to the limited grips available. This means that you have to be more active in controlling your opponent.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 自動滑動
  useEffect(() => {
    if (isHovered) return; // 如果懸停，則不執行自動滑動

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000); // 每 10 秒切換

    return () => clearInterval(interval); // 清理 interval
  }, [slides.length, isHovered]); // 依賴 isHovered

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="relative w-full max-w-7xl group" // 添加 group 類
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 滑動容器，用 overflow-hidden 確保只顯示一組內容 */}
      <div className="overflow-hidden">
        {/* 內層容器，將所有內容水平排列，通過 transform 實現滑動 */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`video-text-container w-full flex-none flex flex-col md:flex-row items-start justify-center gap-10 ${
                index === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* 視頻或圖片 */}
              <div className="video-container w-full max-w-4xl relative">
                {slide.videoSrc ? (
                  <video
                    className="w-full rounded-lg aspect-video"
                    src={slide.videoSrc}
                    title={`BJJ Video ${index + 1}`}
                    autoPlay
                    muted
                    loop
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ pointerEvents: "none" }}
                  />
                ) : slide.img ? (
                  <img
                    className="w-full rounded-lg aspect-video object-cover"
                    src={slide.img}
                    alt={`BJJ Image ${index + 1}`}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ pointerEvents: "none" }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-transparent pointer-events-none" />
              </div>
              {/* 文字 */}
              <div className="text-container w-[90%] max-w-[600px] text-white p-6">
                <p className="text-3xl leading-relaxed">{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 左右箭頭 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        →
      </button>
    </div>
  );
};

// 主頁組件
export default function Home() {
  return (
    <>
      <section className="home flex items-center justify-center">
        <WelcomeHeader />
      </section>
      <div></div>
      <section className="banner-section py-10 bg-[#111] flex flex-col items-center gap-10 w-full">
        <div className="w-[95%] max-w-[1200px] flex justify-center items-center">
          {/* 控制寬度 */}
          <VideoTextSlider />
        </div>
      </section>
      <div className="banner-container w-full">
        <BjjGymBanner />
      </div>
    </>
  );
}
