// VideoPage 組件，展示 YouTube 影片並根據螢幕尺寸調整影片大小，標題位於影片上方
export default async function VideoPage({ params }) {
  const { videoId } = await params;

  // 使用 YouTube Data API 獲取影片標題
  const YOUTUBE_API_KEY =
    process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  let videoTitle = "Video Title Not Available";

  try {
    // 驗證 videoId 格式（簡單檢查是否為有效的 YouTube 影片 ID）
    if (!videoId || typeof videoId !== "string" || videoId.length !== 11) {
      throw new Error("Invalid video ID");
    }

    // 檢查 API 密鑰
    if (!YOUTUBE_API_KEY) {
      throw new Error("YouTube API key is not configured");
    }

    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    videoTitle =
      data.items && data.items.length > 0
        ? data.items[0].snippet.title
        : "Video Title Not Available";
  } catch (error) {
    console.error("Failed to fetch video title:", error.message);
    videoTitle = `Error: ${error.message}`;
  }

  return (
    <div className="w-screen flex flex-col items-center mt-80 object-contain">
      {/* 標題：移到影片上方，根據螢幕尺寸調整字體大小 */}
      <h1 className="mb-4 text-2xl md:text-5xl text-white text-center max-w-[600px] px-4">
        {videoTitle}
      </h1>
      {/* 影片：根據螢幕尺寸調整大小，保持 16:9 比例，桌面版稍微縮小 */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="w-full md:w-[800px] lg:w-[1000px] aspect-video rounded-lg shadow-lg"
        allowFullScreen
      />
    </div>
  );
}
