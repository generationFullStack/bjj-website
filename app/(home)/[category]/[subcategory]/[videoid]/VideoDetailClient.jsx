"use client";

import { useState, useEffect } from "react";
import styles from "../../Category.module.css";

// 從環境變量中獲取 API 密鑰
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// 使用與類別頁面相同的數據
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

export default function VideoDetailClient({ category, subcategory, videoid }) {
  // 手動解碼 category 和 subcategory
  const decodedCategory = decodeURIComponent(category);
  const decodedSubcategory = decodeURIComponent(subcategory);

  // 調試：打印解碼後的值
  console.log("Received category (raw):", category);
  console.log("Decoded category:", decodedCategory);
  console.log("Received subcategory (raw):", subcategory);
  console.log("Decoded subcategory:", decodedSubcategory);
  console.log("Received videoid:", videoid);

  // 檢查類別、子類別和影片 ID 是否存在
  if (
    !categories[decodedCategory] ||
    !categories[decodedCategory].subcategories[decodedSubcategory]
  ) {
    return <div>Video not found</div>;
  }

  const video = categories[decodedCategory].subcategories[
    decodedSubcategory
  ].find((v) => v.videoId === videoid);

  if (!video) {
    return <div>Video not found</div>;
  }

  // 狀態管理：儲存影片標題
  const [title, setTitle] = useState(video.title || "Loading...");

  // 從 YouTube API 獲取影片標題
  useEffect(() => {
    const fetchVideoTitle = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoid}&key=${YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setTitle(data.items[0].snippet.title);
        }
      } catch (error) {
        console.error("Error fetching YouTube video title:", error);
      }
    };

    fetchVideoTitle();
  }, [videoid]);

  return (
    <div className={styles.videoDetailPage}>
      <h1>{title}</h1>
      <div className={styles.videoPlayer}>
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
