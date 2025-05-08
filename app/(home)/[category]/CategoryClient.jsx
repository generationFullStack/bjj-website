"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Category.module.css";

// 工具函數：生成 YouTube 縮略圖 URL
const getYouTubeThumbnail = (videoId, index = "maxresdefault") =>
  `https://img.youtube.com/vi/${videoId}/${index}.jpg`;

// 從環境變量中獲取 API 密鑰
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// 定義類別和子類別數據，僅包含 videoId，標題將從 API 獲取
const categories = {
  Submissions: {
    subcategories: {
      Armbar: [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
        { videoId: "3Bp4WzcPJIU" },
      ],
      "Triangle Choke": [
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
        { videoId: "3Bp4WzcPJIU" },
      ],
      "Rear Naked Choke": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      Kimura: [
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
        { videoId: "3Bp4WzcPJIU" },
      ],
    },
  },
  "Guard Passing": {
    subcategories: {
      "Toreando Pass": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      "Knee Cut Pass": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      "Over-Under Pass": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      "Standing Guard Break": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
    },
  },
  Defense: {
    subcategories: {
      "Posture Control": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      "Submission Escapes": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      "Guard Retention": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      Sweeps: [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
    },
  },
  Takedown: {
    subcategories: {
      "Single Leg Takedown": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      "Double Leg Takedown": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      "Ankle Pick": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
      "Judo Throws": [
        { videoId: "3Bp4WzcPJIU" },
        { videoId: "5jqgFQe4dls" },
        { videoId: "bmSQzxjOaUQ" },
      ],
    },
  },
};

export default function CategoryClient({ category }) {
  // 檢查類別是否存在
  if (!categories[category]) {
    return <div>Category not found</div>;
  }

  // 狀態管理：追蹤每個視頻的懸停、播放和當前幀（縮略圖序列）
  const [videoStates, setVideoStates] = useState({});
  // 狀態管理：儲存影片標題
  const [videoTitles, setVideoTitles] = useState({});

  // 從 YouTube API 獲取影片標題
  useEffect(() => {
    const fetchVideoTitles = async () => {
      const allVideoIds = Object.keys(
        categories[category].subcategories
      ).flatMap((subcategory) =>
        categories[category].subcategories[subcategory].map(
          (video) => video.videoId
        )
      );
      const uniqueVideoIds = [...new Set(allVideoIds)]; // 去重複

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${uniqueVideoIds.join(
            ","
          )}&key=${YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        if (data.items) {
          const titles = {};
          data.items.forEach((item) => {
            titles[item.id] = item.snippet.title;
          });
          setVideoTitles(titles);
        }
      } catch (error) {
        console.error("Error fetching YouTube video titles:", error);
      }
    };

    fetchVideoTitles();
  }, [category]);

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

  // 準備子選單數據
  const submenus = Object.keys(categories[category].subcategories).map(
    (subcategory) => ({
      title: subcategory,
      videos: categories[category].subcategories[subcategory].slice(0, 3), // 每類顯示 3 個影片
      moreLink: `/${category}/${subcategory}`,
    })
  );

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
              const title =
                videoTitles[video.videoId] || video.title || "Loading..."; // 從 API 獲取標題

              return (
                <div
                  key={video.videoId}
                  className={styles.videoCard}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={() => handleMouseLeave(key)}
                  onKeyDown={(e) => e.key === "Enter" && handleMouseLeave(key)} // 鍵盤支持，防止播放
                  tabIndex={0} // 允許鍵盤焦點
                  role="button" // 提高可訪問性
                  aria-label={`查看 ${title}`} // 屏幕閱讀器標籤
                >
                  <Link
                    href={`/${category}/${submenu.title}/${video.videoId}`}
                    className={styles.thumbnailWrapper}
                  >
                    <img
                      src={getYouTubeThumbnail(
                        video.videoId,
                        state.isHovered ? state.frame : "maxresdefault"
                      )} // 使用高清靜態圖
                      alt={title}
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
                  <p>{title}</p>
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
