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

    // 驗證 API 密鑰是否存在
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
    // 顯示影片，但標題使用默認值
    videoTitle = `Error: ${error.message}`;
  }

  return (
    <div className="w-screen flex flex-col items-center mt-80 object-contain">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        width={1200}
        height={700}
        className="rounded-lg shadow-lg"
      />
      {/* 顯示影片標題 */}
      <h1 className="mt-4 text-4xl text-white text-center max-w-[600px] px-4">
        {videoTitle}
      </h1>
    </div>
  );
}
