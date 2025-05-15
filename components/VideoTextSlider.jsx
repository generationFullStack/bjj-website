"use client";
import { useState, useEffect, useRef } from "react";

// 滑動卡片組件，包含影片/圖片和文字描述，支援滑鼠和觸控滑動
const VideoTextSlider = () => {
  // 滑動卡片數據
  const slides = [
    {
      img: "/gavinko.png",
      text: "Its techniques and strategies are based on in-depth research into ground fighting. Jiu-jitsu practitioners excel at bringing opponents to the ground and then gaining dominant positions. Brazilian Jiu-Jitsu techniques primarily focus on positional control and various submission holds.",
    },
    {
      img: "/gavincham.png",
      text: "Gavin won his first bjj no gi competition in Vamos",
    },
    {
      img: "/bjj_gihome.jpg",
      text: "Gi-based attacks depend on using the fabric to either control or support an attack. As the Gi provides additional control points, establishing, stripping, and re-establishing grips are of primary importance in Gi BJJ.",
    },
    {
      img: "/bjjgiornogi.png",
      text: "Gi vs No-Gi",
    },
    {
      img: "/bjj_nogihome.jpg",
      text: "No-Gi BJJ, on the other hand, has a much more dynamic feel. The pace is usually faster due to the limited grips available. This means that you have to be more active in controlling your opponent.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0); // 當前滑動索引
  const [isHovered, setIsHovered] = useState(false); // 懸停狀態
  const [isDragging, setIsDragging] = useState(false); // 滑鼠/觸控滑動狀態
  const [startX, setStartX] = useState(0); // 滑動起始位置
  const [translateX, setTranslateX] = useState(0); // 滑動偏移量
  const sliderRef = useRef(null); // 滑動容器的引用

  // 自動滑動效果
  useEffect(() => {
    if (isHovered || isDragging) return; // 如果懸停或滑動中，則不執行自動滑動

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000); // 每 8 秒切換

    return () => clearInterval(interval); // 清理 interval
  }, [slides.length, isHovered, isDragging]); // 依賴 isHovered 和 isDragging

  // 手動切換到上一個卡片
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // 手動切換到下一個卡片
  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // 滑鼠滑動：開始滑動
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setTranslateX(-currentSlide * 100); // 設置初始偏移量
  };

  // 觸控滑動：開始滑動
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setTranslateX(-currentSlide * 100); // 設置初始偏移量
  };

  // 滑鼠滑動：滑動中
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX; // 計算滑動距離
    setTranslateX(-currentSlide * 100 + (deltaX / window.innerWidth) * 100); // 動態調整偏移量
  };

  // 觸控滑動：滑動中
  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX; // 計算滑動距離
    setTranslateX(-currentSlide * 100 + (deltaX / window.innerWidth) * 100); // 動態調整偏移量
  };

  // 滑動結束（滑鼠/觸控通用）
  const handleDragEnd = () => {
    setIsDragging(false);

    const threshold = 30; // 滑動閾值（百分比）
    const finalTranslateX = translateX;

    if (finalTranslateX < -currentSlide * 100 - threshold) {
      // 向左滑動，切換到下一張
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    } else if (finalTranslateX > -currentSlide * 100 + threshold) {
      // 向右滑動，切換到上一張
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } else {
      // 滑動距離不足，恢復到當前卡片
      setCurrentSlide(currentSlide);
    }

    setTranslateX(-currentSlide * 100); // 重置偏移量
  };

  return (
    <div
      className="relative w-full max-w-[1400px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 滑動容器，用 overflow-hidden 確保只顯示一組內容 */}
      <div className="overflow-hidden">
        {/* 內層容器，將所有內容水平排列，通過 transform 實現滑動 */}
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(${
              isDragging ? translateX : -currentSlide * 100
            }%)`,
            transition: isDragging ? "none" : "transform 0.5s ease", // 滑動中禁用過渡
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`video-text-container w-full flex-none flex flex-col md:flex-row items-start justify-center gap-10 ${
                index === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* 視頻或圖片：放大寬度 */}
              <div className="video-container w-full max-w-6xl relative">
                <img
                  className="w-full rounded-2xl aspect-video object-cover"
                  src={slide.img}
                  alt={`BJJ Image ${index + 1}`}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ pointerEvents: "none" }}
                />
                <div className="absolute inset-0 bg-transparent pointer-events-none" />
              </div>
              {/* 文字：放大寬度 */}
              <div className="text-container w-[90%] max-w-[800px] text-white p-6  flex flex-col justify-center h-full">
                <p className="text-3xl leading-relaxed ">{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 左右箭頭 */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <i className="fa-solid fa-arrow-left fa-3x"></i>
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <i className="fa-solid fa-arrow-right fa-3x"></i>
      </button>
    </div>
  );
};

export default VideoTextSlider;
