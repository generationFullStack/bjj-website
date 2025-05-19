"use client";
import CategoryFilterButton from "@/components/CategoryFilterButton";
import { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true); // 控制加載條是否顯示

  const [filter, setFilter] = useState(""); // filter state for the filter button

  // 管理所有影片卡片的預覽索引
  const [previewIndices, setPreviewIndices] = useState({}); // 物件形式，key 為 videoId，value 為預覽索引

  // 解碼類別名稱，將 URL 編碼的字符串轉為正常格式（例如 guard%20passing -> GUARD PASSING）
  const decodedCategory = decodeURIComponent(category).toUpperCase();

  // 獲取影片 ID 和詳細資料（合併 fetchVideoIds 和 fetchVideosData）
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true); // 顯示加載條

        // Step 1: 獲取影片 ID 列表 && video category
        const responseIds = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${category}`
        );

        // 檢查 API 響應狀態
        if (!responseIds.ok) {
          throw new Error(`HTTP error! status: ${responseIds.status}`);
        }

        const body = await responseIds.json();

        let arrayIds = [];
        let arrayCategory = [];

        for (let i = 0; i < body.length; i++) {
          arrayIds.push(body[i].youtube_id);
          arrayCategory.push(body[i].category_name);
        }

        setVideoIds(arrayIds);

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
          ? bodyVideos.items.map((item, index) => ({
              videoId: item.id,
              title: item.snippet.title,
              category: arrayCategory[index],
              duration: parseDuration(item.contentDetails.duration), // 解析時長
            }))
          : [];

        setIsLoading(false);
        setVideosData(arrayVideos);
      } catch (error) {
        console.error("獲取影片資料失敗:", error);
        setVideoIds([]); // 確保在錯誤時 videoIds 為空陣列
        setVideosData([]); // 確保在錯誤時 videosData 為空陣列
      }
    }
    fetchData();
  }, [category]);

  return (
    <>
      {/* 影片列表：使用網格佈局顯示影片，模仿 missav.ws 的設計 */}
      <div className="max-w-[1300px] mx-auto mt-50 px-4 md:px-12 lg:px-12">
        {/* 類別標題：顯示當前分頁的類別，模仿 missav.ws 的設計 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-20">
          <h2 className="text-left text-5xl md:text-6xl text-white font-bold mb-12">
            {decodedCategory}
          </h2>
          <div className="mb-12">
            <CategoryFilterButton
              category={category}
              setFilter={setFilter}
              filter={filter}
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex-col gap-4 w-full flex items-center justify-center mt-10">
            <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
              <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
            </div>
          </div>
        )}
        {/* 當影片列表為空時，顯示提示訊息 */}
        {videosData.length === 0 && !isLoading ? (
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
                  className={`group relative transition-transform duration-300 ease-in-out ${
                    // hide videos depends on the state of filter
                    filter === ""
                      ? ""
                      : filter === element.category
                      ? "block"
                      : "hidden"
                  }`}
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
