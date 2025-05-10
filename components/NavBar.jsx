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
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // 客戶端加載時滾動到頂部並檢查初始滾動位置
    window.scrollTo(0, 0);
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
    setIsMenuOpen(!isMenuOpen);
    setActiveSubmenu(null);
    setActiveDropdown(null);
    setIsSearchOpen(false);
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
        SubmissionSubcategories.push(categories[i]["name"]);
        break;

      case 19:
        GuardPassingSubcategories.push(categories[i]["name"]);
        break;

      case 22:
        DefenseSubcategories.push(categories[i]["name"]);
        break;

      case 33:
        TakeDownSubcategories.push(categories[i]["name"]);
        break;
    }
  }

  // 定義類別和子類別數據
  const navItems = [
    {
      category: "Submissions",
      subcategories: SubmissionSubcategories,
    },
    {
      category: "Guard Passing",
      subcategories: GuardPassingSubcategories,
    },
    {
      category: "Defense",
      subcategories: DefenseSubcategories,
    },
    {
      category: "Takedown",
      subcategories: TakeDownSubcategories,
    },
  ];

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.affix : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/bjj-letter-logo.png"
              alt="BJJ Logo"
              width={60}
              height={60}
              style={{ verticalAlign: "middle" }}
            />
            <span className={styles.logoText}>BJJ.JPG</span>
          </Link>
        </div>
        <div
          id="mainListDiv"
          className={`${styles.main_list} ${
            isMenuOpen ? styles.show_list : ""
          }`}
        >
          {isSearchOpen && (
            <div className={styles.searchContainer}>
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋..."
                  className={styles.searchInput}
                  autoFocus
                />
                <button type="submit" className={styles.searchButton}>
                  <FaSearch />
                </button>
                <button
                  type="button"
                  onClick={handleCloseSearch}
                  className={styles.closeSearchButton}
                >
                  ✕
                </button>
              </form>
            </div>
          )}

          <div
            className={`${styles.menuContent} ${
              activeSubmenu !== null || isSearchOpen ? styles.hidden : ""
            }`}
          >
            <div className={styles.navContent}>
              <ul
                className={`${styles.navlinks} ${
                  activeSubmenu !== null || isSearchOpen ? styles.hidden : ""
                }`}
              >
                {navItems.map((item, index) => (
                  <li
                    key={item.category}
                    className={`${styles.navItem} ${
                      activeDropdown === index ? styles.active : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${encodeURIComponent(item.category)}`} // 對類別名稱進行 URL 編碼
                      onClick={() => handleDropdownClick(index)}
                    >
                      {item.category}
                    </Link>
                    <div className={styles.dropdownContent}>
                      {item.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          href={`/${encodeURIComponent(
                            item.category
                          )}/${encodeURIComponent(subcategory)}`} // 對子類別名稱進行 URL 編碼
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
                  className={styles.searchIconTop}
                  onClick={handleSearchClick}
                >
                  <FaSearch />
                </span>
              )}
            </div>
          </div>

          {activeSubmenu !== null && isMobile && (
            <div className={styles.submenu}>
              <div className={styles.backButton} onClick={handleBackToMainMenu}>
                返回
              </div>
              <ul className={styles.submenuList}>
                {navItems[activeSubmenu].subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <Link
                      href={`/${encodeURIComponent(
                        navItems[activeSubmenu].category
                      )}/${encodeURIComponent(subcategory)}`} // 對類別和子類別名稱進行 URL 編碼
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
            className={`${styles.searchIconTop} ${
              isMenuOpen || isSearchOpen ? styles.hidden : ""
            }`}
            onClick={handleSearchClick}
          >
            <FaSearch />
          </span>
        )}
        <span
          className={`${styles.navTrigger} ${isMenuOpen ? styles.active : ""}`}
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
