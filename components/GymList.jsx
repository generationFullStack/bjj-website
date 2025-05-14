"use client";
import { gymList } from "@/constant/gymList";
import { useState, useEffect, useRef } from "react";
import "./GymList.css";

export default function GymList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0); // 新增狀態：滑塊寬度
  const labelRefs = useRef([]); // 用於存儲每個標籤的 ref

  // 處理標籤點擊，更新選中的索引
  const handleLabelClick = (index) => {
    setSelectedIndex(index);
  };

  // 計算滑塊的 top 值（標籤高度 50px * 索引）
  const sliderTop = selectedIndex * 50;

  // 當選中索引變化時，更新滑塊寬度
  useEffect(() => {
    if (labelRefs.current[selectedIndex]) {
      const spanElement = labelRefs.current[selectedIndex];
      const spanWidth = spanElement.offsetWidth; // 獲取文字的實際寬度
      const paddingLeft = 20; // 與 .list label 的 padding-left: 20px 一致
      setSliderWidth(spanWidth + paddingLeft); // 滑塊寬度 = 文字寬度 + 左邊距
    }
  }, [selectedIndex]);

  // 初始加載時設置滑塊寬度，並處理窗口大小變化
  useEffect(() => {
    const updateSliderWidth = () => {
      if (labelRefs.current[selectedIndex]) {
        const spanElement = labelRefs.current[selectedIndex];
        const spanWidth = spanElement.offsetWidth;
        const paddingLeft = 20;
        setSliderWidth(spanWidth + paddingLeft);
      }
    };

    // 初始計算
    updateSliderWidth();

    // 監聽窗口大小變化，重新計算寬度
    window.addEventListener("resize", updateSliderWidth);
    return () => window.removeEventListener("resize", updateSliderWidth);
  }, [selectedIndex]);

  return (
    <div className="container">
      <h1 className="topic">GYMS IN HONG KONG</h1>
      <div className="content">
        <div className="list">
          {gymList.map((element, index) => (
            <label
              key={index}
              onClick={() => handleLabelClick(index)}
              className={`gym-${index} ${
                selectedIndex === index ? "selected" : ""
              }`}
            >
              <span
                ref={(el) => (labelRefs.current[index] = el)} // 為每個 span 添加 ref
                className="whitespace-nowrap"
              >
                {element.name}
              </span>
            </label>
          ))}
          <div
            className="slider"
            style={{ top: `${sliderTop}px`, width: `${sliderWidth}px` }} // 動態設置滑塊寬度
          />
        </div>
        <div className="text-content">
          <div className="text">
            <div className="title">{gymList[selectedIndex].name}</div>
            <div className="gym-details">
              <div className="gym-info">
                <a
                  href={gymList[selectedIndex].website}
                  target="_blank"
                  className="website-link"
                >
                  {gymList[selectedIndex].website}
                </a>

                <div className="address-text break-words whitespace-normal break-all">
                  {gymList[selectedIndex].address}
                </div>
              </div>
              <img
                src={gymList[selectedIndex].imgSrc}
                alt="Logo of the gym"
                width={150}
                height={150}
                className="gym-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
