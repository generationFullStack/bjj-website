/**
 * CategoryLoadingbar.jsx
 * 一個加載條組件，用於顯示影片資料獲取時的進度。
 * 參考 CodePen 示例[](https://codepen.io/nfj525/pen/AeRZOr) 設計。
 * 加載條包含一個進度條和 "loading" 文字，位於頁面中間。
 * 進度條根據 fetch 時間動態更新，完成後消失。
 * 使用 Tailwind CSS 實現樣式，並恢復模糊背景效果，防止背景互動。
 */

// 引入 React 和 PropTypes（用於類型檢查）
import PropTypes from "prop-types";

// 定義 CategoryLoadingbar 組件，接受 progress 和 isVisible 屬性
export default function CategoryLoadingbar({ progress, isVisible }) {
  // 如果 isVisible 為 false，則不渲染加載條
  if (!isVisible) return null;

  return (
    // 外層容器：使用 fixed 定位，將加載條精確置中顯示
    // Tailwind 樣式：固定定位，佔據整個螢幕，z-index 50 確保在最上層，恢復半透明黑色背景
    // 添加 pointer-events-none 到內層，防止點擊穿透到背景
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* 加載條容器：設置寬度為 200px，高度 26px，背景為半透明灰色，圓角 10px，內邊距 2px */}
        <div className="w-[200px] h-[26px] bg-[#9f9f9f80] rounded-[10px] p-[2px] relative">
          {/* 進度條：根據 progress 動態設置寬度，背景為深灰色，高度 20px，圓角 8px */}
          <span
            className="absolute block h-[20px] w-[calc(100%-10px)] bg-[#474747] rounded-[8px] m-[3px] transition-all duration-500 ease-in-out animate-load"
            style={{ width: `${progress}%` }} // 動態設置進度寬度
          ></span>
          {/* 加載文字：顯示 "loading"，使用 Arial 字體，加粗，置中，距離進度條上方 30px */}
          <div className="font-arial font-bold text-center mt-[-30px] text-white">
            loading
          </div>
        </div>
      </div>
    </div>
  );
}

// 定義 PropTypes，確保屬性類型正確
CategoryLoadingbar.propTypes = {
  progress: PropTypes.number.isRequired, // 進度（0-100）
  isVisible: PropTypes.bool.isRequired, // 是否顯示加載條
};
