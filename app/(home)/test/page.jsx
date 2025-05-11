import TestClient from "./TestClient";

// 從環境變量中獲取 API 密鑰
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export default async function TestPage() {
  // 從現有 API 獲取影片數據
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
    cache: "no-cache",
  });
  const data = await res.json();

  // 提取所有的 youtube_id
  const youtubeIds = data.map((video) => video.youtube_id);
  const uniqueYoutubeIds = [...new Set(youtubeIds)]; // 去重複

  // 使用 YouTube API 獲取影片標題
  let videoTitles = {};
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${uniqueYoutubeIds.join(
        ","
      )}&key=${YOUTUBE_API_KEY}`
    );
    const youtubeData = await response.json();
    if (youtubeData.items) {
      youtubeData.items.forEach((item) => {
        videoTitles[item.id] = item.snippet.title;
      });
    }
  } catch (error) {
    console.error("Error fetching YouTube video titles:", error);
  }

  // 將 YouTube 標題合併到影片數據中
  const videosWithTitles = data.map((video) => ({
    ...video,
    title: videoTitles[video.youtube_id] || "Loading...", // 如果無法獲取標題，顯示 "Loading..."
  }));

  return <TestClient videos={videosWithTitles} />;
}
