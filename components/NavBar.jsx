// app/components/NavBar.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [categories, setCategories] = useState([]); // manage the categories fetched from the db --Gavin

  useEffect(() => {
    // fetch categories from database to show on the navbar --Gavin
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
        );
        const body = await response.json();
        setCategories(body);
      } catch (error) {}
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // 統一斷點為 900px
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // 客戶端加載時滾動到頂部並檢查初始滾動位置
    window.scrollTo({ top: 0, behavior: "instant" });
    console.log("Initial scrollY after scrollTo:", window.scrollY);
    setIsScrolled(window.scrollY > 50);
    console.log("Initial scrollY:", window.scrollY);
    console.log("Initial isScrolled:", window.scrollY > 50);

    const handleScroll = () => {
      const newScrolled = window.scrollY > 50;
      setIsScrolled(newScrolled);
      console.log("ScrollY:", window.scrollY);
      console.log("isScrolled:", newScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  useEffect(() => {
    const mainContent = document.querySelector(".mainContent");
    if (mainContent) {
      if (hoveredItem !== null || isSearchOpen) {
        mainContent.classList.add(styles.blurContent);
      } else {
        mainContent.classList.remove(styles.blurContent);
      }
    }
  }, [hoveredItem, isSearchOpen]);

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

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("搜尋關鍵字:", searchQuery);
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
        SubmissionSubcategories.push(categories[i]["name"].toUpperCase()); // 轉為大寫
        break;

      case 19:
        GuardPassingSubcategories.push(categories[i]["name"].toUpperCase()); // 轉為大寫
        break;

      case 22:
        DefenseSubcategories.push(categories[i]["name"].toUpperCase()); // 轉為大寫
        break;

      case 33:
        TakeDownSubcategories.push(categories[i]["name"].toUpperCase()); // 轉為大寫
        break;
    }
  }

  // 定義類別和子類別數據，並轉為大寫
  const navItems = [
    {
      category: "SUBMISSIONS", // 直接設置為大寫
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
      } ${styles.nav}`}
    >
      <div
        className={`max-w-[1300px] mx-auto flex items-center justify-between ${styles.container}`}
      >
        <div className={`w-auto h-auto pl-12 ${styles.logo}`}>
          <Link
            href="/"
            className={`flex items-center no-underline text-white text-[2.5rem] hover:text-[#00e676] ${styles.logoLink}`}
          >
            <Image
              src="/bjj-letter-logo.png"
              alt="BJJ Logo"
              width={60}
              height={60}
              style={{ verticalAlign: "middle" }}
            />
            <span className={`ml-2.5 ${styles.logoText}`}>BJJ.JPG</span>
          </Link>
        </div>
        <div
          id="mainListDiv"
          className={`h-[65px] flex items-center justify-end ${
            styles.main_list
          } ${isMenuOpen ? styles.show_list : ""}`}
        >
          {isSearchOpen && (
            <div
              className={`absolute top-0 left-0 w-full h-[65px] bg-[#111] flex items-center justify-center z-[1002] ${styles.searchContainer}`}
            >
              <form
                onSubmit={handleSearchSubmit}
                className={`flex items-center w-1/2 max-w-[600px] relative ${styles.searchForm}`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH..."
                  className={`w-full px-5 py-2.5 text-white bg-[#222] border-none rounded-md outline-none text-[1.8rem] ${styles.searchInput}`}
                  autoFocus
                />
                <button
                  type="submit"
                  className={`absolute right-10 top-1/2 -translate-y-1/2 bg-none border-none text-[1.8rem] text-[#888] cursor-pointer hover:text-[#00e676] ${styles.searchButton}`}
                >
                  <FaSearch />
                </button>
                <button
                  type="button"
                  onClick={handleCloseSearch}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 bg-none border-none text-[1.8rem] text-[#888] cursor-pointer hover:text-[#00e676] ${styles.closeSearchButton}`}
                >
                  ✕
                </button>
              </form>
            </div>
          )}

          <div
            className={`pt-[65px] block ${
              activeSubmenu !== null || isSearchOpen ? "hidden" : ""
            } ${styles.menuContent}`}
          >
            <div
              className={`flex items-center h-[65px] mr-8 ${styles.navContent}`}
            >
              <ul
                className={`w-auto h-[65px] flex flex-row list-none m-0 p-0 ${
                  activeSubmenu !== null || isSearchOpen ? "hidden" : ""
                } ${styles.navlinks}`}
              >
                {navItems.map((item, index) => (
                  <li
                    key={item.category}
                    className={`w-auto h-[65px] p-0 pr-12 relative ${
                      activeDropdown === index ? "active" : ""
                    } ${styles.navItem}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${encodeURIComponent(item.category)}`} // 對類別名稱進行 URL 編碼
                      onClick={() => handleDropdownClick(index)}
                      className={`no-underline text-white leading-[65px] text-[2.4rem] hover:text-[#00e676]`}
                    >
                      {item.category}
                    </Link>
                    <div
                      className={`absolute top-[65px] left-0 min-w-[200px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] z-[1001] ${
                        styles.dropdownContent
                      } ${hoveredItem === index ? "block" : "hidden"} ${
                        activeDropdown === index ? "block" : "hidden"
                      }`}
                    >
                      {item.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          href={`/${encodeURIComponent(
                            item.category
                          )}/${encodeURIComponent(subcategory)}`} // 對子類別名稱進行 URL 編碼
                          className={`block text-white text-[1.6rem] px-4 py-3 text-left leading-normal hover:bg-[#333] hover:text-[#00e676]`}
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              {!isMobile && (
                <span
                  className={`cursor-pointer text-[2.8rem] text-white z-[1003] block ml-4 -translate-y-1.5 hover:text-[#00e676] ${styles.searchIconTop}`}
                  onClick={handleSearchClick}
                >
                  <FaSearch />
                </span>
              )}
            </div>
          </div>

          {activeSubmenu !== null && isMobile && (
            <div
              className={`fixed top-0 left-0 w-full h-screen bg-[#111] z-[1002] overflow-y-auto pt-[65px] ${styles.submenu}`}
            >
              <div
                className={`px-5 py-5 text-[2rem] text-[#00e676] cursor-pointer border-b border-[#333] ${styles.backButton}`}
                onClick={handleBackToMainMenu}
              >
                BACK
              </div>
              <ul className={`list-none p-0 m-0 ${styles.submenuList}`}>
                {navItems[activeSubmenu].subcategories.map((subcategory) => (
                  <li key={subcategory} className="w-full">
                    <Link
                      href={`/${encodeURIComponent(
                        navItems[activeSubmenu].category
                      )}/${encodeURIComponent(subcategory)}`} // 對子類別名稱進行 URL 編碼
                      className={`block text-[3rem] px-12 py-5 text-left text-white no-underline hover:text-[#00e676]`}
                    >
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {isMobile && (
          <span
            className={`cursor-pointer text-[2.8rem] text-white z-[1003] block ${
              isMenuOpen || isSearchOpen ? "hidden" : ""
            } ${styles.searchIconTop}`}
            onClick={handleSearchClick}
          >
            {console.log(
              "isMobile:",
              isMobile,
              "isMenuOpen:",
              isMenuOpen,
              "isSearchOpen:",
              isSearchOpen
            )}{" "}
            {/* 調試 */}
            <FaSearch />
          </span>
        )}
        <span
          className={`${styles.navTrigger} ${isMenuOpen ? "active" : ""}`}
          onClick={handleNavTriggerClick}
        >
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </nav>
  );
}
