// app/components/SearchBar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ isSearchOpen, setIsSearchOpen, navItems }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // 儲存搜尋結果

  // 搜尋邏輯：過濾類別和子類別
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]); // 如果搜尋框為空，清空結果
      return;
    }

    const results = [];
    const query = searchQuery.toLowerCase();

    navItems.forEach((item) => {
      // 檢查類別是否匹配
      if (item.category.toLowerCase().includes(query)) {
        results.push({ type: "category", value: item.category });
      }
      // 檢查子類別是否匹配
      item.subcategories.forEach((subcategory) => {
        if (subcategory.toLowerCase().includes(query)) {
          results.push({
            type: "subcategory",
            value: subcategory,
            category: item.category,
          });
        }
      });
    });

    setSearchResults(results);
  }, [searchQuery, navItems]); // 當 searchQuery 或 navItems 變化時更新搜尋結果

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("搜尋關鍵字:", searchQuery);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className={`absolute top-0 left-0 w-full h-[65px] bg-[#111] flex items-center justify-center z-[1002] max-[900px]:fixed max-[900px]:h-screen max-[900px]:pt-[65px] max-[900px]:items-start max-[900px]:justify-center`} // 修改手機版樣式：移除 max-[900px]:justify-start，使用 max-[900px]:justify-center 將搜尋框水平居中，保留 max-[900px]:pt-[65px] 和 max-[900px]:items-start 確保靠近頂部
    >
      <form
        onSubmit={handleSearchSubmit}
        className={`flex items-center w-1/2 max-w-[600px] relative max-[900px]:w-[90%] max-[900px]:p-5`} // 調整手機版樣式：將 max-[900px]:w-full 改為 max-[900px]:w-[90%]，確保搜尋框有適當的邊距
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="SEARCH..."
          className={`w-full px-5 py-2.5 text-white bg-[#222] border-none rounded-md outline-none text-[1.8rem] max-[900px]:text-[3rem] max-[900px]:py-3.5 max-[900px]:px-5 max-[900px]:box-border share-tech-regular`} // 應用 Share Tech 字體到搜尋框
          autoFocus
        />
        <button
          type="button"
          onClick={handleCloseSearch}
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none text-[1.8rem] text-[#888] cursor-pointer hover:text-[#1e90ff] max-[900px]:right-7 max-[900px]:text-[2.5rem]`} // 關閉按鈕
        >
          ✕
        </button>
      </form>
      {/* 搜尋結果顯示 */}
      {searchResults.length > 0 && (
        <div className="absolute top-[65px] left-1/2 -translate-x-1/2 w-1/2 max-w-[600px] bg-[#222] z-[1002] rounded-md shadow-lg max-[900px]:top-[130px] max-[900px]:w-[90%] max-[900px]:left-1/2 max-[900px]:translate-x-[-50%]">
          {" "}
          {/* 修改手機版樣式：移除 max-[900px]:p-5，保留 max-[900px]:top-[130px]，使用 max-[900px]:left-1/2 max-[900px]:translate-x-[-50%] 保持居中 */}
          <ul className="list-none p-0 m-0 share-tech-regular">
            {" "}
            {/* 應用 Share Tech 字體到搜尋結果 */}
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="border-b border-[#333] last:border-b-0"
              >
                <Link
                  href={
                    result.type === "category"
                      ? `/${encodeURIComponent(result.value.toLowerCase())}` // 修改：將 result.value 轉為小寫，確保 URL 是小寫
                      : `/${encodeURIComponent(
                          result.category.toLowerCase()
                        )}/${encodeURIComponent(result.value.toLowerCase())}` // 修改：將 result.category 和 result.value 轉為小寫，確保 URL 是小寫
                  }
                  className="block text-white text-[1.6rem] px-4 py-3 hover:bg-[#333] hover:text-[#1e90ff] max-[900px]:text-[2rem] max-[900px]:py-3" // 手機版通過 @media (hover: none) 禁用 hover 效果
                  onClick={() => {
                    setIsSearchOpen(false); // 點擊結果後關閉搜尋框
                    setSearchQuery(""); // 清空搜尋框
                  }}
                >
                  {result.type === "category" ? (
                    <span>{result.value}</span> // 顯示時保持原始大小寫（全大寫）
                  ) : (
                    <span>
                      {result.value} {/* 顯示時保持原始大小寫（全大寫） */}
                      <span className="text-gray-400">
                        in {result.category}{" "}
                        {/* 顯示時保持原始大小寫（全大寫） */}
                      </span>
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
