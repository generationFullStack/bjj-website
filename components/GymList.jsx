"use client";
import { gymList } from "@/constant/gymList";
import { useState } from "react";
import "./GymList.css"; // 引入普通 CSS 文件

// GymList 組件，實現垂直標籤佈局，左側顯示健身房名稱，右側顯示選中健身房的內容
export default function GymList() {
  const [selectedIndex, setSelectedIndex] = useState(0); // 管理當前選中的健身房索引，初始為 0

  // 處理標籤點擊，更新選中的索引
  const handleLabelClick = (index) => {
    setSelectedIndex(index);
  };

  // 計算滑塊的 top 值（標籤高度 50px * 索引）
  const sliderTop = selectedIndex * 50; // 每個標籤高度為 50px

  return (
    <div className="container">
      {/* 標題 */}
      <h1 className="topic">GYMS IN HONG KONG</h1>

      {/* 內容區域：左側標籤 + 右側內容 */}
      <div className="content">
        {/* 左側標籤列表 */}
        <div className="list">
          {gymList.map((element, index) => (
            <label
              key={index}
              onClick={() => handleLabelClick(index)} // 點擊時更新選中的索引
              className={`gym-${index} ${
                selectedIndex === index ? "selected" : ""
              }`} // 動態添加選中狀態的類名
            >
              <span>{element.name}</span>
            </label>
          ))}
          {/* 滑塊：根據選中的索引動態移動 */}
          <div className="slider" style={{ top: `${sliderTop}px` }} />
        </div>

        {/* 右側內容區域：根據選中的索引顯示對應內容 */}
        <div className="text-content">
          <div className="text">
            <div className="title">{gymList[selectedIndex].name}</div>
            <div className="gym-details">
              <div className="gym-info">
                <div className="website-title">WEBSITE</div>
                <a
                  href={gymList[selectedIndex].website}
                  target="_blank"
                  className="website-link"
                >
                  {gymList[selectedIndex].website}
                </a>
                <div className="address-title">ADDRESS</div>
                <div className="address-text">
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
