// src/app/page.js
import BjjGymBanner from "@/components/BjjGymBanner";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="home flex items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold text-center">
          Welcome to <br /> BJJ.JPG
        </h1>
      </section>
      <div></div>
      {/* 視頻同圖片並排區塊 */}
      <section className="banner-section py-10 bg-[#111] flex flex-row justify-between items-center gap-5">
        {/* 左邊視頻 */}
        <div className="video-container flex-1 max-w-4xl relative">
          {/* 嵌入 YouTube 影片的 iframe */}
          <iframe
            className="w-full rounded-lg aspect-video pointer-events-none" // w-full 和 aspect-video 確保影片寬度適應容器並保持 16:9 比例；pointer-events-none 禁用所有滑鼠事件，防止用戶操作（例如暫停、播放）
            src="https://www.youtube.com/embed/SXtu_8K2osk?autoplay=1&mute=1&loop=1&playlist=SXtu_8K2osk&controls=0&modestbranding=1" // YouTube 嵌入 URL 設置：
            // - autoplay=1：自動播放影片
            // - mute=1：影片靜音（必須靜音，否則瀏覽器可能阻止自動播放）
            // - loop=1：啟用循環播放
            // - playlist=SXtu_8K2osk：指定播放列表（與影片 ID 相同），配合 loop=1 實現循環
            // - controls=0：隱藏 YouTube 控制條
            // - modestbranding=1：減少 YouTube 品牌顯示（例如隱藏 YouTube 標誌），但無法完全移除“建議觀看”提示
            title="YouTube video player" // 提供影片標題，用於無障礙訪問
            frameBorder="0" // 移除 iframe 邊框
            allow="autoplay; encrypted-media" // 只允許必要的權限：autoplay（自動播放）和 encrypted-media（加密媒體）
          ></iframe>
          {/* 遮罩層，防止交互 */}
          <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
          {/* absolute inset-0：遮罩層覆蓋整個 iframe（與 iframe 尺寸相同）
             bg-transparent：遮罩層透明，不影響影片顯示
             pointer-events-none：確保遮罩層不會響應滑鼠事件，進一步防止交互 */}
        </div>
        {/* 右邊圖片同文字 */}
        <div className="banner-container flex-1">
          <BjjGymBanner />
        </div>
      </section>
    </>
  );
}
