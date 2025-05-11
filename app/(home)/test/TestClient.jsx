"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../[category]/Category.module.css"; // 重用現有的樣式

// 工具函數：生成 YouTube 縮略圖 URL
const getYouTubeThumbnail = (videoId, index = "maxresdefault") =>
  `https://img.youtube.com/vi/${videoId}/${index}.jpg`;

export default function TestClient({ videos }) {
  // 狀態管理：追蹤每個視頻的懸停、播放和當前幀（縮略圖序列）
  const [videoStates, setVideoStates] = useState({});

  // 處理懸停開始：觸發預覽動畫
  const handleMouseEnter = (key) => {
    setVideoStates((prev) => ({
      ...prev,
      [key]: { isHovered: true, isPlaying: false, frame: 1 }, // 從第一幀開始
    }));
  };

  // 處理懸停結束：恢復靜態縮略圖
  const handleMouseLeave = (key) => {
    setVideoStates((prev) => ({
      ...prev,
      [key]: { isHovered: false, isPlaying: false, frame: 1 }, // 回到靜態縮略圖
    }));
  };

  // 動態切換縮略圖：每秒切換一次，模擬 3 秒預覽
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoStates((prev) => {
        const newStates = { ...prev };
        Object.keys(newStates).forEach((key) => {
          if (newStates[key].isHovered && !newStates[key].isPlaying) {
            newStates[key].frame = (newStates[key].frame % 3) + 1; // 循環 1.jpg, 2.jpg, 3.jpg
          }
        });
        return newStates;
      });
    }, 500); // 每秒切換一次，3 秒完成一輪
    return () => clearInterval(interval); // 清除計時器
  }, []);

  return (
    <div className={`${styles.videosPage} testPage`}>
      <h1>Test Page: Videos from Database</h1>
      <div className={styles.videoList}>
        {videos.map((video, index) => {
          const key = `${index}`; // 每個視頻的唯一鍵
          const state = videoStates[key] || {
            isHovered: false,
            isPlaying: false,
            frame: 1,
          };
          const title = video.title; // 使用從 YouTube API 獲取的標題
          const youtubeId = video.youtube_id; // 從資料庫中獲取 youtube_id

          return (
            <div
              key={youtubeId}
              className={styles.videoCard}
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={() => handleMouseLeave(key)}
              onKeyDown={(e) => e.key === "Enter" && handleMouseLeave(key)} // 鍵盤支持，防止播放
              tabIndex={0} // 允許鍵盤焦點
              role="button" // 提高可訪問性
              aria-label={`查看 ${title}`} // 屏幕閱讀器標籤
            >
              <Link
                href={`/test/${youtubeId}`} // 簡單鏈接，之後可以改進
                className={styles.thumbnailWrapper}
              >
                <img
                  src={getYouTubeThumbnail(
                    youtubeId,
                    state.isHovered ? state.frame : "maxresdefault"
                  )} // 使用高清靜態圖
                  alt={title}
                  className={`${styles.thumbnail} ${
                    state.isHovered ? styles.preview : ""
                  }`}
                  onError={(e) =>
                    (e.target.src = getYouTubeThumbnail(youtubeId, "hqdefault"))
                  } // 備用縮略圖
                />
              </Link>
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
