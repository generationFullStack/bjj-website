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
      title: "Armbar",
      videos: [
        {
          title: "Armbar Tutorial",
          videoId: "3Bp4WzcPJIU", // 占位符，請替換為實際視頻 ID
        },
        {
          title: "Triangle Choke Basics",
          videoId: "5jqgFQe4dls", // 占位符，請替換為實際視頻 ID
        },
        {
          title: "Rear Naked Choke Guide",
          videoId: "3Bp4WzcPJIU", // 占位符，請替換為實際視頻 ID
        },
        {
          title: "Triangle Choke Basics",
          videoId: "bmSQzxjOaUQ", // 占位符，請替換為實際視頻 ID
        },
      ],
      moreLink: "/videos/submissions",
    },
    {
      title: "Triangle Choke",
      videos: [
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
        {
          title: "Triangle Choke Basics",
          videoId: "5jqgFQe4dls", // 占位符，請替換為實際視頻 ID
        },
      ],
      moreLink: "/videos/guard-passing",
    },
    {
      title: "Rear Naked Choke",
      videos: [
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
        {
          title: "Triangle Choke Basics",
          videoId: "5jqgFQe4dls", // 占位符，請替換為實際視頻 ID
        },
      ],
      moreLink: "/videos/guard-passing",
    },
    {
      title: "Kimura",
      videos: [
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
        {
          title: "Triangle Choke Basics",
          videoId: "5jqgFQe4dls", // 占位符，請替換為實際視頻 ID
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
                  onKeyDown={(e) => e.key === "Enter" && handleMouseLeave(key)} // 鍵盤支持，防止播放
                  tabIndex={0} // 允許鍵盤焦點
                  role="button" // 提高可訪問性
                  aria-label={`查看 ${video.title}`} // 屏幕閱讀器標籤
                >
                  <Link
                    href={`/videos/${video.videoId}`}
                    className={styles.thumbnailWrapper}
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
                  </Link>
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
