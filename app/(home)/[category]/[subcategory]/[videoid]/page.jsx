import VideoDetailClient from "./VideoDetailClient";

export default async function VideoDetailPage({ params }) {
  const { category, subcategory, videoid } = await params; // 使用 await 處理動態路由參數

  return (
    <VideoDetailClient
      category={category}
      subcategory={subcategory}
      videoid={videoid}
    />
  );
}
