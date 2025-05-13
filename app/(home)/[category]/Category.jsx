"use client";
import { useEffect, useState } from "react";
import CategoryLoadingbar from "@/components/CategoryLoadingbar"; // 引入加載條組件

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export default function Category({ category }) {
  const [videoIds, setVideoIds] = useState([]);
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    async function fetchVideoIds() {
      try {
        setStartTime(Date.now()); // 記錄 fetch 開始時間
        setIsLoading(true); // 顯示加載條
        setIsFetchComplete(false); // 重置 fetch 完成狀態

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${category}`
        );
        const body = await response.json();
        const array = [];

        for (let i = 0; i < body.length; i++) {
          array.push(body[i].youtube_id);
        }

        setVideoIds(array);

        // 根據實際 fetch 時間調整估計時長
        const fetchDuration = Date.now() - startTime;
        setEstimatedDuration(fetchDuration * 2); // 設置為實際時長的 2 倍，作為後續 fetch 的估計
      } catch (error) {
        console.error("獲取影片 ID 失敗:", error);
        setIsFetchComplete(true); // 發生錯誤時標記為完成
      }
    }
    fetchVideoIds();
  }, [category]); // 當 category 變化時重新獲取

  // 獲取影片詳細資料
  useEffect(() => {
    async function fetchVideosData() {
      if (videoIds.length === 0) return; // 如果沒有影片 ID，則不執行

      try {
        setStartTime(Date.now()); // 記錄 fetch 開始時間
        setIsFetchComplete(false); // 重置 fetch 完成狀態

        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds.join(
            ","
          )}&key=${YOUTUBE_API_KEY}`
        );
        const body = await response.json();

        const array = body.items.map((item) => ({
          videoId: item.id,
          title: item.snippet.title,
        }));

        setVideosData(array);
        setIsFetchComplete(true); // 標記 fetch 完成，觸發進度到 100%
      } catch (error) {
        console.error("獲取影片資料失敗:", error);
        setIsFetchComplete(true); // 發生錯誤時也標記為完成
      }
    }
    fetchVideosData();
  }, [videoIds]); // 當 videoIds 變化時重新獲取

  console.log(videosData);

  return (
    <>
      {/* 加載條：根據 isLoading 控制顯示，progress 動態更新 */}
      <CategoryLoadingbar progress={loadingProgress} isVisible={isLoading} />

      {/* 影片列表：使用網格佈局顯示影片 */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-50 justify-items-center gap-30 p-10">
        {videosData.map((element) => (
          <li
            key={element.videoId}
            className="p-5 rounded-2xl bg-white/10 shadow-sm shadow-white/60 transition duration-200 ease-in-out hover:scale-103"
          >
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/video/${element.videoId}`}
            >
              <h1 className="text-center text-2xl md:text-3xl font-bold w-full h-25 mb-5 text-clip">
                {element.title}
              </h1>
              <img
                src={`https://img.youtube.com/vi/${element.videoId}/0.jpg`}
                className="rounded-2xl"
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
