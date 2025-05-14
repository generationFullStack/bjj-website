"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa"; // 引入 Font Awesome 的搜尋和使用者圖示
import styles from "./NavBar.module.css";
import SearchBar from "./SearchBar"; // 引入 SearchBar 組件
import { logout } from "@/actions/action";

export default function NavBar({ isUserLogged }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 900
  ); // 同步初始值，根據螢幕寬度設置 isMobile

  const [categories, setCategories] = useState([]); // manage the categories fetched from the db --Gavin

  //-------------------------------------- fetch categories from the db --Gavin-----
  async function fetchCategories() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
      );
      const body = await response.json();
      setCategories(body);
    } catch (error) {}
  }

  useEffect(() => {
    // fetch categories from database to show on the navbar --Gavin
    fetchCategories();
  }, []);
  //--------------------------------------------------------------------------------

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 900;
      if (newIsMobile !== isMobile) {
        // 檢查 isMobile 是否變化
        setIsMobile(newIsMobile);
        if (!newIsMobile) {
          setIsMenuOpen(false); // 當從手機版切換到桌面版時，重置 isMenuOpen
          setActiveSubmenu(null); // 同時重置子選單狀態
          setActiveDropdown(null); // 重置下拉選單狀態
        } else if (newIsMobile) {
          setIsMenuOpen(false); // 當從桌面版縮小到手機版時，確保 isMenuOpen 為 false，關閉選單
          setActiveSubmenu(null); // 同時重置子選單狀態
          setActiveDropdown(null); // 重置下拉選單狀態
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, isMenuOpen]); // 依賴 isMobile 和 isMenuOpen 以確保狀態同步

  useEffect(() => {
    if (!isClient) return;

    // 客戶端加載時滾動到頂部並檢查初始滾動位置
    window.scrollTo({ top: 0, behavior: "instant" });
    console.log("Initial scrollY after scrollTo:", window.scrollY);
    setIsScrolled(window.scrollY > 50);
    console.log("Initial scrollY:", window.scrollY);
    console.log("Initial isScrolled:", window.scrollY > 50);

    const handleScroll = () => {
      const newIsScrolled = window.scrollY > 50;
      setIsScrolled(newIsScrolled);
      console.log("ScrollY:", window.scrollY);
      console.log("isScrolled:", newIsScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  useEffect(() => {
    // 獲取主內容區域的元素，用於添加或移除模糊效果
    const mainContent = document.querySelector(".mainContent");
    // 檢查 mainContent 是否存在，防止 DOM 未渲染完成時操作導致錯誤
    if (mainContent) {
      if (hoveredItem !== null || isSearchOpen) {
        // 當滑鼠懸停在導航項或搜尋框打開時，添加模糊效果
        mainContent.classList.add(styles.blurContent);
      } else {
        // 當滑鼠離開導航項且搜尋框關閉時，移除模糊效果
        mainContent.classList.remove(styles.blurContent);
      }
    } else {
      // 如果 mainContent 不存在，記錄警告（可選）
      console.warn("mainContent element not found in the DOM.");
    }
  }, [hoveredItem, isSearchOpen]); // 依賴 hoveredItem 和 isSearchOpen，當這些狀態變化時觸發效果

  const handleNavTriggerClick = () => {
    console.log("Before click, isMenuOpen:", isMenuOpen); // 調試
    setIsMenuOpen(!isMenuOpen);
    setActiveSubmenu(null);
    setActiveDropdown(null);
    setIsSearchOpen(false);
    console.log("After click, isMenuOpen:", !isMenuOpen); // 調試
  };

  const handleDropdownClick = (index) => {
    if (isMobile) {
      setActiveSubmenu(activeDropdown === index ? null : index);
    } else {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  // 處理導航項點擊，手機版點擊後自動關閉選單
  const handleNavItemClick = () => {
    if (isMobile) {
      console.log("Closing menu in handleNavItemClick");
      setIsMenuOpen(false); // 手機版點擊導航項後自動收起選單
      setActiveSubmenu(null); // 重置子選單狀態
      setActiveDropdown(null); // 重置下拉選單狀態
    }
  };

  const handleBackToMainMenu = () => {
    setActiveSubmenu(null);
    setActiveDropdown(null);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setActiveSubmenu(null);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const SubmissionSubcategories = []; // category_id of submission is 20
  const GuardPassingSubcategories = []; // category_id of guard passing is 19
  const DefenseSubcategories = []; // category_id of defense is 22
  const TakeDownSubcategories = []; // category_id of takedown is 33

  // push the subcategory into the main category
  for (let i = 0; i < categories.length; i++) {
    switch (categories[i]["parent_id"]) {
      case 20:
        SubmissionSubcategories.push(categories[i]["name"].toUpperCase());
        break;

      case 19:
        GuardPassingSubcategories.push(categories[i]["name"].toUpperCase());
        break;

      case 22:
        DefenseSubcategories.push(categories[i]["name"].toUpperCase());
        break;

      case 33:
        TakeDownSubcategories.push(categories[i]["name"].toUpperCase());
        break;
    }
  }

  // 定義類別和子類別數據
  const navItems = [
    {
      category: "SUBMISSION", // 直接設置為大寫
      subcategories: SubmissionSubcategories,
    },
    {
      category: "GUARD PASSING", // 直接設置為大寫
      subcategories: GuardPassingSubcategories,
    },
    {
      category: "DEFENSE", // 直接設置為大寫
      subcategories: DefenseSubcategories,
    },
    {
      category: "TAKEDOWN", // 直接設置為大寫
      subcategories: TakeDownSubcategories,
    },
  ];

  return (
    <nav
      className={`w-full h-[65px] fixed top-0 text-center pt-5 pb-5 transition-all duration-400 ease-in-out bg-transparent z-[1000] ${
        isScrolled ? "p-0 bg-[#111]" : ""
      }`}
    >
      <div
        className={`max-w-[1300px] mx-auto flex items-center justify-between`}
      >
        <div
          className={`w-auto h-auto pl-12 max-[900px]:ml-[15px] max-[900px]:absolute max-[900px]:left-0 max-[900px]:top-1 max-[900px]:w-auto max-[900px]:h-auto`}
        >
          <Link
            href="/"
            className={`flex items-center no-underline text-white text-[2.5rem] hover:text-[#1e90ff]`} // hover 效果由 CSS 控制，手機版通過 @media (hover: none) 和 @media (max-width: 900px) 禁用
          >
            <Image
              src="/bjj-letter-logo.png"
              alt="BJJ Logo"
              width={60}
              height={60}
              style={{ verticalAlign: "middle" }}
            />
            {!isMobile && <span> BJJ.JPG</span>}
          </Link>
        </div>
        <div
          id="mainListDiv"
          className={`h-[65px] flex items-center justify-end max-[900px]:w-full max-[900px]:h-0 max-[900px]:overflow-hidden ${
            isMenuOpen
              ? "max-[900px]:h-screen max-[900px]:block max-[900px]:overflow-y-auto max-[900px]:fixed max-[900px]:top-0 max-[900px]:left-0 max-[900px]:w-full max-[900px]:z-[1001] max-[900px]:bg-[#111] max-[900px]:bg-center-top"
              : ""
          }`}
        >
          <SearchBar
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            navItems={navItems}
          />{" "}
          {/* 使用 SearchBar 組件顯示搜尋框和結果 */}
          <div
            className={`${
              isMobile ? (isMenuOpen ? "block" : "hidden") : "block"
            } ${
              isSearchOpen ? "hidden" : ""
            } max-[900px]:w-full max-[900px]:min-h-screen max-[900px]:bg-[#111] max-[900px]:absolute max-[900px]:top-0 max-[900px]:left-0`} // 移除 activeSubmenu 條件，確保手機版選單展開時顯示，添加定位屬性確保內容可見，調整顯示條件以同步 isMenuOpen 狀態
          >
            <div
              className={`flex items-center h-[65px] mr-8 max-[900px]:block`}
            >
              <ul
                className={`w-auto h-[65px] flex flex-row list-none p-0${
                  isMobile ? (isMenuOpen ? "block mt-24" : "hidden") : "block"
                } ${
                  isSearchOpen ? "hidden" : ""
                } max-[900px]:flex-col max-[900px]:w-full max-[900px]:min-h-screen max-[900px]:bg-[#111] league-spartan`} // 移除 activeSubmenu 條件，確保手機版選單展開時導航項顯示，調整高度確保內容可見，調整顯示條件以同步 isMenuOpen 狀態，應用 League Spartan 字體到導航項
              >
                {navItems.map((item, index) => (
                  <li
                    key={item.category}
                    className={`w-auto h-[65px] p-0 pr-12 relative ${
                      activeDropdown === index ? "active" : ""
                    } max-[900px]:w-full max-[900px]:text-left max-[900px]:m-0 ${
                      styles.navItem
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${encodeURIComponent(
                        item.category
                      ).toLowerCase()}`} // 對類別名稱進行 URL 編碼
                      onClick={() => {
                        handleDropdownClick(index);
                        handleNavItemClick(); // 點擊主類別後自動關閉選單
                      }}
                      className={`no-underline text-white leading-[65px] text-[2.4rem] hover:text-[#1e90ff] max-[900px]:text-left max-[900px]:w-full max-[900px]:text-[3rem] max-[900px]:px-7 max-[900px]:py-5 max-[900px]:flex max-[900px]:items-center max-[900px]:gap-2.5 max-[900px]:text-white! max-[900px]:cursor-pointer`} // hover 效果由 CSS 控制，手機版通過 @media (hover: none) 和 @media (max-width: 900px) 禁用
                    >
                      {item.category}
                    </Link>
                    <div
                      className={`absolute top-[65px] left-0 min-w-[200px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] z-[1001] ${
                        styles.dropdownContent
                      } ${hoveredItem === index ? "block" : "hidden"} ${
                        activeDropdown === index ? "block" : "hidden"
                      } max-[900px]:w-full max-[900px]:shadow-none`}
                    >
                      {item.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          href={`/${encodeURIComponent(
                            subcategory
                          ).toLowerCase()}`} // 對子類別名稱進行 URL 編碼
                          onClick={handleNavItemClick} // 點擊子類別後自動關閉選單
                          className={`block text-white text-[1.6rem] px-4 py-3 text-left leading-normal hover:bg-[#333] hover:text-[#1e90ff] max-[900px]:text-[2rem] max-[900px]:px-[50px] max-[900px]:text-left max-[900px]:border-t border-[#333] max-[900px]:text-white! last:border-b last:border-[#333]`} // hover 效果由 CSS 控制，手機版通過 @media (hover: none) 和 @media (max-width: 900px) 禁用
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              {!isMobile && (
                <div className="flex items-center gap-7">
                  <span
                    className={`cursor-pointer text-[2.5rem] text-white z-[1003] block -translate-y-1.5 hover:text-[#1e90ff]`} // 桌面版保留 hover 效果：hover:text-[#1e90ff]
                    onClick={handleSearchClick}
                  >
                    <FaSearch />
                  </span>
                  {isUserLogged ? (
                    <form>
                      <button
                        formAction={logout}
                        className={`cursor-pointer text-[2.8rem] text-white z-[1003] block -translate-y-1.5 hover:text-[#1e90ff]`} // 桌面版保留 hover 效果：hover:text-[#1e90ff]
                      >
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                      </button>
                    </form>
                  ) : (
                    <Link
                      href={"/login"}
                      className={`cursor-pointer text-[2.8rem] text-white z-[1003] block -translate-y-1.5 hover:text-[#1e90ff]`}
                    >
                      <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {console.log("isMobile:", isMobile, "isSearchOpen:", isSearchOpen)}{" "}
        {/* 調試條件渲染 */}
        {isMobile && !isSearchOpen && (
          <div className="flex items-center gap-4">
            <span
              className={`cursor-pointer text-[2.5rem] text-white z-[1003] block absolute right-[95px] top-1/2 -translate-y-1/2 share-tech-regular`} // 從 right-[145px] 改為 right-[100px]
              onClick={handleSearchClick}
            >
              {console.log(
                "isMobile:",
                isMobile,
                "isMenuOpen:",
                isMenuOpen,
                "isSearchOpen:",
                isSearchOpen
              )}
              <FaSearch />
            </span>
            {isUserLogged ? (
              <form>
                <button
                  formAction={logout}
                  className={`cursor-pointer text-[2.8rem] text-white z-[1003] block absolute right-[55px] top-1/2 -translate-y-1/2 share-tech-regular`} // 從 right-[70px] 改為 right-[50px]
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </form>
            ) : (
              <Link
                href={"/login"}
                className={`cursor-pointer text-[2.8rem] text-white z-[1003] block absolute right-[55px] top-1/2 -translate-y-1/2 share-tech-regular`} // 從 right-[70px] 改為 right-[50px]
              >
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </Link>
            )}
            {/* 漢堡選單 (navTrigger) - 位置不變 */}
            <span
              className={`block ${
                styles.navTrigger
              } cursor-pointer text-[2.8rem] text-white z-[1003] absolute share-tech-regular bg-transparent ${
                isMenuOpen ? styles.active : ""
              }`}
              onClick={handleNavTriggerClick}
              style={{
                right: "10px",
                height: "30px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <i></i>
              <i></i>
              <i></i>
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
