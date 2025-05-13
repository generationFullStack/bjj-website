/**
 * Category.jsx
 * 顯示指定類別的 YouTube 影片列表。
 * 整合 CategoryLoadingbar 組件，在資料獲取時顯示加載條。
 * 加載條根據 fetch 時間動態更新進度，完成後平滑到 100% 才消失。
 * 當加載條顯示時，對背景內容應用模糊效果。
 */

"use client";
import { useEffect, useState } from "react";
import CategoryLoadingbar from "@/components/CategoryLoadingbar"; // 引入加載條組件

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export default function Category({ category }) {
  const [videoIds, setVideoIds] = useState([]); // 儲存影片 ID 列表
  const [videosData, setVideosData] = useState([]); // 儲存影片資料
  const [loadingProgress, setLoadingProgress] = useState(0); // 儲存加載進度（0-100）
  const [isLoading, setIsLoading] = useState(true); // 控制加載條是否顯示
  const [startTime, setStartTime] = useState(null); // 記錄 fetch 開始時間
  const [estimatedDuration, setEstimatedDuration] = useState(3000); // 估計 fetch 時長（默認 3 秒）
  const [isFetchComplete, setIsFetchComplete] = useState(false); // 標記 fetch 是否完成

  // 模擬加載進度的效果，根據 fetch 時間動態更新
  useEffect(() => {
    if (!isLoading || !startTime) return; // 如果加載完成或未開始，停止模擬進度

    // 每 50ms 計算進度，根據當前時間和估計時長
    const interval = setInterval(() => {
      if (isFetchComplete) {
        // 如果 fetch 已完成，確保進度平滑到 100%
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // 等待進度動畫完成（500ms，與 transition-all duration-500 一致）後隱藏加載條
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
            return 100;
          }
          return prev + 5; // 快速增加到 100%
        });
      } else {
        // 如果 fetch 未完成，根據時間比例計算進度
        const elapsedTime = Date.now() - startTime; // 計算已過去的時間
        const progress = Math.min(
          (elapsedTime / estimatedDuration) * 100, // 根據時間比例計算進度
          90 // 最大進度 90%，避免提前到 100%
        );

        setLoadingProgress(progress);

        if (progress >= 90) {
          clearInterval(interval); // 達到 90% 時停止計時，等待 fetch 完成
        }
      }
    }, 50);

    return () => clearInterval(interval); // 清除計時器
  }, [isLoading, startTime, estimatedDuration, isFetchComplete]);

  // 當加載條顯示時，對背景內容應用模糊效果
  useEffect(() => {
    // 獲取主內容區域的元素，用於添加或移除模糊效果
    const mainContent = document.querySelector(".mainContent");
    // 檢查 mainContent 是否存在，防止 DOM 未渲染完成時操作導致錯誤
    if (mainContent) {
      if (isLoading) {
        // 當加載條顯示時，添加模糊效果
        mainContent.classList.add("blurContent");
      } else {
        // 當加載條隱藏時，移除模糊效果
        mainContent.classList.remove("blurContent");
      }
    } else {
      // 如果 mainContent 不存在，記錄警告
      console.warn("mainContent element not found in the DOM.");
    }
  }, [isLoading]); // 依賴 isLoading，當加載狀態變化時觸發效果

  // 獲取影片 ID 列表
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
