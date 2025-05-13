"use client";
import { useEffect, useState } from "react";
import CategoryLoadingbar from "@/components/CategoryLoadingbar"; // 引入加載條組件
import { FaPlay } from "react-icons/fa"; // 引入播放圖標（此處保留，但暫不使用）

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// 工具函數：將 ISO 8601 時長（例如 PT3M45S）轉換為 MM:SS 格式
const parseDuration = (duration) => {
  if (!duration) return "0:00";

  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(matches[1] || 0, 10);
  const minutes = parseInt(matches[2] || 0, 10);
  const seconds = parseInt(matches[3] || 0, 10);

  const totalMinutes = hours * 60 + minutes;
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${totalMinutes}:${formattedSeconds}`;
};

export default function Category({ category }) {
  const [videoIds, setVideoIds] = useState([]); // 儲存影片 ID 列表
  const [videosData, setVideosData] = useState([]); // 儲存影片資料
  const [loadingProgress, setLoadingProgress] = useState(0); // 儲存加載進度（0-100）
  const [isLoading, setIsLoading] = useState(true); // 控制加載條是否顯示
  const [startTime, setStartTime] = useState(null); // 記錄 fetch 開始時間
  const [estimatedDuration, setEstimatedDuration] = useState(3000); // 估計 fetch 時長（默認 3 秒）
  const [isFetchComplete, setIsFetchComplete] = useState(false); // 標記 fetch 是否完成
  const [isVideosDataFetched, setIsVideosDataFetched] = useState(false); // 標記 fetchVideosData 是否完成

  // 管理所有影片卡片的預覽索引
  const [previewIndices, setPreviewIndices] = useState({}); // 物件形式，key 為 videoId，value 為預覽索引

  // 解碼類別名稱，將 URL 編碼的字符串轉為正常格式（例如 guard%20passing -> GUARD PASSING）
  const decodedCategory = decodeURIComponent(category).toUpperCase();

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
            // 立即設置 isLoading 為 false，避免延遲
            setIsLoading(false);
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

  // 獲取影片 ID 和詳細資料（合併 fetchVideoIds 和 fetchVideosData）
  useEffect(() => {
    async function fetchData() {
      try {
        setStartTime(Date.now()); // 記錄 fetch 開始時間
        setIsLoading(true); // 顯示加載條
        setIsFetchComplete(false); // 重置 fetch 完成狀態
        setIsVideosDataFetched(false); // 重置 fetchVideosData 狀態

        // Step 1: 獲取影片 ID 列表
        const responseIds = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${category}`
        );

        // 檢查 API 響應狀態
        if (!responseIds.ok) {
          throw new Error(`HTTP error! status: ${responseIds.status}`);
        }

        const bodyIds = await responseIds.json();
        let arrayIds = [];

        // 檢查 API 返回的數據是否有效
        if (Array.isArray(bodyIds)) {
          for (let i = 0; i < bodyIds.length; i++) {
            arrayIds.push(bodyIds[i].youtube_id);
          }
        } else {
          console.warn("fetchVideoIds: API 返回的數據不是陣列:", bodyIds);
        }

        setVideoIds(arrayIds);

        // Step 2: 獲取影片詳細資料和時長
        if (arrayIds.length === 0) {
          // 如果 videoIds 為空，模擬一個最小加載時間，避免 loading bar 提前消失
          await new Promise((resolve) =>
            setTimeout(resolve, estimatedDuration)
          );
          setVideosData([]); // 設置 videosData 為空陣列
          setIsFetchComplete(true);
          setIsVideosDataFetched(true);
          return;
        }

        const responseVideos = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${arrayIds.join(
            ","
          )}&key=${YOUTUBE_API_KEY}`
        );

        // 檢查 API 響應狀態
        if (!responseVideos.ok) {
          throw new Error(`HTTP error! status: ${responseVideos.status}`);
        }

        const bodyVideos = await responseVideos.json();

        // 檢查 API 返回的數據是否有效
        const arrayVideos = Array.isArray(bodyVideos.items)
          ? bodyVideos.items.map((item) => ({
              videoId: item.id,
              title: item.snippet.title,
              duration: parseDuration(item.contentDetails.duration), // 解析時長
            }))
          : [];

        setVideosData(arrayVideos);
        setIsFetchComplete(true); // 標記 fetch 完成，觸發進度到 100%
        setIsVideosDataFetched(true); // 標記 fetchVideosData 完成
      } catch (error) {
        console.error("獲取影片資料失敗:", error);
        setVideoIds([]); // 確保在錯誤時 videoIds 為空陣列
        setVideosData([]); // 確保在錯誤時 videosData 為空陣列
        setIsFetchComplete(true); // 發生錯誤時標記為完成
        setIsVideosDataFetched(true); // 標記 fetchVideosData 完成
      } finally {
        // 根據實際 fetch 時間調整估計時長，但不觸發重新加載
        const fetchDuration = Date.now() - startTime;
        setEstimatedDuration((prev) => fetchDuration * 2);
      }
    }
    fetchData();
  }, [category]); // 移除 estimatedDuration 依賴，避免重新加載

  // 添加日誌檢查條件是否正確執行
  useEffect(() => {
    console.log("isLoading:", isLoading, "videosData:", videosData);
  }, [isLoading, videosData]);

  return (
    <>
      {/* 加載條：根據 isLoading 控制顯示，progress 動態更新 */}
      <CategoryLoadingbar progress={loadingProgress} isVisible={isLoading} />

      {/* 影片列表：使用網格佈局顯示影片，模仿 missav.ws 的設計 */}
      <div className="max-w-[1300px] mx-auto mt-50 px-4 md:px-12 lg:px-12">
        {/* 類別標題：顯示當前分頁的類別，模仿 missav.ws 的設計 */}
        <h2 className="text-left text-5xl md:text-6xl text-white font-bold mb-12">
          {decodedCategory}
        </h2>
        {/* 當影片列表為空時，顯示提示訊息 */}
        {videosData.length === 0 && !isLoading && isVideosDataFetched ? (
          <p className="text-center text-8xl text-gray-400 mt-4">
            No Videos In This Category
          </p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {videosData.map((element) => {
              // YouTube 提供的多張縮圖
              const previewImages = [
                `https://img.youtube.com/vi/${element.videoId}/0.jpg`,
                `https://img.youtube.com/vi/${element.videoId}/1.jpg`,
                `https://img.youtube.com/vi/${element.videoId}/2.jpg`,
                `https://img.youtube.com/vi/${element.videoId}/3.jpg`,
              ];

              // 處理 hover 時的圖片切換
              const handleMouseEnter = () => {
                const interval = setInterval(() => {
                  setPreviewIndices((prev) => ({
                    ...prev,
                    [element.videoId]:
                      ((prev[element.videoId] || 0) + 1) % previewImages.length,
                  }));
                }, 500); // 每 500ms 切換一次圖片

                // 儲存 interval ID 以便在 mouseleave 時清除
                setPreviewIndices((prev) => ({
                  ...prev,
                  [`interval-${element.videoId}`]: interval,
                }));
              };

              const handleMouseLeave = () => {
                // 清除 interval
                const intervalId =
                  previewIndices[`interval-${element.videoId}`];
                if (intervalId) {
                  clearInterval(intervalId);
                }
                // 恢復到第一張縮圖
                setPreviewIndices((prev) => ({
                  ...prev,
                  [element.videoId]: 0,
                  [`interval-${element.videoId}`]: undefined,
                }));
              };

              return (
                <li
                  key={element.videoId}
                  className="group relative transition-transform duration-300 ease-in-out"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/video/${element.videoId}`}
                    className="block"
                  >
                    {/* 縮圖容器：設置固定大小，保持 16:9 比例，懸停時放大 */}
                    <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-2xl">
                      <img
                        src={
                          previewImages[previewIndices[element.videoId] || 0]
                        }
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
                        alt={element.title}
                      />
                      {/* 時長顯示 */}
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-2xl px-2 py-1 rounded z-10">
                        {element.duration}
                      </div>
                    </div>
                    {/* 標題：左對齊，懸停時變色 */}
                    <h1 className="text-left text-2xl md:text-2xl text-white mt-2 line-clamp-2 group-hover:text-[#1e90ff] transition-colors duration-300">
                      {element.title}
                    </h1>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
