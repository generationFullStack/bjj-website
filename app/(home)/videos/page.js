"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Videos.module.css";

// 工具函數：生成 YouTube 縮略圖 URL
const getYouTubeThumbnail = (videoId, index = "maxresdefault") =>
  `https://img.youtube.com/vi/${videoId}/${index}.jpg`;

export default function Videos() {
  // 狀態管理：追蹤每個視頻的懸停、播放和當前幀（縮略圖序列）
  const [videoStates, setVideoStates] = useState({});

  // 子選單數據：包含視頻標題和 ID
  const submenus = [
    {
      title: "Submissions",
      videos: [
        {
          title: "Armbar Tutorial",
          videoId: "3Bp4WzcPJIU", // 占位符，請替換為實際視頻 ID
        },
        {
          title: "Armbar Tutorial",
          videoId: "4wiO5H8kSV4", // 占位符，請替換為實際視頻 ID
        },
        {
          title: "Triangle Choke Basics",
          videoId: "3Bp4WzcPJIU", // 占位符，請替換為實際視頻 ID
        },
        {
          title: "Rear Naked Choke Guide",
          videoId: "bmSQzxjOaUQ", // 占位符，請替換為實際視頻 ID
        },
      ],
      moreLink: "/videos/submissions",
    },
    {
      title: "Guard Passing",
      videos: [
        {
          title: "Armbar Tutorial",
          videoId: "3Bp4WzcPJIU", // 占位符，請替換為實際視頻 ID
        },
        {
          title: "Toreando Pass Techniques",
          videoId: "3Bp4WzcPJIU", // 占位符，請替換為實際視頻 ID
        },
        {
          title: "Knee Cut Pass Tips",
          videoId: "3Bp4WzcPJIU", // 占位符，請替換為實際視頻 ID
        },
        {
          title: "Over-Under Pass Strategy",
          videoId: "3Bp4WzcPJIU", // 占位符，請替換為實際視頻 ID
        },
      ],
      moreLink: "/videos/guard-passing",
    },
  ];

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

  // 處理點擊：播放完整視頻
  const handlePlay = (key) => {
    setVideoStates((prev) => ({
      ...prev,
      [key]: { isHovered: false, isPlaying: true, frame: 1 }, // 播放時重置幀
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
    <div className={styles.videosPage}>
      {submenus.map((submenu, submenuIndex) => (
        <div key={submenu.title} className={styles.submenu}>
          <h2>{submenu.title}</h2>
          <div className={styles.videoList}>
            {submenu.videos.map((video, videoIndex) => {
              const key = `${submenuIndex}-${videoIndex}`; // 每個視頻的唯一鍵
              const state = videoStates[key] || {
                isHovered: false,
                isPlaying: false,
                frame: 1,
              };

              return (
                <div
                  key={video.title}
                  className={styles.videoCard}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={() => handleMouseLeave(key)}
                  onKeyDown={(e) => e.key === "Enter" && handlePlay(key)} // 鍵盤支持
                  tabIndex={0} // 允許鍵盤焦點
                  role="button" // 提高可訪問性
                  aria-label={`播放 ${video.title}`} // 屏幕閱讀器標籤
                >
                  {state.isPlaying ? (
                    // 點擊後：播放完整視頻
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    // 懸停或初始狀態：顯示縮略圖（懸停時切換序列）
                    <div
                      className={styles.thumbnailWrapper}
                      onClick={() => handlePlay(key)}
                    >
                      <img
                        src={getYouTubeThumbnail(
                          video.videoId,
                          state.isHovered ? state.frame : "maxresdefault"
                        )} // 使用高清靜態圖
                        alt={video.title}
                        className={`${styles.thumbnail} ${
                          state.isHovered ? styles.preview : ""
                        }`}
                        onError={(e) =>
                          (e.target.src = getYouTubeThumbnail(
                            video.videoId,
                            "hqdefault"
                          ))
                        } // 備用縮略圖
                      />
                    </div>
                  )}
                  <p>{video.title}</p>
                </div>
              );
            })}
          </div>
          <Link href={submenu.moreLink} className={styles.moreButton}>
            更多
          </Link>
        </div>
      ))}
    </div>
  );
}
